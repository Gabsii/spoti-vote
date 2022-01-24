import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import QueryString from 'qs';
import request from 'request';
import _ from 'lodash';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import fs from 'fs';

//Import of used files
import Room from './classes/room.js';
import Host from './classes/host.js';
import lib from './lib.js';

//Setup of the server
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
    },
});

//Security
import contentSecurityPolicy from 'helmet-csp';
import cors from 'cors';
import helmet from 'helmet';

//Global Varibles
dotenv.config();
const ipAddress = process.env.ADDRESS;
const port = process.env.PORT;
const portBack = process.env.PORTBACK;

const uriBack = 'http://' + ipAddress + ':' + port;
const redirect_uri = uriBack + '/callback';
const secTillDelete = 60;

let referer = '';

console.log('INFO: Redirect URL: ' + redirect_uri);

app.disable('x-powered-by');
app.use(cookieParser());
app.use(express.json());
app.use(function (req, res, next) {
    res.set('Server', 'Yes');
    next();
});
app.use(
    contentSecurityPolicy({
        directives: {
            defaultSrc: ['"self"'],
        },
    }),
    helmet.referrerPolicy({ policy: 'same-origin' }),
    helmet.frameguard({
        action: 'deny',
    }),
    helmet.hsts({
        maxAge: 15768000, //Six Months in Seconds
    }),
    helmet.xssFilter(),
    helmet.noSniff(),
    cors({
        origin: '*',
        methods: 'GET',
        preflightContinue: false,
        optionsSuccessStatus: 204,
    })
);

app.get('/', (req, res) => {
    res.send('Hello There');
});

app.post('/api/profile', (req, res) => {
    console.log('INFO: /profile has been called.');

    let response;

    if (req.body.myToken) {
        let myHost = Host.getByToken(req.body.myToken);
        if (myHost) {
            response = {
                error: false,
                host: {
                    myToken: myHost.myToken,
                    name: myHost.name || myHost.id,
                    token: myHost.token,
                    img: myHost.img,
                    premium: myHost.premium,
                    topTracks: myHost.topTracks,
                },
            };
            res.status(200);
        } else {
            response = { error: true, message: 'Authorization failed. No or expired token.' };
            res.status(401);
        }
    } else {
        response = { error: true, message: 'Authorization failed. No or expired token.' };
        res.status(401);
    }

    res.send(JSON.stringify(response));
});

/**
 * Login using the Spotify API (This is only a Redirect)
 */
app.get('/api/login', (req, res) => {
    try {
        referer = req.headers.referer.substring(0, req.headers.referer.lastIndexOf('/'));
        console.log('INFO: User was sent to Spotify login');
        res.redirect(
            'https://accounts.spotify.com/authorize?' +
                QueryString.stringify({
                    response_type: 'code',
                    client_id: process.env.SPOTIFY_CLIENT_ID,
                    scope: 'user-read-private user-read-email user-read-currently-playing user-modify-playback-state user-read-playback-state user-top-read playlist-read-collaborative playlist-read-private',
                    redirect_uri,
                })
        );
    } catch (error) {
        res.status(400).send('Login from the main page');
    }
});

/**
 * The callback that will be called when the Login with the Spotify API is completed
 * Will redirect the user to the newly created room
 */
app.get('/callback', async (req, res) => {
    let code = req.query.code || null;
    let authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri,
            grant_type: 'authorization_code',
        },
        headers: {
            Authorization: 'Basic ' + Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'),
        },
        json: true,
    };
    request.post(authOptions, async (error, response, body) => {
        if (body.error) {
            res.status(400).send(body);
        }
        let uri = referer + '/dashboard';
        let host = new Host(body.access_token, body.refresh_token);

        if (await host.fetchData()) {
            Host.list.push(host);

            console.log(`INFO-[Host: ${host.name}]: This host has logged in.`);
            res.redirect(uri + '?token=' + host.myToken);
        } else {
            res.status(400).end();
        }
    });
});

app.post('/api/rooms/checkCreate', async (req, res) => {
    let response;
    if (req.body.myToken) {
        let host = Host.getByToken(req.body.myToken);
        if (host) {
            let room = Room.getByHost(host);
            if (room) {
                response = { error: false, roomId: room.id };
            } else {
                response = { error: false };
            }
            res.status(200);
        } else {
            response = { error: true, message: 'Authorization failed. No or expired token.' };
            res.status(401);
        }
    } else {
        response = { error: true, message: 'Authorization failed. No or expired token.' };
        res.status(401);
    }
    res.send(JSON.stringify(response));
});

