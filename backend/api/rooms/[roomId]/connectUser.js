const handler = require('../../../handler/handler');
const Host = require('../../../handler/Classes/Host');
const Room = require('../../../handler/Classes/Room');

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

const connectUser = async (req, res) => {

    let data = handler.getData();

    let response;

    let room = Room.getRoomById(req.query.roomId, data.rooms);
    if (room === null) {
        response = {error: true, message: 'Room not found'};
        res.status(400);
    } else {
        if (req.body.myToken === room.host.myToken) {
            response = {error: false};
            res.status(200);
        } else {
            if (req.body.myToken !== null) {
                room.addUser(req.body.clientName, req.body.myToken);
                response = {error: false};
            } else {
                let newUser = room.addUser(req.body.clientName, Host.createToken(20));
                response = {error: false, myToken: newUser.myToken};
            }

            res.status(200);
        }
    }

    handler.setData(data);

    res.send(JSON.stringify(response));
}

module.exports = allowCors(connectUser);