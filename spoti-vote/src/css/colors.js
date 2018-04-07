let iterateCardColors = function(index){
	switch (index % 4) {
		case 0:
			return greenCard;
		case 1:
			return blueCard;
		case 2:
			return redCard;
		case 3:
			return yellowCard;
		default:
			return null;
	}
};

let background = "#191414";
let backgroundLite = "#282828";
let green = "#1DB954";
let greenCard = "#2ECC71";
let blueCard = "#3498DB";
let redCard = "#E74C3C";
let yellowCard = "#F1C40F";
let font = "#FFFFFF";




module.exports = {
	background: background,
	backgroundLite: backgroundLite,
	green: green,
	greenCard: greenCard,
	blueCard: blueCard,
	redCard: redCard,
	yellowCard: yellowCard,
	font: font,
	iterateCardColors: iterateCardColors
}

//let color = require('./css/colors.js'); Path to this file color.green == "1DB954"
