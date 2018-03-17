import React, {Component} from 'react';
import '../css/header.css';
import logo from '../img/sbahn.png'

class Header extends Component {

	render() {
		return (<header className="header">
			<div className="imageContainer">
				<img src={logo} alt={"logo"}></img>
			</div>
		</header>);
	}
}
export default Header;
