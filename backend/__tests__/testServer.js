import express from'express';
import http from 'http';

function getServer(functions) {
    const app = express();
    const server = http.createServer(app);

    functions.forEach(func => {
        app.get(func.name, func.func);
    });

    return server;
}

module.exports = {
    getServer
};