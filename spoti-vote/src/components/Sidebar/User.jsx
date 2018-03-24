import React, {Component} from 'react';
import logo from "../../img/sbahn.png";

let color = require('../../css/colors.js');
let defaultStyle = {
	border: '1px solid black'
}
let imgStyle = {
	height: '32px',
	width: '32px',
	marginLeft: '10px',
	marginRight: '5px',
	marginTop: '5px',
	// border: '1px solid black'
}

class User extends Component {
	render() {
		return (<div style={defaultStyle}>
			<img alt="icon" src={logo} style={imgStyle}/>
			<div style={{
					marginLeft: "15px",
					display: "inline-block",
					verticalAlign: "super"
				}}>
				<div>First</div>
				<div>Last</div>
			</div>
			<div className="vote"></div>
		</div>);
	}
}
export default User;
