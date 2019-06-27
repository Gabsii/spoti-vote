const dotenv = require('dotenv');
const request = require('supertest');

const lib = require('../lib');
const makeid = require('../Classes/Room').makeid;
const Room = require('../Classes/Room').Room;
const User = require('../Classes/User').User;
const server = require('../app').server;

const users = require('../app').users;
const rooms = require('../app').rooms;

users.push(new User('', '', '', ''));
users[0].id = 'User1';

dotenv.config();
const ipAddress = process.env.ADDRESS;
const port = process.env.PORT;
const portBack = process.env.PORTBACK;

const uriBack = (ipAddress === 'localhost' ? 'http://' + ipAddress + ':' + portBack : 'https://' + ipAddress + ':' + port);
const redirect_uri = uriBack + '/callback';

describe('Basic Functions Tests', () => {
	describe('getRoomById', () => {
		test('The requested room is returned', () => {
			let rooms = [
				{id: 'QUSDN'},
				{id: 'UADBA'},
				{id: 'DAJDN'},
				{id: 'WNIFP'},
				{id: 'YXNCB'}
			];
			expect(lib.getRoomById('UADBA', rooms)).toBe(rooms[1]);
			expect(lib.getRoomById('WNIFP', rooms)).toBe(rooms[3]);
			expect(lib.getRoomById('YXNCB', rooms)).toBe(rooms[4]);
		});
	});
	
	describe('getUserById', () => {
		test('The requested User', () => {
			let users = [
				{id: 'blankesMichl'},
				{id: 'Gabsii'},
				{id: 'someoneElse'},
				{id: 'AnotherOPne'},
				{id: 'User'}
			];
			expect(lib.getUserById('Gabsii', users)).toBe(users[1]);
			expect(lib.getUserById('blankesMichl', users)).toBe(users[0]);
			expect(lib.getUserById('User', users)).toBe(users[4]);
		});
	});

	describe('makeId', () => {
		test('If the id has the right length', () => {
			let id = makeid(5);
			expect(id).toHaveLength(5);
		});
		
		test('If a unique id is returned every time', () => {
			let ids = [];
			for (let i = 0; i < 26; i++) {
				let newId = makeid(5);
				expect(ids.includes(newId)).toBe(false);
				if (ids.includes(ids[i])) {
					break;
				}
				ids.push(newId);
			}
		});
	});
});

describe('Room Functions Tests', () => {
	let testUser = new User();
	testUser.name = 'Max Mustermann';
	testUser.id = 'maxmuster';

	let testRoom = new Room(testUser, []);
	testRoom.connectedUser = [
		{name: 'TestUser1'},
		{name: 'TestUser2'},
		{name: 'TestUser3'}
	];

	test('Room generation', () => {
		expect(testRoom.id).toHaveLength(5);
	});
	test('Get User Names', () => {
		expect(testRoom.getUserNames()).toContain(testRoom.connectedUser[1].name, testUser.name);
		expect(testRoom.getUserNames()).toHaveLength(4);
	});
	test('Get User by Name', () => {
		expect(testRoom.getUserByName('Max Mustermann')).toBe(testUser);
		expect(testRoom.getUserByName('TestUser2')).toBe(testRoom.connectedUser[1]);
		expect(testRoom.getUserByName('Not Existent User')).toBeNull();
	});
	test('Add User', () => {
		expect(testRoom.addUser('TempUser')).toBeTruthy();
		expect(testRoom.getUserNames()).toContain('TempUser');
		expect(testRoom.getUserNames()).toHaveLength(5);
	});
	test('Remove User', () => {
		expect(testRoom.removeUser('TempUser')).toEqual({name: 'TempUser', voted: null});
		expect(testRoom.getUserNames()).not.toContain('TempUser');
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
		expect(update.host).toEqual({name: 'Max Mustermann', voted: 'track1', img: 'https://upload.wikimedia.org/wikipedia/en/f/f9/Dat_Boi_%28resized_50%25%29.jpg'});
	});
});

describe('App Tests', () => {
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
				
				expect(rooms.length > 0).toBeTruthy();
				done();
			});
		});
	});
});