import fetch from 'node-fetch';
import testHandler from './testHandler';
import handler from '../handler/handler';

//Set testing enviroment
process.env.ENV = 'jest';

//Prepare simulated api and variables
let spotifyServer = require('./testingSpotifyApi').server;
let testServer = require('./testServer').getServer([
    {name: '/api/login', func: require('../api/login')},
    {name: '/api/callback', func: require('../api/callback')}
]);
let backendPort = 8888;
let spotifyPort = 8001;

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
});

async function api(url, ...params) {
    try {
        return await (await fetch(url, ...params)).json();
    } catch (error) {
        return await (await fetch(url, ...params)).text();
    }
}