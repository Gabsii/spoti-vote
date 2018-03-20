import React, {Component} from 'react';
import '../../css/selectors.css';
import SpotifyWebApi from 'spotify-web-api-node';

let defaultStyle = {
	padding: "17px 48px",
	fontSize: "0.9em",
	lineHeight: 1,
	borderRadius: "500px",
	borderWidth: 0,
	letterSpacing: "2px",
	minWidth: "160px",
	maxHeight: "50px",
	textTransform: "uppercase",
	whiteSpace: "normal",
	backgroundColor: "#1db954",
	marginTop: "1.5em",
	marginRight: "2em",
	right: 0
}
class LoginButton extends Component {

	authenticate() {
		// let credentials = {
		// 	clientId: 'fb0059a660bb4324a513b260db7c5353',
		// 	clientSecret: 'b3a140deefc34244ae97caf427c2669b',
		// 	redirectUri: 'http://localhost:8888/callback'
		// }
		var scopes = [
				'user-read-private', 'user-read-email'
			],
			redirectUri = 'http://localhost:8888/callback',
			clientId = 'fb0059a660bb4324a513b260db7c5353',
			state = 'login';

		// Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
		var spotifyApi = new SpotifyWebApi({redirectUri: redirectUri, clientId: clientId});

		// Create the authorization URL
		var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

		// https://accounts.spotify.com:443/authorize?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https://example.com/callback&scope=user-read-private%20user-read-email&state=some-state-of-my-choice
		console.log(authorizeURL);

		window.open(authorizeURL, 'targetWindow', 'toolbar=no, location = no, status = no, menubar = no, scrollbars = yes, resizable = yes, width = SomeSize, height = SomeSize ');
		return false;

	}

	render() {
		return (<button id="loginbutton" style={defaultStyle} className="sticky" onClick={this.authenticate.bind(this)}>
			Login
		</button>);
	}
}
export default LoginButton;
