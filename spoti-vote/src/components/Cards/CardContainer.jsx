import React, {Component} from 'react';
import Card from './Card.jsx';

let color = require('../../css/colors.js');
let fakeServer = {
	pictures: [
		{
			song: 'NTFS',
			artists: 'Linux, Windows, Macintosh',
			background: '/img/album1.jpg'
		}, {
			song: 'NTFS',
			artists: 'Linux, Windows, Macintosh',
			background: '../../img/album2.jpg'
		}, {
			song: 'NTFS',
			artists: 'Linux, Windows, Macintosh',
			background: '../../img/album3.jpg'
		}, {
			song: 'NTFS',
			artists: 'Linux, Windows, Macintosh',
			background: '../../img/album4.jpg'
		}
	]
}

let defaultStyle = {
	height: 'calc(100vh - 125px)',
	width: 'calc(100vw - 300px)',
	positon: 'absolute',
	top: 0,
	left: 0,
	display: 'flex',
	flexWrap: 'wrap',
	flexDirection: 'row',
	padding: '25px',
	backgroundColor: color.redCard
}

class CardContainer extends Component {

	render() {
		return (<div style={defaultStyle}>
			<Card background={fakeServer.pictures[0].background} song="FAT32" artists="Linux, Windows, Macintosh" votes="1"/>
			<Card background={fakeServer.pictures[1].background} song="NTFS" artists="Windows, Macintosh" votes="-"/>
			<Card background={fakeServer.pictures[2].background} song="EX-FAT32" artists="Macintosh" votes="5"/>
			<Card background={fakeServer.pictures[3].background} song="HDD" artists="everybody" votes="100"/>
		</div>);
	}
}
export default CardContainer;
