let method = Room.prototype; //This is used when programming object oriented in js to make everything a bit more organised
const request = require('request');
const fetch = require('node-fetch');
const _ = require('lodash');

const env = require('../env').getEnv();

/**
* Constructor for a new / room
*
* @author: Michiocre
* @constructor
* @param {string} token The access token needed to connect to the spotify API
* @param {string} rooms The list of all rooms, to make sure no duplicate id
* @return {Room} The new room
*/
function Room(host, rooms) {
    this.host = host;
    this.activeTracks = [];
    this.activePlaylist = null;
    this.activePlayer = {};
    this.connectedUser = [];
    this.isChanging = false;
    this.isSkipping = false;
    this.lastUpdate = Date.now();

    //Makes sure the id is unique
    do {
        this.id = makeid(5);
    } while (getRoomById(this.id, rooms) !== null);
}

method.getConnectedUsers = function() {
    let users = [];
    this.connectedUser.forEach(user => {
        if (user.timer < 3) {
            users.push({
                name: user.name,
                voted: user.voted
            });
        }
    });
    return users;
};

method.getTrack = function(track) {
    if (track !== null && track !== undefined) {
        let artists = [];
        track.artists.forEach(artist => {
            artists.push(artist.name);
        });
        return {
            name: track.name,
            id: track.id,
            artists: artists,
            img: track.album.images[0].url,
            votes: track.votes
        };
    } else {
        return null;
    }
    
};

//TODO: Make this more efficient (data-transfer)
method.getData = function (isHost, user) {
    let data = {};
    data.roomId = this.id;
    data.isHost = isHost;
    data.connectedUser = this.getConnectedUsers();
    data.host = {
        img: this.host.img,
        name: this.host.name,
        voted: this.host.voted
    };
    data.activeTracks = [];
    if (this.activeTracks !== null && this.activeTracks !== undefined && this.activeTracks.length > 0) {
        this.activeTracks.forEach(track => {
            data.activeTracks.push(this.getTrack(track)); 
        });
    }
    data.activePlaylist = null;
    if (this.activePlaylist !== null && this.activePlaylist !== undefined) {
        data.activePlaylist = {
            name: this.activePlaylist.name,
            playlistUrl: this.activePlaylist.external_urls.spotify,
            playlistImage: this.activePlaylist.images[0].url
        };
    }
    data.activePlayer = null;
    if (this.activePlayer !== null && this.activePlayer !== undefined) {
        data.activePlayer = {
            volume: this.activePlayer.volume,
            timeLeft: this.activePlayer.timeLeft,
            progressMS: this.activePlayer.progressMS,
            progress: this.activePlayer.progress,
            isPlaying: this.activePlayer.isPlaying,
            track: this.getTrack(this.activePlayer.track)
        };
    }
    if (isHost) {
        data.playlists = null;
        if (this.host.playlists !== null && this.host.playlists !== undefined) {
            data.playlists = [];
            this.host.playlists.forEach(playlist => {
                data.playlists.push({
                    id: playlist.id,
                    name: playlist.name
                });
            });
        }
    }

    let diff = getObjectDifference(user.lastUpdate, data);

    user.lastUpdate = data;

    return diff;
};

function getObjectDifference(oldData, data) {
    if(oldData === null || oldData === undefined) {
        return data;
    }
    let diff = {};
    Object.keys(data).forEach(key => {
        if (data[key] !== null) {
            if (typeof(data[key]) !== 'object' || data[key] === null) {
                if (oldData[key] === null) {
                    diff[key] = data[key];
                } else {
                    if (data[key] !== oldData[key]) {
                        diff[key] = data[key];
                    }
                }
            } else if (Array.isArray(data[key])) {
                if (oldData[key] === null) {
                    diff[key] = data[key];
                } else {
                    let nextData = getObjectDifference(oldData[key], data[key]);
                    if (nextData !== null && nextData !== undefined && Object.entries(nextData).length > 0) {
                        diff[key] = data[key];
                    }
                }
            } else {
                if (oldData[key] === null) {
                    diff[key] = data[key];
                } else {
                    var nextData = getObjectDifference(oldData[key], data[key]);
                    if (nextData !== null && nextData !== undefined && Object.entries(nextData).length > 0) {
                        diff[key] = nextData;
                    }
                }
            }
        }
    });
    return diff;
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
    if (name === this.host.id) {
        return this.host;
    }
    for (let i = 0; i < this.connectedUser.length; i++) {
        if (this.connectedUser[i].name === name) {
            return this.connectedUser[i];
        }
    }
    return null;
};

