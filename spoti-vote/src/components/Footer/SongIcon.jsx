import React, {Component} from 'react';

let color = require('../../css/colors.js');
let defaultStyle = {
	height: '75px',
	width: '75px',
	position: 'absolute',
	bottom: 0,
	left: 0,
	backgroundColor: color.green
}

class SongIcon extends Component {
	render() {
		return (<img style={defaultStyle} alt="Album Art"></img>);
	}
}
export default SongIcon;
