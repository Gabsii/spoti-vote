import React, {Component} from 'react';
import {css} from 'glamor';

let constants = require('../../js/constants');

class LoginFooter extends Component {

    render() {

        return (<footer className={`${styles.footer}`}>Help us to keep Spoti-Vote running
            <br/>
            &copy; Lukas Gabsi, Michael Blank</footer>);
    }
}

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
}
export default LoginFooter;
