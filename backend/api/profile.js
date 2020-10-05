import handler from '../handler/handler';
import Host from'../handler/Classes/Host';

const profile = (req, res) => {
    let response;
    handler.log('INFO: /profile has been called.');

    let hosts = handler.requestHosts();
    
    if (req.body.myToken) {
        let myHost = Host.getHostByToken(req.body.myToken, hosts);
        if (myHost) {
            response = {error: false, host: myHost.getData()};
            res.status(200);
        } else {
            response = {error: true, message: 'Authorization failed. No or expired token.'};
            res.status(401);
        }    
    } else {
        response = {error: true, message: 'Authorization failed. No or expired token.'};
        res.status(401);
    }

    res.send(JSON.stringify(response));
};

module.exports = handler.allowCors(profile);