import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faHeadphones} from '@fortawesome/fontawesome-free-solid';

let constants = require('../../js/constants');
let config = require('../../js/config');

let defaultStyle = {
	height: '300px',
	maxWidth: '250px',
	position: 'absolute',
	top: 0,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	flexFlow: 'column'
}

let imgStyle = {
	height: '150px',
	width: '150px',
	marginLeft: 'auto',
	marginRight: 'auto',
	marginTop: '15px',
	marginBottom: '20px',
	backgroundPosition: 'center',
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover',
	border: '1px solid black'
}

let nameContainer = {
	marginBottom: '15px',
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
	constructor() {
		super();
		this.state = {
			playlists: []
		}
	}

	componentDidUpdate() {
		//This is only run, when the update request reports a different amount of playlists then the current numbers of playlists
		//It will fetch all the playlists again. (Do we need this)
		if (this.props.loggedIn === true && this.props.numPlaylists !== this.state.playlists.length) {
			fetch('http://' + config.ipAddress + ':' + config.portBackend + '/room/playlists?id='+window.location.pathname.split('/')[2], {
		    }).then((response) => response.json().then(data => {
				switch (data.responseCode) {
					case 200:
						if (this.state.playlists.length !== data.content.length) {
							this.setState({playlists: data.content});
						}
						break;
					default:
						window.location.pathname = '/';
						break;
				}

			})).catch(function() {
				window.location.reload();
			});
		}
	}

	render() {
		let option = <div>{this.props.activePlaylist.name}</div>;

		if (this.props.loggedIn === true) {
			option = <select style={{
					width: '200px'
				}} onChange={this.props.playlistHandler}>

				<option>Select a Playlist</option>
				{this.state.playlists.map((playlist) => <option key={playlist.id} id={playlist.id} img={playlist.img} url={playlist.url} href={playlist.href}>{playlist.name}</option>)}
			</select>;
		}

		let iconColor = {};
		if (this.props.host.voted === null) {
			iconColor.color = constants.colors.font;
		}
		for (var j = 0; j < this.props.activeTracks.length; j++) {
			if (this.props.activeTracks[j].id === this.props.host.voted) {
				iconColor.color = constants.iterateCardColors(j);
			}
		}

		let roomName = "Room: " + window.location.pathname.split('/')[2];

		return (<div style={defaultStyle}>
			<div style={{
					...centerContainer,
					fontWeight: 'bold',
					fontSize: '18px'
				}}>{roomName}</div>
			<div style={{
					...centerContainer,
					fontSize: '14px'
				}}>
				{option}
			</div>
			<a href={this.props.activePlaylist.url}>
				<img alt="Current Playlist" src={this.props.activePlaylist.img || 'http://via.placeholder.com/152x152'} style={{
						...imgStyle,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}/>
			</a>
			<div style={nameContainer}>
				<FontAwesomeIcon style={iconColor} icon={faHeadphones} size="2x"/>
				<div style={{
						marginLeft: '10px'
					}}>
					{this.props.host.name || this.props.host.id}
				</div>
			</div>
		</div>);
	}
}
export default Infos;
