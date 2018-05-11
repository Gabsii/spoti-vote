import React, {Component} from 'react';
import LoginCode from './Login/LoginCode.jsx';
import LoginButton from './Login/LoginButton.jsx';

const constants = require('../js/constants');
const ipAddress = window.location.host || 'localhost';
const portFront = window.location.port || 80;
const portBack = 8888;

class Join extends Component {
	render() {
		return (<main style={{
				width: '100%',
				height: '100vh',
				backgroundColor: constants.colors.backgroundLite,
				color: constants.colors.font

			}}>
			<header style={{
					width: '100%',
					height: '100px',
					backgroundColor: constants.colors.background,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}>
				<a href="/" style={{
						fontSize: "2.5em",
						textAlign: 'center'
					}}>Spoti-Vote</a>
			</header>
			<div style={{
					width: 'calc(100% - 40px)',
					backgroundColor: constants.colors.backgroundLite,
					boxSizing: 'borderBox',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
					padding: '20px'
				}}>
				<div style={{
						fontSize: "2em",
						marginTop: "2em"
					}}>Join a Spoti-Vote Room</div><br/>
				<br/>
				<div>Ask your friend what the Room Code is and enter it below</div>
				<br/>
				<br/><br/>
				<br/>
				<div style={{
						fontSize: "1.5em"
					}}>Room Code</div>
				<LoginCode/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<div style={{
						marginTop: "2em",
						marginBottom: "0.5em"
					}}>Or host your own Room!</div>
				<LoginButton/>
			</div>
		</main>);
	}
}

export default Join;
