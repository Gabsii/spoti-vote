import React, {Component} from 'react';
import MediaQuery from 'react-responsive';
import {
	faUsers,
	faPiggyBank,
	faUnlink,
	faCar,
	faHome,
	faHeadphones
} from '@fortawesome/fontawesome-free-solid';
import {faTwitter, faGithub} from '@fortawesome/fontawesome-free-brands';
import image from '../img/samantha-gades-540989-unsplash.jpg';
import for1 from '../img/etienne-boulanger-409520-unsplash.jpg'; //car
import for2 from '../img/eric-nopanen-624212-unsplash.jpg'; //home
import for3 from '../img/austin-neill-247237-unsplash.jpg'; //dj
import Header from '../components/Login/Header.jsx';
import LoginFooter from '../components/Login/LoginFooter.jsx';
import LoginButton from '../components/Login/LoginButton.jsx';
import LoginButtonSecondary from '../components/Login/LoginButtonSecondary.jsx';
import Reason from '../components/Login/Reason.jsx';
import SocialIcon from '../components/Login/SocialIcon.jsx';

let constants = require('../js/constants');
let sectionStyle = {
	width: '100%'
}
let containerStyle = {
	height: '100%',
	width: '100%',
	alignItems: 'center',
	padding: '10px 10%',
	boxSizing: 'border-box',
	overflow: 'hidden'
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
			default:
				this.setState({image: null});
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
					height: '750px',
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
						background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,1))'
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
								}}>Let your friends
								<br/>choose the music</strong>
						</div>
						<div style={{
								fontSize: '1.5em',
								marginTop: '0.25em'
							}}>All you need is Spotify</div>
						<MediaQuery maxWidth={constants.breakpoints.medium}>
							{
								(matches) => {
									if (matches) {
										return (<div style={{
												display: 'flex',
												flexDirection: 'column'
											}}>
											<LoginButton/>
											<LoginButtonSecondary/>
										</div>);
									} else {
										return (<div style={{
												display: 'flex',
												flexDirection: 'row'
											}}>
											<LoginButton/>
											<div style={{
													marginLeft: '2em'
												}}></div>
											<LoginButtonSecondary/>
										</div>);
									}
								}
							}

						</MediaQuery>
					</div>
				</div>
			</section>
			<section style={{
					...sectionStyle,
					minHeight: '500px',
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
					<MediaQuery minWidth={constants.breakpoints.medium}>
						{
							(matches) => {
								if (matches) {
									return (<div style={{
											display: 'flex',
											flexDirection: 'row'
										}}>
										<Reason icon={faPiggyBank} title="No Costs" text="Save your piggy bank by using Spoti-Vote. Our service is completely free of charge!"/>
										<Reason icon={faUsers} title="No Dictatorship" text="We empower the users! The DJ plays a song you don't like? Use your voice and just skip it!"/>
										<Reason icon={faUnlink} title="No Registration" text="We have no strings on you! Just log in with your Spotify Premium account and invite your friends to join your room!"/>
									</div>);
								} else {
									return (<div style={{
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'center'
										}}>
										<Reason icon={faPiggyBank} title="No Costs" text="Save your piggy bank by using Spoti-Vote. Our service is completely free of charge!"/>
										<Reason icon={faUsers} title="No Dictatorship" text="We empower the users! The DJ plays a song you don't like? Use your voice and just skip it!"/>
										<Reason icon={faUnlink} title="No Registration" text="We have no strings on you! Just log in with your Spotify Premium account and invite your friends to join your room!"/>
									</div>);
								}
							}
						}
					</MediaQuery>
				</div>
			</section>
			<section style={{
					...sectionStyle,
					minHeight: '500px',
					backgroundColor: constants.colors.backgroundLite,
					backgroundImage: 'url(' + this.state.image + ')',
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center top',
					backgroundAttachment: 'fixed',
					color: constants.colors.font
				}}>

				<MediaQuery minWidth={constants.breakpoints.medium}>
					{
						(matches) => {
							if (matches) {
								return (<div style={{
										...containerStyle,
										minHeight: '500px',
										background: 'linear-gradient(rgba(0,0,0,1), rgba(0,0,0,0.4), rgba(0,0,0,1))'
									}}>
									<div style={{
											display: 'flex',
											justifyContent: 'center',
											fontSize: '2em',
											fontFamily: 'Circular Book',
											marginTop: '1.5em',
											marginBottom: '2em',
											textAlign: 'center'
										}}>Spoti-Vote is perfect for...</div>
									<div style={{
											display: 'flex',
											flexDirection: 'row'
										}}>
										<Reason icon={faCar} title="Road Trips" text="You're feeling like James Corden, do you? Sing along with your friends to your favourite songs"/>
										<Reason icon={faHome} title="House Parties" text="Create a collabarative playlist and party to your finest tunes"/>
										<Reason icon={faHeadphones} title="DJs/Streamer" text="Let your crowd set the tone while you lean back and relax"/>
									</div>
								</div>);
							} else {
								return (<div style={{
										...containerStyle,
										minHeight: '500px',
										background: 'linear-gradient(rgba(0,0,0,1), rgba(0,0,0,0.4), rgba(0,0,0,1))'
									}}>
									<div style={{
											display: 'flex',
											justifyContent: 'center',
											fontSize: '2em',
											fontFamily: 'Circular Book',
											marginTop: '1.5em',
											marginBottom: '2em',
											textAlign: 'center'
										}}>Spoti-Vote is perfect for...</div>
									<div style={{
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'center'
										}}>
										<Reason icon={faCar} title="Road Trips" text="You're feeling like James Corden, do you? Sing along with your friends to your favourite songs"/>
										<Reason icon={faHome} title="House Parties" text="Create a collabarative playlist and party to your finest tunes"/>
										<Reason icon={faHeadphones} title="DJs/Streamer" text="Let your crowd set the tone while you lean back and relax"/>
									</div>
								</div>);
							}
						}
					}
				</MediaQuery>
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
						<a href="https://twitter.com/SpotiVote">
							<SocialIcon icon={faTwitter}/>
						</a>
						<a href="https://github.com/Gabsii/spoti-vote">
							<SocialIcon icon={faGithub}/>
						</a>
					</div>
				</div>
			</section>
			<LoginFooter/>
		</main>);
	}
}
export default Login;
