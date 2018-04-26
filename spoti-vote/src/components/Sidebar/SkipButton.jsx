import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faStepForward} from '@fortawesome/fontawesome-free-solid';

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
		this.props.socket.emit('vote', {
			trackId: 'skip'
		});
	}

	render() {
		let linkStyle;
		this.state.hover
			? linkStyle = {
				cursor: 'pointer'
			}
			: linkStyle = {
				cursor: 'context-menu'
			}

		return (<button style={{
				...buttonStyle,
				...linkStyle
			}} onClick={this.skip.bind(this)} onMouseEnter={this.toggleHover.bind(this)} onMouseLeave={this.toggleHover.bind(this)}>
			<FontAwesomeIcon icon={faStepForward} size="2x"/>
		</button>);
	}
}
export default SkipButton;
