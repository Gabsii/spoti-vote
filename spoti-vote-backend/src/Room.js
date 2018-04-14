/*jshint esversion: 6, node: true, undef: true, unused: true */
let method = Room.prototype; //This is used when programming object oriented in js to make everything a bit more organised
/*jshint ignore: start */
const request = require('request');
const fetch = require('node-fetch');
/*jshint ignore: end */
/**
* Return a randomly generated string with a specified length, based on the possible symbols
*
* @author: agustinhaller
* @param {int} length The length of the string
* @return {string} The random string
*/
function makeid(length) {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; //ALl possible symbols

	for (var i = 0; i < length; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}

/**
* Constructor for a new / room
*
* @author: Michiocre
* @constructor
* @param {string} token The access token needed to connect to the spotify API
* @param {string} rooms The list of all rooms, to make sure no duplicate id
* @return {Room} The new room
*/
function Room(token, rooms, cardNum) {
	//The host object
	this.host = {
		token: token,
		name: '',
		profileUrl: '',
		voted: null
	};
	this.cardNum = cardNum;
	this.activeTracks = [];
	this.activePlaylist = null;
	this.connectedUser = [];
	this.activePlayer = {};
	this.id = makeid(5);
	this.hostDisconnect = null;
	this.isChanging = false;

	//Makes sure the id is unique
	let counter;
	while (counter > 0) {
		counter = 0;
		for (var i = 0; i < rooms.length; i++) {
			if (rooms[i].id == this.id) {
				counter++;
			}
		}
		if (counter > 0) {
			this.id = makeid(5);
		}
	}

	console.log('-r - [' + this.id + '] created');
}

/**
* Gets a list of all usernames
*
* @author: Michiocre
* @returns: Array of all the names
*/
method.getUserNames = function() {
	let names = [];
	names.push(this.host.name);
	for (var i = 0; i < this.connectedUser.length; i++) {
		names.push(this.connectedUser[i].name);
	}
	return names;
};

/**
* Returns the user with the given name
*
* @author: Michiocre
* @param {string} name The name that identifies the user
* @return {object} The user object
*/
method.getUserByName = function(name) {
	for (var i = 0; i < this.connectedUser.length; i++) {
		if (this.connectedUser[i].name == name)
			return this.connectedUser[i];
		}
	return null;
};

/**
* Adds a user to the connectedUser list
*
* @author: Michiocre
* @param {string} name The username that wants to be added
*/
method.addUser = function(name) {
	this.connectedUser.push({
		name: name,
		voted: null
	});
};

/**
* Removes a user from the connectedUser list
*
* @author: Michiocre
* @param {string} name The username that wants to be removed
*/
method.removeUser = function(name) {
	let user = this.getUserByName(name);
	let i = this.connectedUser.indexOf(user);
	if (i >= 0) {
		if (user.voted !== null) {
			let track = this.getActiveTrackById(user.voted);
			track.votes -= 1;
		}
		this.connectedUser.splice(i,1);
	}
};

/**
* Returns all the playlists of the host
*
* @author: Michiocre
* @return {array} Array of all the playlist objects
*/
method.getPlaylists = function() {
	let returnPlaylists = [];
	for (var i = 0; i < this.playlists.length; i++) {
		if (Array.isArray(this.playlists[i].tracks) !== true) {
			if (this.playlists[i].tracks.total > this.cardNum) {
				returnPlaylists.push({
					id: this.playlists[i].id,
					name: this.playlists[i].name
				});
				this.playlists[i].tracks = [];
			}
		} else {
			returnPlaylists.push({
				id: this.playlists[i].id,
				name: this.playlists[i].name
			});
		}

	}
	return returnPlaylists;
};

/**
* Returns the playlist object that corresponse to the given id
*
* @author: Michiocre
* @param {string} playlistId The id that identifies the playlist
* @return {object} The playlist object
*/
method.getPlaylistById = function(playlistId) {
	for (var i = 0; i < this.playlists.length; i++) {
		if (this.playlists[i].id == playlistId)
			return this.playlists[i];
		}
	return null;
};

/*jshint ignore: start */

/**
* Changes the active Playlist to the one that was given
*
* @author: Michiocre
* @param {string} playlistId The id that identifies the playlist
* @return {boolean} True if completed
*/
method.changePlaylist = async function(playlistId) {
	let playlist = this.getPlaylistById(playlistId);

		//Load tracks into Playlist if its empty
	if (playlist.tracks.length === 0) {
		let nextTracks = playlist.href + '/tracks?fields=items(track(name%2Chref%2Calbum(images)%2Cartists(name)%2C%20id))%2Cnext%2Coffset%2Ctotal';
		playlist.tracks = await this.loadOneBatch(nextTracks);
	}

	//If the playlist is smaller than 5 tracks, it will not change -> Because there has to be one active and 4 voteable tracks
	if (playlist.tracks.length < this.cardNum+1) {
		return false;
	}

	//Generate 4 new songs if the playlist changed
	if (playlist != this.activePlaylist) {
		await this.getRandomTracks(playlist.id);
	}

	this.activePlaylist = playlist;
	return true;
};

/*jshint ignore: end */

/**
* Sets the internal list activeTracks to 4 random selected tracks from a playlist
*
* @author: Michiocre
* @param {string} playlistId The id that identifies the playlist
* @return {boolean} True if completed
*/
method.getRandomTracks = function(playlistId, activeTrack) {
	let playlist = this.getPlaylistById(playlistId);
	if (activeTrack === null || activeTrack === undefined) {
		if (this.activePlayer !== null) {
			activeTrack = this.activePlayer.track;
		} else {
			activeTrack = null;
		}
	}

	//Reset all the votes
	this.host.voted = null;
	for (var i = 0; i < this.connectedUser.length; i++) {
		this.connectedUser[i].voted = null;
	}
	for (var i = 0; i < this.activeTracks.length; i++) {
		this.activeTracks[i].votes = 0;
	}

	let selectedTracks = [];
	for (var i = 0; i < this.cardNum; i++) {
		let track;
		let active;
		do {
			active = false;
			track = playlist.tracks[Math.floor(Math.random() * playlist.tracks.length)].track;
			if (activeTrack !== null) {
				if (track.id === activeTrack.id) {
					active = true;
				}
			}
		} while (selectedTracks.includes(track) === true || active === true);
		selectedTracks.push(track);
	}

	this.activeTracks = selectedTracks;

	console.log('-rT- [' +selectedTracks[0].name+','+selectedTracks[1].name+','+selectedTracks[2].name+','+selectedTracks[3].name+','+ '] have been selected');
	return true;
};

/**
* Returns the track from activeTracks with the given id
*
* @author: Michiocre
* @param {string} id The id that identifies the track
* @return {object} The track object
*/
method.getActiveTrackById = function(id) {
	for (var i = 0; i < this.activeTracks.length; i++) {
		if (this.activeTracks[i].id == id)
			return this.activeTracks[i];
		}
	return null;
};

/*jshint ignore: start */

/**
* Fetches the data of the host, and all his playlists
*
* @author: Michiocre
*/
method.fetchData = async function() {
	let hostRequest = await fetch('https://api.spotify.com/v1/me', {
		headers: {
			"Authorization": "Bearer " + this.host.token
		}
	});
	let hostRequestData = await hostRequest.json();

	this.host.name = hostRequestData.display_name || hostRequestData.id;
	this.host.profileUrl = hostRequestData.external_urls.spotify;

	//Gets all the hosts playlists TODO: This should probably loop (now max 50 playlists will be returned)
	let playlistRequest = await fetch('https://api.spotify.com/v1/me/playlists?limit=50', {
		headers: {
			"Authorization": "Bearer " + this.host.token
		}
	});

	let playlistRequestData = await playlistRequest.json();
	next = playlistRequestData.next;

	for (var i = 0; i < playlistRequestData.items.length; i++) {
		playlistRequestData.items
	}

	this.playlists = playlistRequestData.items;

	while (next !== null) {
		playlistRequest = await fetch(next, {
			headers: {
				"Authorization": "Bearer " + this.host.token
			}
		});

		playlistRequestData = await playlistRequest.json();
		next = playlistRequestData.next;

		this.playlists = this.playlists.concat(playlistRequestData.items);
	}
};

/**
* Recursive function, in each iteration it will get up to 100 tracks of the playlist, and if there are more to get it will also return the url for the next batch of up to 100 tracks
* Each iteration will return these tracks, and concat the array of tracks with the array of tracks from the next batch. In the end it will return all tracks in the playlist
*
* @author: Michiocre
* @param {string} next URL to the spotify API to get Tracks from a playlist
* @return {array} Array of all the track objects
*/
method.loadOneBatch = async function(next) {
	let request = await fetch(next, {
		headers: {
			"Authorization": "Bearer " + this.host.token
		}
	});
	let fetchData = await request.json();
	next = fetchData.next;

	if (next !== null) {
		let prevTracks = await this.loadOneBatch(next);
		tracks = fetchData.items.concat(prevTracks);
	} else {
		tracks = fetchData.items;
	}
	return tracks;
};

/**
* Gets the active Player data from the Spotify API
*
* @author: Michiocre
* @return {boolean} True when done
*/
method.update = async function(isHost) {
	this.lastUpdate = Date.now();

    let request = await fetch('https://api.spotify.com/v1/me/player', {
        headers: {
            "Authorization": "Bearer " + this.host.token
        }
    });
	let fetchData
	try {
		fetchData = await request.json();
	} catch (e) {
		fetchData = null;
	}

	if (fetchData !== null) {
		if (fetchData.device !== undefined && fetchData.item !== undefined) {
			this.activePlayer = {
				volume: fetchData.device.volume_percent,
				progress: ((fetchData.progress_ms / fetchData.item.duration_ms) * 100.0),
				isPlaying: fetchData.is_playing,
				track: {
					album: fetchData.item.album,
					artists: fetchData.item.artists,
					href: fetchData.item.href,
					id: fetchData.item.id,
					name: fetchData.item.name
				}
			};
		} else {
			this.activePlayer = {
				volume: this.activePlayer.volume,
				progress: this.activePlayer.progress,
				isPlaying: fetchData.is_playing,
				track: this.activePlayer.track
			};
		}
	} else {
		this.activePlayer = null;
	}

	if (this.activePlayer !== null && this.activePlaylist !== null) {
		if (this.activePlayer.progress > 98) {
			await this.play();
			this.isChanging = false;
		}
	}
    return true;
};

/*jshint ignore: end */

/**
* Changes the vote of a user to the specified track
*
* @author: Michiocre
* @param {string} name The username whomst will have his vote changed
* @param {string} trackId The track whomst the user has voted for
* @return {boolean} True if the vote was successfully changed
*/
method.vote = function(trackId, isHost, name) {
	let user = this.getUserByName(name);

	if (isHost == true) {
		user = this.host;
	}

	if (user === undefined) {
		user = null;
	}

	if (user !== null) {
		let oldVote = user.voted;
		user.voted = trackId;

		let oldTrack = this.getActiveTrackById(oldVote);
		let newTrack = this.getActiveTrackById(trackId);

		if (oldTrack !== null) {
			if (oldTrack.votes > 0) {
				oldTrack.votes = oldTrack.votes - 1;
			} else {
				oldTrack.votes = 0;
			}
		}

		if (newTrack.votes === undefined) {
			newTrack.votes = 1;
		} else {
			newTrack.votes = newTrack.votes + 1;
		}
		return true;
	}
	return false;
};

/*jshint ignore: start */

/**
* PLays the most voted track {{ONLY USED FOR TESTING PURPOSES}}
* Use this in combination with Postman or something, since it isnt called from the frontedn
*
* @author: Michiocre
* @return {boolean} True if the request to the spotify API was successfully changed
*/
method.play = async function() {
	if (this.isChanging === false) {
		this.isChanging = true;
		let track = this.activeTracks[0];

		for (var i = 1; i < this.activeTracks.length; i++) {
			if (this.activeTracks[i].votes > track.votes || (track.votes == null && this.activeTracks[i].votes >= 1)) {
				track = this.activeTracks[i];
			}
		}

		let possibleTracks = [];

		for (var i = 0; i < this.activeTracks.length; i++) {
			if (this.activeTracks[i].votes == track.votes) {
				possibleTracks.push(this.activeTracks[i]);
			}
		}

		track = possibleTracks[Math.floor(Math.random() * Math.floor(possibleTracks.length))];

		console.log('-pl- ['+track.name+'] has been selected, since it had ['+track.votes+'] votes');

		let payload = {
			uris: ['spotify:track:' + track.id]
		};


		let request = await fetch('https://api.spotify.com/v1/me/player/play', {
			headers: {
				"Authorization": "Bearer " + this.host.token
			},
			method: "PUT",
			body: JSON.stringify(payload)
		});

		return this.getRandomTracks(this.activePlaylist.id, track);
	}
};

/**
* Changes the volume to a given value
*
* @author: Michiocre
* @param {int} volume The volume in percent
* @return {boolean} True if completed
*/
method.changeVolume = async function(volume) {
	let request = await fetch('https://api.spotify.com/v1/me/player/volume?volume_percent=' + volume,{
		headers: {
			"Authorization": "Bearer " + this.host.token
		},
		method: "PUT"
	});
	return true;
};

/*jshint ignore: end */

module.exports = Room;
