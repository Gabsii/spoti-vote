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
		return (<div style={defaultStyle}>
			<FontAwesomeIcon icon={faHome} size="2x" className=""/>
		</div>);
	}
}
export default Home;
