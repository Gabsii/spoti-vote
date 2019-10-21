const request = require('supertest');
const socketIoClient = require('socket.io-client');
const socketIo = require('socket.io');
const App = require('../Classes/App').App;

let spotifyServer = require('../testHelper/spotifyServer').server;

let secTillDelete = 60;
let env = {
    backendPort: '8889',
    frontendPort: '88',
    ipAddress: 'localhost',
    spotifyServerAddress: 'localhost',
    spotifyServerPort: '8890'
};


let spotifyAccountAddress = 'http://' + env.spotifyServerAddress + ':' + env.spotifyServerPort;
let spotifyApiAddress = spotifyAccountAddress + '/api';
let Application = new App(
    false, 
    env, 
    secTillDelete, 
    spotifyAccountAddress, 
    spotifyApiAddress,
    100
);

let ioBack = socketIo(Application.server);

let hostSocket;
let clientSocket;
let address = 'http://' + env.ipAddress + ':' + env.backendPort;

ioBack.on('connection', (s) => Application.socketCall(s));

describe('Full Backend Test', () => {
    
    /**
     * Setup HTTP servers
     */
    beforeAll((done) => {
        spotifyServer.listen(env.spotifyServerPort, () => {
        });

        Application.server.listen(env.backendPort, () => {

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

    describe('Http Calls', () => {

        afterAll( () => {
            Application.users = [];
            Application.rooms = [];
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
                    .query({code: '0'})
                    .then((response) => {
                        expect(response.statusCode).toBe(302);
                        expect(response.headers['content-type']).toBe('text/plain; charset=utf-8');
                        expect(response.headers['location']).toBe('/dashboard?token=0');

                        expect(Application.users[0].name).toBe('jest');
                        done();
                    });
            });
            test('Will create a User and redirects to Dashboard(2)', (done) =>  {
                request(Application.server)
                    .get('/callback')
                    .query({code: '1'})
                    .then((response) => {
                        expect(response.statusCode).toBe(302);
                        expect(response.headers['content-type']).toBe('text/plain; charset=utf-8');
                        expect(response.headers['location']).toBe('/dashboard?token=1');

                        expect(Application.users[1].name).toBe('yagnesh');
                        done();
                    });
            });
            test('Will create a User and redirects to Dashboard(3)', (done) =>  {
                request(Application.server)
                    .get('/callback')
                    .query({code: '2'})
                    .then((response) => {
                        expect(response.statusCode).toBe(302);
                        expect(response.headers['content-type']).toBe('text/plain; charset=utf-8');
                        expect(response.headers['location']).toBe('/dashboard?token=2');

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

    describe('Room creation Tests', () => {
        let user;
        let room;

        beforeEach( (done) => {
            user = Application.addUser('0', '', 'jest', 'jest_id');
            room = Application.addRoom(user);
            hostSocket = socketIoClient(address, {forceNew: true});
            hostSocket.on('connect', () => {
                done();
            });
        });

        afterEach( (done) => {
            Application.users = [];
            Application.rooms = [];
            if(hostSocket.connected) {
                hostSocket.disconnect();
            }
            done();
        });

        describe('Correct Sequence', () => {
            test('First connection', (done) => {
                hostSocket.on('roomId', () => {
                    hostSocket.emit('roomId', {
                        roomId: room.id,
                        token: user.token,
                        isPhone: false
                    });
                });
                hostSocket.on('initData', (update) => {
                    expect(update).toBeDefined();
                    expect(update.host.name).toBe('jest');
                    done();
                });
                hostSocket.on('errorEvent', (data) => {
                    expect(data.message).toBe('NO ERROR');
                    done();
                });
                hostSocket.on('nameEvent', (data) => {
                    expect(data).toBe('TO NOT HAPPEN');
                    done();
                });
            });
    
            test('Reconnecting', (done) => {
                hostSocket.on('roomId', () => {
                    hostSocket.emit('roomId', {
                        roomId: room.id,
                        token: user.token,
                        isPhone: false
                    });
                });
                hostSocket.on('initData', (update) => {
                    
                    expect(update).toBeDefined();
                    expect(update.host.name).toBe('jest');
                    done();
                });
                hostSocket.on('errorEvent', (data) => {
                    expect(data.message).toBe('NO ERROR');
                    done();
                });
                hostSocket.on('nameEvent', (data) => {
                    expect(data).toBe('TO NOT HAPPEN');
                    done();
                });
            });
            test('First connection to new Room (old room will be deleted)', (done) => {
                let room2 = Application.addRoom(user);
                hostSocket.on('roomId', () => {
                    hostSocket.emit('roomId', {
                        roomId: room2.id,
                        token: user.token,
                        isPhone: false
                    });
                });
                hostSocket.on('twoRooms', (data) => {
                    expect(data.oldRoom).toBe(room.id);
                    hostSocket.emit('twoRooms', {
                        roomId: room.id,
                        value: true
                    });
                });
                hostSocket.on('initData', (update) => {
                    expect(update).toBeDefined();
                    expect(update.host.name).toBe('jest');
                    done();
                });
                hostSocket.on('errorEvent', (data) => {
                    expect(data.message).toBe('NO ERROR');
                    done();
                });
                hostSocket.on('nameEvent', (data) => {
                    expect(data).toBe('TO NOT HAPPEN');
                    done();
                });
            });

            test('First connection to new Room (old room will be kept)', (done) => {
                let room2 = Application.addRoom(user);
                hostSocket.on('roomId', () => {
                    hostSocket.emit('roomId', {
                        roomId: room2.id,
                        token: user.token,
                        isPhone: false
                    });
                });
                hostSocket.on('twoRooms', (data) => {
                    expect(data.oldRoom).toBe(room.id);
                    hostSocket.emit('twoRooms', {
                        roomId: room.id,
                        value: false
                    });
                });
                hostSocket.on('initData', (update) => {
                    expect(update).toBe('TO NOT HAPPEN');
                    done();
                });
                hostSocket.on('errorEvent', (data) => {
                    expect(data.message).toBe('Room has been closed');
                    done();
                });
                hostSocket.on('nameEvent', (data) => {
                    expect(data).toBe('TO NOT HAPPEN');
                    done();
                });
            });
        });

        describe('Error Sequence', () => {
            test('Connecting to wrong Room', (done) => {
                hostSocket.on('roomId', () => {
                    hostSocket.emit('roomId', {
                        roomId: '',
                        token: '',
                        isPhone: false
                    });
                });
                hostSocket.on('initData', (update) => {
                    expect(update).toBe('TO NOT HAPPEN');
                    done();
                });
                hostSocket.on('errorEvent', (data) => {
                    expect(data.message).toBe('Room has been closed');
                    done();
                });
                hostSocket.on('nameEvent', (data) => {
                    expect(data).toBe('TO NOT HAPPEN');
                    done();
                });
            });
            
            test('Connecting to Room with wrong token', (done) => {
                hostSocket.on('roomId', () => {
                    hostSocket.emit('roomId', {
                        roomId: room.id,
                        token: '0',
                        isPhone: false
                    });
                });
                hostSocket.on('initData', (update) => {
                    expect(update).toBeDefined();
                    expect(update.host.name).toBe('jest');
                    hostSocket.emit('roomId', {
                        roomId: room.id,
                        token: '',
                        isPhone: false
                    });
                });
                hostSocket.on('errorEvent', (data) => {
                    expect(data.message).toBe('NO ERROR');
                    done();
                });
                hostSocket.on('nameEvent', (data) => {
                    expect(data.title).toBe('What is your name?');
                    done();
                });
                hostSocket.on('twoRooms', (data) => {
                    expect(data).toBe('TO NOT HAPPEN');
                    done();
                });
            });
        });
    });

    describe('Room user joining Tests', () => {
        let user;
        let room;

        beforeAll( (done) => {
            user = Application.addUser('0', '', 'jest', 'jest_id');
            room = Application.addRoom(user);
            hostSocket = socketIoClient(address, {forceNew: true});
            hostSocket.on('connect', () => {
                hostSocket.on('roomId', () => {
                    hostSocket.emit('roomId', {
                        roomId: room.id,
                        token: user.token,
                        isPhone: false
                    });
                });
                hostSocket.on('initData', () => {
                    done();
                });
            });
        });

        afterAll( (done) => {
            Application.users = [];
            Application.rooms = [];
            if(hostSocket.connected) {
                hostSocket.disconnect();
            }
            done();
        });

        beforeEach( (done) => {
            clientSocket = socketIoClient(address, {forceNew: true});
            clientSocket.on('connect', () => {
                done();
            });
        });

        afterEach( (done) => {
            if(clientSocket.connected) {
                clientSocket.disconnect();
            }
            done();
        });
        
        describe('Correct Sequence', () => {
            test('Login into hosted room', (done) => { 
                clientSocket.on('roomId', () => {
                    clientSocket.emit('roomId', {
                        roomId: room.id,
                        token: '',
                        isPhone: false
                    });
                });
                clientSocket.on('nameEvent', () => {
                    clientSocket.emit('nameEvent', {
                        name: 'Michiocre'
                    });
                });
                clientSocket.on('initData', (data) => {
                    expect(data.host.name).toBe('jest');
                    expect(data.connectedUser).toHaveLength(1);
                    done();
                });
            });
        });

        describe('Incorrect Sequence', () => {
            test('Wrong usernames', (done) => { 
                clientSocket.on('roomId', () => {
                    clientSocket.emit('roomId', {
                        roomId: room.id,
                        token: '',
                        isPhone: false
                    });
                });
                clientSocket.on('nameEvent', (data) => {
                    switch (data.title) {
                    case 'What is your name?':
                        clientSocket.emit('nameEvent', {
                            name: 'jest'
                        });
                        break;
                    case 'This name is already taken, enter a different name.':
                        clientSocket.emit('nameEvent', {
                            name: ''
                        });
                        break;
                    case 'This name can´t be emtpy, enter a different name.':
                        clientSocket.emit('nameEvent', {
                            name: 'MichiocreWithaverylongusernameyouknowit'
                        });
                        break;
                    case 'This name is too long, enter a different name.':
                        clientSocket.emit('nameEvent', {
                            name: 'Michi'
                        });
                        break;
                    default:
                        break;
                    }
                    
                });
                clientSocket.on('initData', (data) => {
                    expect(data.host.name).toBe('jest');
                    expect(data.connectedUser).toHaveLength(1);
                    done();
                });
            });
        });
    });

    describe('Room functions Tests', () => {
        let user;
        let room;

        beforeAll( (done) => {
            request(Application.server)
                .get('/callback')
                .query({code: '0'})
                .then((response) => {
                    user = Application.users[0];
                    room = Application.addRoom(user);
                    hostSocket = socketIoClient(address, {forceNew: true});
                    hostSocket.on('roomId', () => {
                        hostSocket.emit('roomId', {
                            roomId: room.id,
                            token: user.token,
                            isPhone: false
                        });
                    });
                    hostSocket.on('initData', (data) => {
                        done();
                    });
                });
        });

        beforeAll( (done) => {
            clientSocket = socketIoClient(address, {forceNew: true});
            clientSocket.on('roomId', () => {
                clientSocket.emit('roomId', {
                    roomId: room.id,
                    token: '',
                    isPhone: false
                });
            });
            clientSocket.on('nameEvent', () => {
                clientSocket.emit('nameEvent', {
                    name: 'Michi'
                });
            });
            clientSocket.on('initData', () => {
                done();
            });
        });

        afterAll( (done) => {
            Application.users = [];
            Application.rooms = [];
            if(hostSocket.connected) {
                hostSocket.disconnect();
            }

            if(clientSocket.connected) {
                clientSocket.disconnect();
            }

            done();
        });
        
        describe('Correct Sequence', () => {
            let lastEvent = '';
            let activeTracks = [];
            test('Update function', (done) => {
                hostSocket.on('update', (data) => {
                    if (lastEvent === '') {
                        expect(data).toBeDefined();
                    }
                    done();
                });
            });
            test('Selecting playlist', (done) => {
                hostSocket.emit('changePlaylist', {
                    playlistId: 'pl123'
                });
                lastEvent = 'changePlaylist';
                hostSocket.on('update', (data) => {
                    if (lastEvent === 'changePlaylist') {
                        activeTracks = data.activeTracks;
                        expect(data.host).toBeDefined();
                        expect(data.activeTracks).toHaveLength(4);
                        expect(data.activePlaylist.name).toBe('MyPlaylist');
                        expect(data.playlists).toHaveLength(1);
                    }
                    done();
                });
            });
            test('Voting Host', (done) => {
                let vote = activeTracks[0].id;
                hostSocket.emit('vote', {
                    trackId: vote
                });
                lastEvent = 'voteHost';
                hostSocket.on('update', (data) => {
                    if (lastEvent === 'voteHost') {
                        expect(data.host.voted).toBe(vote);
                    }
                    done();
                });
            });
            test('Voting Client', (done) => {
                let vote = activeTracks[0].id;
                clientSocket.emit('vote', {
                    trackId: vote
                });
                lastEvent = 'voteClient';
                clientSocket.on('update', (data) => {
                    if (lastEvent === 'voteClient') {
                        expect(data.connectedUser[0].voted).toBe(vote);
                    }
                    done();
                });
            });
        });

        describe('Incorrect Sequence', () => {
            
        });
    });
});

describe('Function Tests', () => {
    
});