import React, {Component} from 'react';
import MediaQuery from 'react-responsive';
import queryString from 'query-string';
import socketIOClient from 'socket.io-client'
import Footer from './Footer.jsx';
import Sidebar from './Sidebar.jsx';
import CardContainer from './Cards/CardContainer.jsx';
import Cookies from 'universal-cookie';


const constants = require('../js/constants');
const ipAddress = process.env.ADDRESS || 'localhost';
const portFront = process.env.PORTFRONT || 80;
const portBack = process.env.PORTBACK || 8888;

const cookies = new Cookies();

let defaultActivePlayer = {
	progress: 0,
	track: {
		name: 'Spotify isn\'t running',
		album: {
			images: [
				{
					url: 'http://via.placeholder.com/75x75'
				}
			]
		},
		artists: [
			{
				name: 'Start Spotify'
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
		this.socket = socketIOClient('http://' + ipAddress + ':' + portBack);
		let token = cookies.get('token');
		if (token === undefined) {
			token = null;
		}

		this.state = {
			token: token,
			roomId: window.location.pathname.split('/')[2],
			loginPage: 'http://' + ipAddress + ':' + portFront,
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
			if (data.token !== null && data.token !== undefined) {
				cookies.set('token', data.token, { path: '/' });
				this.setState({
					host: {
						name: data.hostName,
						voted: this.state.host.voted
					},
					playlists: data.playlists,
					isHost: data.isHost,
					token: data.token
				});
			} else {
				this.setState({
					host: {
						name: data.hostName,
						voted: this.state.host.voted
					},
					playlists: data.playlists,
					isHost: data.isHost
				});
			}
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
			if (data.message !== null && data.message !== undefined) {
				window.alert(data.message);
			}
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
			<MediaQuery minWidth={constants.breakpoints.medium}>{
					(matches) => {
						if (matches) {
							return (<Sidebar isPhone={false} socket={this.socket} isHost={this.state.isHost} connectedUser={this.state.connectedUser} host={this.state.host} playlistHandler={this.selectPlaylist.bind(this)} activePlaylist={this.state.activePlaylist} activeTracks={this.state.activeTracks} playlists={this.state.playlists}/>);
						} else {
							return (<Sidebar isPhone={true} socket={this.socket} isHost={this.state.isHost} connectedUser={this.state.connectedUser} host={this.state.host} playlistHandler={this.selectPlaylist.bind(this)} activePlaylist={this.state.activePlaylist} activeTracks={this.state.activeTracks} playlists={this.state.playlists}/>);
						}
					}
				}
			</MediaQuery>
			<MediaQuery minWidth={constants.breakpoints.medium}>{
					(matches) => {
						if (matches) { // = tablet^
							return <CardContainer isPhone={false} room={this.state.roomId} name={this.state.name} isHost={this.state.isHost} activeTracks={this.state.activeTracks} socket={this.socket}/>
						} else { // = phone
							return <CardContainer isPhone={true} room={this.state.roomId} name={this.state.name} isHost={this.state.isHost} activeTracks={this.state.activeTracks} socket={this.socket}/>
						}
					}
				}
			</MediaQuery>
			<Footer isHost={this.state.isHost} activePlayer={this.state.activePlayer} socket={this.socket}/>
		</section>);
	}
}

export default App;
