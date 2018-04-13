import React, {Component} from 'react';
import Footer from './Footer.jsx';
import Sidebar from './Sidebar.jsx';
import CardContainer from './Cards/CardContainer.jsx';
import queryString from 'query-string';
import socketIOClient from 'socket.io-client'

let constants = require('../js/constants');
let config = require('../js/config');

let defaultActivePlayer = {
	progress: 0,
	track: {
		name: 'Spotify isnt running',
		album: {
			images: [
				{
					url: 'http://via.placeholder.com/75x75'
				}
			]
		},
		artists: [
			{
				name: 'Turn on Spotify'
			}
		]
	}
};
let defaultActivePlaylist = {
	name: 'Host is selecting',
	images: [
		{
			url: 'http://via.placeholder.com/152x152'
		}
	],
	external_urls: {
		spotify: ''
	}
};

class App extends Component {
	constructor() {
		super();
		this.socket = socketIOClient('http://' + config.ipAddress + ':' + config.portBackend);
		this.state = {
			token: queryString.parse(window.location.search).token || null,
			roomId: window.location.pathname.split('/')[2],
			loginPage: 'http://' + config.ipAddress + ':' + config.portFrontend,
			isHost: false,
			connectedUser: [],
			playlists: [],
			host: {
				name: null,
				voted: null
			},
			activePlaylist: defaultActivePlaylist,
			activeTracks: {},
			activePlayer: defaultActivePlayer
		}
	}

	componentDidMount() {
		//When the server asks for the id, it will return the id and the token
		this.socket.on('roomId', data => {
			this.socket.emit('roomId', {
				roomId: this.state.roomId,
				token: this.state.token
			});
		});

		//When the server asks for a name, the user is prompted with popups
		this.socket.on('nameEvent', data => {
			let name = window.prompt('Enter Name:');
			if (name !== null) {
				while (data.userNames.indexOf(name) !== -1 || name.length > 15) {
					if (name.length > 15) {
						name = window.prompt('This Name is to long, choose another with a maximum of 15 characters:');
					} else {
						name = window.prompt('This Name is already taken, choose another:');
					}
				}
			}
			if (name === null || name === '') {
				window.alert('You have to enter a Name.');
				window.location.pathname = '/';
			} else {
				this.socket.emit('nameEvent', {name: name});
			}
		});

		this.socket.on('initData', data => {
			this.setState({
				host: {
					name: data.hostName,
					voted: this.state.host.voted
				},
				playlists: data.playlists,
				isHost: data.isHost
			});

		});

		this.socket.on('update', data => {
			if (data === null) {
				this.setState({
					connectedUser: [],
					host: {
						name: 'No host found',
						voted: null
					},
					activePlaylist: this.state.activePlaylist,
					activeTracks: [],
					activePlayer: defaultActivePlayer
				});
			} else {
				this.setState({
					connectedUser: data.connectedUser || [],
					host: data.host || {
						name: 'No host found',
						voted: null
					},
					activePlaylist: data.activePlaylist || this.state.activePlaylist,
					activeTracks: data.activeTracks || [],
					activePlayer: data.activePlayer || defaultActivePlayer
				});
			}
		});

		this.socket.on('errorEvent', data => {
			window.alert(data.message);
			window.location.pathname = '/';
		});
	}

	selectPlaylist(event) {
		let playlistId = event.target.options[event.target.selectedIndex].getAttribute('id');
		if (playlistId !== null && playlistId !== 'none') {
			this.socket.emit('changePlaylist', {playlistId: playlistId});
		}
	}

	render() {
		return (<section style={{
				backgroundColor: constants.colors.background,
				height: '100vh',
				width: '100vw'
			}}>
			<Sidebar isHost={this.state.isHost} connectedUser={this.state.connectedUser} host={this.state.host} playlistHandler={this.selectPlaylist.bind(this)} activePlaylist={this.state.activePlaylist} activeTracks={this.state.activeTracks} playlists={this.state.playlists}/>
			<CardContainer room={this.state.roomId} name={this.state.name} isHost={this.state.isHost} activeTracks={this.state.activeTracks} socket={this.socket}/>
			<Footer isHost={this.state.isHost} activePlayer={this.state.activePlayer} socket={this.socket}/>
		</section>);
	}
}

export default App;
