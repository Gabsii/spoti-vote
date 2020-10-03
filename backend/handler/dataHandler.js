const fs = require('fs');
const Host = require('./Classes/Host');
const Room = require('./Classes/Room');

const dataLoc = 'handler/data.json';

function getData() {
    let parsed = {
        hosts: [],
        rooms: []
    };
    try {
        parsed = JSON.parse(fs.readFileSync(dataLoc));
    } catch (error) {
        console.error('data.json file had to be created.');
    }

    let hosts = [];
    let rooms = [];

    parsed.hosts.forEach(obj => {
        hosts.push(new Host.Host(obj));
    });
    
    parsed.rooms.forEach(room => {
        room.host = new Host.Host(room.host);
        rooms.push(new Room.Room(room));
    });

    return {
        hosts: hosts,
        rooms: rooms
    };
    
}

function setData(data) {
    let json = JSON.stringify(data);
    fs.writeFileSync(dataLoc, json);
}

module.exports = {
    setData: setData,
    getData: getData
};