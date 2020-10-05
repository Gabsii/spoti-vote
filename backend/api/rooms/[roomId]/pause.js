import handler from '../../../handler/handler';
import Room from'../../../handler/Classes/Room';

const pause = async (req, res) => {

    let rooms = handler.requestRooms();

    let response;

    if (req.body.myToken) {
        let room = Room.getRoomById(req.query.roomId, rooms);

        if (req.body.myToken === room.host.myToken) {
            handler.log('INFO-[ROOM: ' + room.id + ']: Host skiped the song.');
            await room.togglePlaystate();
            response = {error: false};
            res.status(200);
        } else {
            response = {error: true, message: 'Authorization failed. No or expired token.'};
            res.status(401);
        }
    } else {
        response = {error: true, message: 'Authorization failed. No or expired token.'};
        res.status(401);
    }

    handler.saveRooms(rooms);

    res.send(JSON.stringify(response));
};

module.exports = handler.allowCors(pause);