"use strict";
let express = require('express');
let request = require('request');
let querystring = require('querystring');

let app = express();

let redirect_uri = process.env.REDIRECT_URI || 'http://localhost:8888/callback';

let serverInstances = [];

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function ServerInstance(token) {
	let counter = 1;
	this.id = makeid();

	while (counter > 0) {
		counter = 0;
		for (var i = 0; i < serverInstances.length; i++) {
			if (serverInstances[i].id == this.id) {
				counter++;
			}
		}
		if (counter > 0) {
			this.id = makeid();
		}
	}

	this.playlist = null;
	this.currentVotes = [];
	this.votingSongs = [];
	this.currentSong = [];
	this.userToken = null;
	this.token = token;

	this.currentState = null;

	this.getPlaylist = function() {

	}

	this.getPlaylists = function() {

	}
}

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

		let instance = new ServerInstance(access_token);
		serverInstances.push(instance);
		//res.send(instance.id);

		res.redirect(uri + '/' + instance.id);

		console.log(serverInstances);

		//res.redirect(uri + '?access_token=' + access_token);
	});
});



let port = process.env.PORT || 8888;
console.log(`Listening on port ${port}. Go /login to initiate authentication flow.`);
app.listen(port);
