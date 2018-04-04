"use strict";

const express = require('express');
const request = require('request');
const querystring = require('querystring');

let app = express();

let ServerInstance = require('./src/ServerInstance');

let redirect_uri = process.env.REDIRECT_URI || 'http://localhost:8888/callback';
let serverInstances = [];

app.get('/login', function(req, res) {
	res.redirect('https://accounts.spotify.com/authorize?' + querystring.stringify({response_type: 'code', client_id: process.env.SPOTIFY_CLIENT_ID, scope: 'user-read-private user-read-email user-read-currently-playing user-modify-playback-state user-read-playback-state playlist-read-collaborative', redirect_uri}));
});

app.get('/callback', function(req, res) {
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
	request.post(authOptions, function(error, response, body) {
		var access_token = body.access_token;
		let uri = process.env.FRONTEND_URI || 'http://localhost:3000/app';

		let instance = new ServerInstance(access_token, serverInstances);
		instance.fetchData();
		serverInstances.push(instance);
		//res.send(instance.id);

		console.log(instance);

		res.redirect(uri + '/' + instance.id);

		//res.redirect(uri + '?access_token=' + access_token);
	});
});

app.get('/instance/playlists', function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	let instanceId = req.query.id;
	let instance = null;
	for (var i = 0; i < serverInstances.length; i++) {
		if (serverInstances[i].id == instanceId)
			instance = serverInstances[i];
	}
	console.log(instance);
	if (instance != null) {
		res.send(instance.getPlaylists());
	} else {
		res.send("Not found");
	}
});

app.get('/instance/host', function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	let instanceId = req.query.id;
	let instance = null;
	for (var i = 0; i < serverInstances.length; i++) {
		if (serverInstances[i].id == instanceId)
			instance = serverInstances[i];
	}
	if (instance != null) {
		res.send(instance.getHostInfo());
	} else {
		res.send("Not found");
	}
});


let port = process.env.PORT || 8888;
console.log(`Listening on port ${port}. Go /login to initiate authentication flow.`);
app.listen(port);
