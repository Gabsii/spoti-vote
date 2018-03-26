import React, {Component} from 'react';
import logo from "../../img/sbahn.png";

let defaultStyle = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: '5px'
}
let imgStyle = {
	height: '32px',
	width: '32px',
	marginLeft: '10px',
	marginRight: '20px',
	marginTop: '5px',
	marginBottom: '5px'
}

class User extends Component {
	render() {
		return (<div style={defaultStyle}>
			<img alt="icon" src={logo} style={imgStyle}/>
			<div style={{
					marginRight: 'auto'
				}}>
				<div>First</div>
				<div>Last</div>
			</div>
			<div className="vote" style={{
					width: '24px',
					height: '24px',
					borderRadius: '20px',
					margin: '10px',
					backgroundColor: this.props.voteColor
				}}></div>
		</div>);
	}
}
export default User;
