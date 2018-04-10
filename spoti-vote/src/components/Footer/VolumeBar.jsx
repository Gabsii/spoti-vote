import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faVolumeDown, faVolumeUp} from '@fortawesome/fontawesome-free-solid';

let constants = require('../../js/constants');
let defaultStyle = {
	width: '250px',
	height: '75px',
	position: 'absolute',
	right: 0,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	marginRigth: '15px',
	backgroundColor: constants.colors.redCard
};

let sliderStyle = {
	width: '50%',
	display: 'inline-block',
	marginLeft: '10px',
	marginRight: '10px'
}

class VolumeBar extends Component {
	render() { 								//onChange={this.props.volumeHandler}
		return (<div style={defaultStyle} id="player">
			<FontAwesomeIcon icon={faVolumeDown} size="lg"/>
			<input type="range" min="0" max="100" id="slider" style={sliderStyle}/>
			<FontAwesomeIcon icon={faVolumeUp} size="lg"/>
		</div>);
	}
}

export default VolumeBar;
