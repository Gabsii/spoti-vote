const dotenv = require('dotenv');
//Setup of the server
const app = require('./app').server;

dotenv.config();

let portBack = process.env.PORTBACK;

/**
* Starts the server
*/
app.listen(portBack, () => {
    console.log('INFO: Server started on port: ' + app.address().port);
});
