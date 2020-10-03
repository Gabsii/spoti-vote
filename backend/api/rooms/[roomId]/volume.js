const handler = require('../../../handler/handler');
const Room = require('../../../handler/Classes/Room');

const volume = async (req, res) => {

    let rooms = handler.requestRooms();

    let response;

    if (req.body.myToken) {
        let room = Room.getRoomById(req.query.roomId, rooms);
        if (req.body.myToken === room.host.myToken) {
            handler.log('INFO-[ROOM: ' + req.query.roomId + ']: Volume changed to [' + req.body.volume + '].');
            await room.changeVolume(req.body.volume);
            response = {error: false};
            res.status(200);
        } else {
            response = {error: true, message: 'Authorization failed. Expired token.'};
            res.status(401);
        }
    } else {
        response = {error: true, message: 'Authorization failed. No or expired token.'};
        res.status(401);
    }

    handler.saveRooms(rooms);

    res.send(JSON.stringify(response));
};

module.exports = handler.allowCors(volume);