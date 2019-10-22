import React from 'react';
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
        justifyContent: 'center',
        flexDirection: 'column',
        '& > div': { margin: '0.25rem' }
    }),
    link: css({color: 'white', textDecoration: 'none'})
};

const LoginFooter = () => {

    return(
        <footer className={`${styles.footer}`}>
            <div>
                Help us to keep Spoti-Vote running
            </div>
            <div>
                &copy; Lukas Gabsi, Michael Blank
            </div>
            <div>
                <a href="/policies" className={`${styles.link}`}>Policies</a>
            </div>
        </footer>);
};

export default LoginFooter;
