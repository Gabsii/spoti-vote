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
		this.state = {
			user: {}
		}
	}

	componentDidMount() {
		fetch('http://localhost:8888/instance/host?id='+window.location.pathname.split('/')[2], {
		}).then((response) => response.json().then(data => this.setState({
			user: {
				name: data.name,
				id: data.id,
				image: data.image,
				profileUrl: data.profileUrl
			}
		})));
	}

	render() {
		return (<div style={defaultStyle}>
			<Infos loggedIn={this.props.loggedIn} update={this.props.update} user={this.state.user} playlistHandler={this.props.playlistHandler} playlistData={this.props.playlistData}/>
			<UserContainer loggedIn={this.props.loggedIn} user={this.state.user}/>
		</div>);
	}
}
export default Sidebar;
