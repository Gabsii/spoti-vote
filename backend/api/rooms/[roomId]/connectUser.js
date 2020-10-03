const handler = require('../../../handler/handler');
const Host = require('../../../handler/Classes/Host');
const Room = require('../../../handler/Classes/Room');

const connectUser = async (req, res) => {

    let data = handler.getData();

    let response;

    let room = Room.getRoomById(req.query.roomId, data.rooms);
    if (room) {
        if (req.body.myToken === room.host.myToken) {
            response = {error: false};
            res.status(200);
        } else {
            if (req.body.myToken) {
                room.addUser(req.body.clientName, req.body.myToken);
                response = {error: false};
            } else {
                let newUser = room.addUser(req.body.clientName, Host.createToken(20));
                response = {error: false, myToken: newUser.myToken};
            }

            res.status(200);
        }
    } else {
        response = {error: true, message: 'Room not found'};
        res.status(400);
    }

    handler.setData(data);

    res.send(JSON.stringify(response));
};

module.exports = handler.allowCors(connectUser);