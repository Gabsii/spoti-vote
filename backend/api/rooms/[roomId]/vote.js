const handler = require('../../../handler/handler');
const Room = require('../../../handler/Classes/Room');

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

const vote = async (req, res) => {

    let data = handler.getData();

    let response;

    if (req.body.myToken) {
        let room = Room.getRoomById(req.query.roomId, data.rooms);
        // eslint-disable-next-line no-console
        console.log('INFO-[ROOM: ' + room.id + ']: [' + req.body.myToken + '] voted for [' + req.body.trackId + '].');
        room.vote(req.body.trackId, req.body.myToken);
        response = {error: false};
        res.status(200);
    } else {
        response = {error: true, message: 'Authorization failed. No or expired token.'};
        res.status(400);
    }

    handler.setData(data);

    res.send(JSON.stringify(response));
};

module.exports = allowCors(vote);