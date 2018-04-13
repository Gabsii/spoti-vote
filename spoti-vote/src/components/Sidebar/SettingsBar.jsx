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
	padding: '4px 16px',
	position: 'relative',
	bottom: 0,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	color: constants.colors.fontSecondary
}

class User extends Component {

	render() {
		return (<div style={defaultStyle}>
			<a>
				<FontAwesomeIcon icon={faCog} size="2x"/>
			</a>
			<a href={'http://' + config.ipAddress + ':' + config.portFrontend + '/'}>
				<FontAwesomeIcon icon={faSignOutAlt} size="2x"/>
			</a>
		</div>);
	}
}
export default User;
