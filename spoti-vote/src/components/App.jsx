import React, {Component} from 'react';
import Footer from './Footer.jsx';
import Sidebar from './Sidebar/Sidebar.jsx';
import CardContainer from './Cards/CardContainer.jsx';
import queryString from 'query-string';

let color = require('../css/colors.js');

class App extends Component {
	componentDidMount() {
		const access_token = queryString.parse(window.location.search).access_token;
		if (!access_token) {
			window.location = "http://localhost:3000/";
		}
	}
	render() {
		return (<section style={{
				backgroundColor: color.background,
				height: '100vh',
				width: '100vw'
			}}>
			<Sidebar/>
			<CardContainer/>
			<Footer/>
		</section>);
	}
}

export default App;
