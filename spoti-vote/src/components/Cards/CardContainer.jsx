import React, {Component} from 'react';
import Card from './Card.jsx';
import Notification from 'react-web-notification';
import logo from '../../img/spotiLogo.png';

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
	backgroundColor: constants.colors.background
}

class CardContainer extends Component {

	constructor() {
		super();
		this.state = {
			voted: null,
			notification: {
				ignore: true,
				title: ''
			}
		}
	}

	handlePermissionGranted() {
		console.log('Permission Granted');
		this.setState({
			notification: {
				ignore: false
			}
		});
	}
	handlePermissionDenied() {
		console.log('Permission Denied');
		this.setState({
			notification: {
				ignore: true
			}
		});
	}
	handleNotSupported() {
		console.log('Web Notification not Supported');
		this.setState({
			notification: {
				ignore: true
			}
		});
	}
	handleNotificationOnClick(e, tag) {
		console.log(e, 'Notification clicked tag:' + tag);
	}
	handleNotificationOnError(e, tag) {
		console.log(e, 'Notification error tag:' + tag);
	}
	handleNotificationOnClose(e, tag) {
		console.log(e, 'Notification closed tag:' + tag);
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
			buttons[i].style.opacity = 0.5;
			//fade opacity??
		}
		if (this.state.voted !== trackId) {
			this.setState({voted: trackId});
			this.props.socket.emit('vote', {trackId: trackId});
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.activeTracks[0] !== undefined && this.props.activeTracks[1] !== undefined && this.props.activeTracks[2] !== undefined && this.props.activeTracks[3] !== undefined) {
			if (nextProps.activeTracks[0].id !== this.props.activeTracks[0].id && nextProps.activeTracks[1].id !== this.props.activeTracks[1].id && nextProps.activeTracks[2].id !== this.props.activeTracks[2].id && nextProps.activeTracks[3].id !== this.props.activeTracks[3].id) {
				const buttons = window.document.getElementsByTagName('button');
				for (var i = 0; i < buttons.length; i++) {
					buttons[i].style.opacity = 1;
				}
				if (this.state.notification.ignore) {
					return;
				}

				const now = Date.now();

				const title = 'Spoti Vote';
				const body = 'New Songs were loaded!';
				const tag = now;
				const icon = logo;
				// const icon = 'http://localhost:3000/Notifications_button_24.png';

				// Available options
				// See https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification
				const options = {
					tag: tag,
					body: body,
					icon: icon,
					lang: 'en',
					dir: 'ltr'
				}
				this.setState({
					notification: {
						title: title,
						options: options
					}
				});
			}
		}
	}

	render() {
		if (this.props.activeTracks.length > 0) {
			if (this.props.isPhone) {
				return (<main style={{
						...defaultStyle,
						height: 'calc(100vh - 150px)', // top bar should be 75px high
						top: '75px',
						width: '100vw',
						padding: 0
						// minWidth: 'calc(100vw - 50px)'
					}}>
					{
						this.props.activeTracks.map((track, index) => {
							return <Card isPhone={true} randomTrack={track} onClick={this.voteHandler.bind(this, track.id)} key={index} color={constants.iterateCardColors(index)}/>
						})
					}
				</main>);
			} else {
				return (<main style={{
						...defaultStyle,
						height: 'calc(100vh - 125px)',
						top: 0,
						width: 'calc(100vw - 250px)',
						// minWidth: 'calc(100vw - 250px)'
					}}>
					{
						this.props.activeTracks.map((track, index) => {
							return <Card isPhone={false} randomTrack={track} onClick={this.voteHandler.bind(this, track.id)} key={index} color={constants.iterateCardColors(index)}/>
						})
					}
					<Notification ignore={this.state.notification.ignore && this.state.notification.title !== ''} notSupported={this.handleNotSupported.bind(this)} onPermissionGranted={this.handlePermissionGranted.bind(this)} onPermissionDenied={this.handlePermissionDenied.bind(this)} onClick={this.handleNotificationOnClick.bind(this)} onClose={this.handleNotificationOnClose.bind(this)} onError={this.handleNotificationOnError.bind(this)} timeout={5000} title={this.state.notification.title} options={this.state.notification.options}/>
				</main>);
			}
		} else {
			if (this.props.isPhone) {
				return (<main style={{
						...defaultStyle,
						height: 'calc(100vh - 150px)', // top bar should be 75px high
						top: '75px',
						width: '100vw',
						padding: 0
						// minWidth: 'calc(100vw - 50px)'
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
						width: 'calc(100vw - 250px)',
						// minWidth: 'calc(100vw - 250px)'
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
						<Notification ignore={this.state.notification.ignore && this.state.notification.title !== ''} notSupported={this.handleNotSupported.bind(this)} onPermissionGranted={this.handlePermissionGranted.bind(this)} onPermissionDenied={this.handlePermissionDenied.bind(this)} onClick={this.handleNotificationOnClick.bind(this)} onClose={this.handleNotificationOnClose.bind(this)} onError={this.handleNotificationOnError.bind(this)} timeout={5000} title={this.state.notification.title} options={this.state.notification.options}/>
					</div>
				</main>);
			}
		}

	}
}
export default CardContainer;
