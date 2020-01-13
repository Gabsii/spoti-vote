const dotenv = require('dotenv');

function getEnv() {
    dotenv.config();

    return {
        backendPort: process.env.PORTBACK,
        frontendPort: process.env.PORT,
        ipAddress: process.env.ADDRESS,
        spotifyClientId: process.env.SPOTIFY_CLIENT_ID, 
        spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        //Can be Changed when testing
        spotifyAccountAddress: 'https://accounts.spotify.com',
        spotifyApiAddress: 'https://api.spotify.com',
    };
}

module.exports = {
    getEnv: getEnv
};