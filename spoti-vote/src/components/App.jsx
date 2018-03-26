import React, {Component} from 'react';
import Footer from './Footer.jsx';
import Sidebar from './Sidebar/Sidebar.jsx';
import CardContainer from './Cards/CardContainer.jsx';

let color = require('../css/colors.js');

class App extends Component {
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
