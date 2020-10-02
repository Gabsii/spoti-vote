let method = Host.prototype; //This is used when programming object oriented in js to make everything a bit more organised

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
function Host(token, refreshToken, clientId, clientSecret, spotifyApiAddress, spotifyAccountAddress) {
    if (typeof(token) !== 'string' || spotifyApiAddress === undefined) {
        for(var prop in token){
            // for safety you can use the hasOwnProperty function
            this[prop] = token[prop];
        }
    } else {
        this.myToken = createToken(20);
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
    
        this.premium = false;
        this.topTracks = [];
        
        this.lastUpdate = null;
    
        this.spotifyApiAddress = spotifyApiAddress;
        this.spotifyAccountAddress = spotifyAccountAddress;
    }
}

method.getData = function() {
    return {
        name: this.name || this.id,
        myToken: this.myToken,
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
    let request = await fetch(this.spotifyApiAddress + '/v1/me', {
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

    this.premium = (data.product !== 'free' && data.product !== 'open');

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
    let request = await fetch(this.spotifyApiAddress + '/v1/me/playlists?limit=50', {
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

function getHostByToken(myToken, hosts) {
    let host = null;
    for (var i = 0; i < hosts.length; i++) {
        if (hosts[i].myToken === myToken) {
            host = hosts[i];
            return host;
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
function createToken(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; //ALl possible symbols
    for (let i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

module.exports = {
    Host: Host,
    getHostByToken: getHostByToken,
    createToken: createToken
};
