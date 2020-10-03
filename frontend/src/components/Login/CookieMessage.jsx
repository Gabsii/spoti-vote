import React, {useEffect, useState} from 'react';
import Cookies from 'universal-cookie';
import {css} from 'glamor';

const cookies = new Cookies();
const constants = require('../../js/constants');
const styles = {
    wrapper: css({
        padding: '25px',
        position: 'fixed',
        bottom: 0,
        height: '75px',
        backgroundColor: 'black',
        color: 'white',
        width: 'calc(100% - 50px)',
        display: 'flex',
        flexDirection: 'row'
    }),
    text: css({float: 'left', marginLeft: '20px'}),
    button: css({
        float: 'right',
        padding: '12px 25px',
        margin: '15px 30px',
        fontSize: '0.9em',
        lineHeight: 1,
        borderRadius: '500px',
        borderWidth: 0,
        letterSpacing: '2px',
        minWidth: '200px',
        maxHeight: '50px',
        textTransform: 'uppercase',
        whiteSpace: 'normal',
        backgroundColor: constants.colors.green
    }),
    link: css({color: 'white', textDecoration: 'none'})
};

const CookieMessage = () => {
    const [showCookie, setShowCookie] = useState(true)
    
    const setCookie = () => {
        cookies.set('cookie', true);
        let cookie = cookies.get('cookie');
        setShowCookie(Boolean(!cookie));
    }

    useEffect(() => {
        let cookie = cookies.get('cookie');
        /* If the cookie is set, dont show the message */
        setShowCookie(Boolean(!cookie));
    }, [])
    
    if (!showCookie) return null;

    return (
        <div className={`${styles.wrapper}`}>
            <div className={`${styles.text}`}>This page uses Cookies to work. Please press this button so we can stay within the law. {' '}
                <a href="/policies" className={`${styles.link}`}>More Infos about your rights.</a>
            </div>
            <button className={`${styles.button}`} onClick={() => setCookie()}>I understand</button>
        </div>
    );
}

export default CookieMessage;
