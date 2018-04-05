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
			playlist: {
				id: ''
			},
			tracks: [
				{
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
				},
				{
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
				},
				{
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
				},
				{
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
				},
			]
		}
	}

	componentDidUpdate() {

		if (this.props.playlist.id !== '' && this.props.playlist.id !== this.state.playlist.id) {
			fetch('http://localhost:8888/instance/getTracks?id='+window.location.pathname.split('/')[2]+'&playlist='+this.props.playlist.id, {
			}).then((response) => response.json().then(data => {
				this.setState({
					tracks: data,
					playlist: {
						id: this.props.playlist.id
					}
				})
			}));
		}
	}

	voteHandler() {
		console.log(this);
		this.setState({disableVote: true})
	}

	render() {
		return (<div style={defaultStyle}>
			<Card randomTrack={this.state.tracks[0]} color={color.redCard} disableVote={this.state.disableVote} voteHandler={this.voteHandler.bind(this)}/>
			<Card randomTrack={this.state.tracks[1]} color={color.blueCard} disableVote={this.state.disableVote} voteHandler={this.voteHandler.bind(this)}/>
			<Card randomTrack={this.state.tracks[2]} color={color.greenCard} disableVote={this.state.disableVote} voteHandler={this.voteHandler.bind(this)}/>
			<Card randomTrack={this.state.tracks[3]} color={color.yellowCard} disableVote={this.state.disableVote} voteHandler={this.voteHandler.bind(this)}/>
		</div>);
	}
}
export default CardContainer;
