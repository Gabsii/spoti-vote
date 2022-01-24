import express from 'express';
import http from 'http';
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

//Security
import contentSecurityPolicy from 'helmet-csp';
import cors from 'cors';
import helmet from 'helmet';

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

//Global Varibles
dotenv.config();
const port = process.env.PORT;

const redirect_uri = 'http://' + process.env.ADDRESS + ':' + port + '/callback';
const secTillDelete = 60;

let referer = '';

console.log('INFO: Redirect URL: ' + redirect_uri);

//App

app.get('/api', (req, res) => {
    res.send('Hello There');
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
        res.status(400).send('Login from main page.');
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
 * Get a list of all rooms
 *
 * @Returns ResponseCode of 200
 * @Returns content Array of all the rooms
 */
app.get('/api/rooms', async (req, res) => {
    console.log('INFO: /rooms has been called.');
    res.setHeader('Access-Control-Allow-Origin', '*');

    let returnRooms = [];
    for (var i = 0; i < Room.list.length; i++) {
        let roomI = {
            roomName: Room.list[i].id,
            roomHost: Room.list[i].host.name,
            roomCover: 'https://via.placeholder.com/152x152',
        };
        if (Room.list[i].activePlaylist !== null) {
            roomI.roomCover = Room.list[i].activePlaylist.images[0].url;
        }
        returnRooms.push(roomI);
    }

    res.send({ responseCode: lib.codes.SUCCESS, content: returnRooms });
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

app.post('/api/rooms/:roomId/checkToken', (req, res) => {
    let response;

    let room = Room.getById(req.params.roomId);

    if (room) {
        if (req.body.myToken === room.host.myToken) {
            room.host.lastUpdate = null;
            response = { error: false, isHost: true };
            res.status(200);
        } else {
            let user = room.getUserByToken(req.body.myToken);
            if (user) {
                response = { error: false, isHost: false, name: user.name };
                user.lastUpdate = null;
            } else {
                response = { error: false, isHost: false, name: '' };
            }

            res.status(200);
        }
    } else {
        response = { error: true, message: 'Room not found' };
        res.status(400);
    }

    res.send(JSON.stringify(response));
});

app.post('/api/rooms/:roomId/delete', (req, res) => {
    let response;

    if (req.body.myToken) {
        let room = Room.getById(req.params.roomId);

        if (req.body.myToken === room.host.myToken) {
            console.log('INFO: [ROOM: ' + room.id + ']: This room has been deleted due to more then 1 room (Host choose the old room).');
            Room.list.splice(Room.list.indexOf(room), 1);
        }
        response = { error: false };
        res.status(200);
    } else {
        response = { error: true, message: 'Authorization failed. No or expired token.' };
        res.status(401);
    }

    res.send(JSON.stringify(response));
});

//Nicer Dev enviroment since the rooms will last past server restarts
if (process.env.NODE_ENV !== 'production') {
    const dataLoc = './tempData.json';

    try {
        let parsed = JSON.parse(fs.readFileSync(dataLoc));
        for (const room of parsed.rooms) {
            Room.list.push(Room.castToRoom(room));
        }
        for (const host of parsed.hosts) {
            Host.list.push(Host.castToHost(host));
        }
    } catch (error) {
        console.log('Could not read saved rooms');
    }

    process.on('SIGINT', () => {
        let json = JSON.stringify({ rooms: Room.list, hosts: Host.list });
        fs.writeFileSync(dataLoc, json);
        server.close();
        process.exit();
    });
}

server.listen(port || 8888, () => {
    console.log('INFO: Server started on port: ' + server.address().port);
});
