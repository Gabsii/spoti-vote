const fetch = require('cross-fetch');
const { URLSearchParams } = require('url');
const _ = require('lodash');
const lib = require('../lib.js');
const Host = require('./host.js');

/**
 * Return a randomly generated string with a specified length, based on the possible symbols
 *
 * @author: agustinhaller
 * @param {int} length The length of the string
 * @return {string} The random string
 */
function makeid(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; //All possible symbols
    for (let i = 0; i < length; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

module.exports = class Room {
    constructor(host) {
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
        } while (Room.getById(this.id));
    }

    static castToRoom(obj) {
        let room = new Room();
        Object.assign(room, obj);
        room.host = Host.castToHost(room.host);
        return room;
    }

    static list = [];

    /**
     * Return the room with the same id
     *
     * @author: Michiocre
     * @param {string} id The id
     * @return {Room} The room object with the id of the parameter
     */
    static getById(id) {
        for (const room of this.list) {
            if (room.id === id) {
                return room;
            }
        }
        return null;
    }

    /**
     * Return the room with the same host id
     *
     * @author: Michiocre
     * @param {Host} host The host object
     * @return {Room} The room object with the id of the parameter
     */
    static getByHost(host) {
        for (const room of this.list) {
            if (room.host.id === host.id) {
                return room;
            }
        }
        return null;
    }

    getConnectedUser() {
        return this.connectedUser.map((user) => {
            if (user.timer < 3) {
                return {
                    name: user.name,
                    voted: user.voted,
                };
            }
        });
    }

    compressArtistNames(track) {
        if (track) {
            let artists = [];
            track.artists.forEach((artist) => {
                artists.push(artist.name);
            });
            return {
                name: track.name,
                id: track.id,
                artists: artists,
                img: track.album.images[0].url,
                votes: track.votes,
            };
        } else {
            return null;
        }
    }

    getTrack(track) {
        if (track) {
            let artists = [];
            track.artists.forEach((artist) => {
                artists.push(artist.name);
            });
            return {
                name: track.name,
                id: track.id,
                artists: artists,
                img: track.album.images[0].url,
                votes: track.votes,
            };
        } else {
            return null;
        }
    }

    getData(isHost, user) {
        let data = {};
        data.roomId = this.id;
        data.isHost = isHost;
        data.connectedUser = this.getConnectedUser();
        data.host = {
            img: this.host.img,
            name: this.host.name,
            voted: this.host.voted,
        };
        data.activeTracks = [];
        if (this.activeTracks && this.activeTracks.length > 0) {
            this.activeTracks.forEach((track) => {
                data.activeTracks.push(this.getTrack(track));
            });
        }
        data.activePlaylist = null;
        if (this.activePlaylist) {
            data.activePlaylist = {
                name: this.activePlaylist.name,
                playlistUrl: this.activePlaylist.external_urls.spotify,
                playlistImage: this.activePlaylist.images[0].url,
            };
        }
        data.activePlayer = null;
        if (this.activePlayer) {
            data.activePlayer = {
                volume: this.activePlayer.volume,
                timeLeft: this.activePlayer.timeLeft,
                progressMS: this.activePlayer.progressMS,
                progress: this.activePlayer.progress,
                isPlaying: this.activePlayer.isPlaying,
                track: this.getTrack(this.activePlayer.track),
            };
        }
        if (isHost) {
            data.playlists = null;
            if (this.host.playlists) {
                data.playlists = [];
                this.host.playlists.forEach((playlist) => {
                    data.playlists.push({
                        id: playlist.id,
                        name: playlist.name,
                    });
                });
            }
        }

        let diff = lib.getObjectDifference(user.lastUpdate, data);

        user.lastUpdate = data;

        return diff;
    }

    /**
     * Gets a list of all usernames
     *
     * @author: Michiocre
     * @returns: Array of all the names
     */
    getUserNames() {
        return [this.host.name].concat(
            this.connectedUser.map((user) => {
                return user.name;
            })
        );
    }

    /**
     * Returns the user with the given name
     *
     * @author: Michiocre
     * @param {string} name The name that identifies the user
     * @return {object} The user object
     */
    getUserByName(name) {
        if (name === this.host.id) {
            return this.host;
        }
        for (let i = 0; i < this.connectedUser.length; i++) {
            if (this.connectedUser[i].name === name) {
                return this.connectedUser[i];
            }
        }
        return null;
    }

    /**
     * Returns the user with the given token
     *
     * @author: Michiocre
     * @param {string} myToken The token that identifies the user
     * @return {object} The user object
     */
    getUserByToken(myToken) {
        if (myToken === this.host.myToken) {
            return this.host;
        }
        for (let i = 0; i < this.connectedUser.length; i++) {
            if (this.connectedUser[i].myToken === myToken) {
                return this.connectedUser[i];
            }
        }
        return null;
    }

    /**
     * Adds a user to the connectedUser list
     *
     * @author: Michiocre
     * @param {string} name The username that wants to be added
     * @param {string} myToken Token of the user
     */
    addUser(name, myToken) {
        let newUser = {
            myToken: myToken,
            name: name,
            voted: null,
            timer: 0,
            lastUpdate: null,
        };
        this.connectedUser.push(newUser);
        return newUser;
    }

    /**
     * Removes a user from the connectedUser list
     *
     * @author: Michiocre
     * @param {string} name The username that wants to be removed
     */
    removeUser(name) {
        let user = this.getUserByName(name);
        if (user) {
            let i = this.connectedUser.indexOf(user);
            if (i >= 0) {
                if (user.voted && user.voted !== 'reroll') {
                    let track = this.getActiveTrackById(user.voted);
                    track.votes -= 1;
                }
                this.connectedUser.splice(i, 1);
            }
        }
        return user;
    }

    /**
     * Returns the playlist object that corresponse to the given id
     *
     * @author: Michiocre
     * @param {string} playlistId The id that identifies the playlist
     * @return {object} The playlist object
     */
    getPlaylistById(playlistId) {
        for (let i = 0; i < this.host.playlists.length; i++) {
            if (this.host.playlists[i].id === playlistId) {
                return this.host.playlists[i];
            }
        }
        return null;
    }

    /**
     * Changes the active Playlist to the one that was given
     *
     * @author: Michiocre
     * @param {string} playlistId The id that identifies the playlist
     * @return {boolean} True if completed
     */
    async changePlaylist(playlistId) {
        let playlist = this.getPlaylistById(playlistId);

        if (playlist) {
            //Generate 4 new songs if the playlist changed
            if (playlist !== this.activePlaylist) {
                // eslint-disable-next-line no-console
                console.log('INFO-[ROOM: ' + this.id + ']: Playlist changed to [' + playlist.name + '].');
                if (!Array.isArray(playlist.tracks)) {
                    playlist.tracks = await this.host.fetchPlaylistTracks(playlist);
                }

                this.activePlaylist = playlist;
                return this.getRandomTracks(playlist, null);
            }
            return true;
        } else {
            console.error('[ERROR] Playlist: ' + playlistId + ' does not exist');
            return false;
        }
    }

    /**
     * Updates all Playlists if ithey have changed (THIS LOOKS KINDA WRONG)
     *
     * @author: Michiocre
     * @return {boolean} True if completed
     */
    async updatePlaylists() {
        let newPlaylists = await this.host.fetchPlaylists();
        let toBeRemoved = _.cloneDeep(this.host.playlists);

        for (let i = 0; i < newPlaylists.length; i++) {
            let playlist = this.getPlaylistById(newPlaylists[i].id);
            if (playlist) {
                toBeRemoved[this.host.playlists.indexOf(playlist)] = null;
                //LOGIC FOR CHANGING A PLAYLIST
                if (Array.isArray(playlist.tracks) === false) {
                    if (playlist.tracks.total !== newPlaylists[i].tracks.total) {
                        this.host.playlists[this.host.playlists.indexOf(playlist)] = newPlaylists[i];
                        // eslint-disable-next-line no-console
                        console.log('INFO-[ROOM: ' + this.id + ']: Changed Playlist: [' + newPlaylists[i].name + '].');
                    }
                } else {
                    if (playlist.tracks.length !== newPlaylists[i].tracks.total) {
                        this.host.playlists[this.host.playlists.indexOf(playlist)] = newPlaylists[i];
                        // eslint-disable-next-line no-console
                        console.log('INFO-[ROOM: ' + this.id + ']: Changed Playlist: [' + newPlaylists[i].name + '].');
                    }
                }
            } else {
                this.host.playlists.push(newPlaylists[i]);
                // eslint-disable-next-line no-console
                console.log('INFO-[ROOM: ' + this.id + ']: Added new Playlist: [' + newPlaylists[i].name + '].');
            }
        }
        for (let i = 0; i < toBeRemoved.length; i++) {
            if (toBeRemoved[i]) {
                let playlist = this.getPlaylistById(toBeRemoved[i].id);
                if (playlist.id !== this.activePlaylist.id) {
                    this.host.playlists.splice(this.host.playlists.indexOf(playlist), 1);
                    // eslint-disable-next-line no-console
                    console.log('INFO-[ROOM: ' + this.id + ']: Deleted Playlist: [' + playlist.name + '].');
                }
            }
        }
        return true;
    }

    /**
     * Sets the internal list activeTracks to 4 random selected tracks from a playlist
     *
     * @author: Michiocre
     * @param {string} playlistId The id that identifies the playlist
     * @return {boolean} True if completed
     */
    getRandomTracks(playlist, activeTrack) {
        if (activeTrack) {
            activeTrack = null;
        } else {
            if (this.activePlayer) {
                activeTrack = this.activePlayer.track;
            } else {
                activeTrack = null;
            }
        }

        //Reset all the votes
        let removeUsers = [];
        this.connectedUser.forEach((user) => {
            if (user.voted) {
                user.timer = 0;
            } else {
                user.timer += 1;
            }
            user.voted = null;
        });

        this.host.voted = null;

        removeUsers.forEach((user) => {
            this.connectedUser.splice(this.connectedUser.indexOf(user), 1);
        });

        this.activeTracks.forEach((track) => {
            track.votes = 0;
        });

        let selectedTracks = [];
        for (let i = 0; i < 4; i++) {
            let track;
            let reroll;

            do {
                reroll = false;
                track = playlist.tracks[Math.floor(Math.random() * playlist.tracks.length)].track;
                if (activeTrack) {
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
        console.log(
            'INFO-[ROOM: ' +
                this.id +
                ']: NewTracks: [' +
                selectedTracks[0].name +
                ',' +
                selectedTracks[1].name +
                ',' +
                selectedTracks[2].name +
                ',' +
                selectedTracks[3].name +
                '] have been selected.'
        );

        return true;
    }

    /**
     * Returns the track from activeTracks with the given id
     *
     * @author: Michiocre
     * @param {string} id The id that identifies the track
     * @return {object} The track object
     */
    getActiveTrackById(id) {
        for (let i = 0; i < this.activeTracks.length; i++) {
            if (this.activeTracks[i].id === id) {
                return this.activeTracks[i];
            }
        }
        return null;
    }

    /**
     * Refreshes the Hosts API Token
     *
     * @author: Michiocre
     * @return: boolean if completed successfull
     */
    async refreshToken() {
        // eslint-disable-next-line no-console
        console.log('Before REFRESH:');
        // eslint-disable-next-line no-console
        console.log('  - Access Token: ' + this.host.token);

        let data = {
            grant_type: 'refresh_token',
            refresh_token: this.host.refreshToken,
        };

        let searchParams = new URLSearchParams();
        for (let prop in data) {
            searchParams.set(prop, data[prop]);
        }

        let request;
        try {
            request = await fetch(process.env.SPOTIFY_ADDRESS + '/api/token', {
                method: 'post',
                body: searchParams,
                headers: {
                    Authorization: 'Basic ' + new Buffer(this.host.clientId + ':' + this.host.clientSecret).toString('base64'),
                },
            });
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error('ERROR-[ROOM: ' + this.id + ']: THERE WAS AN ERROR UPDATING THE TOKEN.\n' + e);
        }

        let fetchData;
        try {
            fetchData = await request.json();
        } catch (e) {
            fetchData = null;
        }

        this.host.token = fetchData.access_token;
        // eslint-disable-next-line no-console
        console.log('After REFRESH:');
        // eslint-disable-next-line no-console
        console.log('  - Access Token: ' + this.host.token);
        return true;
    }

    /**
     * Gets the active Player data from the Spotify API
     *
     * @author: Michiocre
     * @return {boolean} True when done
     */
    async update() {
        if (Date.now() - this.lastUpdate < 900) {
            return false;
        }
        this.lastUpdate = Date.now();
        let request;
        try {
            request = await fetch(process.env.SPOTIFY_ADDRESS + '/v1/me/player', {
                headers: {
                    Authorization: 'Bearer ' + this.host.token,
                },
            });
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error('ERROR: [ROOM: ' + this.id + ']: THERE WAS AN ERROR GETTING THE ACTIVE PLAYER.\n' + e);
        }

        let fetchData;
        try {
            fetchData = await request.json();
        } catch (e) {
            fetchData = null;
        }
        this.activePlayer = null;
        if (fetchData) {
            if (fetchData.device && fetchData.item) {
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
                        name: fetchData.item.name,
                    },
                };
            }
        }

        if (this.activePlayer && this.activePlaylist) {
            if (this.activePlayer.timeLeft < 3000 && !this.isChanging) {
                this.isChanging = true;
                await this.play();
            } else if (this.activePlayer.progressMs > 3000 && this.activePlayer.timeLeft > 3000 && this.isChanging) {
                // eslint-disable-next-line no-console
                console.log('INFO-[ROOM: ' + this.id + ']: Reset Cooldown');
                this.isChanging = false;
            }
        }
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
    async vote(trackId, myToken) {
        let user = this.getUserByToken(myToken);

        if (user) {
            user.timer = 0;
            let oldVote = user.voted;
            user.voted = trackId;

            let oldTrack = this.getActiveTrackById(oldVote);
            let newTrack = this.getActiveTrackById(trackId);

            if (oldTrack) {
                if (oldTrack.votes > 0) {
                    oldTrack.votes = oldTrack.votes - 1;
                } else {
                    oldTrack.votes = 0;
                }
            }
            if (newTrack) {
                if (newTrack.votes) {
                    newTrack.votes += 1;
                } else {
                    newTrack.votes = 1;
                }
            }

            if (trackId === 'reroll') {
                if (this.activePlayer) {
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
    }

    /**
     * Plays the most voted track
     *
     * @author: Michiocre
     * @return {boolean} True if the request to the spotify API was successfully changed
     */
    async play() {
        if (!this.activePlayer) {
            return false;
        }
        let track = this.activeTracks[0];

        if (this.activePlaylist) {
            for (let i = 1; i < this.activeTracks.length; i++) {
                if (this.activeTracks[i].votes > track.votes || (track.votes === (null || undefined) && this.activeTracks[i].votes >= 1)) {
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
            console.log('INFO-[ROOM: ' + this.id + ']: [' + track.name + '] is now playing, since it had [' + track.votes + '] votes.');

            let payload = {
                uris: ['spotify:track:' + track.id],
            };

            await fetch(process.env.SPOTIFY_ADDRESS + '/v1/me/player/play', {
                headers: {
                    Authorization: 'Bearer ' + this.host.token,
                },
                method: 'PUT',
                body: JSON.stringify(payload),
            });

            let playlist = this.getPlaylistById(this.activePlaylist.id);
            //Load tracks into Playlist if its empty
            if (!Array.isArray(playlist.tracks)) {
                playlist.tracks = await this.user.fetchPlaylistTracks(playlist);
            }
            return this.getRandomTracks(playlist, track);
        } else {
            await fetch(process.env.SPOTIFY_ADDRESS + '/v1/me/player/next', {
                headers: {
                    Authorization: 'Bearer ' + this.host.token,
                },
                method: 'POST',
            });
        }
        return false;
    }

    /**
     * Rerolls the current selection of votable songs
     *
     * @author: Michiocre
     * @return {boolean} True if new tracks were chosen
     */
    async reroll() {
        if (this.activePlaylist) {
            let track = null;
            if (this.activePlayer) {
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
            console.log('INFO: [ROOM: ' + this.id + ']: Reroll/NoReroll: [' + rerolls + '/' + (this.connectedUser.length + 1 - rerolls) + '].');
            if (rerolls >= (2 * (this.connectedUser.length + 1)) / 3) {
                // eslint-disable-next-line no-console
                console.log('INFO: [ROOM: ' + this.id + ']: Rerolled.');

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
    }

    /**
     * Changes the volume to a given valueW
     *
     * @author: Michiocre
     * @param {int} volume The volume in percent
     * @return {boolean} True if completed
     */
    async changeVolume(volume) {
        await fetch(process.env.SPOTIFY_ADDRESS + '/v1/me/player/volume?volume_percent=' + volume, {
            headers: {
                Authorization: 'Bearer ' + this.host.token,
            },
            method: 'PUT',
        });
        return true;
    }

    /**
     * Pauses and Starts the song.
     *
     * @author: Michiocre
     * @return {boolean} True if swapped
     */
    async togglePlaystate() {
        if (this.activePlayer) {
            if (this.activePlayer.isPlaying) {
                await fetch(process.env.SPOTIFY_ADDRESS + '/v1/me/player/pause', {
                    headers: {
                        Authorization: 'Bearer ' + this.host.token,
                    },
                    method: 'PUT',
                });
                // eslint-disable-next-line no-console
                console.log('INFO-[ROOM: ' + this.id + ']: Song is now Paused');
            } else {
                await fetch(process.env.SPOTIFY_ADDRESS + '/v1/me/player/play', {
                    headers: {
                        Authorization: 'Bearer ' + this.host.token,
                    },
                    method: 'PUT',
                });
                // eslint-disable-next-line no-console
                console.log('INFO-[ROOM: ' + this.id + ']: Song is now Playing');
            }
            return true;
        }
    }
};
