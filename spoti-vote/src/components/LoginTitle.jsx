import React, {Component} from 'react';
let constants = require('../js/constants');

let defaultContainer = {
	flexDirection: 'column',
	marginTop: 'auto',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	boxSizing: 'content-box',
	width: '20em',
	height: '5em',
	position: 'relative',
	margin: 'auto',
	padding: '1em',
	overflow: 'hidden',
	border: 'none',
	borderRadius: '10px',
	color: constants.colors.green,
	textAlign: 'center',
	textOverflow: 'ellipsis',
	background: 'rgba(25, 20, 20, 0.25)',
	WebkitBoxSizing: 'content-box',
	MozBoxSizing: 'content-box',
	OTextOverflow: 'ellipsis',
	WebkitBorderRadius: '10px'
}

let defaultTitle = {
	fontSize: '2em',
	marginTop: 0,
	fontFamily: 'Circular Medium'
}

// TODO: fix this style

class LoginTitle extends Component {
	render() {
		return (<div style={defaultContainer}>
			<div>
				<h1 style={defaultTitle} id="scroller">Spoti Vote</h1>
			</div>
			<div>
				Kahoot x Spotify Collabs
			</div>
		</div>);
	}
}
export default LoginTitle;
