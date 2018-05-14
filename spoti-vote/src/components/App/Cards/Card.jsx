import React, {Component} from 'react';
import Marquee from 'react-text-marquee'

let constants = require('../../../js/constants');

let defaultStyle = {
	flexBasis: 'calc(50% - 40px)',
	margin: '20px',
	userSelect: 'none',
	border: 0,
	padding: 0,
	position: 'relative',
	backgroundPosition: 'center',
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover',
	boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.75)',
	color: constants.colors.font,
	borderRadius: '3px',
	WebKitUserSelect: 'none',
	MozUserSelect: 'none'
}

let imgStyle = {
	width: '100%',
	position: 'absolute',
	top: 0,
	right: 0,
	bottom: 0,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column'
}

class Card extends Component {

	constructor() {
		super();
		this.state = {
			hover: false
		}
	}

	toggleHover() {
		this.setState({
			hover: !this.state.hover
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
		let linkStyle,
			marginStyle;
		if (this.state.hover) {
			linkStyle = {
				cursor: 'pointer'
			}
		} else {
			linkStyle = {
				cursor: 'context-menu'
			}
		}

		if (this.props.isPhone) {
			marginStyle = {
				flexBasis: 'calc(50% - 10px)',
				margin: '5px'
			}
		} else {
			marginStyle = {
				flexBasis: 'calc(50% - 40px)',
				margin: '20px'
			}
		}

		let votes = this.props.randomTrack.votes;
		if (votes === undefined || votes === 0) {
			votes = '-';
		}

		let artistString = '';
		for (var i = 0; i < this.props.randomTrack.artists.length; i++) {
			artistString += this.props.randomTrack.artists[i].name;
			if (i < this.props.randomTrack.artists.length - 1) {
				artistString += ', ';
			}
		}

		return (<button onClick={this.props.onClick} onMouseEnter={this.toggleHover.bind(this)} onMouseLeave={this.toggleHover.bind(this)} style={{
				...defaultStyle,
				...linkStyle,
				...marginStyle,
				backgroundImage: 'url(' + this.props.randomTrack.album.images[0].url + ')'
			}} id={this.props.randomTrack.id}>
			<div style={{
					...imgStyle,
					borderRadius: '3px',
					backgroundColor: 'rgba(' + tint.r + ',' + tint.g + ',' + tint.b + ',0.5)'
				}}>
				<div style={{
						width: '100%',
						padding: '15px 0px',
						textShadow: '2px 2px 8px #000000',
						background: 'rgba(0, 0, 0, 0.5)'
					}}>
					<div style={{
							fontSize: '2em',
							textAlign: 'center',
							textOverflow: 'clip',
							whiteSpace: 'nowrap',
							overflow: 'hidden'
						}}><Marquee text={this.props.randomTrack.name || '-'}/></div>
					<div style={{
							textOverflow: 'clip',
							whiteSpace: 'nowrap',
							overflow: 'hidden'
						}}><Marquee text={artistString || '-'}/></div>
					<div style={{
							fontSize: '1.25em'
						}}>{votes + ' Votes'}</div>
				</div>
			</div>
		</button>);
	}
}
export default Card;