/**
 * The callback that will be called when the Login with the Spotify API is completed
 * Will redirect the user to the newly created room
 */
app.post('/api/rooms/create', async (req, res) => {
    let response;
    if (req.body.myToken) {
        let host = Host.getByToken(req.body.myToken);
        if (host) {
            let room = new Room(host);
            Room.list.push(room);
            res.status(200);

            response = { error: false, roomId: room.id };
        } else {
            response = { error: true, message: 'Authorization failed. No or expired token.' };
            res.status(401);
        }
    } else {
        response = { error: true, message: 'Authorization failed. No or expired token.' };
        res.status(401);
    }

    res.send(JSON.stringify(response));
});

/**
 * Get a list of all rooms
 *
 * @Returns ResponseCode of 200
 * @Returns content Array of all the rooms
 */
app.get('/api/rooms', async (req, res) => {
    console.log('INFO: /rooms has been called.');
    res.setHeader('Access-Control-Allow-Origin', '*');

    let returnRooms = [];
    for (var i = 0; i < rooms.length; i++) {
        let roomI = {
            roomName: rooms[i].id,
            roomHost: rooms[i].user.name,
            roomCover: 'https://via.placeholder.com/152x152',
        };
        if (rooms[i].activePlaylist !== null) {
            roomI.roomCover = rooms[i].activePlaylist.images[0].url;
        }
        returnRooms.push(roomI);
    }

    res.send({ responseCode: lib.codes.SUCCESS, content: returnRooms });
});

/**
 * Is called when a new connection is established
 */
io.sockets.on('connection', (socket) => ioOnConnect(socket));

