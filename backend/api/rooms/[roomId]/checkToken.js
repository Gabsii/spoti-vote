const dataHandler = require('../../../handler/dataHandler');
const allowCors = require('../../../handler/corsHandler').allowCors;
const Room = require('../../../handler/Classes/Room');

const checkToken = (req, res) => {

    let data = dataHandler.getData();

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

    dataHandler.setData(data);

    res.send(JSON.stringify(response));
};

module.exports = allowCors(checkToken);