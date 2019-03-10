const sFunctions = require('../serverFunctions.js');
const makeid = require('../Room.js').makeid;
const Room = require('../Room.js').Room;
const User = require('../User.js').User;

describe('Basic Functions Tests', () => {
	test('getRoomById', () => {
		let rooms = [
			{id: 'QUSDN'},
			{id: 'UADBA'},
			{id: 'DAJDN'},
			{id: 'WNIFP'},
			{id: 'YXNCB'}
		];
		expect(sFunctions.getRoomById('UADBA', rooms)).toBe(rooms[1]);
	});
	test('getUserById', () => {
		let users = [
			{id: 'blankesMichl'},
			{id: 'Gabsii'},
			{id: 'someoneElse'},
			{id: 'AnotherOPne'},
			{id: 'User'}
		];
		expect(sFunctions.getUserById('Gabsii', users)).toBe(users[1]);
	});
	test('makeId', () => {
		let id = makeid(5);
		expect(id).toHaveLength(5);
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
