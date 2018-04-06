import React, {Component} from 'react';
import Footer from './Footer.jsx';
import Sidebar from './Sidebar.jsx';
import Menu from './Menubar/Menu.jsx';
import CardContainer from './Cards/CardContainer.jsx';
import queryString from 'query-string';

let color = require('../css/colors.js');

let ip = '10.51.51.33';

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
			}
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

	selectPlaylist(event) {
		this.setState({
			selectedPlaylist: {
				name: event.target.value,
				img: event.target.options[event.target.selectedIndex].getAttribute('img'),
				id: event.target.options[event.target.selectedIndex].getAttribute('id'),
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
			<Sidebar loggedIn={this.state.loggedIn} playlistHandler={this.selectPlaylist.bind(this)} playlistCover={this.state.selectedPlaylist.img} playlistUrl={this.state.selectedPlaylist.url}/>
			<CardContainer loggedIn={this.state.loggedIn} playlist={this.state.selectedPlaylist}/>
			<Footer loggedIn={this.state.loggedIn}/>
		</section>);
	}
}

export default App;
