import React, {Component} from 'react';
import Infos from './Sidebar/Infos.jsx';
import UserContainer from './Sidebar/UserContainer.jsx';
import userIcon from '../img/abstract-user-flat-1.svg';

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
		this.state = {
			currentUser: {}
		}
	}

	componentDidMount() {
		let access_token = this.props.token;
		fetch("https://api.spotify.com/v1/me", {
			headers: {
				"Authorization": "Bearer " + access_token
			}
		}).then((response) => response.json().then(data => {
			if (data.images.length > 0) {
				this.setState({
					userData: {
						user: {
							name: data.display_name,
							id: data.id,
							image: data.images[0].url,
							profileUrl: data.external_urls.spotify
						}
					}
				});
			} else {
				this.setState({
					userData: {
						user: {
							name: data.display_name,
							id: data.id,
							image: userIcon,
							profileUrl: data.external_urls.spotify
						}
					}
				})
			}
		}));
	}
	render() {
		return (<div style={defaultStyle}>
			<Infos token={this.props.token} users={this.state.currentUser} playlistHandler={this.props.playlistHandler} playlistCover={this.props.playlistCover} playlistUrl={this.props.playlistUrl}/>
			<UserContainer token={this.props.token} users={this.state.currentUser}/>
		</div>);
	}
}
export default Sidebar;
