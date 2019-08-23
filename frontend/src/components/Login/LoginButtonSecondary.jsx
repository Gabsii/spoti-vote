import React, {Component} from 'react';
import {css} from 'glamor';

import '../../css/selectors.css';
let constants = require('../../js/constants');

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
        marginTop: '1.5em',
        cursor: 'context-menu',
        ':hover': {
            cursor: 'pointer',
            backgroundColor: constants.colors.green,
            color: constants.colors.background
        }
    })
};

class LoginButtonSecondary extends Component {

    login() {
        window.location.pathname = '/join';
    }

    render() {
        return (<button id='loginbuttonsecondary' className={`${styles.button}`} onClick={this.login.bind(this)} tabIndex='0'>
            Join a party
        </button>);
    }
}

export default LoginButtonSecondary;
