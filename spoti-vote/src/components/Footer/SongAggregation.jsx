import React, {Component} from 'react';

let constants = require('../../js/constants');
let defaultStyle = {
	height: '75px',
	width: '150px',
	position: 'absolute',
	bottom: 0,
	left: '75px',
	marginLeft: '10px',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center'
}

class SongAggregation extends Component {
	render() {
		let artistString = '';
		for (var i = 0; i < this.props.artists.length; i++) {
			artistString += this.props.artists[i].name;
			if (i < this.props.artists.length - 1) {
				artistString += ', ';
			}
		}
		console.log(this.props.artists);
		return (<div style={defaultStyle}>
			<div style={{
					color: constants.colors.font
				}}>
				{this.props.songName}
			</div>
			<div style={{
					color: constants.colors.fontSecondary,
					marginTop: '5px'
				}}>
				{artistString}
			</div>
		</div>);
	}
}
export default SongAggregation;
