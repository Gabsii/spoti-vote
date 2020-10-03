const handler = require('../../../handler/handler');
const Room = require('../../../handler/Classes/Room');

const del = async (req, res) => {

    let rooms = handler.requestRooms();

    let response;

    if (req.body.myToken) {
        let room = Room.getRoomById(req.query.roomId, rooms);

        if (req.body.myToken === room.host.myToken) {
            handler.log('INFO-[ROOM: ' + room.id + ']: This room has been deleted due to more then 1 room (Host choose the old room).');
            rooms.splice(rooms.indexOf(room), 1);
        }
        response = {error: false};
        res.status(200);
    } else {
        response = {error: true, message: 'Authorization failed. No or expired token.'};
        res.status(401);
    }

    handler.saveRooms(rooms);

    res.send(JSON.stringify(response));
};

module.exports = handler.allowCors(del);