let method = Room.prototype; //This is used when programming object oriented in js to make everything a bit more organised
const request = require('request');
const fetch = require('node-fetch');
//const shallowEqual = require('shallow-equals');
const deepEqual = require('deep-equal');
const _ = require('lodash');

/**
* Return a randomly generated string with a specified length, based on the possible symbols
*
* @author: agustinhaller
* @param {int} length The length of the string
* @return {string} The random string
*/
function makeid(length) {
	let text = '';
	let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; //ALl possible symbols
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
function Room(user, rooms) {
	//The host object
	this.user = user;
	this.firstConnection = true;
	this.activeTracks = [];
	this.activePlaylist = null;
	this.connectedUser = [];
	this.activePlayer = {};
	this.id = makeid(5);
	this.userDisconnect = Date.now();
	this.isChanging = false;
	this.isSkipping = false;
	this.userPhone = false;

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

/**
* Returns all the changes between the last update and the current state
*
* @author: Michiocre
* @param {Room} oldRoom The old status of the room
* @returns: Changes
*/
method.getDifference = function(oldRoom) {
	let update = {};

	if (oldRoom === null) {
		//THIS IS FOR THE INIT DATA
		update.host = {
			name: this.user.name,
			voted: this.user.voted,
			img: this.user.img
		};
		update.activeTracks = [];
		for (let i = 0; i < this.activeTracks.length; i++) {
			update.activeTracks[i] = {
				album: {images: [{url: this.activeTracks[i].album.images[0].url}]},
				id: this.activeTracks[i].id,
				name: this.activeTracks[i].name,
				votes: this.activeTracks[i].votes
			};
			update.activeTracks[i].artists = [];
			for (let j = 0; j < this.activeTracks[i].artists.length; j++) {
				update.activeTracks[i].artists[j] = {
					name: this.activeTracks[i].artists[j].name
				};
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
			for (let i = 0; i < this.activePlayer.track.artists.length; i++) {
				update.activePlayer.track.artists[i] = {
					name: this.activePlayer.track.artists[i].name
				};
			}
		}

		update.playlists = [];
		for (let i = 0; i < this.user.playlists.length; i++) {
			update.playlists.push({
				name: this.user.playlists[i].name,
				id: this.user.playlists[i].id
			});
		}

	} else {
		//THIS IS FOR AN UPDATE (IF NOTHING ELSE TODO REWORK THIS)
		if (!deepEqual(oldRoom.host, this.user)) {
			update.host = {
				voted: this.user.voted
			};
		}

		if (!deepEqual(oldRoom.activeTracks, this.activeTracks)) {
			update.activeTracks = [];
			for (let i = 0; i < this.activeTracks.length; i++) {
				update.activeTracks[i] = null;
				if (!deepEqual(oldRoom.activeTracks[i], this.activeTracks[i])) {
					if (oldRoom.activeTracks[i] !== null && oldRoom.activeTracks[i] !== undefined) {
						if (!deepEqual(oldRoom.activeTracks[i].album, this.activeTracks[i].album)
						|| !deepEqual(oldRoom.activeTracks[i].id, this.activeTracks[i].id)
						|| !deepEqual(oldRoom.activeTracks[i].name, this.activeTracks[i].name)
						|| !deepEqual(oldRoom.activeTracks[i].artists, this.activeTracks[i].artists)) {
							update.activeTracks[i] = {
								album: {images: [{url: this.activeTracks[i].album.images[0].url}]},
								id: this.activeTracks[i].id,
								name: this.activeTracks[i].name,
								votes: this.activeTracks[i].votes
							};
							update.activeTracks[i].artists = [];
							for (let j = 0; j < this.activeTracks[i].artists.length; j++) {
								update.activeTracks[i].artists[j] = {
									name: this.activeTracks[i].artists[j].name
								};
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
						for (let j = 0; j < this.activeTracks[i].artists.length; j++) {
							update.activeTracks[i].artists[j] = {
								name: this.activeTracks[i].artists[j].name
							};
						}
					}
				}
			}
		}

		if (!deepEqual(oldRoom.activePlaylist, this.activePlaylist)) {
			let oldName = null;
			if (oldRoom.activePlaylist !== null && oldRoom.activePlaylist !== undefined) {
				oldName = oldRoom.activePlaylist.name;
			}
			if (!deepEqual(oldName, this.activePlaylist.name)) {
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

		if (!deepEqual(oldRoom.connectedUser, this.connectedUser)) {
			update.connectedUser = this.connectedUser;
		}

		if (!deepEqual(oldRoom.activePlayer, this.activePlayer)) {
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
				for (let i = 0; i < this.activePlayer.track.artists.length; i++) {
					update.activePlayer.track.artists[i] = {
						name: this.activePlayer.track.artists[i].name
					};
				}
			}

			if (oldRoom.activePlayer !== null && this.activePlayer !== null) {
				if (deepEqual(oldRoom.activePlayer.track, this.activePlayer.track)) {
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

		if (oldRoom.playlists !== null && this.user.playlists !== null) {
			if (!deepEqual(oldRoom.playlists,this.user.playlists)) {
				update.playlists = [];
				for (let i = 0; i < this.user.playlists.length; i++) {
					update.playlists.push({
						name: this.user.playlists[i].name,
						id: this.user.playlists[i].id
					});
				}
			}
		}

	}



	if ((update.host === null && update.activeTracks === null && update.activePlaylist === null && update.connectedUser === null && update.activePlayer === null && update.playlists === null) || Object.keys(update).length === 0) {
		return null;
	}
	return update;
};

/**
* Gets a list of all usernames
*
* @author: Michiocre
* @returns: Array of all the names
*/
method.getUserNames = function() {
	let names = [];
	names.push(this.user.name);
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
		if (this.connectedUser[i].name == name) {
			return this.connectedUser[i];
		}
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
* Returns the playlist object that corresponse to the given id
*
* @author: Michiocre
* @param {string} playlistId The id that identifies the playlist
* @return {object} The playlist object
*/
method.getPlaylistById = function(playlistId) {
	for (let i = 0; i < this.user.playlists.length; i++) {
		if (this.user.playlists[i].id == playlistId) {
			return this.user.playlists[i];
		}
	}
	return null;
};

/**
* Changes the active Playlist to the one that was given
*
* @author: Michiocre
* @param {string} playlistId The id that identifies the playlist
* @return {boolean} True if completed
*/
method.changePlaylist = async function(playlistId) {
	let playlist = this.getPlaylistById(playlistId);

	//Generate 4 new songs if the playlist changed
	if (playlist != this.activePlaylist) {
		await this.getRandomTracks(playlist.id);
	}
	this.activePlaylist = playlist;
	console.log('INFO-[ROOM: '+this.id+']: Playlist changed to ['+playlist.name+'].');
	return true;
};


/**
* Updates all Playlists if ithey have changed (THIS LOOKS KINDA WRONG)
*
* @author: Michiocre
* @return {boolean} True if completed
*/
method.updatePlaylists = async function() {
	let newPlaylists = await this.fetchPlaylists();
	let toBeRemoved = _.cloneDeep(this.user.playlists);

	for (let i = 0; i < newPlaylists.length; i++) {
		let playlist = this.getPlaylistById(newPlaylists[i].id);
		if (playlist === null) {
			this.user.playlists.push(newPlaylists[i]);
			console.log('INFO-[ROOM: '+this.id+']: Added new Playlist: ['+newPlaylists[i].name+'].');
		} else {
			toBeRemoved[this.user.playlists.indexOf(playlist)] = null;
			//LOGIC FOR CHANGING A PLAYLIST
			if (Array.isArray(playlist.tracks) === false) {
				if (playlist.tracks.total !== newPlaylists[i].tracks.total) {
					this.user.playlists[this.user.playlists.indexOf(playlist)] = newPlaylists[i];
					console.log('INFO-[ROOM: '+this.id+']: Changed Playlist: ['+newPlaylists[i].name+'].');
				}
			} else {
				if (playlist.tracks.length !== newPlaylists[i].tracks.total) {
					this.user.playlists[this.user.playlists.indexOf(playlist)] = newPlaylists[i];
					console.log('INFO-[ROOM: '+this.id+']: Changed Playlist: ['+newPlaylists[i].name+'].');
				}
			}
		}
	}
	for (let i = 0; i < toBeRemoved.length; i++) {
		if (toBeRemoved[i] !== null) {
			let playlist = this.getPlaylistById(toBeRemoved[i].id);
			if (playlist.id !== this.activePlaylist.id) {
				this.user.playlists.splice(this.user.playlists.indexOf(playlist),1);
				console.log('INFO-[ROOM: '+this.id+']: Deleted Playlist: ['+playlist.name+'].');
			}
		}
	}
	return true;
};

/**
* Sets the internal list activeTracks to 4 random selected tracks from a playlist
*
* @author: Michiocre
* @param {string} playlistId The id that identifies the playlist
* @return {boolean} True if completed
*/
method.getRandomTracks = async function(playlistId, activeTrack) {
	let playlist = this.getPlaylistById(playlistId);
	//Load tracks into Playlist if its empty
	if (!Array.isArray(playlist.tracks)) {
		playlist.tracks = await this.fetchPlaylistTracks(playlist);
	}

	if (activeTrack === null || activeTrack === undefined) {
		if (this.activePlayer !== null) {
			activeTrack = this.activePlayer.track;
		} else {
			activeTrack = null;
		}
	}

	//Reset all the votes
	this.user.voted = null;
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
		} while (selectedTracks.some(t => t.id === track.id) || active);
		selectedTracks.push(_.cloneDeep(track));
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
		if (this.activeTracks[i].id == id) {
			return this.activeTracks[i];
		}
	}
	return null;
};

/**
* Refreshes the Hosts API Token
*
* @author: Michiocre
* @return: boolean if completed successfull
*/
method.refreshToken = async function() {
	console.log('Before REFRESH:');
	console.log('  - Access Token: ' + this.user.token);
	let authOptions = {
		url: 'https://accounts.spotify.com/api/token',
		form: {
			grant_type: 'refresh_token',
			refresh_token: this.user.refreshToken
		},
		headers: {
			'Authorization': 'Basic ' + (new Buffer(this.user.clientId + ':' + this.user.clientSecret).toString('base64'))
		},
		json: true
	};
	request.post(authOptions, async (error, response, body) => {
		this.user.token = body.access_token;
		console.log('After REFRESH:');
		console.log('  - Access Token: ' + this.user.token);
		return true;
	});
};

/**
* Fetches the data of the host, and all his playlists
*
* @author: Michiocre
* @return: boolean if completed successfull
*/
method.fetchData = async function() {
	let hostRequest = await fetch('https://api.spotify.com/v1/me', {
		headers: {
			'Authorization': 'Bearer ' + this.user.token
		}
	});
	let hostRequestData = await hostRequest.json();

	if (hostRequestData.error !== undefined){
		return false;
	}

	if (hostRequestData.images[0] !== undefined && hostRequestData.images[0] !== null) {
		this.user.img = hostRequestData.images[0].url;
	}

	this.user.name = hostRequestData.display_name || hostRequestData.id;
	this.user.id = hostRequestData.id;
	this.user.profileUrl = hostRequestData.external_urls.spotify;
	this.user.country = hostRequestData.country;

	this.user.playlists = await this.fetchPlaylists();

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
			'Authorization': 'Bearer ' + this.user.token
		}
	});

	let playlistRequestData = await playlistRequest.json();
	let next = playlistRequestData.next;

	let playlists = playlistRequestData.items;

	while (next !== null && next !== undefined) {
		playlistRequest = await fetch(next, {
			headers: {
				'Authorization': 'Bearer ' + this.user.token
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
	let trackRequest = await fetch(playlist.href + '/tracks?market='+this.user.country+'&fields=items(track(name%2Cis_playable%2Chref%2Calbum(images)%2Cartists(name)%2C%20id))%2Cnext%2Coffset%2Ctotal', {
		headers: {
			'Authorization': 'Bearer ' + this.user.token
		}
	});

	let trackRequestData = await trackRequest.json();
	let next = trackRequestData.next;

	let tracks = trackRequestData.items;

	while (next !== null) {
		trackRequest = await fetch(next, {
			headers: {
				'Authorization': 'Bearer ' + this.user.token
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
			'Authorization': 'Bearer ' + this.user.token
		}
	});
	let fetchData = await request.json();
	next = fetchData.next;

	let tracks;
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
method.update = async function() {
	this.lastUpdate = Date.now();
	let request;
	try {
		request = await fetch('https://api.spotify.com/v1/me/player', {
			headers: {
				'Authorization': 'Bearer ' + this.user.token
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
				timeLeft: fetchData.item.duration_ms - fetchData.progress_ms,
				progressMs: fetchData.progress_ms,
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
		if (this.activePlayer.timeLeft < 3000 && !this.isChanging) {
			this.isChanging = true;
			await this.play();
		} else if (this.activePlayer.progressMs > 3000 && this.activePlayer.timeLeft > 3000 && this.isChanging) {
			console.log('INFO-[ROOM: '+this.id+']: Reset Cooldown');
			this.isChanging = false;
		}
	}
	return true;
};

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
		user = this.user;
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

		if (trackId == 'skip') {
			if (this.activePlayer != null) {
				if (this.activePlayer.progress <= 90) {
					await this.skip();
				}
			} else {
				await this.skip();
			}
		}
		return true;
	}

	return false;
};

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

	await fetch('https://api.spotify.com/v1/me/player/play', {
		headers: {
			'Authorization': 'Bearer ' + this.user.token
		},
		method: 'PUT',
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
	if (this.activePlaylist !== null && this.activePlaylist !== undefined) {
		let track = null;
		if (this.activePlayer !== null && this.activePlayer !== undefined) {
			track = this.activePlayer.track;
		}

		let skips = 0;
		for (var i = 0; i < this.connectedUser.length; i++) {
			if (this.connectedUser[i].voted == 'skip') {
				skips += 1;
			}
		}
		if (this.user.voted == 'skip') {
			skips += 1;
		}

		console.log('INFO-[ROOM: '+this.id+']: Skips/NoSkip: ['+skips+'/'+((this.connectedUser.length+1)-skips)+'].');
		if (skips >= (2 * (this.connectedUser.length+1) / 3)) {
			console.log('INFO-[ROOM: '+this.id+']: Skipped.');
			this.getRandomTracks(this.activePlaylist.id, track);
			return true;
		}
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
	await fetch('https://api.spotify.com/v1/me/player/volume?volume_percent=' + volume,{
		headers: {
			'Authorization': 'Bearer ' + this.user.token
		},
		method: 'PUT'
	});
	return true;
};

module.exports = Room;
