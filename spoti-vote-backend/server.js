"use strict";

const express = require('express');
const request = require('request');
const querystring = require('querystring');

let app = express();


let ServerInstance = require('./src/ServerInstance');

let redirect_uri = process.env.REDIRECT_URI || 'http://localhost:8888/callback';
let serverInstances = [];

function getInstanceById(instanceId) {
	let instance = null;
	for (var i = 0; i < serverInstances.length; i++) {
		if (serverInstances[i].id == instanceId)
			instance = serverInstances[i];
	}
	return instance;
}

app.get('/login', function(req, res) {
	res.redirect('https://accounts.spotify.com/authorize?' + querystring.stringify({response_type: 'code', client_id: process.env.SPOTIFY_CLIENT_ID, scope: 'user-read-private user-read-email user-read-currently-playing user-modify-playback-state user-read-playback-state playlist-read-collaborative', redirect_uri}));
});

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
				new Buffer(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')
			)
		},
		json: true
	};
	request.post(authOptions, async function(error, response, body) {
		let uri = process.env.FRONTEND_URI || 'http://localhost:3000/app';

		let instance = new ServerInstance(body.access_token, serverInstances);
		await instance.fetchData();
		serverInstances.push(instance);

		res.redirect(uri + '/' + instance.id + '?token=' + body.access_token);
	});
});

app.get('/instance/playlists', async function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	let instance = getInstanceById(req.query.id);
	if (instance != null) {
		res.send(instance.getPlaylists());
	} else {
		res.send({response: 'This room was not found'});
	}
});

app.get('/instance/host', function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	let instance = getInstanceById(req.query.id);
	if (instance != null) {
		res.send(instance.getHostInfo());
	} else {
		res.send({response: 'This room was not found'});
	}
});

app.get('/instance/newTracks', async function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	let playlistId = req.query.playlist;
	let instance = getInstanceById(req.query.id);

	if (instance != null) {
		if (await instance.getRandomTracks(playlistId) == true) {
			res.send({response: 'New tracks were generated'});
		} else {
			res.send({response: 'Failed to generate new tracks'})
		}
	} else {
		res.send({response: 'This room was not found'});
	}
});

app.get('/instance/update', async function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	let instance = getInstanceById(req.query.id);

	if (instance != null) {
		res.send(await instance.update());
	} else {
		res.send({response: 'This room was not found'});
	}
});

app.get('/instance/checkToken', async function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	let instance = getInstanceById(req.query.id);

	if (instance != null) {
		res.send(await instance.checkToken(req.query.token));
	} else {
		res.send({response: 'This room was not found'});
	}
});


let port = process.env.PORT || 8888;
console.log(`Listening on port ${port}. Go /login to initiate authentication flow.`);
app.listen(port);
