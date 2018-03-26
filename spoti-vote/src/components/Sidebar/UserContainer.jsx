import React, {Component} from 'react';
import User from './User.jsx';

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
	border: '1px solid black',
	display: 'block'
	// overflowY: 'auto'
}

class UserContainer extends Component {
	render() {
		return (<div style={defaultStyle}>
			<div className="progressbar" style={titleStyle}>Users</div>
			<div style={containerStyle}>
				<User voteColor={color.greenCard}/>
				<User voteColor={color.greenCard}/>
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
