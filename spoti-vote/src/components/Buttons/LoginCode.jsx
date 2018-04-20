import React, {Component} from 'react';
import MediaQuery from 'react-responsive';
import ReallySmoothScroll from 'really-smooth-scroll';
import '../../css/selectors.css';

let constants = require('../../js/constants.js');
const ipAddress = window.location.host || 'localhost';
const portFront = window.location.port || 80;
const portBack = 8888;

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
		if (this.state.room) {
			window.location.href = 'http://' + ipAddress + ':' + portFront + '/app/' + this.state.room;
		}
	}

	checkRoom(event) {
		if (event.target.value.length === 5) {
			let str = event.target.value.toUpperCase();
			let exists = false;
			fetch('http://' + ipAddress + ':' + portBack + '/rooms').then((response) => response.json().then(data => {
				for (var i = 0; i < data.content.length; i++) {
					if (data.content[i] === str) {
						console.log("exists");
						exists = true
						this.setState({room: str, roomExists: true});
					}
				}
				if (this.state.room && this.props.isPhone) {
					window.location.href = 'http://' + ipAddress + ':' + portFront + '/app/' + this.state.room;
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
		let borderStyle;

		if (this.props.isPhone) {
			borderStyle = {
				borderRadius: '500px'
			}
		} else {
			borderStyle = {
				borderTopLeftRadius: '500px',
				borderBottomLeftRadius: '500px',
				borderTopRightRadius: '0px',
				borderBottomRightRadius: '0px'
			};
			ReallySmoothScroll.shim();
		}

		return (<div>
			<form style={formStyle} onSubmit={this.submitHandler.bind(this)}>
				<input type="text" id="code" maxLength="5" placeholder="Room Code" style={{
						...defaultStyle,
						...borderStyle,
						textAlign: "center",
						backgroundColor: constants.colors.background,
						color: constants.colors.font
					}} autoComplete="off" onChange={this.checkRoom.bind(this)} pattern="[A-Za-z]{5}"/>
				<MediaQuery minWidth={constants.breakpoints.medium}>

					<input type="submit" id="loginCode" value="join" style={{
							...defaultStyle,
							fontFamily: 'Circular Bold',
							borderTopRightRadius: "500px",
							borderBottomRightRadius: "500px"
						}}/>
				</MediaQuery>
			</form>
			{
				this.state.room === false && this.state.roomExists === false
					? <h5 style={{
								color: constants.colors.redCard,
								marginTop: '5px',
								textShadow: 'none'
							}}>Room doesn't exist</h5>
					: ''
			}
			</div>);
	}
}

export default LoginCode;
