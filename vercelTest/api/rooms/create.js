const handler = require('../../handler/handler');
const Host = require('../../handler/Classes/Host');
const Room = require('../../handler/Classes/Room');

const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }
    return await fn(req, res)
}

const create = (req, res) => {

    let data = handler.getData();

    let response;
    if (req.body.myToken === null || req.body.myToken === undefined) {
        response = {error: true, message: 'Authorization failed. No or expired token.'};
        res.status(400);
    } else {
        let host = Host.getHostByToken(req.body.myToken, data.hosts);
        if (host === null) {
            response = {error: true, message: 'Authorization failed. No or expired token.'};
            res.status(400);
        } else {
            let room = new Room.Room(host, data.rooms);
            console.log(room.connectedUser);
            data.rooms.push(room);
            res.status(200);
            
            response = {error: false, roomId: room.id};
        }
    }

    handler.setData(data);

    res.send(JSON.stringify(response));
}

module.exports = allowCors(create);