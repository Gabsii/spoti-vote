import React, {Component} from 'react';

let color = require('../../css/colors.js');

let defaultStyle = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	flexBasis: 'calc(50% - 40px)',
	flexDirection: 'column',
	margin: '20px',
	backgroundColor: color.blueCard
}

let contentStyle = {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'center'
}

class Card extends Component {

	render() {
		console.log(this.props);
		const imgUrl = require(this.props.background);
		return (<div style={{
				...defaultStyle
			}}>
			<img src={imgUrl} alt="img"/>
			<div style={{
					...contentStyle,
					fontSize: '2em'
				}}>{this.props.song}</div>
			<div style={contentStyle}>{this.props.artists}</div>
			<div style={{
					...contentStyle,
					fontSize: '1.25em'
				}}>{this.props.votes + " Votes"}</div>
		</div>);
	}
}
export default Card;
