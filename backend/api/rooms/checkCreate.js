const handler = require('../../handler/handler');
const Host = require('../../handler/Classes/Host');
const Room = require('../../handler/Classes/Room');

const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    return await fn(req, res);
};

const checkCreate = (req, res) => {

    let data = handler.getData();

    let response;
    if (req.body.myToken) {
        let host = Host.getHostByToken(req.body.myToken, data.hosts);
        if (host) {
            let room = Room.getRoomByHost(host, data.rooms);
            if (room) {
                response = {error: false, roomId: room.id};
            } else {
                response = {error: false};
            }
            res.status(200);
        } else {
            
            response = {error: true, message: 'Authorization failed. No or expired token.'};
            res.status(400);
        }
    } else {
        
        response = {error: true, message: 'Authorization failed. No or expired token.'};
        res.status(400);
    }
    res.send(JSON.stringify(response));
};

module.exports = allowCors(checkCreate);