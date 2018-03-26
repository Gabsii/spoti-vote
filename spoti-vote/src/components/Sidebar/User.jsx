import React, {Component} from 'react';
import logo from "../../img/sbahn.png";

let defaultStyle = {
	border: '1px solid black',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between'
}
let imgStyle = {
	height: '32px',
	width: '32px',
	marginLeft: '10px',
	marginRight: '20px',
	marginTop: '5px',
	marginBottom: '5px'
	// border: '1px solid black'
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
					borderRadius: '2px',
					margin: '10px',
					backgroundColor: this.props.voteColor
				}}></div>
		</div>);
	}
}
export default User;
