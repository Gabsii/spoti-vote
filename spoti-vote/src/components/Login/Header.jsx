import React, {Component} from 'react';
import logo from '../../img/spotiLogo.svg';
let constants = require('../../js/constants');

let backgroundColor = constants.colors.background;
let defaultDimensions = {
	height: '5em',
	width: '5em',
	marginLeft: '5px'
};
let divider = { // TODO: display:none if screen too small
	height: '19px',
	margin: '0px 9px 0px 1.5em',
	borderLeft: '1px solid #5b5a5a'
}
let navStyle = {
	padding: 0,
	margin: 0,
	display: 'flex',
	justifyContent: 'flex-end',
	alignItems: 'center'
}
let itemStyle = {
	listStyle: 'none',
	margin: '0 0 0 1em',
	textShadow: '0 2px 0 darken(#fff, 50%)'
}
let linkStyle = {
	textDecoration: 'none',
	color: constants.colors.font,
	fontSize: '1.2em',
	letterSpacing: '1px'

}

class Header extends Component {

	hover() {
		{/* onHover change font colors */
		}
	}

	render() {
		return (<header style={{
				backgroundColor,
				height: '90px',
				overflow: 'hidden',
				display: 'flex',
				alignItems: 'center'
			}}>
			<div style={{
					...defaultDimensions,
					marginRight: '20px'
				}}>
				{/* TODO: have a margin if enough space, make logo smaller and b/w */}
				<img style={defaultDimensions
} src={logo} alt={"logo"}></img>
			</div>
			<b style={{
					color: constants.colors.font,
					fontSize: "2em"
				}}>Spoti Vote</b>
			{/* TODO: Logo + text as one image */}
			<nav style={{
					flexGrow: 1,
					marginRight: '20px'
				}}>
				<ul style={navStyle}>
					{/* TODO: if too few space change to faBars */}
					<li style={itemStyle}>
						<a style={linkStyle} href="#features">Features</a>
					</li>
					<li style={itemStyle}>
						<a style={linkStyle} href="/usage">Usage</a>
					</li>
					<li style={itemStyle}>
						<a style={linkStyle} href="/contact">Contact</a>
					</li>
					<li style={divider}></li>
					<li style={itemStyle}>
						<a style={linkStyle} href="TBA">Host</a>
						{/* TODO: add real adress */}
					</li>
					<li style={{
							...itemStyle,
							marginRight: '2em'
						}}>
						<a style={linkStyle} href="/join">Join</a>
					</li>
				</ul>
			</nav>
		</header>);
	}
}
export default Header;
