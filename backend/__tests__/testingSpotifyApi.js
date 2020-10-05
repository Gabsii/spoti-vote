import express from 'express';
import http from 'http';
import testHandler from './testHandler';
import handler from '../handler/handler';

const app = express();
const server = http.createServer(app);

let data = testHandler.getTestData();

app.get('/accounts/authorize', (req, res) => {
    handler.log(req.query);
    if(req.query.response_type === 'code' && req.query.client_id === process.env.SPOTIFY_CLIENT_ID) {
        res.send(req.query.redirect_uri + '?code:' + data.tokens[0]);
    } else {
        res.status(400).send();
    }
});

module.exports = {
    server
};