const dataHandler = require('../../../handler/dataHandler');
const allowCors = require('../../../handler/corsHandler').allowCors;
const Room = require('../../../handler/Classes/Room');

const volume = async (req, res) => {

    let data = dataHandler.getData();

    let response;

    if (req.body.myToken) {
        let room = Room.getRoomById(req.query.roomId, data.rooms);
        if (req.body.myToken === room.host.myToken) {
            // eslint-disable-next-line no-console
            console.log('INFO-[ROOM: ' + req.query.roomId + ']: Volume changed to [' + req.body.volume + '].');
            await room.changeVolume(req.body.volume);
            response = {error: false};
            res.status(200);
        } else {
            response = {error: true, message: 'Authorization failed. Expired token.'};
            res.status(400);
        }
    } else {
        response = {error: true, message: 'Authorization failed. No or expired token.'};
        res.status(400);
    }

    dataHandler.setData(data);

    res.send(JSON.stringify(response));
};

module.exports = allowCors(volume);