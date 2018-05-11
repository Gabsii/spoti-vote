import React, {Component} from 'react';

let constants = require('../../js/constants');
let defaultStyle = {
	height: '100px',
	width: '100%',
	backgroundColor: constants.colors.backgroundLite,
	textOverflow: 'ellipsis',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center'
}

class LoginFooter extends Component {

	render() {

		return (<footer style={defaultStyle}></footer>);
	}
}
export default LoginFooter;
