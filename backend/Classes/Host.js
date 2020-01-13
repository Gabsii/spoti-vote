let method = Host.prototype; //This is used when programming object oriented in js to make everything a bit more organised

const fetch = require('node-fetch');

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
function Host(token, refreshToken) {
    this.token = token;
    this.refreshToken = refreshToken;
    this.clientId = env.spotifyClientId;
    this.clientSecret = env.spotifyClientSecret;
    this.name = '';
    this.id = '';
    this.profileUrl = '';
    this.voted = null;
    this.country = '';
    this.img = '';

    this.premium = '';
    this.topTracks = [];
}

method.getData = function() {
    return {
        name: this.name,
        id: this.id,
        img: this.img,
        premium: this.premium,
        topTracks: this.topTracks
    };
};

/**
* Fetches the data of the host, and all his playlists
*
* @author: Michiocre
* @return: boolean if completed successfull
*/
method.fetchData = async function() {
    let request = await fetch(env.spotifyApiAddress + '/v1/me', {
        headers: {
            'Authorization': 'Bearer ' + this.token
        }
    });
    let data = await request.json();

    if (data.error !== undefined){
        return false;
    }

    if (data.images[0] !== undefined && data.images[0] !== null) {
        this.img = data.images[0].url;
    }

    this.name = data.display_name || data.id;
    this.id = data.id;
    this.profileUrl = data.external_urls.spotify;
    this.country = data.country;

    this.premium = data.product;

    this.playlists = await this.fetchPlaylists();
    this.topTracks = await this.fetchTopTracks(10);
    return true;
};

/**
* Fetches all the playlists of a host
*
* @author: Michiocre
* @return: array All the playlists
*/
method.fetchPlaylists = async function() {
    let request = await fetch(env.spotifyApiAddress + '/v1/me/playlists?limit=50', {
        headers: {
            'Authorization': 'Bearer ' + this.token
        }
    });

    let data = await request.json();
    let next = data.next;

    let playlists = data.items;

    while (next !== null && next !== undefined) {
        request = await fetch(next, {
            headers: {
                'Authorization': 'Bearer ' + this.token
            }
        });

        data = await request.json();
        next = data.next;

        playlists = playlists.concat(data.items);
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
};

method.fetchPlaylistTracks = async function(playlist) {
    let request = await fetch(playlist.href + '/tracks?market='+this.country+'&fields=items(track(name%2Cis_playable%2Chref%2Calbum(images)%2Cartists(name)%2C%20id))%2Cnext%2Coffset%2Ctotal', {
        headers: {
            'Authorization': 'Bearer ' + this.token
        }
    });

    let data = await request.json();
    let next = data.next;

    let tracks = data.items;

    while (next !== null && next !== undefined) {
        request = await fetch(next, {
            headers: {
                'Authorization': 'Bearer ' + this.token
            }
        });

        data = await request.json();
        next = data.next;

        tracks = tracks.concat(data.items);
    }

    let returnTracks = [];
    if (tracks !== (null||undefined)) {
        for (var i = 0; i < tracks.length; i++) {
            if (tracks[i].track.is_playable === true) {
                returnTracks.push(tracks[i]);
            }
        }
    }
    return returnTracks;
};

method.fetchTopTracks = async function(amount) {
    let request = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=' + amount, {
        headers: {
            'Authorization': 'Bearer ' + this.token
        }
    });
    let data = await request.json();
    return data.items;
};

/**
* Return the host with the specified id
*
* @author: Michiocre
* @param {string} id The id that identifies the hosz
* @param {array} hosts Array of all the hosts
* @return {Room} The room object with the id of the parameter
*/
function getHostById(id, hosts) {
    let host = null;
    for (var i = 0; i < hosts.length; i++) {
        if (hosts[i].id === id) {
            host = hosts[i];
            return host;
        }
    }
    return null;
}

function getHostByToken(token, hosts) {
    let host = null;
    for (var i = 0; i < hosts.length; i++) {
        if (hosts[i].token === token) {
            host = hosts[i];
            return host;
        }
    }
    return null;
}

module.exports = {
    Host: Host,
    getHostById: getHostById,
    getHostByToken: getHostByToken
};
