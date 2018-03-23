import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faVolumeDown, faVolumeUp} from '@fortawesome/fontawesome-free-solid';

let color = require('../../css/colors.js');
let defaultStyle = {
	width: '250px',
	height: '75px',
	position: 'absolute',
	right: 0,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	marginRigth: '15px',
	backgroundColor: color.redCard
};

let sliderStyle = {
	width: '50%',
	height: '25px',
	background: '#d3d3d3',
	outline: 'none',
	display: 'inline-block',
	marginLeft: '8px',
	marginRight: '8px'
}

class VolumeBar extends Component {
	render() {
		return (<div style={defaultStyle} id="player">
			<FontAwesomeIcon icon={faVolumeDown} size="lg"/>
			<input type="range" min="0" max="100" id="slider" style={sliderStyle}/>
			<FontAwesomeIcon icon={faVolumeUp} size="lg"/>
		</div>);
	}
}

export default VolumeBar;
