const request = require('supertest');
const socketIoClient = require('socket.io-client');
const socketIo = require('socket.io');
const App = require('../Classes/App').App;

let spotifyServer = require('../testHelper/spotifyServer').server;

let secTillDelete = 60;
let env = {
    backendPort: '8888',
    frontendPort: '80',
    ipAddress: 'localhost',
};


let spotifyAccountAddress = 'http://localhost:8889';
let spotifyApiAddress = 'http://localhost:8889/api';
let Application = new App(false, env, secTillDelete, spotifyAccountAddress, spotifyApiAddress);

let ioBack = socketIo(Application.server);

let socket;
let address = 'http://localhost:8888/';

ioBack.on('connection', (s) => Application.socketCall(s));

/**
 * Setup HTTP servers
 */
beforeAll((done) => {
    spotifyServer.listen(8889, () => {
    });

    Application.server.listen(8888, () => {

    });
    done();
});

/**
 * Close HTTP servers
 */
afterAll((done) => {
    Application.server.close();
    spotifyServer.close();
    done();
});

describe('Full Backend Test', () => {
    describe('Http Calls', () => {

        afterAll( () => {
            Application.rooms = [];
            Application.users = [];
        });

        describe('Get / Method', () => {
            test('It should respond with a little greeting', (done) =>  {
                request(Application.server)
                    .get('/')
                    .then((response) => {
                        expect(response.statusCode).toBe(200);
                        expect(response.headers['content-type']).toBe('text/html; charset=utf-8');
                        expect(response.text).toBe('Hello There');
                        done();
                    });
            });
        });
    
        describe('Get /login Method', () => {
            test('It should respond with a error Message', (done) =>  {
                request(Application.server)
                    .get('/login')
                    .then((response) => {
                        expect(response.statusCode).toBe(400);
                        expect(response.headers['content-type']).toBe('text/html; charset=utf-8');
                        expect(response.text).toBe('Login from the main page.');
                        done();
                    });
            });

            test('It should respond with a redirect', (done) =>  {
                request(Application.server)
                    .get('/login')
                    .set('referer', 'test')
                    .then((response) => {
                        expect(response.statusCode).toBe(302);
                        expect(response.headers['content-type']).toBe('text/plain; charset=utf-8');
                        done();
                    });
            });
        });

        describe('Get /callback Method', () => {
            test('Will create a User and redirects to Dashboard(1)', (done) =>  {
                request(Application.server)
                    .get('/callback')
                    .query({code: '1'})
                    .then((response) => {
                        expect(response.statusCode).toBe(302);
                        expect(response.headers['content-type']).toBe('text/plain; charset=utf-8');
                        expect(response.headers['location']).toBe('/dashboard?token=1');

                        expect(Application.users[0].name).toBe('jest');
                        done();
                    });
            });
            test('Will create a User and redirects to Dashboard(2)', (done) =>  {
                request(Application.server)
                    .get('/callback')
                    .query({code: '2'})
                    .then((response) => {
                        expect(response.statusCode).toBe(302);
                        expect(response.headers['content-type']).toBe('text/plain; charset=utf-8');
                        expect(response.headers['location']).toBe('/dashboard?token=2');

                        expect(Application.users[1].name).toBe('yagnesh');
                        done();
                    });
            });
            test('Will create a User and redirects to Dashboard(3)', (done) =>  {
                request(Application.server)
                    .get('/callback')
                    .query({code: '3'})
                    .then((response) => {
                        expect(response.statusCode).toBe(302);
                        expect(response.headers['content-type']).toBe('text/plain; charset=utf-8');
                        expect(response.headers['location']).toBe('/dashboard?token=3');

                        expect(Application.users[2].name).toBe('bruh');
                        done();
                    });
            });

            test('Will not work when no code is given', (done) =>  {
                request(Application.server)
                    .get('/callback')
                    .then((response) => {
                        expect(response.statusCode).toBe(400);
                        expect(response.headers['content-type']).not.toBeDefined();
                        expect(response.headers['location']).not.toBeDefined();
                        expect(Application.users[3]).not.toBeDefined();
                        done();
                    });
            });
        });

        describe('Get /createRoom Method', () => {
            test('Will create a Room and redirects to it(1)', (done) =>  {
                request(Application.server)
                    .get('/createRoom')
                    .query({id: 'jest_id'})
                    .then((response) => {
                        expect(response.statusCode).toBe(302);
                        expect(response.headers['content-type']).toBe('text/plain; charset=utf-8');

                        expect(Application.rooms[0]).toBeDefined();
                        done();
                    });
            });

            test('Will create a Room and redirects to it(2)', (done) =>  {
                request(Application.server)
                    .get('/createRoom')
                    .query({id: 'yagnesh_id'})
                    .then((response) => {
                        expect(response.statusCode).toBe(302);
                        expect(response.headers['content-type']).toBe('text/plain; charset=utf-8');

                        expect(Application.rooms[1]).toBeDefined();
                        done();
                    });
            });

            test('Will create a Room and redirects to it(3)', (done) =>  {
                request(Application.server)
                    .get('/createRoom')
                    .query({id: 'bruh_id'})
                    .then((response) => {
                        expect(response.statusCode).toBe(302);
                        expect(response.headers['content-type']).toBe('text/plain; charset=utf-8');

                        expect(Application.rooms[2]).toBeDefined();
                        done();
                    });
            });

            test('Will not work when no user id is given', (done) =>  {
                request(Application.server)
                    .get('/createRoom')
                    .then((response) => {
                        expect(response.statusCode).toBe(400);
                        expect(response.headers['content-type']).not.toBeDefined();

                        expect(Application.rooms[3]).not.toBeDefined();
                        done();
                    });
            });
        });

        describe('Get /rooms Method', () => {
            test('It should respond with a list of all rooms', (done) =>  {
                request(Application.server)
                    .get('/rooms')
                    .then((response) => {
                        expect(response.statusCode).toBe(200);
                        expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
                        expect(response.body[0].roomHost).toBe('jest');
                        expect(response.body[1].roomHost).toBe('yagnesh');
                        expect(response.body[2].roomHost).toBe('bruh');
                        done();
                    });
            });
        });
    });

    describe('Socket Connection', () => {
        let user;
        let room;

        beforeEach( (done) => {
            user = Application.addUser('1', '', 'jest', 'jest_id');
            room = Application.addRoom(user);
            socket = socketIoClient(address, {forceNew: true});
            socket.on('connect', () => {
                done();
            });
        });

        afterEach( (done) => {
            Application.users = [];
            Application.rooms = [];
            if(socket.connected) {
                socket.disconnect();
            }
            done();
        });

        describe('Correct Sequence', () => {
            test('First connection', (done) => {
                socket.on('roomId', () => {
                    socket.emit('roomId', {
                        roomId: room.id,
                        token: user.token,
                        isPhone: false
                    });
                });
                socket.on('initData', (update) => {
                    expect(update).toBeDefined();
                    expect(update.host.name).toBe('jest');
                    done();
                });
                socket.on('errorEvent', (data) => {
                    expect(data.message).toBe('NO ERROR');
                    done();
                });
                socket.on('nameEvent', (data) => {
                    expect(data).toBe('TO NOT HAPPEN');
                    done();
                });
            });
    
            test('Reconnecting', (done) => {
                socket.on('roomId', () => {
                    socket.emit('roomId', {
                        roomId: room.id,
                        token: user.token,
                        isPhone: false
                    });
                });
                socket.on('initData', (update) => {
                    
                    expect(update).toBeDefined();
                    expect(update.host.name).toBe('jest');
                    done();
                });
                socket.on('errorEvent', (data) => {
                    expect(data.message).toBe('NO ERROR');
                    done();
                });
                socket.on('nameEvent', (data) => {
                    expect(data).toBe('TO NOT HAPPEN');
                    done();
                });
            });
            test('First connection to new Room (old not deleted)', (done) => {
                let room2 = Application.addRoom(user);
                socket.on('roomId', () => {
                    socket.emit('roomId', {
                        roomId: room2.id,
                        token: user.token,
                        isPhone: false
                    });
                });
                socket.on('twoRooms', (data) => {
                    expect(data.oldRoom).toBe(room.id);
                    socket.emit('twoRooms', {
                        roomId: room.id,
                        value: true
                    });
                });
                socket.on('initData', (update) => {
                    expect(update).toBeDefined();
                    expect(update.host.name).toBe('jest');
                    done();
                });
                socket.on('errorEvent', (data) => {
                    expect(data.message).toBe('NO ERROR');
                    done();
                });
                socket.on('nameEvent', (data) => {
                    expect(data).toBe('TO NOT HAPPEN');
                    done();
                });
            });    
        });

        describe('Error Sequence', () => {
            test('Connecting to wrong Room', (done) => {
                socket.on('roomId', () => {
                    socket.emit('roomId', {
                        roomId: '',
                        token: '',
                        isPhone: false
                    });
                });
                socket.on('initData', (update) => {
                    expect(update).toBe('TO NOT HAPPEN');
                    done();
                });
                socket.on('errorEvent', (data) => {
                    expect(data.message).toBe('Room has been closed');
                    done();
                });
                socket.on('nameEvent', (data) => {
                    expect(data).toBe('TO NOT HAPPEN');
                    done();
                });
            });
            
            test('Connecting to Room with wrong token', (done) => {
                socket.on('roomId', () => {
                    socket.emit('roomId', {
                        roomId: room.id,
                        token: '1',
                        isPhone: false
                    });
                });
                socket.on('initData', (update) => {
                    expect(update).toBeDefined();
                    expect(update.host.name).toBe('jest');
                    socket.emit('roomId', {
                        roomId: room.id,
                        token: '',
                        isPhone: false
                    });
                });
                socket.on('errorEvent', (data) => {
                    expect(data.message).toBe('NO ERROR');
                    done();
                });
                socket.on('nameEvent', (data) => {
                    expect(data.title).toBe('What is your name?');
                    done();
                });
                socket.on('twoRooms', (data) => {
                    expect(data).toBe('TO NOT HAPPEN');
                    done();
                });
            });
        });
    });
});