const http = require('http');
const express = require('express');
const request = require('request');
const querystring = require('querystring');
const bodyParser = require('body-parser');
//Security
const csp = require('helmet-csp');
const cors = require('cors');
const helmet = require('helmet');
//Import of used files
const Room = require('./Classes/Room');
const Host = require('./Classes/Host');
const env = require('./env').getEnv();

let expressApp = express();
expressApp.use(bodyParser.json());
let server = http.createServer(expressApp);

let config = {
    uriBack: '',
    redirect_uri: '',
    referer: ''
};

let data = {
    rooms: [],
    hosts: []
};

if (env.frontendPort === 443) {
    config.uriBack = 'https://' + env.ipAddress + ':' + env.frontendPort;
} else {
    config.uriBack = 'http://' + env.ipAddress + ':' + env.backendPort;
}

config.redirect_uri = config.uriBack + '/callback';

// eslint-disable-next-line no-console
console.log('INFO: Redirect URL: ' + config.redirect_uri);

setHeaders();
setHttpCalls();

function setHeaders() {
    expressApp.disable('x-powered-by');
    expressApp.use(function (req, res, next) {
        res.set('Server', 'Yes');
        next();
    });

    expressApp.use(
        csp({
            directives: {
                defaultSrc: ['"self"']
            }
        }),
        helmet.featurePolicy({
            features: {
                fullscreen: ['"self"'],
                vibrate: ['"none"'],
                payment: ['"none"'],
                syncXhr: ['"none"']
            }
        }),
        helmet.referrerPolicy({ policy: 'same-origin' }),
        helmet.frameguard({
            action: 'deny'
        }),
        helmet.hsts({
            maxAge: 15768000 //Six Months in Seconds
        }),
        helmet.xssFilter(),
        helmet.noSniff(),
        cors({
            origin: '*',
            methods: 'GET, POST',
            preflightContinue: false,
            optionsSuccessStatus: 204
        })
    );
}


