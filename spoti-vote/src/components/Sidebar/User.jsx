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
	constructor() {
		super();
		this.state = {
			voteColor: '#ffffff'
		}
	}
	componentDidMount() {
		this.setState({voteColor: this.props.voteColor});
	}

	render() {
		return (<div style={defaultStyle}>
			<img alt="icon" src={this.props.image} style={imgStyle}/>
			<div style={{
					marginRight: 'auto'
				}}>
				<div>{this.props.name || this.props.id}</div>
			</div>
			<div className="vote" style={{
					width: '24px',
					height: '24px',
					borderRadius: '20px',
					margin: '10px',
					border: '1px solid black',
					backgroundColor: this.state.voteColor
				}}></div>
		</div>);
	}
}
export default User;
