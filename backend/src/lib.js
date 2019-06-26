/**
* Return the room with the specified id
*
* @author: Michiocre
* @param {string} roomId The id that identifies the room
* @param {array} rooms Array of all the rooms
* @return {Room} The room object with the id of the parameter
*/
function getRoomById(roomId, rooms) {
	let room = null;
	for (var i = 0; i < rooms.length; i++) {
		if (rooms[i].id == roomId) {
			room = rooms[i];
			return room;
		}
	}
	return null;
}

/**
* Return the user with the specified id
*
* @author: Michiocre
* @param {string} id The id that identifies the user
* @param {array} users Array of all the users
* @return {Room} The room object with the id of the parameter
*/
function getUserById(id, users) {
	let user = null;
	for (var i = 0; i < users.length; i++) {
		if (users[i].id == id) {
			user = users[i];
			return user;
		}
	}
	return null;
}

let codes = {
	SUCCESS: 200,
	NOTFOUND: 404,
	PLNOTFOUND: 414,
	ERROR: 500
};

module.exports = {
	getRoomById: getRoomById,
	getUserById: getUserById,
	codes: codes
};
