import React, {Component} from 'react';
import Card from './Card.jsx';

let constants = require('../../js/constants.js');

let defaultStyle = {
	height: 'calc(100vh - 125px)',
	width: 'calc(100vw - 375px)',
	position: 'absolute',
	top: 0,
	left: '75px',
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
			console.log('Changed from: ' +this.state.voted+' to: ' +trackId);
			this.setState({
				voted: trackId
			});

			fetch('http://localhost:8888/room/vote?id='+window.location.pathname.split('/')[2] + '&loggedIn=' + this.props.loggedIn + '&track=' + trackId + '&name=' + this.props.name, {
			}).then((response) => response.json().then(data => {
				switch (data.responseCode) {
					case 200:
						this.setState({
							loggedIn: data.content
						});
						break;
					default:
						//window.location.pathname = '/';
						break;
				}
			})).catch(function() {
				//window.location.reload();
			});
		}
	}

	render() {
		if (this.props.activeTracks.length > 0) {
			return (<div style={defaultStyle}>
				{this.props.activeTracks.map((track, index) => {
					return <Card randomTrack={track} onClick={this.voteHandler.bind(this, track.id)} key={index} color={constants.iterateCardColors(index)}/>
				})}
			</div>);
		} else {
			return (<div style={defaultStyle}></div>);
		}

	}
}
export default CardContainer;
