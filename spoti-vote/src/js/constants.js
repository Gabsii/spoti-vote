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
		default:
			return null;
	}
};

let codes = {
	SUCCESS: 200,
	NOTFOUND: 404,
	PLNOTFOUND: 414,
	ERROR: 500
};

let colors = {
	background: "#191414", // main background
	backgroundLite: "#282828", // background for elements
	green: "#1DB954", // main color
	greenDarker: "#002000", // text shadow for green
	greenCard: "#2ECC71", // tint for card
	blueCard: "#3498DB", // tint for card
	redCard: "#E74C3C", // tint for card
	yellowCard: "#F1C40F", // tint for card
	font: "#FFFFFF", // all texts
	fontSecondary: "#B3B3B3" // text color for UI elements
}

module.exports = {
	colors: colors,
	iterateCardColors: iterateCardColors,
	codes: codes
}

//let color = require('./css/colors.js'); Path to this file color.green == "1DB954"