const sFunctions = require('../serverFunctions.js');

describe('Functions Tests', () => {
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
});
