import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faVolumeDown, faVolumeUp} from '@fortawesome/fontawesome-free-solid';
import '../../../css/Volumebar.css';

let constants = require('../../../js/constants');
let defaultStyle = {
	height: '75px',
	maxWidth: '250px',
	minWidth: '200px',
	fontFamily: 'Circular Medium',
	position: 'absolute',
	right: 0,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: constants.colors.backgroundLite
};

let sliderStyle = {
	width: '50%',
	marginLeft: '10px',
	marginRight: '10px'
}

class VolumeBar extends Component {

	volumeHandler(event) {
		if (event.target.value !== this.props.activePlayer.volume) {
			this.props.socket.emit('changeVolume', {volume: event.target.value});
		}
	}

	render() { //onChange={this.props.volumeHandler}
		return (<div style={defaultStyle} id="player">
			<FontAwesomeIcon icon={faVolumeDown} style={{
					color: constants.colors.fontSecondary
				}} size="lg"/>
			<input onChange={this.volumeHandler.bind(this)} type="range" min="0" step="2" max="100" defaultValue={this.props.activePlayer.volume} id="volume" style={sliderStyle}/>
			<FontAwesomeIcon icon={faVolumeUp} style={{
					color: constants.colors.fontSecondary
				}} size="lg"/>
		</div>);
	}
}

export default VolumeBar;
