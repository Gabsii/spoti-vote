const querystring = require('querystring');
const handler = require('../handler/handler');
const env = handler.getEnv();

module.exports = (req, res) => {
    try {
        handler.log('INFO: Host was sent to Spotify login');
        let redirect_uri = env.redirectUri;
        res.redirect(env.spotifyAccountAddress + '/authorize?' + querystring.stringify({response_type: 'code', client_id: process.env.SPOTIFY_CLIENT_ID, scope: 'user-read-private user-read-email user-read-currently-playing user-modify-playback-state user-read-playback-state user-top-read playlist-read-collaborative playlist-read-private', redirect_uri}));
    } catch (error) {
        handler.log(error, 'error');
        res.redirect(env.frontendUri);
    }
};