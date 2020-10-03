const dataHandler = require('../../../handler/dataHandler');
const allowCors = require('../../../handler/corsHandler').allowCors;
const Room = require('../../../handler/Classes/Room');

const update = async (req, res) => {

    let data = dataHandler.getData();

    let response = {};
    if (req.body.myToken) {
        let room = Room.getRoomById(req.query.roomId, data.rooms);
        if (room) {
            await room.update();
            if (req.body.myToken === room.host.myToken) {
                response = room.getData(true, room.host);
                res.status(200);
            } else {
                let user = room.getUserByToken(req.body.myToken);
                response = room.getData(false, user);
                res.status(200);
            }
        } else {
            response = {error: true, message: 'Room not found'};
            res.status(400);
        }
    } else {
        response = {error: true, message: 'Authorization failed. No or expired token.'};
        res.status(400);
    }

    dataHandler.setData(data);

    res.send(JSON.stringify(response));
};

module.exports = allowCors(update);