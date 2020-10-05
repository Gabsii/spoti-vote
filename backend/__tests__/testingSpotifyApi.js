import express from 'express';
import http from 'http';
import handler from './testHandler';

const app = express();
const server = http.createServer(app);

let data = handler.getTestData();

app.get('/accounts/authorize', (req, res) => {
    if(req.query.response_type === 'code' && req.query.client_id === process.env.SPOTIFY_CLIENT_ID) {
        res.send(req.query.redirect_uri + '?code:' + data.tokens[0]);
    } else {
        res.status(400).send();
    }
});

module.exports = {
    server
};