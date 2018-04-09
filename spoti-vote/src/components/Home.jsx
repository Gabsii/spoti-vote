import React, {Component} from 'react';

let color = require('../css/colors.js');
let defaultStyle = {
	height: 'calc(100vh - 75px)',
	width: 'calc(100vw - 75px)',
	position: 'absolute',
	top: 0,
	right: 0,
	color: 'white',
	backgroundColor: color.backgroundLite
}

class Sidebar extends Component {

	constructor() {
		super();
		this.state = {}
	}

	componentDidMount() {}

	render() {
		return (<div style={defaultStyle}></div>);
	}
}
export default Sidebar;
