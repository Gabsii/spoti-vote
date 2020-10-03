const handler = require('../../apiHandler/handler');
const Host = require('../../apiHandler/Classes/Host');
const Room = require('../../apiHandler/Classes/Room');

const create = (req, res) => {

    let data = handler.getData();

    let response;
    if (req.body.myToken) {
        let host = Host.getHostByToken(req.body.myToken, data.hosts);
        if (host) {
            let room = new Room.Room(host, data.rooms);
            data.rooms.push(room);
            res.status(200);
            
            response = {error: false, roomId: room.id};
            
        } else {
            response = {error: true, message: 'Authorization failed. No or expired token.'};
            res.status(401);
        }
    } else {
        
        response = {error: true, message: 'Authorization failed. No or expired token.'};
        res.status(401);
    }

    handler.setData(data);

    res.send(JSON.stringify(response));
};

module.exports = handler.allowCors(create);