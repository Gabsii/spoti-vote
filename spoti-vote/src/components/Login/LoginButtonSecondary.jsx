import React, {Component} from 'react';
import '../../css/selectors.css';

let constants = require('../../js/constants');
const ipAddress = window.location.hostname || 'localhost';
const portFront = window.location.port || 80;
const portBack = 8888;

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
	backgroundColor: 'rgba(0,0,0,0)',
	boxShadow: '0 0 0 2px ' + constants.colors.green + ' inset',
	color: constants.colors.green,
	marginTop: '1.5em',
	marginLeft: '2em'
}
class LoginButtonSecondary extends Component {

	login() {
		window.location.href = 'http://' + ipAddress + ':' + portBack + '/login';
	}

	render() {
		return (<button id="loginbuttonsecondary" style={defaultStyle} onClick={this.login.bind(this)} tabIndex="0">
			Join
		</button>);
	}
}
export default LoginButtonSecondary;
