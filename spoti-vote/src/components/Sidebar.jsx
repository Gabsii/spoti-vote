import React, {Component} from 'react';
import Infos from './Sidebar/Infos.jsx';
import UserContainer from './Sidebar/UserContainer.jsx';
import SettingsBar from './Sidebar/SettingsBar.jsx';
import '../css/mediaQueries.css';

let constants = require('../js/constants');
let defaultStyle = {
	height: 'calc(100vh - 75px)',
	maxWidth: '250px',
	minWidth: '200px',
	position: 'absolute',
	top: 0,
	right: 0,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	flexFlow: 'column',
	color: 'white',
	backgroundColor: constants.colors.backgroundLite
}

class Sidebar extends Component {

	render() {
		return (<div id="sidebar" style={defaultStyle}>
			<Infos isHost={this.props.isHost} host={this.props.host} playlistHandler={this.props.playlistHandler} activeTracks={this.props.activeTracks} activePlaylist={this.props.activePlaylist} playlists={this.props.playlists}/> {
				this.props.isHost
					? <UserContainer activeTracks={this.props.activeTracks} connectedUser={this.props.connectedUser}/>
					: ''
			}
			<SettingsBar isHost={this.props.isHost} socket={this.props.socket}/>
			<style></style>
		</div>);
	}
}
export default Sidebar;
