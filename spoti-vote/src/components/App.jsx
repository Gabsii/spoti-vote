import React, {Component} from 'react';
import Footer from './Footer.jsx';
import Sidebar from './Sidebar.jsx';
import Menu from './Menubar/Menu.jsx';
import CardContainer from './Cards/CardContainer.jsx';
import queryString from 'query-string';

let constants = require('../js/constants');
let config = require('../js/config');

class App extends Component {
	constructor() {
		super();
		this.state = {
			loggedIn: false,
			activePlaylist: {},
			activeTracks: {},
			numPlaylists: 0,
			connectedUser: [],
			host: {},
			update: true,
			name: null
		}
	}

	componentDidMount() {
		let token = queryString.parse(window.location.search).token;
		//let name = queryString.parse(window.location.search).name; -> This has to be moved to the name input
		if (token !== undefined) {
			fetch('http://' + config.ipAddress + ':' + config.portBackend + '/room/checkToken?id='+window.location.pathname.split('/')[2] + '&token=' + token, {
			}).then((response) => response.json().then(data => {
				switch (data.responseCode) {
					case 200:
						this.setState({loggedIn: data.content});
						break;
					default:
						window.location.pathname = '/';
						break;
				}
			})).catch(function() {
				//window.location.reload();
			});
		} else {
			this.setState({loggedIn: false});
		}
		// else if (name !== undefined){    -> This has to be moved to the name input
		// 	this.setState({
		// 		name: name
		// 	})
		// 	fetch('http://' + config.ipAddress + ':' + config.portBackend + '/room/connect?id='+window.location.pathname.split('/')[2] + '&name=' + name, {
		// 	}).then((response) => response.json().then(data => {})).catch(function() {});
		// } else {
		// 	window.location.pathname = '/';
		// }
	}

	componentDidUpdate() {
		fetch('http://' + config.ipAddress + ':' + config.portBackend + '/room/update?id='+window.location.pathname.split('/')[2]+'&loggedIn='+this.state.loggedIn, {
		}).then((response) => response.json().then(data => {
			setTimeout(function() {
				switch (data.responseCode) {
					case 200:
						this.setState({activePlaylist: data.content.activePlaylist, activeTracks: data.content.activeTracks, numPlaylists: data.content.numPlaylists, connectedUser: data.content.connectedUser, host: data.content.host});
						break;
					default:
						window.location.pathname = '/';
						break;
				}
			}.bind(this), 500);
		})).catch(function() {
			window.location.reload();
		});
	}

	selectPlaylist(event) {
		let playlistId = event.target.options[event.target.selectedIndex].getAttribute('id');
		if (playlistId == null) {
			playlistId = 'none';
		}
		fetch('http://' + config.ipAddress + ':' + config.portBackend + '/room/newTracks?id='+window.location.pathname.split('/')[2]+'&playlist='+playlistId, {
		}).then((response) => response.json().then(data => {}));
	}

	render() {
		return (<section style={{
				backgroundColor: constants.colors.background,
				height: '100vh',
				width: '100vw'
			}}>
			{/* <Menu/> */}
			<Sidebar loggedIn={this.state.loggedIn} connectedUser={this.state.connectedUser} host={this.state.host} playlistHandler={this.selectPlaylist.bind(this)} activePlaylist={this.state.activePlaylist} activeTracks={this.state.activeTracks} numPlaylists={this.state.numPlaylists}/>
			<CardContainer name={this.state.name} loggedIn={this.state.loggedIn} activeTracks={this.state.activeTracks}/>
			<Footer loggedIn={this.state.loggedIn}/>
		</section>);
	}
}

export default App;
