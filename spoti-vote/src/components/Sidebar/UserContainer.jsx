import React, {Component} from 'react';
import User from './User.jsx';

let constants = require('../../js/constants.js');
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
}

let containerStyle = {
	heigth: '100px',
	display: 'block'
}

class UserContainer extends Component {

	render() {
		return (<div style={defaultStyle}>
			<div className="progressbar" style={titleStyle}>Users</div>
			<div style={containerStyle}>
				{this.props.connectedUser.map(function(user, index){
					return <User voteColor={constants.iterateCardColors(index)} key={index} name={user}/>
				})}
			</div>
		</div>);
	}
}
export default UserContainer;
