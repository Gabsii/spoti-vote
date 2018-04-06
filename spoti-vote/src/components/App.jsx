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
			selectedPlaylist: {
				name: '',
				id: '',
				img: '',
				href: ''
			},
			update: {}
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
	}

	componentDidUpdate() {
		fetch('http://localhost:8888/instance/update?id='+window.location.pathname.split('/')[2]+'&loggedIn='+this.state.loggedIn, {
		}).then((response) => response.json().then(data => {
			if (data.activePlaylist != undefined) {
				setTimeout(function() {
					this.setState({
						update: data
					});
				}.bind(this), 3000);
			}

		})).catch(function() {
			window.location.reload;
		});
	}

	selectPlaylist(event) {
		let playlistId = event.target.options[event.target.selectedIndex].getAttribute('id');
		fetch('http://localhost:8888/instance/newTracks?id='+window.location.pathname.split('/')[2]+'&playlist='+playlistId, {
		}).then((response) => response.json().then(data => {

		}));
		this.setState({
			selectedPlaylist: {
				name: event.target.value,
				img: event.target.options[event.target.selectedIndex].getAttribute('img'),
				id: playlistId,
				url: event.target.options[event.target.selectedIndex].getAttribute('url'),
				href: event.target.options[event.target.selectedIndex].getAttribute('href')
			}
		});
	}

	render() {

		return (<section style={{
				backgroundColor: color.background,
				height: '100vh',
				width: '100vw'
			}}>
			<Menu loggedIn={this.state.loggedIn}/>
			<Sidebar loggedIn={this.state.loggedIn} update={this.state.update} playlistHandler={this.selectPlaylist.bind(this)} playlistData={this.state.selectedPlaylist}/>
			<CardContainer loggedIn={this.state.loggedIn} playlist={this.state.selectedPlaylist}/>
			<Footer loggedIn={this.state.loggedIn}/>
		</section>);
	}
}

export default App;
