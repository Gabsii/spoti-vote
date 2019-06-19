let method = User.prototype; //This is used when programming object oriented in js to make everything a bit more organised

const fetch = require('node-fetch');


/**
* Constructor for a new / room
*
* @author: Michiocre
* @constructor
* @param {string} token The access token needed to connect to the spotify API
* @param {string} rooms The list of all rooms, to make sure no duplicate id
* @return {Room} The new room
*/
function User(token, refreshToken, clientId, clientSecret) {
	this.token = token;
	this.refreshToken = refreshToken;
	this.clientId = clientId;
	this.clientSecret = clientSecret;
	this.name = '';
	this.id = '';
	this.profileUrl = '';
	this.voted = null;
	this.country = '';
	this.img = '';
}

/**
* Fetches the data of the host, and all his playlists
*
* @author: Michiocre
* @return: boolean if completed successfull
*/
method.fetchData = async function() {
	let hostRequest = await fetch('https://api.spotify.com/v1/me', {
		headers: {
			'Authorization': 'Bearer ' + this.token
		}
	});
	let hostRequestData = await hostRequest.json();

	if (hostRequestData.error !== undefined){
		return false;
	}

	if (hostRequestData.images[0] !== undefined && hostRequestData.images[0] !== null) {
		this.img = hostRequestData.images[0].url;
	}

	this.name = hostRequestData.display_name || hostRequestData.id;
	this.id = hostRequestData.id;
	this.profileUrl = hostRequestData.external_urls.spotify;
	this.country = hostRequestData.country;

	this.playlists = await this.fetchPlaylists();

	return true;
};

/**
* Fetches all the playlists of a user
*
* @author: Michiocre
* @return: array All the playlists
*/
method.fetchPlaylists = async function() {
	let playlistRequest = await fetch('https://api.spotify.com/v1/me/playlists?limit=50', {
		headers: {
			'Authorization': 'Bearer ' + this.token
		}
	});

	let playlistRequestData = await playlistRequest.json();
	let next = playlistRequestData.next;

	let playlists = playlistRequestData.items;

	while (next !== null && next !== undefined) {
		playlistRequest = await fetch(next, {
			headers: {
				'Authorization': 'Bearer ' + this.token
			}
		});

		playlistRequestData = await playlistRequest.json();
		next = playlistRequestData.next;

		playlists = playlists.concat(playlistRequestData.items);
	}

	let returnPlaylists = [];

	for (var i = 0; i < playlists.length; i++) {
		if (playlists[i].tracks.total > 5) {
			returnPlaylists.push(playlists[i]);
		}
	}
	return returnPlaylists;
};

method.fetchPlaylistTracks = async function(playlist) {
	let trackRequest = await fetch(playlist.href + '/tracks?market='+this.country+'&fields=items(track(name%2Cis_playable%2Chref%2Calbum(images)%2Cartists(name)%2C%20id))%2Cnext%2Coffset%2Ctotal', {
		headers: {
			'Authorization': 'Bearer ' + this.token
		}
	});

	let trackRequestData = await trackRequest.json();
	let next = trackRequestData.next;

	let tracks = trackRequestData.items;

	console.log("NEXT URL  " + next);

	while (next !== null && next !== undefined) {
		trackRequest = await fetch(next, {
			headers: {
				'Authorization': 'Bearer ' + this.token
			}
		});

		trackRequestData = await trackRequest.json();
		next = trackRequestData.next;

		tracks = tracks.concat(trackRequestData.items);
	}

	let returnTracks = [];
	for (var i = 0; i < tracks.length; i++) {
		if (tracks[i].track.is_playable === true) {
			returnTracks.push(tracks[i]);
		}
	}

	return returnTracks;
};

module.exports = {
	User: User
};
