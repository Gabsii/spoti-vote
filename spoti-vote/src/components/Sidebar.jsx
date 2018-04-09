import React, {Component} from 'react';
import Infos from './Sidebar/Infos.jsx';
import UserContainer from './Sidebar/UserContainer.jsx';

let constants = require('../js/constants.js');
let defaultStyle = {
	height: 'calc(100vh - 75px)',
	width: '250px',
	position: 'absolute',
	top: 0,
	right: 0,
	color: 'white',
	backgroundColor: constants.colors.backgroundLite
}

class Sidebar extends Component {

	render() {
		return (<div style={defaultStyle}>
			<Infos loggedIn={this.props.loggedIn} activeTracks={this.props.activeTracks} host={this.props.host} playlistHandler={this.props.playlistHandler} activePlaylist={this.props.activePlaylist} numPlaylists={this.props.numPlaylists}/>
			{this.props.loggedIn ? <UserContainer activeTracks={this.props.activeTracks} loggedIn={this.props.loggedIn} connectedUser={this.props.connectedUser}/> : <div></div>}
		</div>);
	}
}
export default Sidebar;