function ioOnConnect(socket) {
    //Local varibles, can only be used by the same connection (but in every call)
    socket.isHost = false;
    socket.name = null;
    socket.updateCounter = {
        amount: 0,
    };
    socket.oldUpdate = null;

    //This function is called every 500ms
    //let updateInterval = setInterval(() => theUpdateFunction(socket), 500);

    //This is what happens when a user connects
    socket.emit('roomId');

    /**
     * Called when a user wants to connect to a room
     *
     * Will set the local varible {room} and {isHost}
     * @param {string} roomId Id of the room
     */
    socket.on('roomId', (data) => {
        let room = Room.getById(data.roomId);

        if (room !== null) {
            socket.roomId = room.id;

            //Find already hosting room
            let oldRoom = null;
            for (const existingRoom of Room.list) {
                if (existingRoom.host.id === room.host.id) {
                    oldRoom = existingRoom;
                    break;
                }
            }

            if (oldRoom) {
                socket.emit('twoRooms', { oldRoom: oldRoom });
            } else {
                socket.name = room.user.name;

                if (room.firstConnection === true) {
                    room.firstConnection = false;
                    console.log(
                        'INFO-[ROOM: ' +
                            socket.roomId +
                            ']: The host [' +
                            socket.name +
                            '] has connected (Sending Token). [Phone: ' +
                            data.isPhone +
                            ']'
                    );

                    socket.isHost = true;
                    room.hostPhone = data.isPhone;

                    let update = room.getDifference(null);
                    socket.oldUpdate = _.cloneDeep(room);

                    update.isHost = socket.isHost;

                    update.token = room.user.token;

                    socket.emit('initData', update);
                    room.hostDisconnect = null;
                } else {
                    if (room.hostDisconnect !== null && data.token === room.user.token) {
                        //If host is gone
                        console.log(
                            'INFO-[ROOM: ' + socket.roomId + ']: The host [' + socket.name + '] has connected. [Phone: ' + data.isPhone + ']'
                        );

                        socket.isHost = true;
                        room.hostPhone = data.isPhone;

                        let update = room.getDifference(null);
                        socket.oldUpdate = _.cloneDeep(room);

                        update.isHost = socket.isHost;

                        socket.emit('initData', update);
                        room.hostDisconnect = null;
                    } else {
                        socket.emit('nameEvent', { title: 'What is your name?' });
                    }
                }
            }
        } else {
            socket.emit('errorEvent', { message: 'Room has been closed' });
        }
    });

    /**
     * Called when a user has decided wether to delete the oldRoom or use the new one
     *
     * Will delete the old room, or the new one
     * @param {boolean} value True if the old room will be deleted
     * @param {boolean} roomId Id of the old room
     */
    socket.on('twoRooms', (data) => {
        let oldRoom = lib.getRoomById(data.roomId, rooms);
        let room = lib.getRoomById(socket.roomId, rooms);
        if (data.value === true) {
            console.log('INFO-[ROOM: ' + oldRoom.id + ']: This room has been deleted due to host creating a new one.');
            rooms.splice(rooms.indexOf(oldRoom), 1);

            socket.name = room.user.name;

            if (room.firstConnection === true) {
                room.firstConnection = false;
                console.log(
                    'INFO-[ROOM: ' + socket.roomId + ']: The host [' + socket.name + '] has connected (Sending Token). [Phone: ' + data.isPhone + ']'
                );

                socket.isHost = true;
                room.hostPhone = data.isPhone;

                let update = room.getDifference(null);
                socket.oldUpdate = _.cloneDeep(room);

                update.isHost = socket.isHost;

                update.token = room.user.token;

                socket.emit('initData', update);
                room.hostDisconnect = null;
            } else {
                if (room.hostDisconnect !== null && data.token === room.user.token) {
                    //If host is gone
                    console.log('INFO-[ROOM: ' + socket.roomId + ']: The host [' + socket.name + '] has connected. [Phone: ' + data.isPhone + ']');

                    socket.isHost = true;
                    room.hostPhone = data.isPhone;

                    let update = room.getDifference(null);
                    socket.oldUpdate = _.cloneDeep(room);

                    update.isHost = socket.isHost;

                    socket.emit('initData', update);
                    room.hostDisconnect = null;
                } else {
                    socket.emit('nameEvent', { title: 'What is your name?' });
                }
            }
        } else {
            console.log('INFO-[ROOM: ' + room.id + ']: This room has been deleted due to more then 1 room (Host choose the old room).');
            rooms.splice(rooms.indexOf(room), 1);
            socket.emit('errorEvent', { message: 'Room has been closed' });
        }
    });

    /**
     * Called when a user thats not a host wants to enter a room
     *
     * Will set the local varible {name}
     * @param {string} name Name of the user
     */
    socket.on('nameEvent', (data) => {
        let room = lib.getRoomById(socket.roomId, rooms);
        if (room !== null) {
            if (room.getUserNames().includes(data.name) === true) {
                socket.emit('nameEvent', { title: 'This name is already taken, enter a different name.' });
            } else if (data.name.trim() === '') {
                socket.emit('nameEvent', { title: 'This name can´t be emtpy, enter a different name.' });
            } else if (data.name.length > 15) {
                socket.emit('nameEvent', { title: 'This name is too long, enter a different name.' });
            } else {
                console.log('INFO-[ROOM: ' + socket.roomId + ']: [' + data.name + '] has connected.');
                socket.name = data.name;
                room.addUser(socket.name);

                let update = room.getDifference(null);
                socket.oldUpdate = _.cloneDeep(room);

                socket.emit('initData', update);
            }
        } else {
            socket.emit('errorEvent', { message: 'Room was closed' });
        }
    });

    /**
     * Called when the host changes the volume
     * @param {int} volume Volume in percent
     */
    socket.on('changeVolume', (data) => {
        let room = lib.getRoomById(socket.roomId, rooms);
        if (room !== null) {
            console.log('INFO-[ROOM: ' + socket.roomId + ']: Volume changed to [' + data.volume + '].');
            room.changeVolume(data.volume);
        } else {
            socket.emit('errorEvent', { message: 'Room was closed' });
        }
    });

    /**
     * Called when the host changes the playlist
     * @param {string} playlistId Id of the Playlist
     */
    socket.on('changePlaylist', (data) => {
        let room = lib.getRoomById(socket.roomId, rooms);
        if (room !== null) {
            room.changePlaylist(data.playlistId);
        } else {
            socket.emit('errorEvent', { message: 'Room was closed' });
        }
    });

    /**
     * Called when a user votes on a track
     * @param {string} trackId Id of the track
     */
    socket.on('vote', (data) => {
        let room = lib.getRoomById(socket.roomId, rooms);
        if (room !== null) {
            console.log('INFO-[ROOM: ' + socket.roomId + ']: [' + socket.name + '] voted for [' + data.trackId + '].');
            room.vote(data.trackId, socket.isHost, socket.name);

            let update = room.getDifference(socket.oldUpdate);
            socket.oldUpdate = _.cloneDeep(room);
            socket.emit('update', update);
        } else {
            socket.emit('errorEvent', { message: 'Room was closed' });
        }
    });

    /**
     * Called when the host decides to skip the currently playing song
     */
    socket.on('skip', (data) => {
        let room = lib.getRoomById(socket.roomId, rooms);
        if (room !== null) {
            console.log('INFO-[ROOM: ' + socket.roomId + ']: [' + socket.name + '] skiped the song.');
            room.play();

            let update = room.getDifference(socket.oldUpdate);
            socket.oldUpdate = _.cloneDeep(room);
            socket.emit('update', update);
        } else {
            socket.emit('errorEvent', { message: 'Room was closed' });
        }
    });

    /**
     * Called when the host wants to close the room
     */
    socket.on('logout', () => {
        let room = lib.getRoomById(socket.roomId, rooms);
        if (room !== null) {
            console.log('INFO-[ROOM: ' + room.id + ']: This room has been deleted by host.');
            rooms.splice(rooms.indexOf(room), 1);
        } else {
            socket.emit('errorEvent', { message: 'Room was closed' });
        }
    });

    /**
     * Called when the song should be paused or played
     */
    socket.on('pause', () => {
        let room = lib.getRoomById(socket.roomId, rooms);
        if (room !== null) {
            room.togglePlaystate();

            let update = room.getDifference(socket.oldUpdate);
            socket.oldUpdate = _.cloneDeep(room);
            socket.emit('update', update);
        } else {
            socket.emit('errorEvent', { message: 'Room was closed' });
        }
    });

    /**
     * Called when a connection is closed
     */
    socket.on('disconnect', () => {
        let room = Room.getById(socket.roomId);

        //clearInterval(updateInterval);
        if (room !== null) {
            console.log('INFO-[ROOM: ' + socket.roomId + ']: [' + socket.name + '] disconnected.');
            if (socket.isHost === false) {
                room.removeUser(socket.name);
            } else {
                room.hostDisconnect = Date.now();
            }
        } else {
            console.log('INFO-[ROOM: ' + socket.roomId + ']: [' + socket.name + '] auto-disconnected.');
        }
    });
}

