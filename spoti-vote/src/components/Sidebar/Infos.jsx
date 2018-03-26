import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faHeadphones} from '@fortawesome/fontawesome-free-solid';

let defaultStyle = {
	height: '300px',
	width: '250px',
	position: 'absolute',
	top: 0
}

let imgStyle = {
	height: '150px',
	width: '150px',
	marginLeft: 'auto',
	marginRight: 'auto',
	marginTop: '15px',
	marginBottom: '20px',
	border: '1px solid black'
}

let nameContainer = {
	marginTop: '10px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center'
}

let centerContainer = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	marginTop: '10px',
	marginBottom: '5px'
}

class Infos extends Component {
	render() {
		return (<div style={defaultStyle}>
			<div style={{
					...centerContainer,
					fontWeight: 'bold',
					fontSize: '18px'
				}}>ROOMNAME</div>
			<div style={{
					...centerContainer,
					fontSize: '14px'
				}}>PLAYLIST</div>
			<img alt="USERPROFILE" src='https://picsum.photos/650' style={{
					...imgStyle,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center'
				}}/>
			<div style={nameContainer}>
				<FontAwesomeIcon icon={faHeadphones} size="2x"/>
				<div style={{
						marginLeft: '10px'
					}}>
					FIRST LAST
				</div>
			</div>
		</div>);
	}
}
export default Infos;
