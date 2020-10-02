const handler = require('../handler/handler');
const Host = require('../handler/Classes/Host');

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


const profile = (req, res) => {
    let response;
    // eslint-disable-next-line no-console
    console.log('INFO: /profile has been called.');

    let data = handler.getData();
    
    if (req.body.myToken === null || req.body.myToken === undefined) {
        response = {error: true, message: 'Authorization failed. No or expired token.'};
        res.status(400);
    } else {
        let myHost = Host.getHostByToken(req.body.myToken, data.hosts);
        if (myHost == null) {
            response = {error: true, message: 'Authorization failed. No or expired token.'};
            res.status(400);
        } else {
            response = {error: false, host: myHost.getData()};
            res.status(200);
        }
    }

    res.send(JSON.stringify(response));
};

module.exports = allowCors(profile);