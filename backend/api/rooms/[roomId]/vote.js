const dataHandler = require('../../../handler/dataHandler');
const allowCors = require('../../../handler/corsHandler').allowCors;
const Room = require('../../../handler/Classes/Room');

const vote = async (req, res) => {

    let data = dataHandler.getData();

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

    dataHandler.setData(data);

    res.send(JSON.stringify(response));
};

module.exports = allowCors(vote);