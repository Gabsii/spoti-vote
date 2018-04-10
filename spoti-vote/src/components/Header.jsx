import React, {Component} from 'react';
import logo from '../img/spotiLogo.svg';
let constants = require('../js/constants');

let backgroundColor = constants.colors.background;
let height = "100px";
let width = "100px";
let defaultDimensions = {
	height,
	width
};
class Header extends Component {
	render() {
		return (<header style={{
				backgroundColor,
				height: "100px",
				marginBottom: "25px"
			}} className="header">
			<div style={defaultDimensions} className="imageContainer">
				<img style={defaultDimensions} src={logo} alt={"logo"}></img>
			</div>
		</header>);
	}
}
export default Header;
