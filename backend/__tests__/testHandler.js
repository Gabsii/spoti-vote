import fs from 'fs';
//import Host from '../handler/Classes/Host';
//import Room from '../handler/Classes/Room';
import handler from '../handler/handler';

function getTestData() {
    try {
        let parsed = JSON.parse(fs.readFileSync('backend/__tests__/testData.json'));
        /*let rooms = [];
        parsed.rooms.forEach(room => {
            room.host = new Host.Host(room.host);
            rooms.push(new Room.Room(room));
        });
        parsed.rooms = rooms;*/
        return parsed;
    } catch (error) {
        handler.log(error);
        return [];
    }
}

function clearData() {
    handler.saveHosts([]);
    handler.saveRooms([]);
}

module.exports = {
    getTestData,
    clearData
};