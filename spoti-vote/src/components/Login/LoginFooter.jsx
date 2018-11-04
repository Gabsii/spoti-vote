import React, {Component} from 'react';
import {css} from 'glamor';

let constants = require('../../js/constants');
const styles = {
    footer: css({
        color: constants.colors.font,
        height: '100px',
        width: '100%',
        backgroundColor: constants.colors.backgroundLite,
        textOverflow: 'ellipsis',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    })
};

class LoginFooter extends Component {

    render() {

        return (<footer className={`${styles.footer}`}>Help us to keep Spoti-Vote running
            <br/>
            &copy; Lukas Gabsi, Michael Blank</footer>);
    }
}

export default LoginFooter;
