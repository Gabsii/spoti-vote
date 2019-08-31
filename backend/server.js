const dotenv = require('dotenv');
//Setup of the server
const server = require('./app').server;

dotenv.config();

let portBack = process.env.PORTBACK;

/**
* Starts the server
*/
server.listen(portBack, () => {
    console.log('INFO: Server started on port: ' + server.address().port);
});