import fetch from 'node-fetch';

export default class Host {
    /**
     * Constructor for a new host
     *
     * @author: Michiocre
     * @constructor
     * @param {string} token The access token needed to connect to the spotify API
     * @param {string} refreshToken Refresh token for the spotify API
     * @return {Host} The new host
     */
    constructor(token, refreshToken) {
        this.myToken = Host.createToken(20);
        this.token = token;
        this.refreshToken = refreshToken;
        this.name = '';
        this.id = '';
        this.profileUrl = '';
        this.voted = null;
        this.country = '';
        this.img = '';

        this.premium = false;
        this.topTracks = [];

        this.lastUpdate = null;
    }

    /**
     * Return a randomly generated string with a specified length, based on the possible symbols
     *
     * @author: agustinhaller
     * @param {int} length The length of the string
     * @return {string} The random string
     */
    static createToken(length) {
        let text = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; //All possible symbols
        for (let i = 0; i < length; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }

    static castToHost(obj) {
        let host = new Host();
        Object.assign(host, obj);
        return host;
    }

    static list = [];

    static getByToken(myToken) {
        for (const host of this.list) {
            if (host.myToken === myToken) {
                return host;
            }
        }
        return null;
    }

    /**
     * Return the host with the specified id
     *
     * @author: Michiocre
     * @param {string} id The id that identifies the host
     * @return {Host} The host object with the id of the parameter
     */
    static getById(id) {
        for (const host of this.list) {
            if (host.id === id) {
                return host;
            }
        }
        return null;
    }

    /**
     * Fetches the data of the host, and all his playlists
     *
     * @author: Michiocre
     * @return: boolean if completed successfull
     */
    async fetchData() {
        let request = await fetch('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: 'Bearer ' + this.token,
            },
        });
        let data = await request.json();

        if (data.error) {
            return false;
        }

        if (data.images[0]) {
            this.img = data.images[0].url;
        }

        this.name = data.display_name || data.id;
        this.id = data.id;
        this.profileUrl = data.external_urls.spotify;
        this.country = data.country;

        this.premium = data.product !== 'free' && data.product !== 'open';

        this.playlists = await this.fetchPlaylists();
        this.topTracks = await this.fetchTopTracks(10);
        return true;
    }

    /**
     * Fetches all the playlists of a host
     *
     * @author: Michiocre
     * @return: array All the playlists
     */
    async fetchPlaylists() {
        let playlistRequest = await fetch('https://api.spotify.com/v1/me/playlists?limit=50', {
            headers: {
                Authorization: 'Bearer ' + this.token,
            },
        });

        let playlistRequestData = await playlistRequest.json();
        let next = playlistRequestData.next;

        let playlists = playlistRequestData.items;

        while (next !== null && next !== undefined) {
            playlistRequest = await fetch(next, {
                headers: {
                    Authorization: 'Bearer ' + this.token,
                },
            });

            playlistRequestData = await playlistRequest.json();
            next = playlistRequestData.next;

            playlists = playlists.concat(playlistRequestData.items);
        }

        let returnPlaylists = [];

        if (playlists !== null && playlists !== undefined) {
            for (var i = 0; i < playlists.length; i++) {
                if (playlists[i].tracks.total > 5) {
                    returnPlaylists.push(playlists[i]);
                }
            }
        }
        return returnPlaylists;
    }

    /**
     * Fetches all Tracks of a specified playlist
     *
     * @author: Michiocre
     * @param playlist: The playlist to fetch
     * @return: array of all tracks
     */
    async fetchPlaylistTracks(playlist) {
        let trackRequest = await fetch(
            playlist.href +
                '/tracks?market=' +
                this.country +
                '&fields=items(track(name%2Cis_playable%2Chref%2Calbum(images)%2Cartists(name)%2C%20id))%2Cnext%2Coffset%2Ctotal',
            {
                headers: {
                    Authorization: 'Bearer ' + this.token,
                },
            }
        );

        let trackRequestData = await trackRequest.json();
        let next = trackRequestData.next;

        let tracks = trackRequestData.items;

        while (next !== null && next !== undefined) {
            trackRequest = await fetch(next, {
                headers: {
                    Authorization: 'Bearer ' + this.token,
                },
            });

            trackRequestData = await trackRequest.json();
            next = trackRequestData.next;

            tracks = tracks.concat(trackRequestData.items);
        }

        let returnTracks = [];
        if (tracks !== (null || undefined)) {
            for (var i = 0; i < tracks.length; i++) {
                if (tracks[i].track.is_playable === true) {
                    returnTracks.push(tracks[i]);
                }
            }
        }
        return returnTracks;
    }

    /**
     * Fetches the top tracks of a host
     *
     * @author: Michiocre
     * @param {Number} amount: Amount of tracks to fetch
     * @return: array of amount of tracks
     */
    async fetchTopTracks(amount) {
        let request = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=' + amount, {
            headers: {
                Authorization: 'Bearer ' + this.token,
            },
        });
        let data = await request.json();
        return data.items;
    }
}
