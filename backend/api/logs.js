const handler = require('../handler/handler');

module.exports = (req, res) => {
    res.send(handler.getLogs());
};