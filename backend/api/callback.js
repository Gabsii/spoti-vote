import fetch from 'node-fetch';
import { URLSearchParams } from 'url';
import handler from '../handler/handler';
import Room from'../handler/Classes/Room';
import Host from'../handler/Classes/Host';

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
        handler.log('ERROR: THERE WAS AN ERROR UPDATING THE TOKEN.\n' + e, 'error');
    }
    if (request.status === 401) {
        handler.log('ERROR: Spotify Api does not grant Authorization.', 'error');
        res.status(401).send('Something went wrong, please make sure the Servers ClientId/Secret are set.');
    } else if (request.status === 404) {
        handler.log('ERROR: Something went wrong on callback', 'error');
        res.status(404).send('Callback error');
    } else {
        let fetchData;
        try {
            fetchData = await request.json();
        } catch (e) {
            fetchData = null;
        }
        
        const host = new Host.Host(fetchData.access_token, fetchData.refresh_token, env.spotifyClientId, env.spotifyClientSecret, env.spotifyApiAddress, env.spotifyAccountAddress);
        if (await host.fetchData() === true) {
    
            let hosts = handler.requestHosts();
            let rooms = handler.requestRooms();
    
            let oldHost = Host.getHostByToken(host.myToken, hosts);
            if (oldHost) {
                let oldRoom = Room.getRoomByHost(oldHost, rooms);
                rooms.splice(rooms.indexOf(oldRoom), 1);
                hosts.splice(hosts.indexOf(oldHost), 1);
            }
            
            oldHost = Host.getHostById(host.id, hosts);
            if (oldHost) {
                let oldRoom = Room.getRoomByHost(oldHost, rooms);
                rooms.splice(rooms.indexOf(oldRoom), 1);
                hosts.splice(hosts.indexOf(oldHost), 1);
            }
    
            hosts.push(host);
            handler.log('INFO-[HOST: '+host.name+']: This host has logged in');
    
            handler.saveHosts(hosts);
            handler.saveRooms(rooms);
    
            res.redirect(env.frontendUri + '/dashboard?token=' + host.myToken);
        } else {
            res.status(400).send();
        }
    }    
};