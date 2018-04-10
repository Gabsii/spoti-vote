let method = Room.prototype; //This is used when programming object oriented in js to make everything a bit more organised

const request = require('request');
const fetch = require('node-fetch');

const emptyPlaylist = {
    name: 'Host is changing the playlist',
    img: null
}

/**
* Return a randomly generated string with a specified lenght, based on the possible symbols
*
* @author: agustinhaller
* @param {int} length The lenght of the string
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
function Room(token, rooms) {
    //The host object
    this.host = {
        token: token,
        name: '',
        id: '',
        profileUrl: '',
        voted: null
    };
    this.activeTracks = [];
    this.activePlaylist = [];
    this.connectedUser = [];
    this.id = makeid(5);


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
    console.log('New Room ' + this.id + ' created.');
}

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

    this.host.name = hostRequestData.display_name;
    this.host.id = hostRequestData.id;
    this.host.profileUrl = hostRequestData.external_urls.spotify;

    //Gets all the hosts playlists TODO: This should probably loop (now max 50 playlists will be returned)
    let playlistRequest = await fetch('https://api.spotify.com/v1/me/playlists?limit=50', {
        headers: {
            "Authorization": "Bearer " + this.host.token
        }
    });

    let playlistRequestData = await playlistRequest.json();
    next = playlistRequestData.next;

    this.playlists = playlistRequestData.items;

    while (next != null) {
        let playlistRequest = await fetch(next, {
            headers: {
                "Authorization": "Bearer " + this.host.token
            }
        });

        let playlistRequestData = await playlistRequest.json();
        next = playlistRequestData.next;

        this.playlists = this.playlists.concat(playlistRequestData.items);
    }

    console.log(this.playlists.length);

    for (var i = 0; i < this.playlists.length; i++) {
        this.playlists[i].tracks = [];
    }

    console.log('User ' + this.host.id + ' logged in all data was fetched.');
}

/**
* Returns all the playlists of the host
*
* @author: Michiocre
* @return {array} Array of all the playlist objects
*/
method.getPlaylists = async function() {
    let returnPlaylists = [];
    for (var i = 0; i < this.playlists.length; i++) {
        returnPlaylists[i] = {
            id: this.playlists[i].id,
            name: this.playlists[i].name,
            img: this.playlists[i].images[0].url,
            url: this.playlists[i].external_urls.spotify,
            href: this.playlists[i].href
        };
    }
    return returnPlaylists;
}

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
    return emptyPlaylist;
}

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
}

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
}

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
}

/**
* Sets the internal varible activeTracks to 4 random selected tracks from a playlist
*
* @author: Michiocre
* @param {string} playlistId The id that identifies the playlist
* @return {boolean} True if completed
*/
method.getRandomTracks = async function(playlistId, intern) {
    let playlist = this.getPlaylistById(playlistId);

    if (playlist.tracks.length == 0) {
        let nextTracks = playlist.href + '/tracks?fields=items(track(name%2Chref%2Calbum(images)%2Cartists(name)%2C%20id))%2Cnext%2Coffset%2Ctotal';
        playlist.tracks = await this.loadOneBatch(nextTracks);
    }

    if (playlist.tracks.length < 4) {
        return false;
    }

    if (playlist == this.activePlaylist && intern == false) {
        return false;
    }

    //Reset all the votes
    this.host.voted = null;
    for (var i = 0; i < this.connectedUser.length; i++) {
        this.connectedUser[i].voted = null;
    }

    this.activePlaylist = playlist;
    let indexes = [];

    //To make sure all the indexes are different
    for (var i = 0; i < 4; i++) {
        let counter;
        do {
            counter = 0;
            indexes[i] = Math.floor(Math.random() * playlist.tracks.length);
            for (var j = 0; j < indexes.length; j++) {
                if (indexes[j] == indexes[i] && i != j) {
                    counter++;
                }
            }
        } while (counter > 0);
    }

    let selectedTracks = [];
    for (var i = 0; i < indexes.length; i++) {
        selectedTracks[i] = playlist.tracks[indexes[i]].track;
        selectedTracks[i].votes = 0;
    }
    this.activeTracks = selectedTracks;
    return true;
}

/**
* Returns the necessary data to update the frontend
*
* @author: Michiocre
* @param {boolean} loggedIn True if the user is the host
* @return {object} Object filled with the data
*/
method.update = async function(loggedIn) {
    let state = {};
    let playlistPlaceholder = emptyPlaylist;

    if (this.activePlaylist.id !== undefined) {
        playlistPlaceholder = {
            name: this.activePlaylist.name,
            id: this.activePlaylist.id,
            url: this.activePlaylist.external_urls.spotify,
            img: this.activePlaylist.images[0].url
        }
    }

    state = {
        activePlaylist: playlistPlaceholder,
        activeTracks: this.activeTracks,
        numPlaylists: this.playlists.length,
        connectedUser: this.connectedUser,
        host: {
            name: this.host.name,
            id: this.host.id,
            voted: this.host.voted
        }
    }

    return state;
}

/**
* Checks if a given token is the one that was provided by spotify for this room
*
* @author: Michiocre
* @param {string} token The token that gets sent over from the frontend
* @return {boolean} True if the token match
*/
method.checkToken = async function(token) {
    return token == this.host.token;
}


/**
* Adds a username to the list of connected users
*
* @author: Michiocre
* @param {string} name The username that wants to be added
* @return {boolean} True if the user was added, false if the name already exists
*/
method.connect = async function(name) {
    if (this.getUserByName(name) !== null) {
        return false;
    }

    let newUser = {
        name: name,
        voted: null
    }
    this.connectedUser.push(newUser);
    console.log('New User: ' + name + ' connected');
    return true;
}

/**
* Changes the vote of a user to the specified track
*
* @author: Michiocre
* @param {string} name The username whomst will have his vote changed
* @param {string} trackId The track whomst the user has voted for
* @return {boolean} True if the vote was successfully changed
*/
method.vote = async function(name, trackId, loggedIn) {
    let user = this.getUserByName(name);

    if (loggedIn == 'true') {
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
                oldTrack.votes = oldTrack.votes -1;
            } else {
                oldTrack.votes = 0;
            }
        }

        if (newTrack.votes === undefined) {
            newTrack.votes = 1;
        } else {
            newTrack.votes = newTrack.votes +1;
        }
        return true;
    }
    return false;
}

/**
* PLays the most voted track {{ONLY USED FOR TESTING PURPOSES}}
*
* @author: Michiocre
* @return {boolean} True if the request to the spotify API was successfully changed
*/
method.play = async function() {

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

    //console.log(possibleTracks);

    track = possibleTracks[Math.floor(Math.random() * Math.floor(possibleTracks.length))];

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

    return this.getRandomTracks(this.activePlaylist.id, true);
}

module.exports = Room;
