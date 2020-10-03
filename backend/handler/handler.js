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

const dataLoc = 'handler/data.json';

function getData() {
    let parsed = {
        hosts: [],
        rooms: []
    };
    try {
        parsed = JSON.parse(fs.readFileSync(dataLoc));
    } catch (error) {
        console.error('data.json file had to be created.');
    }

    let hosts = [];
    let rooms = [];

    parsed.hosts.forEach(obj => {
        hosts.push(new Host.Host(obj));
    });
    
    parsed.rooms.forEach(room => {
        room.host = new Host.Host(room.host);
        rooms.push(new Room.Room(room));
    });

    return {
        hosts: hosts,
        rooms: rooms
    };
    
}

function setData(data) {
    let json = JSON.stringify(data);
    fs.writeFileSync(dataLoc, json);
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
module.exports = {
    getEnv,
    setData,
    getData,
    allowCors
};