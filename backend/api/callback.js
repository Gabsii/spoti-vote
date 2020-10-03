const handler = require('../handler/handler');
const Room = require('../handler/Classes/Room');
const Host = require('../handler/Classes/Host');
const fetch = require('node-fetch');
const URLSearchParams = require('url').URLSearchParams;

const env = handler.getEnv();

module.exports = async (req, res) => {

    let code = req.query.code || null;

    let data = {
        code,
        redirect_uri: env.redirectUri,
        grant_type: 'authorization_code'
    };

    let searchParams = new URLSearchParams();
    for (let prop in data) {
        searchParams.set(prop, data[prop]);
    }

    let request;
    try {
        request = await fetch(env.spotifyAccountAddress +'/api/token', {
            method: 'post',
            body: searchParams,
            headers: { 
                'Authorization': 'Basic ' + (new Buffer(env.spotifyClientId + ':' + env.spotifyClientSecret).toString('base64'))
            }
        });
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error('ERROR-[ROOM: '+this.id+']: THERE WAS AN ERROR UPDATING THE TOKEN.\n' + e);
    }

    let fetchData;
    try {
        fetchData = await request.json();
    } catch (e) {
        fetchData = null;
    }
    const host = new Host.Host(fetchData.access_token, fetchData.refresh_token, env.spotifyClientId, env.spotifyClientSecret, env.spotifyApiAddress, env.spotifyAccountAddress);
    if (await host.fetchData() === true) {

        let data = handler.getData();

        let oldHost = Host.getHostByToken(host.myToken, data.hosts);
        if (oldHost) {
            let oldRoom = Room.getRoomByHost(oldHost, data.rooms);
            data.rooms.splice(data.rooms.indexOf(oldRoom), 1);
            data.hosts.splice(data.hosts.indexOf(oldHost), 1);
        }
        data.hosts.push(host);
        // eslint-disable-next-line no-console
        console.log('INFO-[HOST: '+host.name+']: This host has logged in');

        handler.setData(data);

        res.redirect(env.frontendUri + '/dashboard?token=' + host.myToken);
    } else {
        res.status(400).send();
    }
};