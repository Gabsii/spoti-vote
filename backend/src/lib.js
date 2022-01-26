/**
 * Return the room with the specified id
 *
 * @author: Michiocre
 * @param {string} roomId The id that identifies the room
 * @param {array} rooms Array of all the rooms
 * @return {Room} The room object with the id of the parameter
 */
function getRoomById(roomId, rooms) {
    let room = null;
    for (var i = 0; i < rooms.length; i++) {
        if (rooms[i].id === roomId) {
            room = rooms[i];
            return room;
        }
    }
    return null;
}

function getObjectDifference(oldData, data) {
    if (!oldData) {
        return data;
    }
    let diff = {};
    Object.keys(data).forEach((key) => {
        if (typeof data[key] !== 'object' || !data[key]) {
            if (oldData[key]) {
                if (data[key] !== oldData[key]) {
                    diff[key] = data[key];
                }
            } else {
                diff[key] = data[key];
            }
        } else if (Array.isArray(data[key])) {
            if (oldData[key]) {
                let nextData = getObjectDifference(oldData[key], data[key]);
                if (nextData && Object.entries(nextData).length > 0) {
                    diff[key] = data[key];
                }
            } else {
                diff[key] = data[key];
            }
        } else {
            if (oldData[key]) {
                var nextData = getObjectDifference(oldData[key], data[key]);
                if (nextData && Object.entries(nextData).length > 0) {
                    diff[key] = nextData;
                }
            } else {
                diff[key] = data[key];
            }
        }
    });
    return diff;
}

let codes = {
    SUCCESS: 200,
    NOTFOUND: 404,
    PLNOTFOUND: 414,
    ERROR: 500,
};

let auth = {
    apiKey: null,
    apiSecret: null,
};

module.exports = {
    getObjectDifference,
    getRoomById,
    codes,
    auth,
};
