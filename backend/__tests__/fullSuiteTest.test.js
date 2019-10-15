let server = require('../app').server;
let adders = require('../app').functions;
let socket;
let address = 'http://localhost:8888/';
const request = require('supertest');
const socketIoClient = require('socket.io-client');
const ioBack = require('socket.io')(server);
const ioOnConnect = require('../app').ioOnConnect;

let spotifyServer = require('./helpers/spotifyServer').server;

ioBack.on('connection', (s) => ioOnConnect(s));


/**
 * Setup HTTP servers
 */
beforeAll((done) => {
    spotifyServer.listen(8889, () => {
        console.log('Spotify Server startet');
    });

    server.listen(8888, () => {
        console.log('Server started on port: ' + server.address().port);
    });
    done();
});

/**
 * Close HTTP servers
 */
afterAll((done) => {
    server.close();
    spotifyServer.close();
    console.log('Servers stopped');
    done();
});

describe('Full Backend Test', () => {
    describe('Get / Method', () => {
        test('It should responde with a little greeting', (done) =>  {
            request(server).get('/').then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.text).toBe('Hello There');
                done();
            });
        });
    });

    describe('Socket Connection', () => {
        beforeEach( (done) => {
            console.log("Attempting connection")
            socket = socketIoClient(address, {forceNew: true});
            socket.on('connect', () => {
                console.log('Connected.');
                done();
            });
        });

        afterEach( (done) => {
            if(socket.connected) {
                console.log('Disconnecting.');
                socket.disconnect();
            }
            done();
        });

        test('Room does not exist', (done) => {
            socket.on('roomId', () => {
                socket.emit('roomId', {
                    roomId: 'ABCDE',
                    token: '',
                    isPhone: false
                });

                socket.on('errorEvent', (data) => {
                    console.log(data);
                    done();
                });
            });
        });

        test('Room does exist', (done) => {
            let room = adders.addRoom();
            socket.on('roomId', () => {
                socket.emit('roomId', {
                    roomId: room.id,
                    token: '',
                    isPhone: false
                });

                socket.on('errorEvent', (data) => {
                    console.log(data);
                    done();
                });
            });
        });
    });
});