/**
 * This function will be called every interval and is used to update the users
 *
 * @author: Michiocre
 * @param {socket} socket The socket object passed down from the call
 */
async function theUpdateFunction(socket) {
    let room = Room.getById(socket.roomId);

    socket.updateCounter.amount += 1;

    if (room !== null) {
        await room.update(socket.isHost);

        if (socket.updateCounter.amount % 300 === 0 && socket.isHost === true) {
            room.updatePlaylists();
        }

        if (socket.updateCounter.amount % 3500 === 0 && socket.isHost === true) {
            room.refreshToken();
        }

        let update = room.getDifference(socket.oldUpdate);

        if (update !== null) {
            socket.emit('update', update);
            //console.log(JSON.stringify(update).length);
        }

        socket.oldUpdate = _.cloneDeep(room);

        if (socket.updateCounter.amount % 30 === 0) {
            let toBeDeleted = [];
            for (let i = 0; i < rooms.length; i++) {
                if (rooms[i].hostPhone === false) {
                    if (Date.now() - rooms[i].hostDisconnect > 1000 * secTillDelete && rooms[i].hostDisconnect !== null) {
                        toBeDeleted.push(rooms[i]);
                    }
                }
            }
            for (let i = 0; i < toBeDeleted.length; i++) {
                console.log('INFO-[ROOM: ' + toBeDeleted[i].id + ']: This room has been deleted due to inactivity.');
                rooms.splice(rooms.indexOf(toBeDeleted[i]), 1);
            }
        }

        if (socket.updateCounter.amount > 30000) {
            socket.updateCounter.amount = 0;
        }
    } else {
        socket.emit('errorEvent', { message: null });
    }
}

//Nicer Dev enviroment since the rooms will last past server restarts
if (process.env.NODE_ENV !== 'production') {
    const dataLoc = 'tempData.json';

    try {
        parsed = JSON.parse(fs.readFileSync(dataLoc));
        Room.list = parsed.rooms;
        Host.list = parsed.hosts;
    } catch (error) {}

    process.on('SIGINT', () => {
        let json = JSON.stringify({ rooms: Room.list, hosts: Host.list });
        fs.writeFileSync(dataLoc, json);
        server.close();
        process.exit();
    });
}

server.listen(port || 3000, () => {
    console.log('INFO: Server started on port: ' + server.address().port);
});
