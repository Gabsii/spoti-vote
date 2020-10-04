const handler = require('../handler/handler');

const rooms = (req, res) => {
    handler.log('INFO: /rooms has been called.');

    let rooms = handler.requestRooms();

    let returnRooms = rooms.map((value, index) => {
        let room = {
            roomName: value.id,
            roomHost: value.host.name,
            roomCover: value.host.img
        };

        if (value.activePlaylist) {
            room.roomCover = value.activePlaylist;
        }

        if (value.activePlayer && value.activePlayer.track && value.activePlayer.track.album) {
            room.roomCover = value.activePlayer.track.album.images[0].url;
        }

        return room;
    });

    res.status(200).send(returnRooms);
};

module.exports = handler.allowCors(rooms);