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
			selectedPlaylist: {
				name: '',
				id: '',
				img: '',
				href: ''
			}
		}
	}

	componentDidMount() {}

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
			<Menu/>
			<Sidebar playlistHandler={this.selectPlaylist.bind(this)} playlistCover={this.state.selectedPlaylist.img} playlistUrl={this.state.selectedPlaylist.url}/>
			<CardContainer playlist={this.state.selectedPlaylist}/>
			<Footer/>
		</section>);
	}
}

export default App;
