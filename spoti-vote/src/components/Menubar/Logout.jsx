import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faSignOutAlt} from '@fortawesome/fontawesome-free-solid';

let constants = require('../../js/constants.js');
let defaultStyle = {
	width: '75px',
	height: '75px',
	position: 'absolute',
	bottom: 0,
	left: 0,
	textAlign: 'center',
	color: '#ffffff',
	backgroundColor: constants.colors.backgroundLite
};

class Logout extends Component {
	fetchServer() {
		console.log('loggedin + roomid mitgeben');
	}

	render() {
		return (<a href={"http://localhost:3000/"} onClick={this.fetchServer.bind(this)}>
			<div style={defaultStyle}>
				<FontAwesomeIcon icon={faSignOutAlt} size="2x"/>
			</div>
		</a>);
	}
}
export default Logout;
