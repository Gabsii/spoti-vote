import React, {Component} from 'react';
let constants = require('../../js/constants');

let itemStyle = {
	listStyle: 'none',
	margin: '0 0 0 1em',
	textShadow: '0 2px 0 darken(#fff, 50%)'
}
let linkStyle = {
	textDecoration: 'none',
	fontSize: '1.2em',
	letterSpacing: '1px'
}

class NavItem extends Component {

	constructor() {
		super();
		this.state = {
			hover: false
		}
	}

	toggleHover(event) {
		this.setState({
			hover: !this.state.hover
		})
	}

	render() {
		let hoverStyle;
		if (this.state.hover) {
			hoverStyle = {
				color: constants.colors.green,
				cursor: 'pointer'
			}

		} else {
			hoverStyle = {
				color: constants.colors.font,
				cursor: 'context-menu'
			}
		}

		return (<li style={{
				...itemStyle,
				...hoverStyle,
				width: '100%',
				height: '50px',
				margin: '5px 0',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				padding: '10px',
				borderTop: '1px solid rgba(255,255,255,0.1)'
			}} onMouseEnter={this.toggleHover.bind(this)} onMouseLeave={this.toggleHover.bind(this)}>
			<a style={linkStyle} href={this.props.href}>{this.props.name}</a>
		</li>);
	}
}
export default NavItem;
