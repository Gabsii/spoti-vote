import React, {Component} from 'react';
import '../../css/selectors.css';

let constants = require('../../js/constants');
const ipAddress = window.location.hostname || 'localhost';
const portFront = window.location.port || 80;
const portBack = 8888;

let defaultStyle = {
	// color: constants.colors.font,
	padding: "17px 48px",
	fontSize: "0.9em",
	lineHeight: 1,
	borderRadius: "500px",
	borderWidth: 0,
	letterSpacing: "2px",
	minWidth: "160px",
	maxHeight: "50px",
	textTransform: "uppercase",
	whiteSpace: "normal",
	backgroundColor: constants.colors.green,
	marginTop: '1.5em'
}
class LoginButton extends Component {

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

	login() {
		window.location.href = 'http://' + ipAddress + ':' + portBack + '/login';
	}

	render() {
		let linkStyle;
		if (this.state.hover) {
			linkStyle = {
				cursor: 'pointer',
				backgroundColor: constants.colors.greenHover
			}
		} else {
			linkStyle = {
				cursor: 'context-menu'
			}
		}
		return (<button id="loginbutton" style={{
				...defaultStyle,
				...linkStyle
			}} onMouseEnter={this.toggleHover.bind(this)} onMouseLeave={this.toggleHover.bind(this)} onClick={this.login.bind(this)} tabIndex="0">
			Host
		</button>);
	}
}
export default LoginButton;
