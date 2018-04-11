import React, {Component} from 'react';
import SongIcon from './Footer/SongIcon.jsx';
import SongAggregation from './Footer/SongAggregation.jsx';
import VolumeBar from './Footer/VolumeBar.jsx';
import Progressbar from './Footer/Progressbar.jsx';

let constants = require('../js/constants');
let defaultStyle = {
	height: '75px',
	width: '100vw',
	position: 'absolute',
	bottom: 0,
	backgroundColor: constants.colors.backgroundLite
}

class Footer extends Component {

	constructor() {
		super();
		this.state = {
			image: '',
			songName: '',
			artists: ''
		}
	}

	componentDidUpdate() {
		if (this.props.activePlayer !== null && this.props.activePlayer.track !== undefined) {
			if (this.state.image !== this.props.activePlayer.track.album.images[0].url) {
				console.log(this.props.activePlayer.track);
				this.setState({image: this.props.activePlayer.track.album.images[0].url, songName: this.props.activePlayer.track.name, artists: this.props.activePlayer.track.artists});
			}
		}
	}

	render() {
		return (<footer style={defaultStyle}>
			<SongIcon background={this.state.image}/>
			<SongAggregation songName={this.state.songName} artists={this.state.artists}/>
			<Progressbar/> {
				this.props.loggedIn
					? <VolumeBar activePlayer={this.props.activePlayer} volumeHandler={this.props.volumeHandler}/>
					: ''
			}

		</footer>);
	}
}
export default Footer;
