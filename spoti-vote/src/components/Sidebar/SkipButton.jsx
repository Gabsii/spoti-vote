import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faRandom} from '@fortawesome/fontawesome-free-solid';

let constants = require('../../js/constants');

let buttonStyle = {
	border: 0,
	color: constants.colors.fontSecondary,
	background: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between'
}

class SkipButton extends Component {

	constructor() {
		super();
		this.state = {
			hover: false
		}
	}

	toggleHover() {
		this.setState({
			hover: !this.state.hover
		})
	}

	skip() {
		this.props.socket.emit('vote', {trackId: 'skip'});
	}

	render() {
		let linkStyle,
			flexStyle;
		this.state.hover
			? linkStyle = {
				cursor: 'pointer'
			}
			: linkStyle = {
				cursor: 'context-menu'
			}
		console.log(this.props.isPhone);
		this.props.isPhone
			? flexStyle = {
				flexDirection: 'column'
			}
			: flexStyle = {
				flexDirection: 'row'
			}

		let users = this.props.connectedUser.length + 1;
		let skips = 0;
		for (let j = 0; j < this.props.connectedUser.length; j++) {
			if (this.props.connectedUser[j].voted === 'skip') {
				skips++;
			}
		}
		if (this.props.host.voted === 'skip') {
			skips++;
		}

		return (<button style={{
				...buttonStyle,
				...linkStyle,
				...flexStyle
			}} onClick={this.skip.bind(this)} onMouseEnter={this.toggleHover.bind(this)} onMouseLeave={this.toggleHover.bind(this)}>
			<FontAwesomeIcon icon={faRandom} size="2x"/>
			<div style={this.props.isPhone
					? {
						marginLeft: 0
					}
					: {
						marginLeft: '1em'
					}}>{skips + "/" + users}</div>
		</button>);
	}
}
export default SkipButton;
