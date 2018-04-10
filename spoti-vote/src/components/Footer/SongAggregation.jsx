import React, {Component} from 'react';

let constants = require('../../js/constants');
let defaultStyle = {
	height: '75px',
	width: '150px',
	position: 'absolute',
	bottom: 0,
	left: '75px',
	backgroundColor: constants.colors.blueCard
}

class SongAggregation extends Component {
	render() {
		return (<div style={defaultStyle}>
			<div>
				SONGNAME
			</div>
			<div>
				ARTISTS
			</div>
		</div>);
	}
}
export default SongAggregation;
