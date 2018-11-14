import React, {Component} from 'react';
import {css} from 'glamor';

import LoginCode from '../../Login/LoginCode.jsx';

let constants = require('../../../js/constants');

const styles = {
    wrapper: css({
        height: 'calc(100% - 360px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        color: 'white'
    }),
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
        '@media(min-width: 760px)': {
            marginRight: '2em'
        }
    }),
    heading: css({fontSize: '2.5em'}),
    subHeading: css({fontSize: '1.5em', marginTop: '25px'})
};

class Logins extends Component {

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
        window.location.href = constants.config.url + '/createRoom';
    }

    render() {
        let linkStyle;
        if (this.state.hover) {
            linkStyle = {
                cursor: 'pointer',
                backgroundColor: constants.colors.greenHover
            };
        } else {
            linkStyle = {
                cursor: 'context-menu'
            };
        }

        return (<div className={`${styles.wrapper}`}>
            <h1 className={`${styles.heading}`}>Create a Room:</h1>
            <button style={linkStyle} id='loginbutton' className={`${styles.button}`} onMouseEnter={this.toggleHover.bind(this)} onMouseLeave={this.toggleHover.bind(this)} onClick={this.login.bind(this)} tabIndex='0'>
                Host
            </button>
            <h2 className={`${styles.subHeading}`}>Or join one:</h2>
            <LoginCode/>
        </div>);
    }
}

export default Logins;
