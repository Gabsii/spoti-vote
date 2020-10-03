const dataHandler = require('../../handler/dataHandler');
const allowCors = require('../../handler/corsHandler').allowCors;
const Host = require('../../handler/Classes/Host');
const Room = require('../../handler/Classes/Room');

const create = (req, res) => {

    let data = dataHandler.getData();

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
            res.status(400);
        }
    } else {
        
        response = {error: true, message: 'Authorization failed. No or expired token.'};
        res.status(400);
    }

    dataHandler.setData(data);

    res.send(JSON.stringify(response));
};

module.exports = allowCors(create);