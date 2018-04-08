let iterateCardColors = function(index){
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

let colors = {
	background: "#191414",
	backgroundLite: "#282828",
	green: "#1DB954",
	greenCard: "#2ECC71",
	blueCard: "#3498DB",
	redCard: "#E74C3C",
	yellowCard: "#F1C40F",
	font: "#FFFFFF"
}

let codes = {
	SUCCESS: 200,
	NOTFOUND: 404,
	PLNOTFOUND: 414,
	ERROR: 500
};

module.exports = {
	colors: colors,
	iterateCardColors: iterateCardColors,
	codes: codes
}

//let color = require('./css/colors.js'); Path to this file color.green == "1DB954"
