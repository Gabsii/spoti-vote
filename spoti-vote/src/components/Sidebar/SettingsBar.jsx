import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faCog, faSignOutAlt} from '@fortawesome/fontawesome-free-solid';

let constants = require('../../js/constants');
let config = require('../../js/config');

let defaultStyle = {
	width: '100%',
	minWidth: 0,
	height: '32px',
	boxSizing: 'border-box',
	marginTop: 'auto',
	padding: '4px 16px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between'
}

let buttonStyle = {
	border: 0,
	color: constants.colors.fontSecondary,
	background: 'none'
}

class SettingsBar extends Component {

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

	logoutHandler() {
		if (this.props.isHost === true) {
			if (window.confirm('This will close the room, are you sure?')) {
				this.props.socket.emit('logout');
				window.location.pathname = '/';
			}
		} else {
			window.location.pathname = '/';
		}
	}

	render() {
		let linkStyle;
		if (this.state.hover) {
			linkStyle = {
				cursor: 'pointer'
			}
		} else {
			linkStyle = {
				cursor: 'context-menu'
			}
		}
		return (<div style={defaultStyle}>
			<button style={{
					...buttonStyle,
					...linkStyle
				}} onMouseEnter={this.toggleHover.bind(this)} onMouseLeave={this.toggleHover.bind(this)}>
				<FontAwesomeIcon icon={faCog} size="2x"/>
			</button>
			<button style={{
					...buttonStyle,
					...linkStyle
				}} onClick={this.logoutHandler.bind(this)} onMouseEnter={this.toggleHover.bind(this)} onMouseLeave={this.toggleHover.bind(this)}>
				<FontAwesomeIcon icon={faSignOutAlt} size="2x"/>
			</button>
		</div>);
	}
}
export default SettingsBar;
