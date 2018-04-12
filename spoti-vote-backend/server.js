"use strict"; //Places the server in a strict enviroment (More exeptions, catches coding blooper, prevents unsafe actions, disables some features)
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const querystring = require('querystring');
const request = require('request');
//Import of configs
let config = require('./src/config');
let constants = require('./src/constants');
let Room = require('./src/Room');
//Setup of the server
let app = express();
let server = http.createServer(app);
let io = socketIo(server);

//Global Varibles
let redirect_uri = process.env.REDIRECT_URI || 'http://' + config.ipAddress + ':' + config.portBackend + '/callback';
let rooms = [];
let allClients = [];

/**
* Return the room with the specified id
*
* @author: Michiocre
* @param {string} roomId The id that identifies the room
* @return {Room} The room object with the id of the parameter
*/
function getRoomById(roomId) {
	let room = null;
	for (var i = 0; i < rooms.length; i++) {
		if (rooms[i].id == roomId)
			room = rooms[i];
		}
	return room;
}

/**
* Login using the Spotify API (This is only a Redirect)
*/
app.get('/login', function(req, res) {
	res.redirect('https://accounts.spotify.com/authorize?' + querystring.stringify({response_type: 'code', client_id: process.env.SPOTIFY_CLIENT_ID, scope: 'user-read-private user-read-email user-read-currently-playing user-modify-playback-state user-read-playback-state playlist-read-collaborative playlist-read-private', redirect_uri}));
});

/**
* The callback that will be called when the Login with the Spotify API is completed
* Will redirect the user to the newly created room
*/
app.get('/callback', async function(req, res) {
	let code = req.query.code || null;
	let authOptions = {
		url: 'https://accounts.spotify.com/api/token',
		form: {
			code: code,
			redirect_uri,
			grant_type: 'authorization_code'
		},
		headers: {
			'Authorization': 'Basic ' + (
			new Buffer(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
		},
		json: true
	};
	request.post(authOptions, async function(error, response, body) {
		let uri = process.env.FRONTEND_URI || 'http://' + config.ipAddress + ':' + config.portFrontend + '/app';

		let room = new Room(body.access_token, rooms);

		await room.fetchData();
		rooms.push(room);

		res.redirect(uri + '/' + room.id + '?token=' + body.access_token);
	});
});

/**
* Get a list of all rooms
*
* @Returns ResponseCode of 200
* @Returns content Array of all the rooms
*/
app.get('/rooms', async function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');

	let roomIds = [];
	for (var i = 0; i < rooms.length; i++) {
		roomIds.push(rooms[i].id);
	}

	res.send({responseCode: constants.codes.SUCCESS, content: roomIds});
});


/**
* Is called when a new client connects to the socket
*/
io.on('connection', function(socket) {
    let room = null;
    let isHost = false;
    let name = null;

	allClients.push(socket);

    socket.emit('roomId');
    socket.on('roomId', data => {
        room = getRoomById(data.roomId);
        if (room !== null) {
            if (data.token == room.host.token) {
                isHost = true;
				socket.emit('initData', {
					playlists: room.getPlaylists(),
					hostName: room.getHostName(),
					isHost: isHost
				});
            } else {
                socket.emit('nameEvent', {
					userNames: room.getUserNames()
				});
            }
        } else {
            socket.emit('errorEvent', {message: 'Room does not exist.'})
        }
    });

    socket.on('nameEvent', data => {
        name = data.name
        if (name !== null) {
            room.addUser(name);
			socket.emit('initData', {
				hostName: room.getHostName()
			});
        }
    });

	socket.on('changePlaylist', data => {
        room.changePlaylist(data.playlistId);
    });

	socket.on('vote', data => {
        room.vote(data.trackId, isHost, name);
    });


    setInterval(
        () => theUpdateFunction(socket, room, isHost),500
    );


    /**
    * Called when a client disconnects
    */
    socket.on('disconnect', function() {
		if (room != null) {
			room.removeUser(name);
		}
		let i = allClients.indexOf(socket);
		allClients.splice(i,1);
		if (allClients.length >= 0 && rooms.length > 0) {
			//rooms = [];
			//console.log('All rooms were deleted');
		}
    });
});

/**
* This function will be called every interval and is used to update the users
*
* @author: Michiocre
* @param {socket} socket The socket object passed down from the call
*/
async function theUpdateFunction(socket, room, isHost) {
	if (room !== null) {
		room.update(isHost);
	}
	socket.emit('update', room);
};

/**
* Starts the server
*/
server.listen(config.portBackend, () => {
    console.log('Server started on port: ' + server.address().port);
});
