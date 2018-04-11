//http://amritb.github.io/socketio-client-tool/
"use strict"; //Places the server in a strict enviroment (More exeptions, catches coding blooper, prevents unsafe actions, disables some features)
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

let config = require('./src/config');
let constants = require('./src/constants');

let app = express();

let server = http.createServer(app);

let io = socketIo(server);

let theApiFunction = async function(socket) {
    socket.emit('update', 'Message');
};

io.on('connection', socket => {
    console.log('New client connected');
    setInterval(
        () => theApiFunction(socket),1000
    );
    socket.on('update', data => {
        console.log(data);
    })
    socket.on('disconnect', () => console.log('Client disconnected'));
});

//wss.send('Hello');




server.listen(config.portBackend, () => {
    console.log('Server started on port: ' + server.address().port);
});
