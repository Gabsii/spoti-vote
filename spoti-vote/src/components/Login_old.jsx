import React, {Component} from 'react';
// import MediaQuery from 'react-responsive';
import '../css/parallax.css';
import FullscreenImage from './Login/FullscreenImage.jsx';
import LoginButton from './Login/LoginButton.jsx';
// import ScrollDown from './Login/ScrollDown.jsx';
import LoginTitle from './Login/LoginTitle.jsx';
// import Header from './Header.jsx';
import pictureOne from '../img/austin-neill-247237-unsplash.jpg';

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
		return (<section>
			<FullscreenImage id="parallax" source={pictureOne}>
				<LoginButton/>
				<LoginTitle/>
			</FullscreenImage>
		</section>);
	}
}
export default Login;
