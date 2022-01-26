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

module.exports = {
    getObjectDifference,
};
