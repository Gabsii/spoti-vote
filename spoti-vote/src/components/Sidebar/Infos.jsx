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
	backgroundPosition: 'center',
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover',
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
			fetch('http://localhost:8888/instance/playlists?id='+window.location.pathname.split('/')[2], {
		    }).then((response) => response.json().then(data => {
				switch (data.responseCode) {
					case 200:
					if (this.state.playlists.length !== data.content.length) {
						this.setState({
							playlists: data.content
						});
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


		return (<div style={defaultStyle}>
			<div style={{
					...centerContainer,
					fontWeight: 'bold',
					fontSize: '18px'
				}}>ROOMNAME</div>
			<div style={{
					...centerContainer,
					fontSize: '14px'
				}}>
				{option}
			</div>
			<a href={this.props.activePlaylist.url}>
				<img alt="Current Playlist" src={this.props.activePlaylist.img} style={{
						...imgStyle,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}/>
			</a>
			<div style={nameContainer}>
				<FontAwesomeIcon icon={faHeadphones} size="2x"/>
				<div style={{
						marginLeft: '10px'
					}}>
					{this.props.user.name || this.props.user.id}
				</div>
			</div>
		</div>);
	}
}
export default Infos;
