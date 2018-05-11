import React, {Component} from 'react';
import MediaQuery from 'react-responsive';
import Header from './Login/Header.jsx';
import LoginFooter from './Login/LoginFooter.jsx';
import LoginButton from './Login/LoginButton.jsx';
import LoginButtonSecondary from './Login/LoginButtonSecondary.jsx';
import image from '../img/samantha-gades-540989-unsplash.jpg';

let constants = require('../js/constants');
let sectionStyle = {
	height: '600px',
	width: '100%'
}

class Login extends Component {
	componentDidMount() {
		if (window.location.search !== '') {
			window.location.search = '';
		}
	}

	render() {
		window.addEventListener('touchmove', event => {
			console.log(event)
		}, {passive: true});
		return (<main>
			<Header/>
			<section style={{
					...sectionStyle,
					height: '700px',
					backgroundColor: constants.colors.backgroundLite,
					backgroundImage: 'url(' + image + ')',
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center top',
					backgroundAttachment: 'fixed'
				}}>
				<div style={{
						height: '100%',
						width: '100%',
						background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,1))',
						// backgroundColor: 'rgba(0,0,0,0.6)',
						display: 'flex',
						alignItems: 'center',
						padding: '10px',
						boxSizing: 'border-box'
					}}>
					<div style={{
							color: constants.colors.font,
							display: 'flex',
							alignItems: 'flex-start',
							flexDirection: 'column',
							marginTop: '-100px',
							paddingLeft: '100px'
						}}>
						<div>
							<strong style={{
									fontFamily: 'Circular Bold',
									fontSize: '3em'
								}}>Let your guests
								<br/>choose the music</strong>
						</div>
						<div style={{
								fontSize: '1.5em',
								marginTop: '0.25em'
							}}>All you need is Spotify</div>
						<div>
							<LoginButton/>
							<LoginButtonSecondary/>
						</div>
					</div>
				</div>
				{/* // landing section  <LoginButton/> */}
			</section>
			<section style={{
					...sectionStyle,
					backgroundColor: constants.colors.font
				}}>

				{/* features section */}
			</section>
			<section style={{
					...sectionStyle,
					backgroundColor: constants.colors.backgroundLite
				}}>
				{/* for section */}
			</section>
			<section style={{
					...sectionStyle,
					backgroundColor: constants.colors.font
				}}>
				{/* social section */}
			</section>
			<LoginFooter/>
		</main>);
	}
}
export default Login;
