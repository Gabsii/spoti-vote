import React, {Component} from 'react';
import Home from '../Menubar/Home.jsx';
import Rooms from '../Menubar/Rooms.jsx';
import Logout from '../Menubar/Logout.jsx';

let constants = require('../../js/constants');
let defaultStyle = {
	width: '75px',
	height: 'calc(100vh - 75px)',
	position: 'absolute',
	top: 0,
	left: 0,
	textAlign: 'center',
	color: '#ffffff',
	backgroundColor: constants.colors.backgroundLite
};

class Menu extends Component {
	render() {
		return (<div style={defaultStyle}>
			<Home/>
			<Rooms/>
			<Logout/>
		</div>);
	}
}
export default Menu;
