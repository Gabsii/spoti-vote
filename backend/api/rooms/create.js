import handler from '../../handler/handler';
import Room from'../../handler/Classes/Room';
import Host from'../../handler/Classes/Host';

const create = (req, res) => {

    let hosts = handler.requestHosts();
    let rooms = handler.requestRooms();

    let response;
    if (req.body.myToken) {
        let host = Host.getHostByToken(req.body.myToken, hosts);
        if (host) {
            let room = new Room.Room(host, rooms);
            rooms.push(room);
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

    handler.saveRooms(rooms);

    res.send(JSON.stringify(response));
};

module.exports = handler.allowCors(create);