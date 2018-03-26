import React, {Component} from 'react';

let color = require('../../css/colors.js');

let defaultStyle = {
	flexBasis: 'calc(50% - 40px)',
	margin: '20px',
	backgroundPosition: 'center',
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover',
	backgroundColor: color.blueCard
}

let imgStyle = {
	height: '100%',
	width: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column'
}

class Card extends Component {

	hexToRgb(hex) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result
			? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16)
			}
			: null;
	}

	render() {
		const tint = this.hexToRgb(this.props.color);
		return (<div style={{
				...defaultStyle,
				backgroundImage: 'url(' + this.props.background + ')'
			}}>
			<div style={{
					...imgStyle,
					backgroundColor: 'rgba(' + tint.r + ',' + tint.g + ',' + tint.b + ',' + 0.5 + ')'
				}}>
				<div style={{

						fontSize: '2em'
					}}>{this.props.song}</div>
				<div>{this.props.artists}</div>
				<div style={{

						fontSize: '1.25em'
					}}>{this.props.votes + " Votes"}</div>
			</div>
		</div>);
	}
}
export default Card;
