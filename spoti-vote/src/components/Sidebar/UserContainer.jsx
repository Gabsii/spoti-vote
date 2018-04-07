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
		this.state = {}
	}
	componentDidMount() {}

	render() {
		return (<div style={defaultStyle}>
			<div className="progressbar" style={titleStyle}>Users</div>
			<div style={containerStyle}>
				{this.props.connectedUser.map(function(user, index){
					return <User voteColor={color.iterateCardColors(index)} key={index} name={user}/>
				})}
			</div>
		</div>);
	}
}
export default UserContainer;
