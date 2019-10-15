const dotenv = require('dotenv');
//Setup of the server
const App = require('./Classes/App').App;

dotenv.config();

let secTillDelete = 60;
let spotifyAccountAddress = 'https://accounts.spotify.com';
let spotifyApiAddress = 'https://api.spotify.com';

let env = {
    backendPort: process.env.PORTBACK,
    frontendPort: process.env.PORT,
    ipAddress: process.env.ADDRESS,
    spotifyClientId: process.env.SPOTIFY_CLIENT_ID, 
    spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET
};

let Application = new App(true, env, secTillDelete, spotifyAccountAddress, spotifyApiAddress);

/**
* Starts the server
*/
Application.server.listen(env.backendPort, () => {
    // eslint-disable-next-line no-console
    console.log('INFO: Server started on port: ' + Application.server.address().port);
});