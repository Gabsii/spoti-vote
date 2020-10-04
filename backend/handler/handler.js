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

const dataLoc = __dirname + '/.data';

function saveRooms(rooms) {
    let json = JSON.stringify(rooms);

    if (!fs.existsSync(dataLoc)) {
        fs.mkdirSync(dataLoc);
    }

    if (!fs.existsSync(dataLoc + '/roomList.json')) {
        fs.appendFile(dataLoc + '/roomList.json', '', function (err) {
            if (err) log(err, 'error');
        });
    }

    fs.writeFileSync(dataLoc + '/roomList.json', json);
}

function requestRooms() {
    if (!fs.existsSync(dataLoc)) {
        fs.mkdirSync(dataLoc);
    }

    if (!fs.existsSync(dataLoc + '/roomList.json')) {
        fs.appendFile(dataLoc + '/roomList.json', '[]', function (err) {
            if (err) log(err, 'error');
        });
    }

    let parsed = JSON.parse(fs.readFileSync(dataLoc + '/roomList.json'));
    let returnList = [];
    parsed.forEach(room => {
        room.host = new Host.Host(room.host);
        returnList.push(new Room.Room(room));
    });
    return returnList;
}

function saveHosts(hosts) {
    let json = JSON.stringify(hosts);

    if (!fs.existsSync(dataLoc)) {
        fs.mkdirSync(dataLoc);
    }

    if (!fs.existsSync(dataLoc + '/hostList.json')) {
        fs.appendFile(dataLoc + '/hostList.json', '', function (err) {
            if (err) log(err, 'error');
        });
    }

    fs.writeFileSync(dataLoc + '/hostList.json', json);
}

function requestHosts() {
    if (!fs.existsSync(dataLoc)) {
        fs.mkdirSync(dataLoc);
    }

    if (!fs.existsSync(dataLoc + '/hostList.json')) {
        fs.appendFile(dataLoc + '/hostList.json', '[]', function (err) {
            if (err) log(err, 'error');
        });
    }

    let parsed = JSON.parse(fs.readFileSync(dataLoc + '/hostList.json'));
    let returnList = [];
    parsed.forEach(host => {
        returnList.push(new Host.Host(host));
    });
    return returnList;
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

function log(message, type = 'log') {
    dotenv.config();

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

    if (!fs.existsSync(dataLoc)) {
        fs.mkdirSync(dataLoc);
    }
    
    fs.appendFile(dataLoc + '/logs.txt', `[${datetime.toISOString()}] ${type} : ${message} <br>`, function (err) {
        if (err) log(err, 'error');
    });  
}

function getLogs() {
    if (!fs.existsSync(dataLoc)) {
        fs.mkdirSync(dataLoc);
    }

    if (!fs.existsSync(dataLoc + '/logs.txt')) {
        fs.appendFile(dataLoc + '/logs.txt', '', function (err) {
            if (err) log(err, 'error');
        });
    }

    let data = fs.readFileSync(dataLoc + '/logs.txt', 'utf8');
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