import express from 'express';
import http from 'http';
import testHandler from './testHandler';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.urlencoded());
const server = http.createServer(app);

let data = testHandler.getTestData();

app.get('/dashboard', (req, res) => {
    res.send(req.query.token);
});

let counter = 0;

app.get('/accounts/authorize', (req, res) => {
    if(req.query.response_type === 'code' && req.query.client_id === process.env.SPOTIFY_CLIENT_ID) {
        //SIMULATION of User input
        switch (counter) {
        case 0:
        case 1:
            res.status(400).send('Declined');
            break;
        case 2:
        case 3:
            res.send(req.query.redirect_uri + '?code:' + Object.keys(data.loginTokens)[0]);
            break;
        case 4:
        case 5:
            res.send(req.query.redirect_uri + '?code:' + Object.keys(data.loginTokens)[1]);
            break;
        default:
            res.status(404).send('NOTHING HERE');
            break;
        }
        counter++;
    } else {
        counter++;
        res.status(400).send('ERROR');
    }
});

app.post('/accounts/api/token', (req, res) => {
    if (req.headers.authorization === 'Basic ' + (new Buffer(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))) {
        if(req.body.code !== 'undefined') {
            res.status(200).send({
                access_token: data.loginTokens[req.body.code]
            });
        } else {
            res.status(404).send();
        }
    } else {
        res.status(401).send();
    }
});

app.get('/api/v1/me', (req, res) => {
    if (req.headers.authorization) {
        res.status(200).send(
            data.users[req.headers.authorization.split(' ')[1]].basic
        );
    } else {
        res.status(401).send();
    }
});

app.get('/api/v1/me/top/tracks', (req, res) => {
    if (req.headers.authorization) {
        res.status(200).send(
            data.users[req.headers.authorization.split(' ')[1]].topTracks
        );
    } else {
        res.status(401).send();
    }
});

app.get('/api/v1/me/playlists', (req, res) => {
    if (req.headers.authorization) {
        res.status(200).send(
            data.users[req.headers.authorization.split(' ')[1]].playlists
        );
    } else {
        res.status(401).send();
    }
});

module.exports = {
    server
};