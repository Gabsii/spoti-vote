import React, {Component} from 'react';
import MediaQuery from 'react-responsive';

let constants = require('../../js/constants');

let borderStyle = {
	width: '25%',
	backgroundColor: constants.colors.barBackground,
	borderRadius: '11px'
}

class Progressbar extends Component {

	constructor() {
		super();
		this.state = {
			hover: false
		}
	}

	toggleHover() {
		this.setState({
			hover: !this.state.hover
		})
	}

	render() {
		let linkStyle;
		if (this.state.hover) {
			linkStyle = {
				background: constants.colors.green
			}
		} else {
			linkStyle = {
				background: constants.colors.fontSecondary
			}
		}

		let progressStyle = {
			background: constants.colors.fontSecondary,
			height: '10px',
			borderStyle: 'solid',
			borderRadius: '15px',
			borderColor: '#333',
			margin: '1px',
			animation: 'width 3s ease-out infinite',
			width: '0%'
		}
		if (this.props.activePlayer !== null) {
			if (this.props.activePlayer.progress !== undefined) {
				progressStyle.width = this.props.activePlayer.progress + '%';
			}
		}

		return (<MediaQuery maxWidth={constants.breakpoints.medium}>
			{
				(matches) => {
					if (matches) { //isPhone
						return '';
					} else { //isLaptop
						return (<div style={borderStyle} onMouseEnter={this.toggleHover.bind(this)} onMouseLeave={this.toggleHover.bind(this)}>
							<div role="progressbar" style={{
									...progressStyle,
									...linkStyle
								}}></div>
						</div>);
					}
				}
			}
		</MediaQuery>);
	}
}
export default Progressbar;
