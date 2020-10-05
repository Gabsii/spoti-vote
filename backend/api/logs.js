import handler from '../handler/handler';

module.exports = (req, res) => {
    res.send(handler.getLogs());
};