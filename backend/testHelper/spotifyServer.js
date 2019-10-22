const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

let data = require('./data.json');

app.use(express.urlencoded());

app.get('/', (req, res) => {
    res.send('Hello There');
});

app.get('/autherize', (req, res) => {
    res.send('Test');
});

app.get('/api/v1/me', (req, res) => {
    let token = req.headers.authorization.split(' ')[1];

    res.send(data.users[token]);
});

app.get('/api/v1/me/player', (req, res) => {
    let token = req.headers.authorization.split(' ')[1];
    res.send(data.users[token].player);
});

app.put('/api/v1/me/player/pause', (req, res) => {
    let token = req.headers.authorization.split(' ')[1];
    data.users[token].player.is_playing = false;
});

app.put('/api/v1/me/player/play', (req, res) => {
    let token = req.headers.authorization.split(' ')[1];
    if (req.body.uris !== null && req.body.uris !== undefined) {
        let trackId = req.body.uris[0].split(':')[2];
        let track;
        for (let i = 0; i < data.users[token].playlists[0].tracks.items.length; i++) {
            const tracki = data.users[token].playlists[0].tracks.items[i];
            if (tracki.id === trackId) {
                track = tracki;
            } else {
                track = null;
            }
        }
        data.users[token].player.item = track;
    }
    data.users[token].player.is_playing = true;
});

app.get('/api/v1/me/playlists', (req, res) => {
    let token = req.headers.authorization.split(' ')[1];
    let response = {
        items: data.users[token].playlists
    };
    res.send(response);
});

app.get('/v1/playlists/:plId/tracks', (req, res) => {
    let token = req.headers.authorization.split(' ')[1];

    let user = data.users[token];
    let playlist = getPlaylistById(user, req.params.plId);

    let response = {
        items: playlist.tracks.items
    };
    res.send(response);
});



app.put('/v1/me/player/volume', (req, res) => {
    let token = req.headers.authorization.split(' ')[1];
    let volume = req.body.volume;
    data.users[token].player.device.volume_percent = volume;
});

app.post('/api/token', (req, res) => {
    if (req.body.code === '') {
        res.status(400).send();
    } else {
        res.send({access_token: req.body.code});
    }
});

let getUserById = function(id) {
    for (let i = 0; i < data.users.length; i++) {
        const user = data.users[i];
        if (user.id === id) {
            return user;
        }
    }
};
let getPlaylistById = function(user, id) {
    for (let i = 0; i < user.playlists.length; i++) {
        const playlist = user.playlists[i];
        if (playlist.id === id) {
            return playlist;
        }
    }
};


module.exports = {
    server: server
};