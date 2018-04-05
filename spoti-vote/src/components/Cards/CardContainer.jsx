import React, {Component} from 'react';
import Card from './Card.jsx';

let color = require('../../css/colors.js');

let defaultStyle = {
	height: 'calc(100vh - 125px)',
	width: 'calc(100vw - 375px)',
	position: 'absolute',
	top: 0,
	left: '75px',
	display: 'flex',
	flexWrap: 'wrap',
	flexDirection: 'row',
	padding: '25px',
	overflow: 'hidden',
	backgroundColor: color.background
}

class CardContainer extends Component {
	constructor() {
		super();
		this.state = {
			selectedPlaylist: {
				name: '',
				id: '',
				href: ''
			},
			next: '',
			tracks: [],
			disableVote: false
		}
	}

	componentDidUpdate() {
		let access_token = this.props.token;
		if (this.props.playlist.name !== '' && this.props.playlist.id !== '' && this.props.playlist.href !== '') {
			if (this.props.playlist.name !== this.state.selectedPlaylist.name && this.props.playlist.id !== this.state.selectedPlaylist.id) {
				this.setState({
					selectedPlaylist: {
						name: this.props.playlist.name,
						id: this.props.playlist.id
					},
					next: this.props.playlist.href + '/tracks?fields=items(track(name%2Chref%2Calbum(images)%2Cartists(name)%2C%20id))%2Cnext%2Coffset%2Ctotal',
					tracks: []
				});
			}
		}
		if (this.state.selectedPlaylist.id !== '' && this.state.selectedPlaylist.id === this.props.playlist.id) {
			while (this.state.next !== null) {
				fetch(this.state.next, {
					headers: {
						"Authorization": "Bearer " + access_token
					}
				}).then((response) => response.json().then(data => {
					this.setState({
						next: data.next,
						tracks: this.state.tracks.concat(data.items)

					})
				}));
				break;
			}
		}
	}

	getRandomTrack() {
		if (this.state.next === null && this.state.tracks.length > 0 && this.state.selectedPlaylist.id === this.props.playlist.id) {
			let random = Math.floor(Math.random() * this.state.tracks.length);
			return this.state.tracks[random].track;
		} else {
			return {
				name: '',
				id: '',
				artists: [],
				album: {
					images: [
						{
							url: ''
						}
					]
				}
			};
		}
	}

	voteHandler() {
		console.log(this);
		this.setState({disableVote: true})
	}

	render() {
		return (<div style={defaultStyle}>
			<Card randomTrack={this.getRandomTrack()} color={color.redCard} disableVote={this.state.disableVote} voteHandler={this.voteHandler.bind(this)}/>
			<Card randomTrack={this.getRandomTrack()} color={color.blueCard} disableVote={this.state.disableVote} voteHandler={this.voteHandler.bind(this)}/>
			<Card randomTrack={this.getRandomTrack()} color={color.greenCard} disableVote={this.state.disableVote} voteHandler={this.voteHandler.bind(this)}/>
			<Card randomTrack={this.getRandomTrack()} color={color.yellowCard} disableVote={this.state.disableVote} voteHandler={this.voteHandler.bind(this)}/>
		</div>);
	}
}
export default CardContainer;
