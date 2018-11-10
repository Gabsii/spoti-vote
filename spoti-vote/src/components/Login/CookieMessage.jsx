import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import {css} from 'glamor';

const cookies = new Cookies();
const constants = require('../../js/constants');
const styles = {
    wrapper: css({
        padding: '5%',
        position: 'fixed',
        bottom: 0,
        height: '10%',
        backgroundColor: 'black',
        color: 'white',
        width: 'calc(100% - 10%)'
    }),
    text: css({float: 'left', marginLeft: '20px'}),
    button: css({
        float: 'right',
        padding: '12px 25px',
        marginRight: '30px',
        marginTop: '20px',
        fontSize: '0.9em',
        lineHeight: 1,
        borderRadius: '500px',
        borderWidth: 0,
        letterSpacing: '2px',
        minWidth: '160px',
        maxHeight: '50px',
        textTransform: 'uppercase',
        whiteSpace: 'normal',
        backgroundColor: constants.colors.green
    })
};

class CookieMessage extends Component {

    constructor() {
        super();
        this.state = {
            cookie: true
        };
    }

    componentDidMount() {
        let cookie = cookies.get('cookie');

        /* If the cookie is set, dont show the message */
        if (cookie) {
            this.setState({cookie: false});
        }
    }

    setCookie() {
        cookies.set('cookie', true);

        let cookie = cookies.get('cookie');

        /* If the cookie is set, dont show the message */
        if (cookie) {
            this.setState({cookie: false});
        }
    }

    render() {
        if (this.state.cookie) {
            return (<div className={`${styles.wrapper}`}>
                <div className={`${styles.text}`}>This page uses Cookies to work. Please press this button so we can stay within the law.</div>
                <button className={`${styles.button}`} onClick={this.setCookie.bind(this)}>I understand</button>
            </div>);
        } else {
            return '';
        }
    }
}

export default CookieMessage;
