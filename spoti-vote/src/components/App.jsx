import React, {Component} from 'react';
import MediaQuery from 'react-responsive';
// import queryString from 'query-string';
import socketIOClient from 'socket.io-client'
import Cookies from 'universal-cookie';
import ReactGA from 'react-ga';
import swal from 'sweetalert2';
import Footer from './Footer.jsx';
import Sidebar from './Sidebar.jsx';
import CardContainer from './Cards/CardContainer.jsx';

const constants = require('../js/constants');
const ipAddress = window.location.host || 'localhost';
const portFront = window.location.port || 80;
const portBack = 8888;

const cookies = new Cookies();

let defaultActivePlayer = {
	progress: 0,
	track: {
		name: 'Spotify isn\'t running',
		album: {
			images: [
				{
					url: 'https://via.placeholder.com/75x75'
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
			url: 'https://via.placeholder.com/152x152'
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
		console.log("Google Analytics init");
		ReactGA.initialize('UA-119126759-1');
		ReactGA.set({page: window.location.pathname});
		ReactGA.pageview(window.location.pathname);
		//When the server asks for the id, it will return the id and the token
		this.socket.on('roomId', data => {
			this.socket.emit('roomId', {
				roomId: this.state.roomId,
				token: this.state.token
			});
		});

		//When the server asks for a name, the user is prompted with popups
		this.socket.on('nameEvent', data => { // SWAL
			swal({
				title: 'What is your name?',
				type: 'question',
				allowOutsideClick: false,
				allowEscapeKey: false,
				input: 'text',
				inputPlaceholder: 'Enter your name or nickname',
				inputValidator: (value) => {
					return new Promise((resolve) => {
						console.log(data.userNames.indexOf(value));
						if (!value || value === "") {
							return resolve('You need to write something!');
						}
						if (data.userNames.indexOf(value) !== -1 || value.length > 15) {
							if (value.length > 15) {
								return resolve('This Name is too long, choose another with a maximum of 15 characters!');
							} else {
								return resolve('This Name is already taken, choose another!');
							}
						}
						return resolve();
					});
				}
			}).then((result) => {
				console.log(result);
				this.socket.emit('nameEvent', {name: result.value});
			})
		});

		this.socket.on('initData', data => {
			if (data.token !== null && data.token !== undefined) {
				cookies.set('token', data.token, {path: '/'});
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
			this.setState({
				connectedUser: data.connectedUser || [],
				host: {
					name: this.state.host.name,
					voted: data.host.voted
				},
				activeTracks: data.activeTracks || [],
				activePlaylist: data.activePlaylist || this.state.activePlaylist,
				activePlayer: data.activePlayer || defaultActivePlayer
			});
		});

		this.socket.on('errorEvent', data => {
			if (data.message !== null && data.message !== undefined) {
				swal({type: 'error', title: 'Oops...', text: data.message})
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
