import React, {Component} from 'react';
import Footer from './Footer.jsx';
import Sidebar from './Sidebar.jsx';
import Menu from './Menubar/Menu.jsx';
import CardContainer from './Cards/CardContainer.jsx';
import queryString from 'query-string';

let constants = require('../js/constants.js');

class App extends Component {
	constructor() {
		super();
		this.state = {
			loggedIn: false,
			activePlaylist: {},
			activeTracks: {},
			numPlaylists: 0,
			connectedUser: [],
			user: {},
			update: true
		}
	}

	componentDidMount() {
		let token = queryString.parse(window.location.search).token;
		let name = queryString.parse(window.location.search).name;
		if (token !== undefined) {
			fetch('http://localhost:8888/room/checkToken?id='+window.location.pathname.split('/')[2] + '&token=' + token, {
			}).then((response) => response.json().then(data => {
				switch (data.responseCode) {
					case 200:
						this.setState({
							loggedIn: data.content
						});
						break;
					default:
						window.location.pathname = '/';
						break;
				}
			})).catch(function() {
				//window.location.reload();
			});
		} else if (name !== undefined){
			fetch('http://localhost:8888/room/connect?id='+window.location.pathname.split('/')[2] + '&name=' + name, {
			}).then((response) => response.json().then(data => {})).catch(function() {
				//window.location.reload();
			});
		} else {
			window.location.pathname = '/';
		}

		fetch('http://localhost:8888/room/host?id='+window.location.pathname.split('/')[2], {
		}).then((response) => response.json().then(data => {
			switch (data.responseCode) {
				case 200:
					this.setState({
						user: data.content,
					});
					break;
				default:
					window.location.pathname = '/';
					break;
			}
		}));
	}

	componentDidUpdate() {
		fetch('http://localhost:8888/room/update?id='+window.location.pathname.split('/')[2]+'&loggedIn='+this.state.loggedIn, {
		}).then((response) => response.json().then(data => {
			setTimeout(function() {
				switch (data.responseCode) {
					case 200:
						this.setState({
							activePlaylist: data.content.activePlaylist,
						 	activeTracks: data.content.activeTracks,
						 	numPlaylists: data.content.numPlaylists,
						 	connectedUser: data.content.connectedUser
						});
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
		fetch('http://localhost:8888/room/newTracks?id='+window.location.pathname.split('/')[2]+'&playlist='+playlistId, {
		}).then((response) => response.json().then(data => {}));
	}

	render() {
		return (<section style={{
				backgroundColor: constants.colors.background,
				height: '100vh',
				width: '100vw'
			}}>
			<Menu/>
			<Sidebar loggedIn={this.state.loggedIn} connectedUser={this.state.connectedUser} user={this.state.user} playlistHandler={this.selectPlaylist.bind(this)} activePlaylist={this.state.activePlaylist} numPlaylists={this.state.numPlaylists}/>
			<CardContainer activeTracks={this.state.activeTracks}/>
			<Footer/>
		</section>);
	}
}

export default App;
