import React, {Component} from 'react';
import Card from './Card.jsx';

let color = require('../../css/colors.js');
let fakeServer = {
	pictures: [
		{
			song: 'NTFS',
			artists: 'Linux, Windows, Macintosh',
			background: 'https://picsum.photos/650'
		}, {
			song: 'NTFS',
			artists: 'Linux, Windows, Macintosh',
			background: 'https://picsum.photos/550'
		}, {
			song: 'NTFS',
			artists: 'Linux, Windows, Macintosh',
			background: 'https://picsum.photos/500'
		}, {
			song: 'NTFS',
			artists: 'Linux, Windows, Macintosh',
			background: 'https://picsum.photos/600'
		}
	]
}

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
				img: ''
			}
		}
	}

	componentDidMount() {
		let access_token = this.props.token;
	}

	render() {
		return (<div style={defaultStyle}>
			<Card background={fakeServer.pictures[0].background} song="FAT32" artists="Linux, Windows, Macintosh" votes="1" color={color.redCard}/>
			<Card background={fakeServer.pictures[1].background} song="NTFS" artists="Windows, Macintosh" votes="-" color={color.blueCard}/>
			<Card background={fakeServer.pictures[2].background} song="EX-FAT32" artists="Macintosh" votes="5" color={color.greenCard}/>
			<Card background={fakeServer.pictures[3].background} song="HDD" artists="everybody" votes="100" color={color.yellowCard}/>
		</div>);
	}
}
export default CardContainer;
