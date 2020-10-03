const handler = require('../../../handler/handler');
const Room = require('../../../handler/Classes/Room');

const del = async (req, res) => {

    let data = handler.getData();

    let response;

    if (req.body.myToken) {
        let room = Room.getRoomById(req.query.roomId, data.rooms);

        if (req.body.myToken === room.host.myToken) {
            // eslint-disable-next-line no-console
            console.log('INFO-[ROOM: ' + room.id + ']: This room has been deleted due to more then 1 room (Host choose the old room).');
            data.rooms.splice(data.rooms.indexOf(room), 1);
        }
        response = {error: false};
        res.status(200);
    } else {
        response = {error: true, message: 'Authorization failed. No or expired token.'};
        res.status(401);
    }

    handler.setData(data);

    res.send(JSON.stringify(response));
};

module.exports = handler.allowCors(del);