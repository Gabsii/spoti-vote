import React, {Component} from 'react';
import Notification from 'react-web-notification';
import {css} from 'glamor';

import Card from './Card.jsx';
import ShareButton from './ShareButton.jsx';

import logo from '../../../img/spotiLogo.svg';
let constants = require('../../../js/constants').default;
const styles = {
    tracksMain: css({
        position: 'absolute',
        left: 0,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        overflow: 'hidden',
        backgroundColor: constants.colors.background,
        height: 'calc(100% - 150px)', // top bar should be 75px high
        top: '75px',
        width: '100vw',
        padding: 0,
        '@media(min-width: 760px)': {
            height: 'calc(100vh - 125px)',
            top: 0,
            width: 'calc(100vw - 250px)',
            padding: '25px'
        }
    }),
    noTracksMain: css({
        position: 'absolute',
        left: 0,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        overflow: 'hidden',
        backgroundColor: constants.colors.background,
        height: 'calc(100% - 150px)', // top bar should be 75px high
        top: '75px',
        width: '100vw',
        padding: 0,
        '@media(min-width: 760px)': {
            height: 'calc(100vh - 125px)',
            top: 0,
            width: 'calc(100vw - 250px)'
        }
    }),
    noTracksWrapper: css({
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        color: constants.colors.font
    }),
    noTracksHeading: css({
        fontSize: '3.5em',
        textAlign: 'center',
        '@media(min-width: 760px)': {
            fontSize: '5em'
        }
    }),
    noTracksSubheading: css({
        fontSize: '1.5em',
        textAlign: 'center',
        '@media(min-width: 760px)': {
            fontSize: '2em'
        }
    })
};

class CardContainer extends Component {

    constructor() {
        super();
        this.state = {
            voted: null,
            notification: {
                ignore: true,
                title: 'Spoti Vote'
            }
        };
    }

    handlePermissionGranted() {
        // 'Permission Granted'
        this.setState({
            notification: {
                ignore: false
            }
        });
    }
    handlePermissionDenied() {
        // 'Permission Denied'
        this.setState({
            notification: {
                ignore: true
            }
        });
    }
    handleNotSupported() {
        // 'Web Notification not Supported'
        this.setState({
            notification: {
                ignore: true
            }
        });
    }
    handleNotificationOnClick(e, tag) {
        // 'Notification clicked tag:' + tag
    }
    handleNotificationOnError(e, tag) {
        // 'Notification error tag:' + tag
    }
    handleNotificationOnClose(e, tag) {
        // 'Notification closed tag:' + tag
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.activeTracks[0] && this.props.activeTracks[1] && this.props.activeTracks[2] && this.props.activeTracks[3]) {
            if (nextProps.activeTracks[0].id !== this.props.activeTracks[0].id && nextProps.activeTracks[1].id !== this.props.activeTracks[1].id && nextProps.activeTracks[2].id !== this.props.activeTracks[2].id && nextProps.activeTracks[3].id !== this.props.activeTracks[3].id) {
                const buttons = window.document.getElementsByTagName('button');
                for (var i = 0; i < buttons.length; i++) {
                    buttons[i].style.opacity = 1;
                }
                if (this.state.notification.ignore) {
                    return;
                }

                const now = Date.now();

                const body = 'New Songs were loaded!';
                const tag = now;
                const icon = logo;

                // Available options
                // See https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification
                const options = {
                    tag: tag,
                    body: body,
                    icon: icon,
                    lang: 'en',
                    dir: 'ltr'
                };
                this.setState({
                    notification: {
                        options: options
                    }
                });
            }
        }
    }

    render() {
        if (this.props.activeTracks !==null && this.props.activeTracks !==undefined && this.props.activeTracks.length > 0) {
            return (<main className={`${styles.tracksMain}`}>
                {
                    this.props.activeTracks.map((track, index) => {
                        return (<Card isPhone={this.props.isPhone} randomTrack={track} onClick={this.props.voteHandler.bind(this, track.id)} key={index} color={constants.iterateCardColors(index)}/>);
                    })
                }
                <Notification ignore={this.state.notification.ignore && this.state.notification.title !== ''} notSupported={this.handleNotSupported.bind(this)} onPermissionGranted={this.handlePermissionGranted.bind(this)} onPermissionDenied={this.handlePermissionDenied.bind(this)} timeout={5000} title={this.state.notification.title || ''} options={this.state.notification.options}/>
            </main>);
        } else {
            return (<main className={`${styles.noTracksMain}`}>
                <div className={`${styles.noTracksWrapper}`}>
                    <h1 className={`${styles.noTracksHeading}`}>Select a playlist first!</h1><br/><br/>
                    <h2 className={`${styles.noTracksSubheading}`}>Users can connect with
                        <b style={{
                            fontFamily: 'Circular Bold, Arial, Sans-Serif'
                        }}>
                            {' ' + this.props.roomId + ' '}
                        </b>
                        as Code!</h2>
                    <ShareButton/>
                    <Notification ignore={this.state.notification.ignore && this.state.notification.title !== ''} notSupported={this.handleNotSupported.bind(this)} onPermissionGranted={this.handlePermissionGranted.bind(this)} onPermissionDenied={this.handlePermissionDenied.bind(this)} timeout={5000} title={this.state.notification.title || ''} options={this.state.notification.options}/>
                </div>
            </main>);
        }

    }
}

export default CardContainer;
