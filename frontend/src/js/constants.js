let config = require('./config');

let codes = {
    SUCCESS: 200,
    NOTFOUND: 404,
    PLNOTFOUND: 414,
    ERROR: 500
};

let colors = {
    background: '#191414', // main background
    backgroundLite: '#282828', // background for elements
    green: '#1DB954', // main color
    greenHover: '#1ED760', // main color when hovered
    greenDarker: '#002000', // text shadow for green
    greenCard: '#2ECC71', // tint for card
    blueCard: '#3498DB', // tint for card
    redCard: '#E74C3C', // tint for card
    yellowCard: '#F1C40F', // tint for card
    skip: '#8E44AD', // skip color
    font: '#FFFFFF', // all texts
    fontSecondary: '#B3B3B3', // text color for UI elements
    barBackground: '#404040' // background color for bar elements
};

// http://gs.statcounter.com/screen-resolution-stats

let breakpoints = {
    //only focuses on width
    small: 375, // [0;375] 375x667 small Smartphones
    medium: 760, // ]375;760] large Smartphones
    large: 980, // ]760;980] Tablets
    xlarge: 1280 // ]980;1280] Laptops (everything else is DESKTOP FIRST)
};

let iterateCardColors = function(index) {
    switch (index % 4) {
        case 0:
            return colors.greenCard;
        case 1:
            return colors.blueCard;
        case 2:
            return colors.redCard;
        case 3:
            return colors.yellowCard;
        case 4:
            return colors.skip;
        default:
            return null;
    }
};

module.exports = {
    config: config,
    colors: colors,
    iterateCardColors: iterateCardColors,
    codes: codes,
    breakpoints: breakpoints
};

//let color = require('./css/colors.js'); Path to this file color.green == '1DB954'