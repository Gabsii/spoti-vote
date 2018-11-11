/*jshint esversion: 6, node: true, undef: true, unused: true */
let method = User.prototype; //This is used when programming object oriented in js to make everything a bit more organised

/**
* Constructor for a new / room
*
* @author: Michiocre
* @constructor
* @param {string} token The access token needed to connect to the spotify API
* @param {string} rooms The list of all rooms, to make sure no duplicate id
* @return {Room} The new room
*/
function User(token, refreshToken, clientId, clientSecret, room) {
	this.token = token;
    this.refreshToken = refreshToken;
	this.clientId = clientId;
	this.clientSecret = clientSecret;
	this.name = '';
	this.id = '';
	this.profileUrl = '';
	this.voted = null;
	this.country = '';
	this.img = '';

    let counter = 0;
}

module.exports = User;
