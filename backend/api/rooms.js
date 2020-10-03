const handler = require('../handler/handler');

module.exports = (req, res) => {
    // eslint-disable-next-line no-console
    console.log('INFO: /rooms has been called.');
    res.setHeader('Access-Control-Allow-Origin', '*');

    let data = handler.getData();

    let returnRooms = [];
    for (var i = 0; i < data.rooms.length; i++) {
        let roomI = {
            roomName: data.rooms[i].id,
            roomHost: data.rooms[i].host.name
        };
        try {
            roomI.roomCover = data.rooms[i].activePlayer.track.album.images[0].url;
        } catch (error) {
            try {
                roomI.roomCover = data.rooms[i].activePlaylist;
            } catch (error) {
                break;
            }
        }
        if (!roomI.roomCover) {
            roomI.roomCover = data.rooms[i].host.img;
        }
        returnRooms.push(roomI);
    }

    res.status(200).send(returnRooms);
};