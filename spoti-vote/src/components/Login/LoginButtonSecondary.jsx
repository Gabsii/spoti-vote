import React, {Component} from 'react';
import {css} from 'glamor';

import '../../css/selectors.css';
let constants = require('../../js/constants');
const ipAddress = (window.location.hostname === 'localhost')
    ? 'localhost'
    : 'backend.spoti-vote.com';
const protocol = (window.location.hostname === 'localhost')
    ? 'http://'
    : 'https://';

const styles = {
    button: css({
        padding: '17px 48px',
        fontSize: '0.9em',
        lineHeight: 1,
        borderRadius: '500px',
        borderWidth: 0,
        letterSpacing: '2px',
        minWidth: '160px',
        maxHeight: '50px',
        textTransform: 'uppercase',
        whiteSpace: 'normal',
        backgroundColor: 'rgba(0,0,0,0)',
        boxShadow: '0 0 0 2px ' + constants.colors.green + ' inset',
        color: constants.colors.green,
        marginTop: '1.5em'
    })
};

class LoginButtonSecondary extends Component {

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

    login() {
        window.location.href = protocol + ipAddress + '/join';
    }

    render() {
        let linkStyle;
        if (this.state.hover) {
            linkStyle = {
                cursor: 'pointer',
                backgroundColor: constants.colors.green,
                color: constants.colors.background
            };
        } else {
            linkStyle = {
                cursor: 'context-menu'
            };
        }
        return (<button id='loginbuttonsecondary' className={`${styles.button}`} style={linkStyle
} onMouseEnter={this.toggleHover.bind(this)} onMouseLeave={this.toggleHover.bind(this)} onClick={this.login.bind(this)} tabIndex='0'>
            Join
        </button>);
    }
}

export default LoginButtonSecondary;
