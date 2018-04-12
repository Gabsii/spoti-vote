/*jshint esversion: 6, node: true, undef: true*/
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
let allClients = {};

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

/*jshint ignore: start */

/**
* Login using the Spotify API (This is only a Redirect)
*/
app.get('/login', (req, res) => {
	res.redirect('https://accounts.spotify.com/authorize?' + querystring.stringify({response_type: 'code', client_id: process.env.SPOTIFY_CLIENT_ID, scope: 'user-read-private user-read-email user-read-currently-playing user-modify-playback-state user-read-playback-state playlist-read-collaborative playlist-read-private', redirect_uri}));
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
			grant_type: 'authorization_code'
		},
		headers: {
			'Authorization': 'Basic ' + (
			new Buffer(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
		},
		json: true
	};
	request.post(authOptions, async (error, response, body) => {
		let uri = process.env.FRONTEND_URI || 'http://' + config.ipAddress + ':' + config.portFrontend + '/app';

		let room = new Room(body.access_token, rooms, 4);

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
app.get('/rooms', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');

	let roomIds = [];
	for (var i = 0; i < rooms.length; i++) {
		roomIds.push(rooms[i].id);
	}

	res.send({responseCode: constants.codes.SUCCESS, content: roomIds});
});
/*jshint ignore: end */


/**
* Is called when a new connection is established
*/
io.on('connection', (socket) => {
	//Local varibles, can only be used by the same connection (but in every call)
	let room = null;
    let isHost = false;
    let name = null;

	/*jshint ignore: start */
	//This function is called every 500ms
	let updateInterval = setInterval(
        () => theUpdateFunction(socket, room, isHost),500
	);
	/*jshint ignore: end */

	//This is what happens when a user connects
    socket.emit('roomId');

	/**
    * Called when a user wants to connect to a room
	*
	* Will set the local varible {room} and {isHost}
	* @param {string} roomId Id of the room
    */
    socket.on('roomId', data => {
        room = getRoomById(data.roomId);
        if (room !== null) {
            if (data.token == room.host.token) {
                isHost = true;
				socket.emit('initData', {
					playlists: room.getPlaylists(),
					hostName: room.host.name,
					isHost: isHost
				});

				console.log('-c - Host connected');
            } else {
                socket.emit('nameEvent', {
					userNames: room.getUserNames()
				});
            }
        } else {
            socket.emit('errorEvent', {message: 'Room has been closed'});
        }
    });

	/**
    * Called when a user thats not a host wants to enter a room
	*
	* Will set the local varible {name}
	* @param {string} name Name of the user
    */
    socket.on('nameEvent', data => {
        name = data.name;
        if (name !== null) {
            room.addUser(name);
			socket.emit('initData', {
				hostName: room.host.name
			});
        }

		console.log('-c - ['+data.name+'] connected');
    });

	/**
    * Called when the host changes the volume
	* @param {int} volume Volume in percent
    */
	socket.on('changeVolume', data => {
        room.changeVolume(data.volume);

		console.log('-vl- The volume was changed to: ['+data.volume+']');
    });

	/**
    * Called when the host changes the playlist
	* @param {string} playlistId Name of the user
    */
	socket.on('changePlaylist', data => {
        room.changePlaylist(data.playlistId);

		console.log('-pC- Playlist changed to: ['+data.playlistId+']');
    });

	/**
    * Called when a user votes on a track
	* @param {string} trackId Id of the track
    */
	socket.on('vote', data => {
        room.vote(data.trackId, isHost, name);

		if (isHost === true) {
			console.log('-vo- the host voted for: ['+data.trackId+']');
		} else {
			console.log('-vo- ['+name+'] voted for: ['+data.trackId+']');
		}
    });

    /**
    * Called when a connection is closed
    */
    socket.on('disconnect', () => {
		/*jshint ignore: start */
		clearInterval(updateInterval);
		/*jshint ignore: end */
		if (room !== null) {
			if (isHost === false) {
				room.removeUser(name);

				console.log('-d - ['+name+'] disconnect');
			} else {


				console.log('-d - Host disconnect');
			}
		} else {
			console.log('-d - User was auto-disconnected');
		}
    });
});

/*jshint ignore: start */

/**
* This function will be called every interval and is used to update the users
*
* @author: Michiocre
* @param {socket} socket The socket object passed down from the call
*/
async function theUpdateFunction(socket, room, isHost) {
	if (room !== null) {
		room.update(isHost);
		socket.emit('update', room);

		//console.log('-u -');
	}
};

/*jshint ignore: end */

/**
* Starts the server
*/
server.listen(config.portBackend, () => {
    console.log('Server started on port: ' + server.address().port);
});
