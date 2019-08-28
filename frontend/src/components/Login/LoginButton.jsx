import React, {PureComponent} from 'react';
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
        backgroundColor: constants.colors.green,
        marginTop: '1.5em',
        cursor: 'context-menu',
        '@media(min-width: 760px)': {
            marginRight: '2em'
        },
        ':hover': {
            cursor: 'pointer',
            backgroundColor: constants.colors.greenHover
        }
    })
};

class LoginButton extends PureComponent {
    login() {
        window.location.href = constants.config.url + '/login';
    }

    render() {
        return (<button id='loginbutton' className={`${styles.button}`} onClick={this.login.bind(this)} tabIndex='0'>
            Start a party
        </button>);
    }
}

export default LoginButton;
