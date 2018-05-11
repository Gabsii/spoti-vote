import React, {Component} from 'react';
import MediaQuery from 'react-responsive';
import Header from './Login/Header.jsx';
import LoginFooter from './Login/LoginFooter.jsx';
import LoginButton from './Login/LoginButton.jsx';
import LoginButtonSecondary from './Login/LoginButtonSecondary.jsx';
import Reason from './Login/Reason.jsx';
import SocialIcon from './Login/SocialIcon.jsx';
import image from '../img/samantha-gades-540989-unsplash.jpg';
import for1 from '../img/etienne-boulanger-409520-unsplash.jpg'; //car
import for2 from '../img/eric-nopanen-624212-unsplash.jpg'; //home
import for3 from '../img/austin-neill-247237-unsplash.jpg'; //dj
import {faUsers, faCar, faHome, faHeadphones} from '@fortawesome/fontawesome-free-solid';
import {faTwitter, faGithub} from '@fortawesome/fontawesome-free-brands';

let constants = require('../js/constants');
let sectionStyle = {
	height: '600px',
	width: '100%'
}
let containerStyle = {
	height: '100%',
	width: '100%',
	alignItems: 'center',
	padding: '10px 100px',
	boxSizing: 'border-box'
}

class Login extends Component {

	constructor() {
		super();
		this.state = {
			image: image
		}
	}

	componentDidMount() {
		if (window.location.search !== '') {
			window.location.search = '';
		}
		var random = Math.floor((Math.random() * 3) + 1);
		switch (random) {
			case 1:
				this.setState({image: for1});
				break;
			case 2:
				this.setState({image: for2});
				break;
			case 3:
				this.setState({image: for3});
				break;
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
						...containerStyle,
						display: 'flex',
						background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,1))',
						// backgroundColor: 'rgba(0,0,0,0.6)',
					}}>
					<div style={{
							color: constants.colors.font,
							display: 'flex',
							alignItems: 'flex-start',
							flexDirection: 'column',
							marginTop: '-100px'
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
			</section>
			<section style={{
					...sectionStyle,
					height: '500px',
					backgroundColor: constants.colors.font
				}}>
				<div style={containerStyle}>
					<div id="features" style={{
							display: 'flex',
							justifyContent: 'center',
							fontSize: '2em',
							fontFamily: 'Circular Book',
							marginTop: '1.5em',
							marginBottom: '2em'
						}}>Why Spoti-Vote?</div>
					<div style={{
							display: 'flex',
							flexDirection: 'row'
						}}>
						<Reason icon={faUsers} title="Users" text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam"/>
						<Reason icon={faUsers} title="Users" text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam"/>
						<Reason icon={faUsers} title="Users" text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam"/>
					</div>
				</div>
			</section>
			<section style={{
					...sectionStyle,
					height: '500px',
					backgroundColor: constants.colors.backgroundLite,
					backgroundImage: 'url(' + this.state.image + ')',
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center top',
					backgroundAttachment: 'fixed',
					color: constants.colors.font
				}}>
				<div style={{
						...containerStyle,
						background: 'linear-gradient(rgba(0,0,0,1), rgba(0,0,0,0.4), rgba(0,0,0,1))'
					}}>
					<div style={{
							display: 'flex',
							justifyContent: 'center',
							fontSize: '2em',
							fontFamily: 'Circular Book',
							marginTop: '1.5em',
							marginBottom: '2em'
						}}>Spoti-Vote is perfect for...</div>
					<div style={{
							display: 'flex',
							flexDirection: 'row'
						}}>
						<Reason icon={faCar} title="Road Trips" text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam"/>
						<Reason icon={faHome} title="House Parties" text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam"/>
						<Reason icon={faHeadphones} title="DJs/Streamer" text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam"/>
					</div>
				</div>
			</section>
			<section style={{
					...sectionStyle,
					height: '250px',
					backgroundColor: constants.colors.font
				}}>
				<div style={containerStyle}>
					<div style={{
							display: 'flex',
							justifyContent: 'center',
							fontSize: '2em',
							fontFamily: 'Circular Book',
							marginTop: '1.5em'
						}}>Connect with us</div>
					<div style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'center'
						}}>
						<SocialIcon icon={faTwitter}/>
						<SocialIcon icon={faGithub}/>
					</div>
				</div>
			</section>
			<LoginFooter/>
		</main>);
	}
}
export default Login;
