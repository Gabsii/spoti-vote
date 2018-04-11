import React, {Component} from 'react';

let constants = require('../../js/constants');

let borderStyle = {
	width: '25%',
	border: '1px solid lightgray',
	borderRadius: '15px'
}

class Progressbar extends Component {
	render() {
		let progressStyle = {
			//width must be manipulated
			background: 'linear-gradient(to right, #ffff00, #00ff00)',
			height: '14px',
			borderStyle: 'solid',
			borderRadius: '15px',
			borderColor: '#333',
			margin: '2px',
			animation: 'width 3s ease-out infinite',
			width: '0%'
		}
		if (this.props.activePlayer !== null) {
			if (this.props.activePlayer.progress !== undefined) {
				progressStyle = {
					//width must be manipulated
					background: 'linear-gradient(to right, #ffff00, #00ff00)',
					height: '14px',
					borderStyle: 'solid',
					borderRadius: '15px',
					borderColor: '#333',
					margin: '2px',
					animation: 'width 3s ease-out infinite',
					width: this.props.activePlayer.progress + '%'
				}
			}
		}

		return (<div style={borderStyle}>
			<div role="progressbar" style={progressStyle}></div>
		</div>);
	}
}
export default Progressbar;
