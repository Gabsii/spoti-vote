import fetch from 'node-fetch';
import testHandler from './testHandler';
import handler from '../handler/handler';

let backendPort = 8888;
let spotifyPort = 8001;

//Set testing enviroment
process.env.ENV = 'jest';
process.env.SPOTIFY_CLIENT_ID = 'testingSecret';
process.env.SPOTIFY_CLIENT_SECRET = 'testingSecret';
process.env.PORTBACK = backendPort;
process.env.ADDRESS = 'localhost';

//Prepare simulated api and variables
let spotifyServer = require('./testingSpotifyApi').server;
let testServer = require('./testServer').getServer([
    {name: '/api/login', func: require('../api/login')},
    {name: '/api/callback', func: require('../api/callback')}
]);

let backendUri = 'http://localhost:' + backendPort;

//Clear current data and load testData
testHandler.clearData();
let data = testHandler.getTestData();

beforeAll(() => {
    testServer.listen(backendPort, () => {
        handler.log('TestServer started successfully');
    });
    spotifyServer.listen(spotifyPort, () => {
        handler.log('SpotifyServer started successfully');
    });
});

afterAll(() => {
    testServer.close();
    spotifyServer.close();
});

describe('Full Testsuit', () => {
    describe('/api/login', () => {
        it('Should return a redirect link to spotify auth', async () => {
            expect(await api(backendUri + '/api/login')).toBe(backendUri + '/api/callback?code:' + data.tokens[0]);
        });
    });

    describe('/api/callback', () => {
        it('Should return a redirect link to spotify auth', async () => {
            expect(await api(backendUri + '/api/callback')).toBe('Callback error');
            expect(await api(backendUri + '/api/callback?code=' + data.tokens[0])).toBe();
        });
    });
});

async function api(url, ...params) {
    try {
        return await (await fetch(url, ...params)).json();
    } catch (error) {
        return await (await fetch(url, ...params)).text();
    }
}