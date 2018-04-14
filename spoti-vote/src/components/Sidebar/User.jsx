import React, {Component} from 'react';
import icon from "../../img/userIcon.svg";

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
			<img alt="icon" src={icon} style={imgStyle}/>
			<div style={{
					width: 'calc(100% - 108px)',
					marginRight: 'auto',
					textOverflow: 'ellipsis',
					whiteSpace: 'nowrap',
					overflow: 'hidden'
				}}>
				{this.props.name}
			</div>
			<div className="vote" style={{
					width: '24px',
					height: '24px',
					borderRadius: '20px',
					margin: '10px',
					border: '1px solid black',
					backgroundColor: this.props.voteColor
				}}></div>
		</div>);
	}
}
export default User;
