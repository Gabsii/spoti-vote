import React, {Component} from 'react';
import '../../css/selectors.css';

let constants = require('../../js/constants.js');

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
	marginBottom: "0.75em"
}
class LoginCode extends Component {

	render() {
		return (<a href='hrefZuRoomViaRoomCode'>
			<button id="loginbutton" style={defaultStyle}>
				Enter a Room
			</button>
		</a>);
	}
}
export default LoginCode;
