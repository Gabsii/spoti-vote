import React, {Component} from 'react';
import '../../css/selectors.css';

let constants = require('../../js/constants');
const ipAddress = process.env.ADDRESS || 'localhost';
const portFront = process.env.PORTFRONT || 80;
const portBack = process.env.PORTBACK || 8888;

let defaultStyle = {
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
	marginTop: "1.5em",
	marginRight: "2em",
	right: 0
}
class LoginButton extends Component {

	login() {
		window.location.href = 'http://' + ipAddress + ':' + portBack + '/login';
	}

	render() {
		return (<button id="loginbutton" style={defaultStyle} className="sticky" onClick={this.login.bind(this)} tabIndex="0">
			Host
		</button>);
	}
}
export default LoginButton;
