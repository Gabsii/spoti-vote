import React, {Component} from 'react';

let color = require('../../css/colors.js');

let defaultStyle = {
	flexBasis: 'calc(50% - 40px)',
	margin: '20px',
	userSelect: 'none',
	MozUserSelect: 'none',
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

	componentDidUpdate() {}

	toggleHover() {
		this.setState({
			hover: !this.state.hover
		})
	}

	vote() {}

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
		if (this.props.randomTrack !== undefined) {
			const tint = this.hexToRgb(this.props.color);
			let linkStyle;
			if (this.state.hover) {
				linkStyle = {
					cursor: 'pointer'
				}
			} else {
				linkStyle = {
					cursor: 'context-menu'
				}
			}
			return (<div onClick={this.vote.bind(this)} onMouseEnter={this.toggleHover.bind(this)} onMouseLeave={this.toggleHover.bind(this)} style={{
					...defaultStyle,
					...linkStyle,
					backgroundImage: 'url(' + this.props.randomTrack.album.images[0].url + ')'
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
						}}>{this.state.votes || ('-' + ' Votes')}</div>
				</div>
			</div>);
		} else {
			return (<div></div>);
		}
	}
}
export default Card;
