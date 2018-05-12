import React, {Component} from 'react';
import MediaQuery from 'react-responsive';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/fontawesome-free-solid';
import NavItem from './NavItem.jsx';
import logo from '../../img/spotiLogo.svg';

let constants = require('../../js/constants');
let backgroundColor = constants.colors.background;
const ipAddress = window.location.hostname || 'localhost';
const portBack = 8888;

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

	constructor() {
		super();
		this.state = {
			hover: false,
			target: null
		}
	}

	toggleHover(event) {
		this.setState({
			hover: !this.state.hover,
			target: event.target
		})
	}

	showNav() {
		let nav = document.getElementById("nav");
		if (nav.style.display == "none") {
			nav.style.display = 'flex';
		} else {
			nav.style.display = "none";
		}
	}

	render() {
		if (this.state.hover) {
			if (this.state.target !== null) {
				// eslint-disable-next-line
				this.state.target.style.color = constants.colors.green;
				// eslint-disable-next-line
				this.state.target.style.cursor = 'pointer';

			}
		} else {
			if (this.state.target !== null) {
				// eslint-disable-next-line
				this.state.target.style.color = constants.colors.font;
				// eslint-disable-next-line
				this.state.target.style.cursor = 'context-menu';
			}
		}

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
			{/* TODO: Logo (b/w) + text as one image */}

			<MediaQuery minWidth={constants.breakpoints.medium}>
				{
					(matches) => {
						if (matches) {
							return (<nav style={{
									flexGrow: 1,
									marginRight: '20px'
								}}>
								<ul style={navStyle}>
									<li style={itemStyle} onMouseEnter={this.toggleHover.bind(this)} onMouseLeave={this.toggleHover.bind(this)}>
										<a style={linkStyle} href="#features">Features</a>
									</li>
									<li style={itemStyle} onMouseEnter={this.toggleHover.bind(this)} onMouseLeave={this.toggleHover.bind(this)}>
										<a style={linkStyle} href="/">Usage</a>
									</li>
									<li style={itemStyle} onMouseEnter={this.toggleHover.bind(this)} onMouseLeave={this.toggleHover.bind(this)}>
										<a style={linkStyle} href="/">Contact</a>
									</li>
									<li style={divider}></li>
									<li style={itemStyle} onMouseEnter={this.toggleHover.bind(this)} onMouseLeave={this.toggleHover.bind(this)}>
										<a style={linkStyle} href={'http://' + ipAddress + ':' + portBack + '/login'}>Host</a>
									</li>
									<li style={{
											...itemStyle,
											marginRight: '2em'
										}} onMouseEnter={this.toggleHover.bind(this)} onMouseLeave={this.toggleHover.bind(this)}>
										<a style={linkStyle} href="/join">Join</a>
									</li>
								</ul>
							</nav>);
						} else {
							return (<div style={{
									...navStyle,
									color: constants.colors.font,
									flexGrow: 1,
									marginRight: '20px'
								}}>
								<FontAwesomeIcon icon={faBars} size="3x" onClick={this.showNav.bind(this)} onMouseEnter={this.toggleHover.bind(this)} onMouseLeave={this.toggleHover.bind(this)}/>
							</div>);
						}
					}
				}

			</MediaQuery>
			<MediaQuery maxWidth={constants.breakpoints.medium}>
				<ul id="nav" style={{
						width: '100%',
						position: 'absolute',
						top: '90px',
						// display: 'flex',
						display: 'none',
						flexDirection: 'column',
						alignItems: 'center',
						fontSize: '1.2em',
						color: constants.colors.font,
						backgroundColor: constants.colors.background
					}}>
					<NavItem name="Host" href={'http://' + ipAddress + ':' + portBack + '/login'}/>
					<NavItem name="Join" href={'/join'}/>
					<NavItem name="Features" href={'#features'}/>
					<NavItem name="Usage" href={'/'}/>
					<NavItem name="Contact Us" href={'/'}/>
				</ul>
			</MediaQuery>
		</header>);
	}
}
export default Header;
