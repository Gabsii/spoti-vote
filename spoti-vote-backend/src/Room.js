/*jshint esversion: 6, node: true, undef: true, unused: true */
let method = Room.prototype; //This is used when programming object oriented in js to make everything a bit more organised
/*jshint ignore: start */
const request = require('request');
const fetch = require('node-fetch');
const shallowEqual = require('shallow-equals');
const deepEqual = require('deep-equal');
/*jshint ignore: end */
/**
* Return a randomly generated string with a specified length, based on the possible symbols
*
* @author: agustinhaller
* @param {int} length The length of the string
* @return {string} The random string
*/
function makeid(length) {
	let text = "";
	let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; //ALl possible symbols

	for (let i = 0; i < length; i++)
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
function Room(token, room) {
	//The host object
	this.host = {
		token: token,
		name: '',
		id: '',
		profileUrl: '',
		voted: null,
		country: '',
		img: ''
	};
	this.firstConnection = true;
	this.activeTracks = [];
	this.activePlaylist = null;
	this.connectedUser = [];
	this.activePlayer = {};
	this.id = makeid(5);
	this.hostDisconnect = Date.now();
	this.isChanging = false;
	this.isSkipping = false;

	//Makes sure the id is unique
	let counter;
	while (counter > 0) {
		counter = 0;
		for (let i = 0; i < rooms.length; i++) {
			if (rooms[i].id == this.id) {
				counter++;
			}
		}
		if (counter > 0) {
			this.id = makeid(5);
		}
	}
}

method.getDifference = function(oldRoom) {
	let update = {};

	if (oldRoom === null) {
		update.host = {
			name: this.host.name,
			voted: this.host.voted,
			img: this.host.img
		}
		update.activeTracks = [];
		for (var i = 0; i < this.activeTracks.length; i++) {
			update.activeTracks[i] = {
				album: {images: [{url: this.activeTracks[i].album.images[0].url}]},
				id: this.activeTracks[i].id,
				name: this.activeTracks[i].name,
				votes: this.activeTracks[i].votes
			};
			update.activeTracks[i].artists = [];
			for (var j = 0; j < this.activeTracks[i].artists.length; j++) {
				update.activeTracks[i].artists[j] = {
					name: this.activeTracks[i].artists[j].name
				}
			}
		}

		update.activePlaylist = {
			name: 'Host is selecting',
			images: [{url: 'https://via.placeholder.com/152x152'}],
			external_urls: {spotify: ''}
		};
		if (this.activePlaylist !== null) {
			update.activePlaylist = {
				name: this.activePlaylist.name,
				images: [{url: this.activePlaylist.images[0].url}],
				external_urls: {spotify: this.activePlaylist.external_urls.spotify}
			};
		}

		update.connectedUser = this.connectedUser;

		update.activePlayer = {
			progress: 0,
			track: {
				name: 'Spotify isn\'t running',
				album: {images: [{url: 'https://via.placeholder.com/75x75'}]},
				artists: [{name: 'Start Spotify'}]
			}
		};

		if (this.activePlayer !== null && Object.keys(this.activePlayer).length > 0) {
			update.activePlayer = {
				progress: this.activePlayer.progress,
				track: {
					name: this.activePlayer.track.name,
					album: {images: [{url: this.activePlayer.track.album.images[0].url}]},
				}
			};
			update.activePlayer.track.artists = [];
			for (var i = 0; i < this.activePlayer.track.artists.length; i++) {
				update.activePlayer.track.artists[i] = {
						name: this.activePlayer.track.artists[i].name
				};
			}
		}
	} else {
		//update.host = null;
		if (deepEqual(oldRoom.host, this.host) === false) {
			update.host = {
				voted: this.host.voted
			}
		}

		//update.activeTracks = null;
		if (deepEqual(oldRoom.activeTracks, this.activeTracks) === false) {
			update.activeTracks = [];
			for (var i = 0; i < this.activeTracks.length; i++) {
				update.activeTracks[i] = null;
				if (deepEqual(oldRoom.activeTracks[i], this.activeTracks[i]) === false) {
					if (oldRoom.activeTracks[i] !== null && oldRoom.activeTracks[i] !== undefined) {
						if (deepEqual(oldRoom.activeTracks[i].album, this.activeTracks[i].album) === false
						|| deepEqual(oldRoom.activeTracks[i].id, this.activeTracks[i].id) === false
						|| deepEqual(oldRoom.activeTracks[i].name, this.activeTracks[i].name) === false
						|| deepEqual(oldRoom.activeTracks[i].artists, this.activeTracks[i].artists) === false) {
							update.activeTracks[i] = {
								album: {images: [{url: this.activeTracks[i].album.images[0].url}]},
								id: this.activeTracks[i].id,
								name: this.activeTracks[i].name,
								votes: this.activeTracks[i].votes
							};
							update.activeTracks[i].artists = [];
							for (var j = 0; j < this.activeTracks[i].artists.length; j++) {
								update.activeTracks[i].artists[j] = {
									name: this.activeTracks[i].artists[j].name
								}
							}
						} else {
							update.activeTracks[i] = {
								votes: this.activeTracks[i].votes
							};
						}
					} else {
						update.activeTracks[i] = {
							album: {images: [{url: this.activeTracks[i].album.images[0].url}]},
							id: this.activeTracks[i].id,
							name: this.activeTracks[i].name,
							votes: this.activeTracks[i].votes
						};
						update.activeTracks[i].artists = [];
						for (var j = 0; j < this.activeTracks[i].artists.length; j++) {
							update.activeTracks[i].artists[j] = {
								name: this.activeTracks[i].artists[j].name
							}
						}
					}
				}
			}
		}

		//update.activePlaylist = null;
		if (deepEqual(oldRoom.activePlaylist, this.activePlaylist) === false && oldRoom.activePlaylist !== null) {
			if (deepEqual(oldRoom.activePlaylist.name, this.activePlaylist.name) === false) {
				update.activePlaylist = {
					name: 'Host is selecting',
					images: [{url: 'https://via.placeholder.com/152x152'}],
					external_urls: {spotify: ''}
				};
				if (this.activePlaylist !== null) {
					update.activePlaylist = {
						name: this.activePlaylist.name,
						images: [{url: this.activePlaylist.images[0].url}],
						external_urls: {spotify: this.activePlaylist.external_urls.spotify}
					};
				}
			}
		}

		//update.connectedUser = null;
		if (deepEqual(oldRoom.connectedUser, this.connectedUser) === false) {
			update.connectedUser = this.connectedUser;
		}

		//update.activePlayer = null;
		if (deepEqual(oldRoom.activePlayer, this.activePlayer) === false) {
			update.activePlayer = {
				progress: 0,
				track: {
					name: 'Spotify isn\'t running',
					album: {images: [{url: 'https://via.placeholder.com/75x75'}]},
					artists: [{name: 'Start Spotify'}]
				}
			};
			if (this.activePlayer !== null) {
				update.activePlayer = {
					progress: this.activePlayer.progress,
					track: {
						name: this.activePlayer.track.name,
						album: {images: [{url: this.activePlayer.track.album.images[0].url}]},
					}
				};
				update.activePlayer.track.artists = [];
				for (var i = 0; i < this.activePlayer.track.artists.length; i++) {
					update.activePlayer.track.artists[i] = {
							name: this.activePlayer.track.artists[i].name
					};
				}
			}

			if (oldRoom.activePlayer !== null && this.activePlayer !== null) {
				if (deepEqual(oldRoom.activePlayer.track, this.activePlayer.track) === true) {
					update.activePlayer = {
						progress: 0
					};
					if (this.activePlayer !== null) {
						update.activePlayer = {
							progress: this.activePlayer.progress
						};
					}
				}
			}
		}
	}

	if ((update.host === null && update.activeTracks === null && update.activePlaylist === null && update.connectedUser === null && update.activePlayer === null) || Object.keys(update).length === 0) {
		return null;
	}
	return update;
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
	for (let i = 0; i < this.connectedUser.length; i++) {
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
	for (let i = 0; i < this.connectedUser.length; i++) {
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
		if (user.voted !== null && user.voted !== 'skip') {
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
	for (let i = 0; i < this.playlists.length; i++) {
		if (Array.isArray(this.playlists[i].tracks) !== true) {
			if (this.playlists[i].tracks.total > 4) {
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
	for (let i = 0; i < this.playlists.length; i++) {
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
		let nextTracks = playlist.href + '/tracks?fields=items(track(name%2Cis_playable%2Chref%2Calbum(images)%2Cartists(name)%2C%20id))%2Cnext%2Coffset%2Ctotal'; //%2Cmarket='+this.host.country
		playlist.tracks = await this.loadOneBatch(nextTracks);
	}

	//If the playlist is smaller than 5 tracks, it will not change -> Because there has to be one active and 4 voteable tracks
	if (playlist.tracks.length < 5) {
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
	for (let i = 0; i < this.connectedUser.length; i++) {
		this.connectedUser[i].voted = null;
	}
	for (let i = 0; i < this.activeTracks.length; i++) {
		this.activeTracks[i].votes = 0;
	}

	let selectedTracks = [];
	for (let i = 0; i < 4; i++) {
		let track;
		let active;
		do {
			active = false;
			track = playlist.tracks[Math.floor(Math.random() * playlist.tracks.length)].track;

			if (activeTrack !== null && activeTrack !== undefined) {
				if (track.id === activeTrack.id) {
					active = true;
				}
			}
		} while (selectedTracks.includes(track) === true || active === true);
		selectedTracks.push(track);
	}

	this.activeTracks = selectedTracks;

	console.log('INFO-[ROOM: '+this.id+']: NewTracks: [' +selectedTracks[0].name+','+selectedTracks[1].name+','+selectedTracks[2].name+','+selectedTracks[3].name+ '] have been selected.');

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
	for (let i = 0; i < this.activeTracks.length; i++) {
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
* @return: boolean if completed successfull
*/
method.fetchData = async function() {
	let hostRequest = await fetch('https://api.spotify.com/v1/me', {
		headers: {
			"Authorization": "Bearer " + this.host.token
		}
	});
	let hostRequestData = await hostRequest.json();

	if (hostRequestData.error !== undefined){
		return false;
	}

	if (hostRequestData.images[0] !== undefined && hostRequestData.images[0] !== null) {
		this.host.img = hostRequestData.images[0].url;
	}

	this.host.name = hostRequestData.display_name || hostRequestData.id;
	this.host.id = hostRequestData.id;
	this.host.profileUrl = hostRequestData.external_urls.spotify;
	this.host.country = hostRequestData.country;

	let playlistRequest = await fetch('https://api.spotify.com/v1/me/playlists?limit=50', {
		headers: {
			"Authorization": "Bearer " + this.host.token
		}
	});

	let playlistRequestData = await playlistRequest.json();
	next = playlistRequestData.next;

	for (let i = 0; i < playlistRequestData.items.length; i++) {
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
	return true;
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
	let request;
	try {
		request = await fetch('https://api.spotify.com/v1/me/player', {
	        headers: {
	            "Authorization": "Bearer " + this.host.token
	        }
	    });
	} catch (e) {
		console.error('ERROR-[ROOM: '+this.id+']: THERE WAS AN ERROR GETTING THE ACTIVE PLAYER.');
	}


	let fetchData;
	try {
		fetchData = await request.json();
	} catch (e) {
		fetchData = null;
	}

	this.activePlayer = null;
	if (fetchData !== null) {
		if (fetchData.device !== undefined && fetchData.item !== undefined && fetchData.item !== null) {
			this.activePlayer = {
				volume: fetchData.device.volume_percent,
				progress: (Math.round((fetchData.progress_ms / fetchData.item.duration_ms) * 100.0 * 1.5)/1.5).toFixed(2),
				isPlaying: fetchData.is_playing,
				track: {
					album: fetchData.item.album,
					artists: fetchData.item.artists,
					href: fetchData.item.href,
					id: fetchData.item.id,
					name: fetchData.item.name
				}
			};
		}
	}

	if (this.activePlayer !== null && this.activePlaylist !== null) {
		if (this.activePlayer.progress > 98 && this.isChanging === false) {
			this.isChanging = true;
			await this.play();
		} else if (this.activePlayer.progress > 5 && this.activePlayer.progress < 90 && this.isChanging === true) {
			console.log('INFO-[ROOM: '+this.id+']: Reset Cooldown');
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
method.vote = async function(trackId, isHost, name) {
	let user = this.getUserByName(name);

	if (isHost == true) {
		user = this.host;
	}

	if (user !== null && user !== undefined) {
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
		if (newTrack !== null) {
			if (newTrack.votes === undefined) {
				newTrack.votes = 1;
			} else {
				newTrack.votes = newTrack.votes + 1;
			}

		}
		if (this.activePlayer != null) {
			if (trackId == 'skip' && this.activePlayer.progress <= 90) { //&& this.isSkipping == false) {
				await this.skip();
			}
		}
		return true;
	}

	return false;
};

/*jshint ignore: start */

/**
* PLays the most voted track
*
* @author: Michiocre
* @return {boolean} True if the request to the spotify API was successfully changed
*/
method.play = async function() {
	let track = this.activeTracks[0];

	for (let i = 1; i < this.activeTracks.length; i++) {
		if (this.activeTracks[i].votes > track.votes || (track.votes == null && this.activeTracks[i].votes >= 1)) {
			track = this.activeTracks[i];
		}
	}

	let possibleTracks = [];

	for (let i = 0; i < this.activeTracks.length; i++) {
		if (this.activeTracks[i].votes == track.votes) {
			possibleTracks.push(this.activeTracks[i]);
		}
	}

	track = possibleTracks[Math.floor(Math.random() * Math.floor(possibleTracks.length))];

	console.log('INFO-[ROOM: '+this.id+']: ['+track.name+'] is now playing, since it had ['+track.votes+'] votes.');

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
};

/**
* PLays the current selection of Tracks
*
* @author: Michiocre
* @return {boolean} True if new tracks were chosen
*/
method.skip = async function() {
	let track = this.activePlayer.track;

	let skips = 0;
	for (var i = 0; i < this.connectedUser.length; i++) {
		if (this.connectedUser[i].voted == 'skip') {
			skips += 1;
		}
	}
	if (this.host.voted == 'skip') {
		skips += 1;
	}

	console.log('INFO-[ROOM: '+this.id+']: Skips/NoSkip: ['+skips+'/'+((this.connectedUser.length+1)-skips)+'].');
	if (skips >= (2 * (this.connectedUser.length+1) / 3)) {
		console.log('INFO-[ROOM: '+this.id+']: Skipped.');
		this.getRandomTracks(this.activePlaylist.id, track);
		return true;
	}
	return false;
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
