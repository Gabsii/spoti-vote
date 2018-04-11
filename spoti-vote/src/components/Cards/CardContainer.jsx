import React, {Component} from 'react';
import Card from './Card.jsx';

let constants = require('../../js/constants');
let config = require('../../js/config');

let defaultStyle = {
	height: 'calc(100vh - 125px)',
	maxWidth: 'calc(100vw - 200px)',
	minWidth: 'calc(100vw - 250px)',
	position: 'absolute',
	top: 0,
	left: 0,
	display: 'flex',
	flexWrap: 'wrap',
	flexDirection: 'row',
	padding: '25px',
	overflow: 'hidden',
	backgroundColor: constants.colors.background
}

class CardContainer extends Component {

	constructor() {
		super();
		this.state = {
			voted: null
		}
	}

	voteHandler(trackId) {
		if (this.state.voted !== trackId) {
			this.setState({voted: trackId});
			this.props.socket.emit('vote', {
				trackId: trackId
			});
		}
	}

	render() {
		if (this.props.activeTracks.length > 0) {
			return (<main style={defaultStyle}>
				{
					this.props.activeTracks.map((track, index) => {
						return <Card randomTrack={track} onClick={this.voteHandler.bind(this, track.id)} key={index} color={constants.iterateCardColors(index)}/>
					})
				}
			</main>);
		} else {
			return (<main style={defaultStyle}></main>);
		}

	}
}
export default CardContainer;
