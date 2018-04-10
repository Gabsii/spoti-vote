import React, {Component} from 'react';
import '../../css/selectors.css';

let constants = require('../../js/constants.js');

let defaultStyle = {
	padding: "17px 40px",
	fontSize: "0.9em",
	lineHeight: 1,
	borderRadius: "500px",
	borderWidth: 0,
	letterSpacing: "2px",
	minWidth: "120px",
	maxWidth: "150px",
	maxHeight: "50px",
	textTransform: "uppercase",
	whiteSpace: "normal",
	backgroundColor: constants.colors.green,
	marginTop: "1.5em",
	marginRight: "15px"
}
class LoginCode extends Component {

	submitHandler() {
		// input hijacking
		console.log(this);
	}

	render() {
		return (<form style={{
				display: 'inline-block'
			}}>
			<input type="text" maxLength="5" placeholder="Room Code" style={{
					...defaultStyle,
					maxWidth: "100px",
					textAlign: "center",
					backgroundColor: constants.colors.background,
					color: constants.colors.font
				}} autoComplete="off"/>
			<input type="submit" id="loginbutton" value="enter" style={defaultStyle} onSubmit={this.submitHandler.bind(this)}/>
		</form>);
	}
}

export default LoginCode;
