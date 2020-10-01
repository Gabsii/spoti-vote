const { resolve } = require('path');

export const config = {
    api: {
      bodyParser: true
    }
  }

module.exports = (req, res) => {
    let response;
    // eslint-disable-next-line no-console
    console.log('INFO: /profile has been called.');
    //res.setHeader('Access-Control-Allow-Origin', '*');


    console.log(req);

    res.send(JSON.stringify(req.body));
/*
    if (req.body.myToken === null || req.body.myToken === undefined) {
        response = {error: true, message: 'Authorization failed. No or expired token.'};
        res.status(400);
    } else {
        let host = Host.getHostByToken(req.body.myToken, data.hosts);
        if (host == null) {
            response = {error: true, message: 'Authorization failed. No or expired token.'};
            res.status(400);
        } else {
            response = {error: false, host: host.getData()};
            res.status(200);
        }
    }

    res.send(JSON.stringify(response));
    */
}