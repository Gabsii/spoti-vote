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
			access_token: "",
			selectedPlaylist: {
				name: '',
				id: '',
				img: '',
				href: ''
			}
		}
	}

	componentDidMount() {
		let access_token = queryString.parse(window.location.search).access_token;
		this.setState({access_token});
		// if (!access_token) {
		// 	window.location = "http://localhost:3000/";
		// }

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
		let access_token = queryString.parse(window.location.search).access_token;
		return (<section style={{
				backgroundColor: color.background,
				height: '100vh',
				width: '100vw'
			}}>
			<Menu token={access_token}/>
			<Sidebar token={access_token} playlistHandler={this.selectPlaylist.bind(this)} playlistCover={this.state.selectedPlaylist.img} playlistUrl={this.state.selectedPlaylist.url}/>
			<CardContainer token={access_token} playlist={this.state.selectedPlaylist}/>
			<Footer token={access_token}/>
		</section>);
	}
}

export default App;
