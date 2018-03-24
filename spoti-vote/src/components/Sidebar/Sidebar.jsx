import React, {Component} from 'react';
import Infos from './Infos.jsx';
import UserContainer from './UserContainer.jsx';

let color = require('../../css/colors.js');
let defaultStyle = {
	height: 'calc(100vh - 75px)',
	width: '250px',
	position: 'absolute',
	top: 0,
	right: 0,
	backgroundColor: color.backgroundLite
}

class Sidebar extends Component {
	render() {
		return (<div style={defaultStyle}><Infos/><UserContainer/></div>);
	}
}
export default Sidebar;
