import React, {Component} from 'react';

let color = require('../../css/colors.js');

let defaultStyle = {
	flexBasis: 'calc(50% - 40px)',
	margin: '20px',
	backgroundPosition: 'center',
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover',
	backgroundColor: color.blueCard
}

let imgStyle = {
	height: '100%',
	width: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column'
}

class Card extends Component {

	constructor() {
		super();
		this.state = {
			randomTrack: {},
			votes: 0,
			hover: false
		}
	}

	componentDidUpdate() {
		if (this.state.randomTrack !== this.props.randomTrack) {
			this.setState({randomTrack: this.props.randomTrack, votes: 0});
		}
	}

	toggleHover() {
		this.setState({
			hover: !this.state.hover
		})
	}

	vote() {
		this.setState({
			votes: this.state.votes + 1
		})
	}

	hexToRgb(hex) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result
			? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16)
			}
			: null;
	}

	render() {
		const tint = this.hexToRgb(this.props.color);
		console.log(this.state);
		let linkStyle;
		if (this.state.hover) {
			console.log("ok");
			linkStyle = {
				cursor: 'pointer'
			}
		} else {
			linkStyle = {
				cursor: 'context-menu'
			}
		}
		return (<div onClick={this.props.randomTrack.id !== ''
				? this.vote.bind(this)
				: console.log("no id")} onMouseEnter={this.toggleHover.bind(this)} onMouseLeave={this.toggleHover.bind(this)} style={{
				...defaultStyle,
				...linkStyle,
				backgroundImage: 'url(' + this.props.randomTrack.album.images[0].url || '' + ')'
			}} id={this.props.randomTrack.id}>
			<div style={{
					...imgStyle,
					backgroundColor: 'rgba(' + tint.r + ',' + tint.g + ',' + tint.b + ',' + 0.5 + ')'
				}}>
				<div style={{
						fontSize: '2em',
						textAlign: 'center'
					}}>{this.props.randomTrack.name || '-'}</div>
				<div>{this.props.randomTrack.artists.map((artist) => artist.name) || '-'}</div>
				<div style={{

						fontSize: '1.25em'
					}}>{this.state.votes || '-' + " Votes"}</div>
			</div>
		</div>);
	}
}
export default Card;
