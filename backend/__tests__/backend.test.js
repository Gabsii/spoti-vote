const dotenv = require('dotenv');
const request = require('supertest');

const lib = require('../lib');
const makeid = require('../Classes/Room').makeid;
const Room = require('../Classes/Room').Room;
const User = require('../Classes/User').User;
const server = require('../app').server;

const users = require('../app').users;
const rooms = require('../app').rooms;

const testRooms = [];

users.push(new User('', '', '', ''));
users[0].id = 'User1';
users[0].name = 'Max';

users.push(new User('', '', '', ''));
users[1].id = 'Gabsii';
users[1].name = 'Gabsii';

users.push(new User('', '', '', ''));
users[2].id = 'Michiocre';
users[2].name = 'Michiocre';

testRooms.push(new Room(users[0], testRooms));
testRooms.push(new Room(users[1], testRooms));
testRooms.push(new Room(users[2], testRooms));

dotenv.config();
const ipAddress = process.env.ADDRESS;
const port = process.env.PORT;
const portBack = process.env.PORTBACK;

const uriBack = (ipAddress === 'localhost' ? 'http://' + ipAddress + ':' + portBack : 'https://' + ipAddress + ':' + port);
const redirect_uri = uriBack + '/callback';

describe('App Tests', () => {
	let roomIds  = [];

	describe('Get / Method', () => {
		test('It should responde with a little greeting', (done) =>  {
			request(server).get('/').then((response) => {
				expect(response.statusCode).toBe(200);
				expect(response.text).toBe('Hello There');
				done();
			});
		});
	});

	describe('Get /login Method', () => {
		test('It should responde with a error if there is no referer', (done) =>  {
			request(server).get('/login').then((response) => {
				expect(response.statusCode).toBe(400);
				expect(response.text).toBe('Login from the main page');
				done();
			});
		});
		test('It should responde with a redirect', (done) =>  {
			request(server).get('/login').set({'Referer': 'http://jest.test/'}).then((response) => {
				expect(response.statusCode).toBe(302);
				let parameter = response.headers.location.split('&')[3];
				let resRedirect = decodeURIComponent(parameter.split('=')[1]);
				expect(resRedirect).toBe(redirect_uri);
				done();
			});
		});
	});

	describe('Get /callback Method', () => {
		test('It should responde with a error', (done) =>  {
			request(server).get('/callback').then((response) => {
				expect(response.statusCode).toBe(400);
				done();
			});
		});
	});

	describe('Get /createRoom Method', () => {
		test('It should responde with a error if no user is given', (done) =>  {
			request(server).get('/createRoom').then((response) => {
				expect(response.statusCode).toBe(400);
				done();
			});
		});
		test('It should responde with a redirect', (done) =>  {
			request(server).get('/createRoom?id=User1').then((response) => {
				expect(response.statusCode).toBe(302);
				roomIds.push(response.headers.location.split('/').pop());
				expect(rooms.length > 0).toBeTruthy();
				done();
			});

			request(server).get('/createRoom?id=Gabsii').then((response) => {
				expect(response.statusCode).toBe(302);
				roomIds.push(response.headers.location.split('/').pop());
				expect(rooms.length > 0).toBeTruthy();
				done();
			});
	
			request(server).get('/createRoom?id=Michiocre').then((response) => {
				expect(response.statusCode).toBe(302);
				roomIds.push(response.headers.location.split('/').pop());
				expect(rooms.length > 0).toBeTruthy();
				done();
			});
		});
	});

	describe('Get /rooms Method', () => {
		test('It should responde with a list of all rooms', (done) =>  {
			request(server).get('/rooms').then((response) => {
				expect(response.statusCode).toBe(200);
				let body = JSON.parse(response.text);
				expect(body.content).toHaveLength(rooms.length);
				expect(body.content.length > 0).toBeTruthy();
				for (let i = body.content.length - 1; i > body.content.length - roomIds.length; i--) {
					expect(body.content[i].roomName).toBe(roomIds.pop());
				}
				done();
			});
		});
	});
});

