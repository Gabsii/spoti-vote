import express from 'express';
import http from 'http';
import testHandler from './testHandler';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.urlencoded());
const server = http.createServer(app);

let data = testHandler.getTestData();

app.get('/accounts/authorize', (req, res) => {
    if(req.query.response_type === 'code' && req.query.client_id === process.env.SPOTIFY_CLIENT_ID) {
        res.send(req.query.redirect_uri + '?code:' + data.tokens[0]);
    } else {
        res.status(400).send();
    }
});

app.post('/accounts/api/token', (req, res) => {
    if (req.headers.authorization === 'Basic ' + (new Buffer(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))) {
        if(req.body.code) {
            res.status(400).send({
                access_token: "1231293"
            });
        } else {
            res.status(404).send();
        }
    } else {
        res.status(401).send();
    }
});

app.post('/api/v1/me', (req, res) => {
    if (req.headers.authorization === 'Basic ' + (new Buffer(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))) {
        if(req.body.code) {
            res.status(400).send({
                access_token: "1231293"
            });
        } else {
            res.status(404).send();
        }
    } else {
        res.status(401).send();
    }
});

module.exports = {
    server
};