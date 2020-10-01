const dotenv = require('dotenv');
const fs = require('fs');

const dataLoc = 'handler/data.json';

function getData() {
    try {
        raw = fs.readFileSync(dataLoc);
        return JSON.parse(raw);
    } catch (error) {
        return {
            hosts: [],
            rooms: []
        };
    }
    
}

function setData(data) {
    let json = JSON.stringify(data);
    fs.writeFileSync(dataLoc, json);
}

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
    let frontendUri = (frontendPort === 443) ? 'https://': 'http://' + ipAddress + ':' + frontendPort + '/dashboard';

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

module.exports = {
    getEnv: getEnv,
    getData: getData,
    setData: setData
};