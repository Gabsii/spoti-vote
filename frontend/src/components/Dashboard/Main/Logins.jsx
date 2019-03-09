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
        cursor: 'context-menu',
        '@media(min-width: 760px)': {
            marginRight: '2em'
        },
        ':hover': {
            cursor: 'pointer',
            backgroundColor: constants.colors.greenHover
        }
    }),
    buttonWrapper: css({display: 'flex', flexDirection: 'column'}),
    buttonDisabled: css({
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
        color: 'black',
        backgroundColor: constants.colors.fontSecondary,
        marginTop: '1.5em',
        cursor: 'context-menu',
        '@media(min-width: 760px)': {
            marginRight: '2em'
        },
        ':hover': {
            color: 'white',
            cursor: 'pointer',
            backgroundColor: constants.colors.barBackground
        }
    }),
    heading: css({fontSize: '2.5em'}),
    subHeading: css({fontSize: '1.5em', marginTop: '25px'}),
    error: css({fontWeight: 'bold', color: constants.colors.redCard})
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
        window.location.href = constants.config.url + '/createRoom?id=' + this.props.profile.id;
    }

    render() {
        return (<div className={`${styles.wrapper}`}>
            <h1 className={`${styles.heading}`}>Create a Room:</h1>
            {
                this.props.profile.premium
                    ? <button id='loginbutton' className={`${styles.button}`} onClick={this.login.bind(this)} tabIndex='0'>
                            Host
                        </button>
                    : <div className={`${styles.buttonWrapper}`}>
                            <button className={`${styles.buttonDisabled}`} onClick={this.login.bind(this)} tabIndex='0' disabled="disabled">
                                Host
                            </button>
                            <div className={`${styles.error}`}>You need Spotify Premium to host a room!</div>
                        </div>
            }

            <h2 className={`${styles.subHeading}`}>Or join one:</h2>
            <LoginCode/>
        </div>);
    }
}

export default Logins;
