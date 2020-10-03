const dotenv = require('dotenv');
const fs = require('fs');
const Host = require('./Classes/Host');
const Room = require('./Classes/Room');

function getEnv() {
    dotenv.config();

    let backendPort = process.env.PORTBACK;
    let frontendPort = process.env.PORT;
    let ipAddress = process.env.ADDRESS;
    let spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
    let spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    let spotifyAccountAddress= 'https://accounts.spotify.com';
    let spotifyApiAddress= 'https://api.spotify.com';

    let redirectUri = (backendPort === 443) ? 'https://': 'http://' + ipAddress + ':' + backendPort + '/api/callback';
    let frontendUri = (frontendPort === 443) ? 'https://': 'http://' + ipAddress + ':' + frontendPort;

    return {
        backendPort: backendPort,
        frontendPort: frontendPort,
        ipAddress: ipAddress,
        spotifyClientId: spotifyClientId, 
        spotifyClientSecret: spotifyClientSecret,
        spotifyAccountAddress: spotifyAccountAddress,
        spotifyApiAddress: spotifyApiAddress,
        redirectUri: redirectUri,
        frontendUri: frontendUri
    };
}

const dataLoc = 'handler/data';
const logsLoc = 'handler/data/logs.txt';

function saveRooms(rooms) {
    let json = JSON.stringify(rooms);
    fs.writeFileSync(dataLoc + '/roomList.json', json);
}

function requestRooms() {
    try {
        let parsed = JSON.parse(fs.readFileSync(dataLoc + '/roomList.json'));
        let returnList = [];
        parsed.forEach(room => {
            room.host = new Host.Host(room.host);
            returnList.push(new Room.Room(room));
        });
        return returnList;
    } catch (error) {
        log(error);
        return [];
    }
}

function saveHosts(hosts) {
    let json = JSON.stringify(hosts);
    fs.writeFileSync(dataLoc + '/hostList.json', json);
}

function requestHosts() {
    try {
        let parsed = JSON.parse(fs.readFileSync(dataLoc + '/hostList.json'));
        let returnList = [];
        parsed.forEach(host => {
            returnList.push(new Host.Host(host));
        });
        return returnList;
    } catch (error) {
        log(error);
        return [];
    }
}

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

function log(message, type) {
    if (type === 'warn') {
        // eslint-disable-next-line no-console
        console.warn(message);
    } else if (type === 'error') {
        // eslint-disable-next-line no-console
        console.error(message);
    } else {
        // eslint-disable-next-line no-console
        console.log(message);
    }

    let datetime = new Date();

    fs.appendFile(logsLoc, `[${datetime.toISOString()}] ${type ? type : 'log'} : ${message} <br>`, function (err) {
        if (err) throw err;
    });
}

function getLogs() {
    let data = fs.readFileSync(logsLoc, 'utf8');
    return data;
}

module.exports = {
    getEnv,
    allowCors,
    log,
    getLogs,
    saveHosts,
    requestHosts,
    saveRooms,
    requestRooms
};