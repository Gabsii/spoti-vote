import React, {Component} from 'react';
import Card from './Card.jsx';

let constants = require('../../js/constants');

let defaultStyle = {
	// height: 'calc(100vh - 125px)',
	// maxWidth: 'calc(100vw - 200px)',
	// minWidth: 'calc(100vw - 250px)',
	position: 'absolute',
	// top: 0,
	left: 0,
	display: 'flex',
	flexWrap: 'wrap',
	flexDirection: 'row',
	padding: '25px',
	overflow: 'hidden',
	backgroundColor: constants.colors.background,
	writeable: true
}

class CardContainer extends Component {

	constructor() {
		super();
		this.state = {
			voted: null
		}
	}

	/**
	 * Get siblings of an element
	 * @author cferdinandi
	 * @param  {Element} elem
	 * @return {Object}
	 */
	getSiblings(elem) {
		let siblings = [];
		let sibling = elem.parentNode.firstChild;
		let skipMe = elem;
		for (; sibling; sibling = sibling.nextSibling) 
			if (sibling.nodeType === 1 && sibling !== skipMe) 
				siblings.push(sibling);
	return siblings;
	}

	voteHandler(trackId, event) {
		let buttons = this.getSiblings(event.target.closest('button'));
		event.target.closest('button').style.opacity = 1;
		for (let i = 0; i < buttons.length; i++) {
			buttons[i].style.opacity = 0.25;
			//fade opacity??
		}
		if (this.state.voted !== trackId) {
			this.setState({voted: trackId});
			this.props.socket.emit('vote', {trackId: trackId});
		}
	}

	render() {
		//check if voted and add opacity effect @michi wo ladesch neue songs?
		// for (var i = 0; i < buttons.length; i++) {
		// 	buttons[i].style.opacity = 1;
		// }
		const buttons = window.document.getElementsByTagName('button');
		if (this.props.activeTracks.length > 0) {
			if (this.props.isPhone) {
				return (<main style={{
						...defaultStyle,
						height: 'calc(100vh - 200px)', // top bar should be 75px high
						top: '75px',
						maxWidth: 'calc(100vw - 50px)',
						minWidth: 'calc(100vw - 50px)'
					}}>
					{
						this.props.activeTracks.map((track, index) => {
							return <Card randomTrack={track} onClick={this.voteHandler.bind(this, track.id)} key={index} color={constants.iterateCardColors(index)}/>
						})
					}
				</main>);
			} else {
				return (<main style={{
						...defaultStyle,
						height: 'calc(100vh - 125px)',
						top: 0,
						maxWidth: 'calc(100vw - 200px)',
						minWidth: 'calc(100vw - 250px)'
					}}>
					{
						this.props.activeTracks.map((track, index) => {
							return <Card randomTrack={track} onClick={this.voteHandler.bind(this, track.id)} key={index} color={constants.iterateCardColors(index)}/>
						})
					}
				</main>);
			}
		} else {
			if (this.props.isPhone) {
				return (<main style={{
						...defaultStyle,
						height: 'calc(100vh - 200px)', // top bar should be 75px high
						top: '75px',
						maxWidth: 'calc(100vw - 50px)',
						minWidth: 'calc(100vw - 50px)'
					}}>
					<div style={{
							width: '100%',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							flexDirection: 'column',
							color: constants.colors.font
						}}>
						<h1 style={{
								fontSize: '5em',
								textAlign: 'center'
							}}>Select a playlist first!</h1><br/><br/>
						<h2 style={{
								fontSize: '2em'
							}}>Users can connect with
							<b style={{
									fontFamily: 'Circular Bold'
								}}>
								{' ' + this.props.room + ' '}
							</b>
							as Code!</h2>
					</div>
				</main>);
			} else {
				return (<main style={{
						...defaultStyle,
						height: 'calc(100vh - 125px)',
						top: 0,
						maxWidth: 'calc(100vw - 200px)',
						minWidth: 'calc(100vw - 250px)'
					}}>
					<div style={{
							width: '100%',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							flexDirection: 'column',
							color: constants.colors.font
						}}>
						<h1 style={{
								fontSize: '5em',
								textAlign: 'center'
							}}>Select a playlist first!</h1><br/><br/>
						<h2 style={{
								fontSize: '2em'
							}}>Users can connect with
							<b style={{
									fontFamily: 'Circular Bold'
								}}>
								{' ' + this.props.room + ' '}
							</b>
							as Code!</h2>
					</div>
				</main>);
			}
		}

	}
}
export default CardContainer;
