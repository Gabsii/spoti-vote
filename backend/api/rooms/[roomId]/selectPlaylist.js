const handler = require('../../../handler/handler');
const Room = require('../../../handler/Classes/Room');

const selectPlaylist = async (req, res) => {

    let rooms = handler.requestRooms();

    let response;

    if (req.body.myToken) {
        let room = Room.getRoomById(req.query.roomId, rooms);
        if (room) {
            if (req.body.myToken === room.host.myToken && req.body.playlistId) {
                await room.changePlaylist(req.body.playlistId);
                response = {error: false};
                res.status(200);
            }
        } else {
            response = {error: true, message: 'Room has not been found'};
            res.status(401);
        }
    } else {
        response = {error: true, message: 'Authorization failed. No or expired token.'};
        res.status(401);
    }


    handler.saveRooms(rooms);

    res.send(JSON.stringify(response));
};

module.exports = handler.allowCors(selectPlaylist);