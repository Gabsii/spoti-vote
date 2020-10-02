const handler = require('../handler/handler');

module.exports = (req, res) => {
    // eslint-disable-next-line no-console
    console.log('INFO: /rooms has been called.');
    res.setHeader('Access-Control-Allow-Origin', '*');

    let data = handler.getData();

    let returnRooms = [];
    for (var i = 0; i < data.rooms.length; i++) {
        let roomData = data.rooms[i].getData(false);
        let roomI = {
            roomName: roomData.roomId,
            roomHost: roomData.host.name
        };
        try {
            roomI.roomCover = roomData.activePlayer.track.album.images[0].url;
        } catch (error) {
            try {
                roomI.roomCover = roomData.activePlaylist;
            } catch (error) {
                break;
            }
        }
        if (roomI.roomCover === null || roomI.roomCover === undefined) {
            roomI.roomCover = roomData.host.img;
        }
        returnRooms.push(roomI);
    }

    res.status(200).send(returnRooms);
}