const handler = require('../../../handler/handler');
const Room = require('../../../handler/Classes/Room');

const checkToken = (req, res) => {

    let data = handler.getData();

    let response;

    let room = Room.getRoomById(req.query.roomId, data.rooms);
    if (room) {
        if (req.body.myToken === room.host.myToken) {
            room.host.lastUpdate = null;
            response = {error: false, isHost: true};
            res.status(200);
        } else {
            let user = room.getUserByToken(req.body.myToken);
            if (user) {
                response = {error: false, isHost: false, name: user.name};
                user.lastUpdate = null;
            } else {
                response = {error: false, isHost: false, name: ''};
            }
            
            res.status(200);
        }
    } else {  
        response = {error: true, message: 'Room not found'};
        res.status(400);
    }

    res.send(JSON.stringify(response));
};

module.exports = handler.allowCors(checkToken);