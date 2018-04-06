import React, {Component} from 'react';
import Footer from './Footer.jsx';
import Sidebar from './Sidebar.jsx';
import Menu from './Menubar/Menu.jsx';
import CardContainer from './Cards/CardContainer.jsx';
import queryString from 'query-string';

let color = require('../css/colors.js');

class App extends Component {
	constructor() {
		super();
		this.state = {
			loggedIn: null,
			activePlaylist: {},
			activeTracks: {},
			numPlaylists: 0,
			user: {},
			update: true
		}
	}

	componentDidMount() {
		let token = queryString.parse(window.location.search).token;

		fetch('http://localhost:8888/instance/checkToken?id='+window.location.pathname.split('/')[2] + '&token=' + token, {
		}).then((response) => response.json().then(data => {
			this.setState({
				loggedIn: data
			});
		})).catch(function() {
			window.location.reload;
		});

		fetch('http://localhost:8888/instance/host?id='+window.location.pathname.split('/')[2], {
		}).then((response) => response.json().then(data => this.setState({
			user: data
		})));
	}

	componentDidUpdate() {
		fetch('http://localhost:8888/instance/update?id='+window.location.pathname.split('/')[2]+'&loggedIn='+this.state.loggedIn, {
		}).then((response) => response.json().then(data => {
			setTimeout(function() {
				if (this.state.activeTracks != data.activeTracks || this.state.numPlaylists != data.numPlaylists || this.state.activePlaylist != data.activePlaylist) {
					this.setState({
						activePlaylist: data.activePlaylist,
						activeTracks: data.activeTracks,
						numPlaylists: data.numPlaylists
					});
				}

			}.bind(this), 500);
			if (data.activePlaylist != undefined) {

			}
		})).catch(function() {
			window.location.reload;
		});
	}

	selectPlaylist(event) {
		let playlistId = event.target.options[event.target.selectedIndex].getAttribute('id');
		if (playlistId == null) {
			playlistId = 'none';
		}
		fetch('http://localhost:8888/instance/newTracks?id='+window.location.pathname.split('/')[2]+'&playlist='+playlistId, {
		}).then((response) => response.json().then(data => {}));
	}

	render() {
		return (<section style={{
				backgroundColor: color.background,
				height: '100vh',
				width: '100vw'
			}}>
			<Menu/>
			<Sidebar loggedIn={this.state.loggedIn} user={this.state.user} playlistHandler={this.selectPlaylist.bind(this)} activePlaylist={this.state.activePlaylist} numPlaylists={this.state.numPlaylists}/>
			<CardContainer activeTracks={this.state.activeTracks}/>
			<Footer/>
		</section>);
	}
}

export default App;
