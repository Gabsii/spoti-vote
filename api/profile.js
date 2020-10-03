const handler = require('../apiHandler/handler');
const Host = require('../apiHandler/Classes/Host');

const profile = (req, res) => {
    let response;
    // eslint-disable-next-line no-console
    console.log('INFO: /profile has been called.');

    let data = handler.getData();
    
    if (req.body.myToken) {
        let myHost = Host.getHostByToken(req.body.myToken, data.hosts);
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