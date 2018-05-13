import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faShareAlt} from '@fortawesome/fontawesome-free-solid';

let constants = require('../../js/constants');

let defaultStyle = {
	padding: "10px 25px",
	marginTop: '2.5em',
	color: constants.colors.fontSecondary,
	backgroundColor: constants.colors.backgroundLite,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	lineHeight: 1,
	// border: '1px solid white',
	borderRadius: "500px",
	borderWidth: 0,
	letterSpacing: "2px",
	textTransform: "uppercase",
	whiteSpace: "normal"
}

class ShareButton extends Component {

	share() {
		if (navigator.share) {
			navigator.share({title: 'Spoti-Vote', text: 'Join my room!', url: window.location.href}).then(() => console.log('Successful share')).catch((error) => console.log('Error sharing', error));
		} else {

			/* Get the text field */
			var copyText = document.getElementById("myInput");

			/* Select the text field */
			copyText.select();

			/* Copy the text inside the text field */
			document.execCommand("Copy");

			/* Alert the copied text */
			alert("Copied the text: " + copyText.value);
		}

	}

	render() {
		return (<button style={defaultStyle} onClick={this.share.bind(this)}>
			<div style={{
					fontSize: '1.3em',
					marginRight: '0.8em'
				}}>Share</div>
			<input id="myInput" style={{
					display: 'none'
				}} value={window.location.href}/>
			<FontAwesomeIcon icon={faShareAlt} size="3x"/>
		</button>);
	}
}
export default ShareButton;
