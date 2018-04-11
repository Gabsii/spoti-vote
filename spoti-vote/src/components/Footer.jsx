import React, {Component} from 'react';
import SongIcon from './Footer/SongIcon.jsx';
import SongAggregation from './Footer/SongAggregation.jsx';
import VolumeBar from './Footer/VolumeBar.jsx';
import Progressbar from './Footer/ProgressBar.jsx';

let constants = require('../js/constants');
let defaultStyle = {
	height: '75px',
	width: '100vw',
	position: 'absolute',
	bottom: 0,
	backgroundColor: constants.colors.backgroundLite,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center'
}

class Footer extends Component {

	render() {
		let track = {
			img: '',
			name: '',
			artists: []
		}
		if (this.props.activePlayer !== null && this.props.activePlayer !== undefined) {

			if (this.props.activePlayer.track !== null && this.props.activePlayer.track !== undefined) {
				track = {
					img: this.props.activePlayer.track.album.images[0].url,
					name: this.props.activePlayer.track.name,
					artists: this.props.activePlayer.track.artists
				}
			}
		}

		return (<footer style={defaultStyle}>
			<SongIcon background={track.img}/>
			<SongAggregation songName={track.name} artists={track.artists}/>
			<Progressbar activePlayer={this.props.activePlayer}/> {
				this.props.isHost
					? <VolumeBar activePlayer={this.props.activePlayer}/>
					: ''
			}

		</footer>);
	}
}
export default Footer;
