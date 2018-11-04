import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faSignOutAlt} from '@fortawesome/fontawesome-free-solid';
import {css} from 'glamor';

import SkipButton from './SkipButton.jsx';

let constants = require('../../../js/constants');
const styles = {
    wrapper: css({
        width: '100%',
        minWidth: 0,
        height: '32px',
        boxSizing: 'border-box',
        marginTop: 'auto',
        padding: '4px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 'auto',
        '@media(min-width: 760px)': {
            marginBottom: 0
        }
    }),
    button: css({border: 0, color: constants.colors.fontSecondary, background: 'none'})
};

class SettingsBar extends Component {

    constructor() {
        super();
        this.state = {
            hover: false
        };
    }

    toggleHover() {
        this.setState({
            hover: !this.state.hover
        });
    }

    logoutHandler() {
        if (this.props.isHost === true) {
            if (window.confirm('This will close the room, are you sure?')) {
                this.props.socket.emit('logout');
                window.location.pathname = '/';
            }
        } else {
            window.location.pathname = '/';
        }
    }

    render() {
        let linkStyle;
        this.state.hover
            ? linkStyle = {
                cursor: 'pointer'
            }
            : linkStyle = {
                cursor: 'context-menu'
            };

        return (<div className={`${styles.wrapper}`}>
            <SkipButton socket={this.props.socket} skipHandler={this.props.skipHandler} connectedUser={this.props.connectedUser} host={this.props.host}/>
            <button style={linkStyle} className={`${styles.button}`} onClick={this.logoutHandler.bind(this)} onMouseEnter={this.toggleHover.bind(this)} onMouseLeave={this.toggleHover.bind(this)}>
                <FontAwesomeIcon icon={faSignOutAlt} size='2x'/>
            </button>
        </div>);
    }
}

export default SettingsBar;
