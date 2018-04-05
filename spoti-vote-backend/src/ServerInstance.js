let method = ServerInstance.prototype;
const request = require('request');
const fetch = require('node-fetch');

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function ServerInstance(token, serverInstances) {
    //Gets a Unique ID
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
    //Gets the hosts data from Spotify
    this.host = {};
	this.host.token = token;
}

method.fetchData = function() {
    fetch('https://api.spotify.com/v1/me', {
		headers: {
			"Authorization": "Bearer " + this.host.token
		}
	}).then((response) => response.json().then(data => {
		this.host.name = data.display_name;
		this.host.id = data.id;
		this.host.profileUrl = data.external_urls.spotify;

		if (data.images.length > 0) {
			this.host.image = data.images[0].url;
		} else {
			this.host.image = 'https://openclipart.org/image/2400px/svg_to_png/247324/abstract-user-flat-1.png';
		}
	}));

    //Gets all the hosts playlists
    fetch('https://api.spotify.com/v1/me/playlists?limit=50', {
        headers: {
            "Authorization": "Bearer " + this.host.token
        }
    }).then((response) => response.json().then(data => {
        this.playlists = data.items;
        for (var i = 0; i < this.playlists.length; i++) {
            this.playlists[i].tracks = this.loadSongs(this.playlists[i].id);
        }
    }));

    this.currentVotes = [];
    this.votingSongs = [];
    this.currentSong = [];

    this.user = [];
    this.currentState = 'vote';
}

method.getHostInfo = function() {
    return this.host;
}

method.getPlaylists = function() {
    return this.playlists;
}

method.loadSongs = function(playlistId) {
    tracks = [];
    next = this.props.playlist.href + '/tracks?fields=items(track(name%2Chref%2Calbum(images)%2Cartists(name)%2C%20id))%2Cnext%2Coffset%2Ctotal';
}

method.getVotedSong = function() {

}

method.vote = function() {

}

module.exports = ServerInstance;
