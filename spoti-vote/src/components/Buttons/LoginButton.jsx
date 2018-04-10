import React, {Component} from 'react';
import '../../css/selectors.css';

let constants = require('../../js/constants');
let config = require('../../js/config');

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
		window.location.href = 'http://' + config.ipAddress + ':' + config.portBackend + '/login';
	}

	render() {
		return (<button id="loginbutton" style={defaultStyle} className="sticky" onClick={this.login.bind(this)} tabIndex="0">
			Host
		</button>);
	}
}
export default LoginButton;
