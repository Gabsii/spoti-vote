import React, {Component} from 'react';
import Infos from './Sidebar/Infos.jsx';
import UserContainer from './Sidebar/UserContainer.jsx';

let color = require('../css/colors.js');
let defaultStyle = {
	height: 'calc(100vh - 75px)',
	width: '250px',
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

	render() {
		return (<div style={defaultStyle}>
			<Infos loggedIn={this.props.loggedIn} user={this.props.user} playlistHandler={this.props.playlistHandler} activePlaylist={this.props.activePlaylist} numPlaylists={this.props.numPlaylists}/>
			<UserContainer loggedIn={this.props.loggedIn} user={this.props.user}/>
		</div>);
	}
}
export default Sidebar;
