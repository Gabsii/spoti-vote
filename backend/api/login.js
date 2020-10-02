const querystring = require('querystring');
const env = require('../handler/handler').getEnv();

module.exports = (req, res) => {
    try {
        // eslint-disable-next-line no-console
        console.log('INFO: Host was sent to Spotify login');
        let redirect_uri = env.redirectUri;
        res.redirect(env.spotifyAccountAddress + '/authorize?' + querystring.stringify({response_type: 'code', client_id: process.env.SPOTIFY_CLIENT_ID, scope: 'user-read-private user-read-email user-read-currently-playing user-modify-playback-state user-read-playback-state user-top-read playlist-read-collaborative playlist-read-private', redirect_uri}));
    } catch (error) {
        res.status(400).send('Login from the main page.');
    }
}