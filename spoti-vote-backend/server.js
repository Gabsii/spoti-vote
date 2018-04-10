"use strict"; //Places the server in a strict enviroment (More exeptions, catches coding blooper, prevents unsafe actions, disables some features)

const express = require('express');
const request = require('request');
const querystring = require('querystring');

let Room = require('./src/Room');
let config = require('./src/config');
let constants = require('./src/constants');

let app = express();

let redirect_uri = process.env.REDIRECT_URI || 'http://' + config.ipAddress + ':' + config.portBackend + '/callback';

console.log(redirect_uri);

let rooms = [];

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
* Get a list of all playlists of this room
*
* @PathParameter id  The id of the room
* @Returns ResponseCode of either 200 or 404 based on if the room-id exists
* @Returns responseMessage with error message in case of error
* @Returns content Array of all the playlists
*/
app.get('/room/playlists', async function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	let room = getRoomById(req.query.id);
	if (room != null) {
		res.send({responseCode: constants.codes.SUCCESS, content: await room.getPlaylists()});
	} else {
		res.send({responseCode: constants.codes.NOTFOUND, responseMessage: 'This room was not found'});
	}
});

/**
* Get the hosts user data of this room
*
* @PathParameter id  The id of the room
* @Returns ResponseCode of either 200 or 404 based on if the room-id exists
* @Returns responseMessage with error message in case of error
* @Returns content Object with the user data
*/
app.get('/room/host', async function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	let room = getRoomById(req.query.id);
	if (room != null) {
		res.send({responseCode: constants.codes.SUCCESS, content: await room.getHostInfo()});
	} else {
		res.send({responseCode: constants.codes.ROOMNOTFOUND, response: 'This room was not found'});
	}
});

/**
* Selects a new set of active tracks
*
* @PathParameter id  The id of the room
* @PathParameter playlist  The id of the playlist
* @Returns ResponseCode of either 200 or 404 or 414 or 500 based on if the room-id and the playlist-id exists or if the playlist is to small
* @Returns responseMessage with error message in case of error
*/
app.get('/room/newTracks', async function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	let playlistId = req.query.playlist;
	let room = getRoomById(req.query.id);

	if (room != null) {
		if (playlistId != 'none') {
			if (await room.getRandomTracks(playlistId, false) == true) {
				res.send({responseCode: constants.codes.SUCCESS});
			} else {
				res.send({responseCode: constants.codes.ERROR, responseMessage: 'The playlist is to small'})
			}
		} else {
			res.send({responseCode: constants.codes.PLNOTFOUND, responseMessage: 'You cant pick no playlist'})
		}
	} else {
		res.send({responseCode: constants.codes.ROOMNOTFOUND, responseMessage: 'This room was not found'});
	}
});

/**
* Gets the current set of active playlist, tracks, connected users, num of playlists,...
* All the data that is needed to keep the frontend synced
*
* @PathParameter id  The id of the room
* @Returns ResponseCode of either 200 or 404 based on if the room-id exists
* @Returns responseMessage with error message in case of error
* @Returns content Object with the data
*/
app.get('/room/update', async function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	let room = getRoomById(req.query.id);

	if (room != null) {
		res.send({
			responseCode: constants.codes.SUCCESS,
			content: await room.update()
		});
	} else {
		res.send({responseCode: constants.codes.ROOMNOTFOUND, responseMessage: 'This room was not found'});
	}
});

/**
* Checks if a given token is the same one that was returned by the Spotify API
*
* @PathParameter id  The id of the room
* @PathParametert token The token that will be checked
* @Returns ResponseCode of either 200 or 404 based on if the room-id exists
* @Returns responseMessage with error message in case of error
* @Returns content Boolean true if the token match
*/
app.get('/room/checkToken', async function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	let room = getRoomById(req.query.id);

	if (room != null) {
		res.send({
			responseCode: constants.codes.SUCCESS,
			content: await room.checkToken(req.query.token)
		});
	} else {
		res.send({responseCode: constants.codes.ROOMNOTFOUND, responseMessage: 'This room was not found'});
	}
});

/**
* Adds a user to the list of connected users
*
* @PathParameter id  The id of the room
* @PathParametert name of the user that will be added
* @Returns ResponseCode of either 200 or 404 based on if the room-id exists
* @Returns responseMessage with error message in case of error
*/
app.get('/room/connect', async function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	let room = getRoomById(req.query.id);

	if (room != null) {
		if (await room.connect(req.query.name)) {
			res.send({responseCode: constants.codes.SUCCESS});
		} else {
			res.send({responseCode: constants.codes.ERROR, responseMessage: 'Internal Error'});
		}
	} else {
		res.send({responseCode: constants.codes.ROOMNOTFOUND, responseMessage: 'This room was not found'});
	}
});

/**
* Adds or changes a vote of an user
*
* @PathParameter id  The id of the room
* @PathParameter loggedIn if the user is the host
* @PathParametert name of the user whomst will change his vote
* @PathParametert track id of the track the user voted for
* @Returns ResponseCode of either 200 or 404 based on if the room-id exists
* @Returns responseMessage with error message in case of error
*/
app.get('/room/vote', async function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	let room = getRoomById(req.query.id);

	if (room != null) {
		if (await room.vote(req.query.name, req.query.track, req.query.loggedIn)) {
			res.send({responseCode: constants.codes.SUCCESS});
		} else {
			res.send({responseCode: constants.codes.ERROR, responseMessage: 'Internal error'});
		}
	} else {
		res.send({responseCode: constants.codes.ROOMNOTFOUND, responseMessage: 'This room was not found'});
	}
});

/**
* Starts plaing the most voted Song
*
* @PathParameter id  The id of the room
* @Returns ResponseCode of either 200 or 404 based on if the room-id exists
* @Returns responseMessage with error message in case of error
*/
app.get('/room/test/play', async function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	let room = getRoomById(req.query.id);

	if (room != null) {
		if (await room.play()) {
			res.send({responseCode: constants.codes.SUCCESS});
		} else {
			res.send({responseCode: constants.codes.ERROR, responseMessage: 'Internal error'});
		}
	} else {
		res.send({responseCode: constants.codes.ROOMNOTFOUND, responseMessage: 'This room was not found'});
	}
});

let port = process.env.PORT || config.portBackend;
console.log(`Listening on port ${port}. Go /login to initiate authentication flow.`);
app.listen(port);