function setHttpCalls() {
    /**
    * Response with small greeting
    */
    expressApp.get('/', (req, res) => {
        res.send('Hello There. This is the Spotivote Backend Server, as you can see I am working right now.');
    });

    /**
    * Login using the Spotify API (This is only a Redirect)
    */
    expressApp.get('/login', (req, res) => {
        try {
            config.referer = req.headers.referer.substring(0, req.headers.referer.lastIndexOf('/'));
            // eslint-disable-next-line no-console
            console.log('INFO: Host was sent to Spotify login');
            let redirect_uri = config.redirect_uri;
            res.redirect(env.spotifyAccountAddress + '/authorize?' + querystring.stringify({response_type: 'code', client_id: process.env.SPOTIFY_CLIENT_ID, scope: 'user-read-private user-read-email user-read-currently-playing user-modify-playback-state user-read-playback-state user-top-read playlist-read-collaborative playlist-read-private', redirect_uri}));
        } catch (error) {
            res.status(400).send('Login from the main page.');
        }
    });

    /**
    * The callback that will be called when the Login with the Spotify API is completed
    * Will get Host-Date from the api and redirect to the Dashboard
    */
    expressApp.get('/callback', async (req, res) => {
        let code = req.query.code || null;
        let authOptions = {
            url: env.spotifyAccountAddress +'/api/token',
            form: {
                code: code,
                redirect_uri: config.redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(env.spotifyClientId + ':' + env.spotifyClientSecret).toString('base64'))
            },
            json: true
        };
        request.post(authOptions, async (error, response, body) => {
            if (response.statusCode === 200) {
                let uri = config.referer + '/dashboard';
                let host = new Host.Host(body.access_token, body.refresh_token);
                if (await host.fetchData() === true) {
                    let oldHost = Host.getHostByToken(host.myToken, data.hosts);
                    if (oldHost !== null && oldHost !== undefined) {
                        let oldRoom = Room.getRoomByHost(oldHost, data.rooms);
                        data.rooms.splice(data.rooms.indexOf(oldRoom), 1);
                        data.hosts.splice(data.hosts.indexOf(oldHost), 1);
                    }
                    data.hosts.push(host);
                    // eslint-disable-next-line no-console
                    console.log('INFO-[HOST: '+host.name+']: This host has logged in');
                    res.redirect(uri + '?token=' + host.myToken);
                } else {
                    res.status(400).send();
                }
            } else {
                res.status(400).send();
            }
        });
    });
    
    /**
    * Response with the profile data of the host.
    * 
    * @param myToken Authorization token of the host.
    * 
    * @returns JSON Object with:
    *       boolean error
    *       string message (only on error)
    *       object host (only on success)
    */
    expressApp.post('/profile', async (req, res) => {
        let response;
        // eslint-disable-next-line no-console
        console.log('INFO: /profile has been called.');
        res.setHeader('Access-Control-Allow-Origin', '*');

        if (req.body.myToken === null || req.body.myToken === undefined) {
            response = {error: true, message: 'Authorization failed. No or expired token.'};
            res.status(400);
        } else {
            let host = Host.getHostByToken(req.body.myToken, data.hosts);
            if (host == null) {
                response = {error: true, message: 'Authorization failed. No or expired token.'};
                res.status(400);
            } else {
                response = {error: false, host: host.getData()};
                res.status(200);
            }
        }

        res.send(JSON.stringify(response));
    });

    /**
    * Response with list of all the rooms
    * 
    * @returns array returnRooms
    */
    expressApp.get('/rooms', async (req, res) => {
        // eslint-disable-next-line no-console
        console.log('INFO: /rooms has been called.');
        res.setHeader('Access-Control-Allow-Origin', '*');

        let returnRooms = [];
        for (var i = 0; i < data.rooms.length; i++) {
            let roomData = data.rooms[i].getData(false);
            let roomI = {
                roomName: roomData.roomId,
                roomHost: roomData.host.name
            };
            try {
                roomI.roomCover = roomData.activePlayer.track.album.images[0].url;
            } catch (error) {
                try {
                    roomI.roomCover = roomData.activePlaylist;
                } catch (error) {
                    break;
                }
            }
            if (roomI.roomCover === null || roomI.roomCover === undefined) {
                roomI.roomCover = roomData.host.img;
            }
            returnRooms.push(roomI);
        }

        res.status(200).send(returnRooms);
    });

    /**
    * Checks if the host is already hosting a room
    * 
    * @param myToken Authorization token of the host.
    * 
    * @returns JSON Object with:
    *       boolean error
    *       string message (only on error)
    *       string roomId (only on error)
    */
    expressApp.post('/rooms/checkCreate', async (req, res) => {
        let response;
        if (req.body.myToken === null || req.body.myToken === undefined) {
            response = {error: true, message: 'Authorization failed. No or expired token.'};
            res.status(400);
        } else {
            let host = Host.getHostByToken(req.body.myToken, data.hosts);
            if (host === null) {
                response = {error: true, message: 'Authorization failed. No or expired token.'};
                res.status(400);
            } else {
                let room = Room.getRoomByHost(host, data.rooms);
                if (room !== null) {
                    response = {error: false, roomId: room.id};
                } else {
                    response = {error: false};
                }
                res.status(200);
            }
        }
        res.send(JSON.stringify(response));
    });

    /**
    * Creates a new Room
    * 
    * @param myToken Authorization token of the host.
    * 
    * @returns JSON Object with:
    *       boolean error
    *       string message (only on error)
    *       string roomId (only on success)
    */
    expressApp.post('/rooms/create', async (req, res) => {
        let response;
        if (req.body.myToken === null || req.body.myToken === undefined) {
            response = {error: true, message: 'Authorization failed. No or expired token.'};
            res.status(400);
        } else {
            let host = Host.getHostByToken(req.body.myToken, data.hosts);
            if (host === null) {
                response = {error: true, message: 'Authorization failed. No or expired token.'};
                res.status(400);
            } else {
                let room = new Room.Room(host, data.rooms);
                data.rooms.push(room);
                res.status(200);
                
                response = {error: false, roomId: room.id};
            }
        }
        res.send(JSON.stringify(response));
    });

    /**
    * Checks if user is already in a room
    * 
    * @pathParam roomId
    * 
    * @param myToken Authorization token of the host/user
    * 
    * @returns JSON Object with:
    *       boolean error
    *       string message (only on error)
    *       string roomId (only on success)
    */
    expressApp.post('/rooms/:roomId/checkToken', async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');

        let response;

        let room = Room.getRoomById(req.params.roomId, data.rooms);
        if (room === null) {
            response = {error: true, message: 'Room not found'};
            res.status(400);
        } else {
            if (req.body.myToken === room.host.myToken) {
                room.host.lastUpdate = null;
                response = {error: false, isHost: true};
                res.status(200);
            } else {
                let user = room.getUserByToken(req.body.myToken);
                if (user !== null) {
                    response = {error: false, isHost: false, name: user.name};
                    user.lastUpdate = null;
                } else {
                    response = {error: false, isHost: false, name: ''};
                }
                
                res.status(200);
            }
        }
        res.send(JSON.stringify(response));
    });

    /**
    * Checks if user is already in a room
    * 
    * @pathParam roomId
    * 
    * @param myToken Authorization token of the host/user
    * 
    * @returns JSON Object with:
    *       boolean error
    *       string message (only on error)
    *       string myToken (when no token was given and a new user was created)
    */
    expressApp.post('/rooms/:roomId/connectUser', async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');

        let response;

        let room = Room.getRoomById(req.params.roomId, data.rooms);
        if (room === null) {
            response = {error: true, message: 'Room not found'};
            res.status(400);
        } else {
            if (req.body.myToken === room.host.myToken) {
                response = {error: false};
                res.status(200);
            } else {
                if (req.body.myToken !== null) {
                    room.addUser(req.body.clientName, req.body.myToken);
                    response = {error: false};
                } else {
                    let newUser = room.addUser(req.body.clientName, Host.createToken(20));
                    response = {error: false, myToken: newUser.myToken};
                }

                res.status(200);
            }
        }
        res.send(JSON.stringify(response));
    });

    /**
    * Response with the updated state of the room
    * 
    * @pathParam roomId
    * 
    * @param myToken Authorization token of the host/user
    * 
    * ON ERROR:
    * @returns JSON Object with:
    *       boolean error
    *       string message
    * ON SUCCESS:
    * @returns JSON Object roomDiff
    */
    expressApp.post('/rooms/:roomId/update', async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        
        let response = {};
        if (req.body.myToken === null || req.body.myToken === undefined) {
            response = {error: true, message: 'Authorization failed. No or expired token.'};
            res.status(400);
        } else {
            let room = Room.getRoomById(req.params.roomId, data.rooms);
            if (room === null) {
                response = {error: true, message: 'Room not found'};
                res.status(400);
            } else {
                await room.update();
                if (req.body.myToken === room.host.myToken) {
                    response = room.getData(true, room.host);
                    res.status(200);
                } else {
                    let user = room.getUserByToken(req.body.myToken);
                    response = room.getData(false, user);
                    res.status(200);
                }
            }
        }
        res.send(JSON.stringify(response));
    });

    /**
    * Changes the current playlist
    * 
    * @pathParam roomId
    * 
    * @param myToken Authorization token of the host/user
    * @param playlistId
    * 
    * @returns JSON Object with:
    *       boolean error
    *       string message (On Error)
    */
    expressApp.post('/rooms/:roomId/selectPlaylist', async (req, res) => {
        let response;

        if (req.body.myToken === null || req.body.myToken === undefined) {
            response = {error: true, message: 'Authorization failed. No or expired token.'};
            res.status(400);
        } else {
            let room = Room.getRoomById(req.params.roomId, data.rooms);
            if (room !== null) {
                if (req.body.myToken === room.host.myToken) {
                    if (req.body.playlistId !== null && req.body.playlistId !== undefined) {
                        room.changePlaylist(req.body.playlistId);
                        response = {error: false};
                        res.status(200);
                    }
                }
            } else {
                response = {error: true, message: 'Room has not been found'};
                res.status(400);
            }
        }
        res.send(JSON.stringify(response));
    });

    /**
    * Deletes the room
    * 
    * @pathParam roomId
    * 
    * @param myToken Authorization token of the host/user
    * 
    * @returns JSON Object with:
    *       boolean error
    *       string message (On Error)
    */
    expressApp.post('/rooms/:roomId/delete', async (req, res) => {
        let response;

        if (req.body.myToken === null || req.body.myToken === undefined) {
            response = {error: true, message: 'Authorization failed. No or expired token.'};
            res.status(400);
        } else {
            let room = Room.getRoomById(req.params.roomId, data.rooms);

            if (req.body.myToken === room.host.myToken) {
                // eslint-disable-next-line no-console
                console.log('INFO-[ROOM: ' + room.id + ']: This room has been deleted due to more then 1 room (Host choose the old room).');
                data.rooms.splice(data.rooms.indexOf(room), 1);
            }
            response = {error: false};
            res.status(200);
        }
        res.send(JSON.stringify(response));
    });

    /**
    * Deletes the room
    * 
    * @pathParam roomId
    * 
    * @param myToken Authorization token of the host/user
    * @param volume
    * 
    * @returns JSON Object with:
    *       boolean error
    *       string message (On Error)
    */
    expressApp.post('/rooms/:roomId/volume', async (req, res) => {
        let response;

        if (req.body.myToken === null || req.body.myToken === undefined) {
            response = {error: true, message: 'Authorization failed. No or expired token.'};
            res.status(400);
        } else {
            let room = Room.getRoomById(req.params.roomId, data.rooms);
            if (req.body.myToken === room.host.myToken) {
                // eslint-disable-next-line no-console
                console.log('INFO-[ROOM: ' + req.params.roomId + ']: Volume changed to [' + req.body.volume + '].');
                room.changeVolume(req.body.volume);
                response = {error: false};
                res.status(200);
            } else {
                response = {error: true, message: 'Authorization failed. Expired token.'};
                res.status(400);
            }
        }
        res.send(JSON.stringify(response));
    });

    /**
    * Adds a vote from a user to the song
    * 
    * @pathParam roomId
    * 
    * @param myToken Authorization token of the host/user
    * @param trackId
    * 
    * @returns JSON Object with:
    *       boolean error
    *       string message (On Error)
    */ 
    expressApp.post('/rooms/:roomId/vote', async (req, res) => {
        let response;

        if (req.body.myToken === null || req.body.myToken === undefined) {
            response = {error: true, message: 'Authorization failed. No or expired token.'};
            res.status(400);
        } else {
            let room = Room.getRoomById(req.params.roomId, data.rooms);
            // eslint-disable-next-line no-console
            console.log('INFO-[ROOM: ' + room.id + ']: [' + req.body.myToken + '] voted for [' + req.body.trackId + '].');
            room.vote(req.body.trackId, req.body.myToken);
            response = {error: false};
            res.status(200);
        }

        res.send(JSON.stringify(response));
    });

    /**
    * Skips the current song
    * 
    * @pathParam roomId
    * 
    * @param myToken Authorization token of the host/user
    * 
    * @returns JSON Object with:
    *       boolean error
    *       string message (On Error)
    */ 
    expressApp.post('/rooms/:roomId/skip', async (req, res) => {
        let response;

        if (req.body.myToken === null || req.body.myToken === undefined) {
            response = {error: true, message: 'Authorization failed. No or expired token.'};
            res.status(400);
        } else {
            let room = Room.getRoomById(req.params.roomId, data.rooms);

            if (req.body.myToken === room.host.myToken) {
                // eslint-disable-next-line no-console
                console.log('INFO-[ROOM: ' + room.id + ']: Host skiped the song.');
                if (!(await room.play())) {
                    // eslint-disable-next-line no-console
                    console.warn('INFO-[ROOM: ' + room.id + ']: Skipping song did not work.');
                    response = {error: true, message: 'Cant skip, no song is playing.'};
                    res.status(400);
                } else {
                    response = {error: false};
                    res.status(200);
                }
            } else {
                response = {error: true, message: 'Authorization failed. No or expired token.'};
                res.status(400);
            }
        }
        res.send(JSON.stringify(response));
    });

    /**
    * Toggles Playstate (play/pause)
    * 
    * @pathParam roomId
    * 
    * @param myToken Authorization token of the host/user
    * 
    * @returns JSON Object with:
    *       boolean error
    *       string message (On Error)
    */ 
    expressApp.post('/rooms/:roomId/pause', async (req, res) => {
        let response;

        if (req.body.myToken === null || req.body.myToken === undefined) {
            response = {error: true, message: 'Authorization failed. No or expired token.'};
            res.status(400);
        } else {
            let room = Room.getRoomById(req.params.roomId, data.rooms);

            if (req.body.myToken === room.host.myToken) {
            // eslint-disable-next-line no-console
                console.log('INFO-[ROOM: ' + room.id + ']: Host skiped the song.');
                room.togglePlaystate();
                response = {error: false};
                res.status(200);
            } else {
                response = {error: true, message: 'Authorization failed. No or expired token.'};
                res.status(400);
            }
        }

        res.send(JSON.stringify(response));
    });
}

/**
* Starts the server
*/
server.listen(env.backendPort, () => {
    // eslint-disable-next-line no-console
    console.log('INFO: Server started on port: ' + server.address().port);
});