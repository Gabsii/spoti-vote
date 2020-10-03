const handler = require('../../../handler/handler');
const Room = require('../../../handler/Classes/Room');

const selectPlaylist = async (req, res) => {

    let data = handler.getData();

    let response;

    if (req.body.myToken) {
        let room = Room.getRoomById(req.query.roomId, data.rooms);
        if (room) {
            if (req.body.myToken === room.host.myToken) {
                if (req.body.playlistId) {
                    await room.changePlaylist(req.body.playlistId);
                    response = {error: false};
                    res.status(200);
                }
            }
        } else {
            response = {error: true, message: 'Room has not been found'};
            res.status(400);
        }
    } else {
        response = {error: true, message: 'Authorization failed. No or expired token.'};
        res.status(400);
    }


    handler.setData(data);

    res.send(JSON.stringify(response));
};

module.exports = handler.allowCors(selectPlaylist);