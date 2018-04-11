import React, {Component} from 'react';
import '../../css/selectors.css';

let constants = require('../../js/constants.js');
let config = require('../../js/config');

let defaultStyle = {
	padding: "17px 40px",
	fontSize: "0.9em",
	lineHeight: 1,
	borderWidth: 0,
	letterSpacing: "2px",
	minWidth: "120px",
	maxWidth: "150px",
	maxHeight: "50px",
	textTransform: "uppercase",
	whiteSpace: "normal",
	backgroundColor: constants.colors.green,
	marginRight: "0"
}

let formStyle = {
	display: 'inline-block',
	marginTop: "1.5em",
	border: '1px solid black',
	borderRadius: '500px'
}

class LoginCode extends Component {

	constructor() {
		super();
		this.state = {
			roomExists: '',
			room: false
		}
	}

	submitHandler(event) {
		event.preventDefault();
		// check for input hijacking
		// send data to join room
		if (this.state.room) {
			window.location.href = 'http://' + config.ipAddress + ':' + config.portFrontend + '/app/' + this.state.room;
		}
	}

	checkRoom(event) {
		if (event.target.value.length === 5) {
			let str = event.target.value.toUpperCase();
			let exists = false;
			fetch('http://' + config.ipAddress + ':' + config.portBackend + '/rooms').then((response) => response.json().then(data => {
				for (var i = 0; i < data.content.length; i++) {
					if (data.content[i] === str) {
						console.log("exists");
						exists = true
						this.setState({room: str, roomExists: true});
					}
				}
				if (!exists) {
					this.setState({roomExists: false});
				}
				return exists;
			}));
		}
	}

	componentDidUpdate() {
		if (this.state.room === false && this.state.roomExists === false) {
			document.getElementById("code").style.border = "1px solid " + constants.colors.redCard;
		} else {
			document.getElementById("code").style.border = "1px solid " + constants.colors.greenCard;
		}
	}

	render() {
		return (<div>
			<form style={formStyle} onSubmit={this.submitHandler.bind(this)}>
				<input type="text" id="code" maxLength="5" placeholder="Room Code" style={{
						...defaultStyle,
						textAlign: "center",
						borderTopLeftRadius: "500px",
						borderBottomLeftRadius: "500px",
						backgroundColor: constants.colors.background,
						color: constants.colors.font
					}} autoComplete="off" onChange={this.checkRoom.bind(this)} pattern="[A-Za-z]{5}"/>
				<input type="submit" id="loginCode" value="join" style={{
						...defaultStyle,
						borderTopRightRadius: "500px",
						borderBottomRightRadius: "500px"
					}}/>
			</form>
			{
				this.state.room === false && this.state.roomExists === false
					? <h5 style={{
								color: constants.colors.redCard,
								marginTop: '5px',
								textShadow: 'none'
							}}>Room doesn't exist</h5>
					: ""
			}
			</div>);
	}
}

export default LoginCode;