describe('Basic Functions Tests', () => {
	describe('getRoomById', () => {
		test('The requested room is returned', () => {
			expect(lib.getRoomById('UADBA', testRooms)).toBe(null);
			for (let i = 0; i < testRooms.length; i++) {
				expect(lib.getRoomById(testRooms[i].id, testRooms)).not.toBeNull();
				expect(lib.getRoomById(testRooms[i].id, testRooms)).toBe(testRooms[i]);
			}
		});
	});
	
	describe('getUserById', () => {
		test('The requested User', () => {
			expect(lib.getUserById('blankesMichl', users)).toBe(null);
			expect(lib.getUserById('User1', users)).not.toBeNull();
			expect(lib.getUserById('User1', users)).toBe(users[0]);
			expect(lib.getUserById('Michiocre', users)).not.toBeNull();
			expect(lib.getUserById('Michiocre', users)).toBe(users[2]);
			expect(lib.getUserById('Gabsii', users)).not.toBeNull();
			expect(lib.getUserById('Gabsii', users)).toBe(users[1]);
		});
	});

	describe('makeId', () => {
		test('If the id has the right length', () => {
			let id = makeid(5);
			expect(id).toHaveLength(5);
		});
	});
});

describe('Room Functions Tests', () => {

	testRooms.forEach(testRoom => {
		let testUser = testRoom.user;
		
		test('Room generation', () => {
			expect(testRoom.id).toHaveLength(5);
		});
	
		test('Add User', () => {
			expect(testRoom.addUser('TempUser0')).toBeTruthy();
			expect(testRoom.addUser('TempUser1')).toBeTruthy();
			expect(testRoom.addUser('TempUser2')).toBeTruthy();
			expect(testRoom.addUser('TempUser3')).toBeTruthy();
			expect(testRoom.getUserNames()).toContain('TempUser2');
			expect(testRoom.getUserNames()).toHaveLength(5);
		});

		test('Get User Names', () => {
			expect(testRoom.getUserNames()).toContain('TempUser0', 'TempUser1', 'TempUser2', 'TempUser3', testUser.name);
			expect(testRoom.getUserNames()).toHaveLength(5);
		});
	
		test('Get User by Name', () => {
			expect(testRoom.getUserByName('TempUser1')).not.toBeNull();
			expect(testRoom.getUserByName('TempUser1')).toBe(testRoom.connectedUser[1]);
			expect(testRoom.getUserByName(testUser.name)).toBe(testRoom.user);
			expect(testRoom.getUserByName('Not Existent User')).toBeNull();
		});

		test('Remove User', () => {
			expect(testRoom.removeUser('TempUser0')).toEqual({name: 'TempUser0', voted: null});
			expect(testRoom.getUserNames()).not.toContain('TempUser0');
			expect(testRoom.getUserByName('TempUser0')).toBeNull();
			expect(testRoom.getUserNames()).toHaveLength(4);
			expect(testRoom.removeUser('Not Existent User')).toBeNull();
		});
	
		test('Get Playlist by Id', () => {
			testRoom.user.playlists = [
				{id: 'playlist1'},
				{id: 'playlist2'},
				{id: 'playlist3'},
				{id: 'playlist4'}
			];
	
			expect(testRoom.getPlaylistById('playlist3')).toBe(testRoom.user.playlists[2]);
			expect(testRoom.getPlaylistById('Not Existent Playlist')).toBeNull();
		});
	
		test('Get Active Track by Id', () => {
			testRoom.activeTracks = [
				{id: 'activeTrack1'},
				{id: 'activeTrack2'},
				{id: 'activeTrack3'},
				{id: 'activeTrack4'}
			];	
			expect(testRoom.getActiveTrackById('activeTrack4')).toBe(testRoom.activeTracks[3]);
			expect(testRoom.getActiveTrackById('Not Existent Track')).toBeNull();
		});
	
		test('Difference Calculator First Iteration', () => {
			let oldTestRoom = null;
			testRoom.activeTracks = [];
			testRoom.user.voted = 'track1';
			testRoom.user.img = 'https://upload.wikimedia.org/wikipedia/en/f/f9/Dat_Boi_%28resized_50%25%29.jpg';
	
			let update = testRoom.getDifference(oldTestRoom);
			expect(update.host).toEqual({name: testUser.name, voted: 'track1', img: 'https://upload.wikimedia.org/wikipedia/en/f/f9/Dat_Boi_%28resized_50%25%29.jpg'});
		});
	});
});

