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
			access_token: ""
		}
	}
	componentDidMount() {
		let access_token = queryString.parse(window.location.search).access_token;
		this.setState({access_token});
		if (!access_token) {
			window.location = "http://localhost:3000/";
		}

	}
	render() {
		let access_token = queryString.parse(window.location.search).access_token;

		return (<section style={{
				backgroundColor: color.background,
				height: '100vh',
				width: '100vw'
			}}>
			<Menu token={access_token}/>
			<Sidebar token={access_token}/>
			<CardContainer token={access_token}/>
			<Footer token={access_token}/>
		</section>);
	}
}

export default App;
