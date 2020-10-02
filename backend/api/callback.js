const handler = require('../handler/handler');
const Room = require('../handler/Classes/Room');
const Host = require('../handler/Classes/Host');
const request = require('request');
const env = handler.getEnv();

module.exports = (req, res) => {

    let code = req.query.code || null;
    let authOptions = {
        url: env.spotifyAccountAddress +'/api/token',
        form: {
            code: code,
            redirect_uri: env.redirectUri,
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (new Buffer(env.spotifyClientId + ':' + env.spotifyClientSecret).toString('base64'))
        },
        json: true
    };
    request.post(authOptions, async (error, response, body) => {
        if (response.statusCode === 200) {
            let uri = env.frontendUri;
            let host = new Host.Host(body.access_token, body.refresh_token, env.spotifyClientId, env.spotifyClientSecret, env.spotifyApiAddress, env.spotifyAccountAddress);
            if (await host.fetchData() === true) {

                let data = handler.getData();

                let oldHost = Host.getHostByToken(host.myToken, data.hosts);
                if (oldHost !== null && oldHost !== undefined) {
                    let oldRoom = Room.getRoomByHost(oldHost, data.rooms);
                    data.rooms.splice(data.rooms.indexOf(oldRoom), 1);
                    data.hosts.splice(data.hosts.indexOf(oldHost), 1);
                }
                data.hosts.push(host);
                // eslint-disable-next-line no-console
                console.log('INFO-[HOST: '+host.name+']: This host has logged in');

                handler.setData(data);

                res.redirect(uri + '?token=' + host.myToken);
            } else {
                res.status(400).send();
            }
        } else {
            res.status(400).send();
        }
    });
};