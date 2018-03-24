import React, {Component} from 'react';
import Footer from './Footer.jsx';
import Sidebar from './Sidebar/Sidebar.jsx'

let color = require('../css/colors.js');

class App extends Component {
	render() {
		return (<section style={{
				backgroundColor: color.background,
				height: '100vh',
				width: '100vw'
			}}>
			<Sidebar/>
			<Footer/>
		</section>);
	}
}

export default App;
