import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faHome} from '@fortawesome/fontawesome-free-solid';

let config = require('../../js/config');

let defaultStyle = {
	width: '75px',
	height: '75px',
	boxSizing: 'border-box',
	padding: '10px',
	paddingTop: '25px'
};

class Home extends Component {
	render() {
		return (<a href={'http://' + config.ipAddress + ':' + config.portFrontend}>
			<div style={defaultStyle}>
				<FontAwesomeIcon icon={faHome} size="2x" className=""/>
			</div>
		</a>);
	}
}
export default Home;
