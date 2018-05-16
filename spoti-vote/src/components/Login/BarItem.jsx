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

class BarItem extends Component {

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
				cursor: 'pointer',
				color: constants.colors.green
			}
		} else {
			hoverStyle = {
				cursor: 'context-menu',
				color: constants.colors.font
			}
		}

		return (<li style={itemStyle} onMouseEnter={this.toggleHover.bind(this)} onMouseLeave={this.toggleHover.bind(this)}>
			<a style={{
					...linkStyle,
					...hoverStyle
				}} href={this.props.url}>{this.props.name}</a>
		</li>);
	}
}
export default BarItem;
