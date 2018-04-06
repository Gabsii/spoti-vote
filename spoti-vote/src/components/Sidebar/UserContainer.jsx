import React, {Component} from 'react';
import User from './User.jsx';
//import userIcon from '../../img/abstract-user-flat-1.svg';

let color = require('../../css/colors.js');
let defaultStyle = {
	height: 'calc(100% - 300px)',
	marginTop: '300px'
}

let titleStyle = {
	height: '35px',
	fontSize: '24px',
	border: '1px solid black',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center'
	//titleStyle should act as a countdown --> Add Progressbar-like backgroundColors (green to red)
}

let containerStyle = {
	heigth: '100px',
	display: 'block'
}

class UserContainer extends Component {
	constructor() {
		super();
		this.state = {
			userData: {
				user: {
					name: '',
					id: '',
					image: '',
					profileUrl: ''
				}
			}
		}
	}
	componentDidMount() {
		fetch('http://localhost:8888/instance/host?id='+window.location.pathname.split('/')[2], {
		}).then((response) => response.json().then(data => this.setState({
			userData: {
				user: {
					name: data.name,
					id: data.id,
					image: data.image,
					profileUrl: data.profileUrl
				}
			}
		})));
	}

	render() {
		return (<div style={defaultStyle}>
			<div className="progressbar" style={titleStyle}>Users</div>
			<div style={containerStyle}>
				<User voteColor={color.greenCard} name={this.state.userData.user.name} id={this.state.userData.user.id} image={this.state.userData.user.image} profileUrl={this.state.userData.user.profileUrl} me={true}/>
				<User voteColor='null'/>
				<User voteColor={color.redCard}/>
				<User voteColor={color.blueCard}/>
				<User voteColor={color.greenCard}/>
				<User voteColor={color.greenCard}/>
				<User voteColor={color.yellowCard}/>
				<User voteColor={color.blueCard}/>
			</div>
		</div>);
	}
}
export default UserContainer;
