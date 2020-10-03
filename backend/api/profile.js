const dataHandler = require('../handler/dataHandler');
const allowCors = require('../handler/corsHandler').allowCors;
const Host = require('../handler/Classes/Host');

const profile = (req, res) => {
    let response;
    // eslint-disable-next-line no-console
    console.log('INFO: /profile has been called.');

    let data = dataHandler.getData();
    
    if (req.body.myToken) {
        let myHost = Host.getHostByToken(req.body.myToken, data.hosts);
        if (myHost) {
            response = {error: false, host: myHost.getData()};
            res.status(200);
        } else {
            response = {error: true, message: 'Authorization failed. No or expired token.'};
            res.status(400);
        }    
    } else {
        response = {error: true, message: 'Authorization failed. No or expired token.'};
        res.status(400);
    }

    res.send(JSON.stringify(response));
};

module.exports = allowCors(profile);