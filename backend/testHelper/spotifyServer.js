const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

app.use(express.urlencoded());

app.get('/', (req, res) => {
    res.send('Hello There');
});

app.get('/autherize', (req, res) => {
    res.send('Test');
});

app.get('/api/v1/me', (req, res) => {
    let token = req.headers.authorization.split(' ')[1];
    let response;
    switch (token) {
    case '1':
        response = {
            images: [],
            display_name: 'jest',
            id: 'jest_id',
            external_urls: {
                spotify: 'http:localhost:8889/jest'
            },
            country: 'Yes'
        };
        break;
    case '2':
        response = {
            images: [],
            display_name: 'yagnesh',
            id: 'yagnesh_id',
            external_urls: {
                spotify: 'http:localhost:8889/yagnesh'
            },
            country: 'Yes'
        };
        break;
    case '3':
        response = {
            images: [],
            display_name: 'bruh',
            id: 'bruh_id',
            external_urls: {
                spotify: 'http:localhost:8889/bruh'
            },
            country: 'Yes'
        };
        break;

    default:
        break;
    }

    res.send(response);
});

app.get('/api/v1/me/playlists', (req, res) => {
    let response = {

    };
    res.send(response);
});

app.post('/api/token', (req, res) => {
    if (req.body.code === '') {
        res.status(400).send();
    } else {
        res.send({access_token: req.body.code});
    }
});

module.exports = {
    server: server
};