/**
* Returns the user with the given token
*
* @author: Michiocre
* @param {string} myToken The token that identifies the user
* @return {object} The user object
*/
method.getUserByToken = function(myToken) {
    if (myToken === this.host.myToken) {
        return this.host;
    }
    for (let i = 0; i < this.connectedUser.length; i++) {
        if (this.connectedUser[i].myToken === myToken) {
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
* @param {string} myToken Token of the user
*/
method.addUser = function(name, myToken) {
    let newUser = {
        myToken: myToken,
        name: name,
        voted: null,
        timer: 0,
        lastUpdate: null
    };
    this.connectedUser.push(newUser);
    return newUser;
};

/**
* Removes a user from the connectedUser list
*
* @author: Michiocre
* @param {string} name The username that wants to be removed
*/
method.removeUser = function(name) {
    let user = this.getUserByName(name);
    if (user !== null) {
        let i = this.connectedUser.indexOf(user);
        if (i >= 0) {
            if (user.voted !== null && user.voted !== 'reroll') {
                let track = this.getActiveTrackById(user.voted);
                track.votes -= 1;
            }
            this.connectedUser.splice(i,1);
        }
    }
    return user;
};

/**
* Returns the playlist object that corresponse to the given id
*
* @author: Michiocre
* @param {string} playlistId The id that identifies the playlist
* @return {object} The playlist object
*/
method.getPlaylistById = function(playlistId) {
    for (let i = 0; i < this.host.playlists.length; i++) {
        if (this.host.playlists[i].id === playlistId) {
            return this.host.playlists[i];
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

    if (playlist === null || playlist === undefined) {
        console.error('[ERROR] Playlist: ' + playlistId + ' does not exist');
        return false;
    } else {
        //Generate 4 new songs if the playlist changed
        if (playlist !== this.activePlaylist) {
            // eslint-disable-next-line no-console
            console.log('INFO-[ROOM: '+this.id+']: Playlist changed to ['+playlist.name+'].');
            if (!Array.isArray(playlist.tracks)) {
                playlist.tracks = await this.host.fetchPlaylistTracks(playlist);
            }
            
            this.activePlaylist = playlist;
            return this.getRandomTracks(playlist);
        }
        return true;
    }
};

/**
* Updates all Playlists if ithey have changed (THIS LOOKS KINDA WRONG)
*
* @author: Michiocre
* @return {boolean} True if completed
*/
method.updatePlaylists = async function() {
    let newPlaylists = await this.host.fetchPlaylists();
    let toBeRemoved = _.cloneDeep(this.host.playlists);

    for (let i = 0; i < newPlaylists.length; i++) {
        let playlist = this.getPlaylistById(newPlaylists[i].id);
        if (playlist === null) {
            this.host.playlists.push(newPlaylists[i]);
            // eslint-disable-next-line no-console
            console.log('INFO-[ROOM: '+this.id+']: Added new Playlist: ['+newPlaylists[i].name+'].');
        } else {
            toBeRemoved[this.host.playlists.indexOf(playlist)] = null;
            //LOGIC FOR CHANGING A PLAYLIST
            if (Array.isArray(playlist.tracks) === false) {
                if (playlist.tracks.total !== newPlaylists[i].tracks.total) {
                    this.host.playlists[this.host.playlists.indexOf(playlist)] = newPlaylists[i];
                    // eslint-disable-next-line no-console
                    console.log('INFO-[ROOM: '+this.id+']: Changed Playlist: ['+newPlaylists[i].name+'].');
                }
            } else {
                if (playlist.tracks.length !== newPlaylists[i].tracks.total) {
                    this.host.playlists[this.host.playlists.indexOf(playlist)] = newPlaylists[i];
                    // eslint-disable-next-line no-console
                    console.log('INFO-[ROOM: '+this.id+']: Changed Playlist: ['+newPlaylists[i].name+'].');
                }
            }
        }
    }
    for (let i = 0; i < toBeRemoved.length; i++) {
        if (toBeRemoved[i] !== null) {
            let playlist = this.getPlaylistById(toBeRemoved[i].id);
            if (playlist.id !== this.activePlaylist.id) {
                this.host.playlists.splice(this.host.playlists.indexOf(playlist),1);
                // eslint-disable-next-line no-console
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
method.getRandomTracks = function(playlist, activeTrack) {
    
    if (activeTrack === null || activeTrack === undefined) {
        if (this.activePlayer !== null && this.activePlayer !== undefined) {
            activeTrack = this.activePlayer.track;
        } else {
            activeTrack = null;
        }
    } else {
        activeTrack = null;
    }

    //Reset all the votes
    let removeUsers = [];
    this.connectedUser.forEach(user => {
        if (user.voted === null) {
            user.timer += 1;
        } else {
            user.timer = 0;
        }
        user.voted = null;
    });

    removeUsers.forEach(user => {
        this.connectedUser.splice(this.connectedUser.indexOf(user), 1);
    });

    this.activeTracks.forEach(track => {
        track.votes = 0;
    });

    let selectedTracks = [];
    for (let i = 0; i < 4; i++) {
        let track;
        let reroll;
        
        do {
            reroll = false;
            track = playlist.tracks[Math.floor(Math.random() * playlist.tracks.length)].track;
            if (activeTrack !== null && activeTrack !== undefined) {
                if (track.id === activeTrack.id) {
                    reroll = true;
                }
            }
            if (!reroll) {
                for (let j = 0; j < selectedTracks.length; j++) {
                    if (selectedTracks[j].id === track.id) {
                        reroll = true;
                    }                    
                }
            }
            if (!reroll) {
                for (let j = 0; j < selectedTracks.length; j++) {
                    if (selectedTracks[j].id === track.id) {
                        reroll = true;
                    }                    
                }
            }
        } while (reroll);

        selectedTracks.push(_.cloneDeep(track));
    }

    this.activeTracks = selectedTracks;

    // eslint-disable-next-line no-console
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
        if (this.activeTracks[i].id === id) {
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
    // eslint-disable-next-line no-console
    console.log('Before REFRESH:');
    // eslint-disable-next-line no-console
    console.log('  - Access Token: ' + this.host.token);
    let authOptions = {
        url: env.spotifyAccountAddress + '/api/token',
        form: {
            grant_type: 'refresh_token',
            refresh_token: this.host.refreshToken
        },
        headers: {
            'Authorization': 'Basic ' + (new Buffer(this.host.clientId + ':' + this.host.clientSecret).toString('base64'))
        },
        json: true
    };
    request.post(authOptions, async (error, response, body) => {
        this.host.token = body.access_token;
        // eslint-disable-next-line no-console
        console.log('After REFRESH:');
        // eslint-disable-next-line no-console
        console.log('  - Access Token: ' + this.host.token);
        return true;
    });
};

/**
* Gets the active Player data from the Spotify API
*
* @author: Michiocre
* @return {boolean} True when done
*/
method.update = async function() {
    if (Date.now() - this.lastUpdate < 900) {
        return false;
    }
    this.lastUpdate = Date.now();
    let request;
    try {
        request = await fetch(env.spotifyApiAddress + '/v1/me/player', {
            headers: {
                'Authorization': 'Bearer ' + this.host.token
            }
        });
    } catch (e) {
        // eslint-disable-next-line no-console
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
                progress: Math.round((fetchData.progress_ms / fetchData.item.duration_ms) * 10000) / 100,
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
            // eslint-disable-next-line no-console
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
method.vote = async function(trackId, myToken) {
    let user = this.getUserByToken(myToken);

    if (user !== null && user !== undefined) {
        user.timer = 0;
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

        if (trackId === 'reroll') {
            if (this.activePlayer !== null) {
                if (this.activePlayer.progress <= 90) {
                    await this.reroll();
                }
            } else {
                await this.reroll();
            }
        }

        return true;
    }

    return false;
};

/**
* Plays the most voted track
*
* @author: Michiocre
* @return {boolean} True if the request to the spotify API was successfully changed
*/
method.play = async function() {
    if (this.activePlayer === null || this.activePlayer === undefined) {
        return false;
    }
    let track = this.activeTracks[0];

    if (this.activePlaylist !== undefined && this.activePlaylist !== null) {
        for (let i = 1; i < this.activeTracks.length; i++) {
            if (this.activeTracks[i].votes > track.votes || (track.votes === (null||undefined) && this.activeTracks[i].votes >= 1)) {
                track = this.activeTracks[i];
            }
        }
    
        let possibleTracks = [];
    
        for (let i = 0; i < this.activeTracks.length; i++) {
            if (this.activeTracks[i].votes === track.votes) {
                possibleTracks.push(this.activeTracks[i]);
            }
        }
    
        track = possibleTracks[Math.floor(Math.random() * Math.floor(possibleTracks.length))];
        // eslint-disable-next-line no-console
        console.log('INFO-[ROOM: '+this.id+']: ['+track.name+'] is now playing, since it had ['+track.votes+'] votes.');
    
        let payload = {
            uris: ['spotify:track:' + track.id]
        };
    
        await fetch(env.spotifyApiAddress + '/v1/me/player/play', {
            headers: {
                'Authorization': 'Bearer ' + this.host.token
            },
            method: 'PUT',
            body: JSON.stringify(payload)
        });

        let playlist = this.getPlaylistById(this.activePlaylist.id);
        //Load tracks into Playlist if its empty
        if (!Array.isArray(playlist.tracks)) {
            playlist.tracks = await this.user.fetchPlaylistTracks(playlist);
        }
        return this.getRandomTracks(playlist, track);
    } else {
        await fetch(env.spotifyApiAddress + '/v1/me/player/next', {
            headers: {
                'Authorization': 'Bearer ' + this.host.token
            },
            method: 'POST'
        });
    }
    return false;
};

/**
* Rerolls the current selection of votable songs
*
* @author: Michiocre
* @return {boolean} True if new tracks were chosen
*/
method.reroll = async function() {
    if (this.activePlaylist !== null && this.activePlaylist !== undefined) {
        let track = null;
        if (this.activePlayer !== null && this.activePlayer !== undefined) {
            track = this.activePlayer.track;
        }

        let rerolls = 0;
        for (var i = 0; i < this.connectedUser.length; i++) {
            if (this.connectedUser[i].voted === 'reroll') {
                rerolls += 1;
            }
        }
        if (this.host.voted === 'reroll') {
            rerolls += 1;
        }
        // eslint-disable-next-line no-console
        console.log('INFO-[ROOM: '+this.id+']: Reroll/NoReroll: ['+rerolls+'/'+((this.connectedUser.length+1)-rerolls)+'].');
        if (rerolls >= (2 * (this.connectedUser.length+1) / 3)) {
            // eslint-disable-next-line no-console
            console.log('INFO-[ROOM: '+this.id+']: Rerolled.');
            
            let playlist = this.getPlaylistById(this.activePlaylist.id);
            //Load tracks into Playlist if its empty
            if (!Array.isArray(playlist.tracks)) {
                playlist.tracks = await this.user.fetchPlaylistTracks(playlist);
            }    
            this.getRandomTracks(playlist, track);
            return true;
        }
    }
    return false;
};

/**
* Changes the volume to a given valueW
*
* @author: Michiocre
* @param {int} volume The volume in percent
* @return {boolean} True if completed
*/
method.changeVolume = async function(volume) {
    await fetch(env.spotifyApiAddress + '/v1/me/player/volume?volume_percent=' + volume,{
        headers: {
            'Authorization': 'Bearer ' + this.host.token
        },
        method: 'PUT'
    });
    return true;
};

/**
* Pauses and Starts the song.
*
* @author: Michiocre
* @return {boolean} True if swapped
*/
method.togglePlaystate = async function() {
    if (this.activePlayer !== null && this.activePlayer !== undefined) {
        if (this.activePlayer.isPlaying) {
            await fetch(env.spotifyApiAddress + '/v1/me/player/pause',{
                headers: {
                    'Authorization': 'Bearer ' + this.host.token
                },
                method: 'PUT'
            });
            // eslint-disable-next-line no-console
            console.log('INFO-[ROOM: '+this.id+']: Song is now Paused');
        } else {
            await fetch(env.spotifyApiAddress + '/v1/me/player/play',{
                headers: {
                    'Authorization': 'Bearer ' + this.host.token
                },
                method: 'PUT'
            });
            // eslint-disable-next-line no-console
            console.log('INFO-[ROOM: '+this.id+']: Song is now Playing');
        }
        return true;
    }
};

/**
* Return the room with the specified id
*
* @author: Michiocre
* @param {string} roomId The id that identifies the room
* @param {array} rooms Array of all the rooms
* @return {Room} The room object with the id of the parameter
*/
function getRoomById(roomId, rooms) {
    let room = null;
    for (var i = 0; i < rooms.length; i++) {
        if (rooms[i].id === roomId) {
            room = rooms[i];
            return room;
        }
    }
    return null;
}

/**
* Return the room with the same host id
*
* @author: Michiocre
* @param {string} host The host object
* @param {array} rooms Array of all the rooms
* @return {Room} The room object with the id of the parameter
*/
function getRoomByHost(host, rooms) {
    let room = null;
    for (var i = 0; i < rooms.length; i++) {
        if (rooms[i].host.myToken === host.myToken) {
            room = rooms[i];
            return room;
        }
    }
    return null;
}

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

module.exports = {
    Room: Room,
    makeid: makeid,
    getRoomById: getRoomById,
    getRoomByHost: getRoomByHost,
    getObjectDifference: getObjectDifference
};
