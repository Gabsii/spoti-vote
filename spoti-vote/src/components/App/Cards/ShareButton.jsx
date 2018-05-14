import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import swal from 'sweetalert2';
import {faShareAlt} from '@fortawesome/fontawesome-free-solid';

let constants = require('../../../js/constants');

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
			let copyText = document.getElementById("myInput");
			copyText.select();
			document.execCommand("Copy");
			swal({
				type: 'info',
				title: 'Link copied to clipboard!',
				toast: true,
				position: 'bottom',
				showConfirmButton: false,
				timer: 2000
			});
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
				}} value={window.location.href} readOnly={true}/>
			<FontAwesomeIcon icon={faShareAlt} size="3x"/>
		</button>);
	}
}
export default ShareButton;
