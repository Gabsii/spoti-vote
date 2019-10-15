const dotenv = require('dotenv');
//Setup of the server
const App = require('./Classes/App').App;

dotenv.config();

let secTillDelete = 60;

let env = {
    backendPort: process.env.PORTBACK,
    frontendPort: process.env.PORT,
    ipAddress: process.env.ADDRESS
};

let Application = new App(env, secTillDelete);

/**
* Starts the server
*/
Application.server.listen(env.backendPort, () => {
    console.log('INFO: Server started on port: ' + Application.server.address().port);
});