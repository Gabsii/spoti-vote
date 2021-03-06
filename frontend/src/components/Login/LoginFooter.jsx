import React from 'react';
import {css} from 'glamor';

let constants = require('../../js/constants').default;
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
    }),
    link: css({color: 'white', textDecoration: 'none'})
};

const LoginFooter = () => {

    return (<footer className={`${styles.footer}`}>Help us to keep Spoti-Vote running
        <br/>
        &copy; Lukas Gabsi, Michael Blank
        <br/>
        <a href="/policies" className={`${styles.link}`}>Policies</a>
    </footer>);
};

export default LoginFooter;
