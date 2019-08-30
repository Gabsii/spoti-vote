let server = require('../app').server;
let socket;
let address = 'http://localhost:8888/';
const request = require('supertest');
const socketIoClient = require('socket.io-client')
const ioBack = require('socket.io')(server);
const ioOnConnect = require('../app').ioOnConnect;

ioBack.on('connection', (s) => ioOnConnect(s));

/**
 * Setup WS & HTTP servers
 */
beforeAll((done) => {

    server.listen(8888, () => {
        console.log('Server started on port: ' + server.address().port);
    });
    
    socket = socketIoClient(address, {forceNew: true});
    
    socket.on('connect', () => {
        console.log('Connected.');
        done();
    });
});


/**
 * Setup WS & HTTP servers
 */
afterAll((done) => {
    if(socket.connected) {
        console.log('Disconnecting.');
        socket.disconnect();
    }
    server.close();
    console.log('Server stopped');
    done();
});



describe('Full Backend Test', () => {
    describe('Normal Get Requests', () => {
        test('Get /', (done) => {
            request(server).get('/').then((response) => {
                expect(response.text).toBe('Hello There');
                done();
            });
        });
    });

    describe('Socket Stuff', () => {
        test('First RoomId recieved', (done) => {
            socket.on('roomId', () => {
                done();
            });
        });
        test('Returning Wrong RoomId', (done) => {
            socket.emit('roomId', {
                roomId: 'ABCDE',
                token: '',
                isPhone: false
            });
        });
    });
});