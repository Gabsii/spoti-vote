const handler = require('../../../apiHandler/handler');
const Room = require('../../../apiHandler/Classes/Room');

const skip = async (req, res) => {

    let data = handler.getData();

    let response;

    if (req.body.myToken) {
        let room = Room.getRoomById(req.query.roomId, data.rooms);

        if (req.body.myToken === room.host.myToken) {
            // eslint-disable-next-line no-console
            console.log('INFO-[ROOM: ' + room.id + ']: Host skiped the song.');
            if (!(await room.play())) {
                // eslint-disable-next-line no-console
                console.warn('INFO-[ROOM: ' + room.id + ']: Skipping song did not work.');
                response = {error: true, message: 'Cant skip, no song is playing.'};
                res.status(400);
            } else {
                response = {error: false};
                res.status(200);
            }
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

module.exports = handler.allowCors(skip);