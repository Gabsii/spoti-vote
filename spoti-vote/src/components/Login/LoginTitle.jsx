import React, {Component} from 'react';
import MediaQuery from 'react-responsive';
import LoginCode from './LoginCode.jsx';

let constants = require('../../js/constants');

let defaultContainer = {
	flexDirection: 'column',
	marginTop: 'auto',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	boxSizing: 'content-box',
	minWidth: '40%',
	maxWidth: '60%',
	position: 'relative',
	margin: 'auto',
	padding: '1em',
	overflow: 'hidden',
	border: 'none',
	borderRadius: '10px',
	color: constants.colors.green,
	textAlign: 'center',
	textOverflow: 'ellipsis',
	textShadow: '2px 2px ' + constants.colors.greenDarker,
	background: 'rgba(25, 20, 20, 0.5)',
	WebkitBoxSizing: 'content-box',
	MozBoxSizing: 'content-box',
	OTextOverflow: 'ellipsis',
	WebkitBorderRadius: '10px'
}

let defaultTitle = {
	fontSize: '5em',
	marginTop: 0,
	fontFamily: 'Circular Medium'
}

class LoginTitle extends Component {
	render() {
		return (<div style={defaultContainer}>
			<div>
				<h1 style={defaultTitle} id="scroller">Spoti Vote</h1>
			</div>
			<div>
				Kahoot x Spotify Collaboration
			</div>
			<MediaQuery maxWidth={constants.breakpoints.medium}>
				{
					(matches) => {
						if (matches) {
							return (<LoginCode isPhone={true}/>);
						} else {
							return (<LoginCode isPhone={false}/>);
						}
					}
				}
			</MediaQuery>
		</div>);
	}
}
export default LoginTitle;
