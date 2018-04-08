import React, {Component} from 'react';
import Card from './Card.jsx';

let constants = require('../../constants.js');

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

	render() {
		if (this.props.activeTracks.length > 0) {
			return (<div style={defaultStyle}>
				{this.props.activeTracks.map(function(track, index){
					return <Card randomTrack={track} key={index} color={constants.iterateCardColors(index)}/>
				})}
			</div>);
		} else {
			return (<div style={defaultStyle}></div>);
		}

	}
}
export default CardContainer;
