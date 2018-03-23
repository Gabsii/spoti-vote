import React, {Component} from 'react';
import '../../css/selectors.css';

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
	backgroundColor: "#1db954",
	marginTop: "1.5em",
	marginRight: "2em",
	right: 0
}
class LoginButton extends Component {

	render() {
		return (<a href="http://localhost:8888/login">
			<button id="loginbutton" style={defaultStyle} className="sticky">
				Login
			</button>
		</a>);
	}
}
export default LoginButton;
