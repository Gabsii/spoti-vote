import React, {Component} from 'react';
import {css} from 'glamor';

import LoginButton from '../../Login/LoginButton.jsx';
import LoginCode from '../../Login/LoginCode.jsx';

const constants = require('../../../js/constants');
const styles = {
    wrapper: css({
        height: 'calc(100% - 360px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        color: 'white'
    }),
    heading: css({fontSize: '2.5em'}),
    subHeading: css({fontSize: '1.5em', marginTop: '25px'})
};

class Logins extends Component {

    render() {
        return (<div className={`${styles.wrapper}`}>
            <h1 className={`${styles.heading}`}>Create a Room:</h1>
            <LoginButton/>
            <h2 className={`${styles.subHeading}`}>Or join one:</h2>
            <LoginCode/>
        </div>);
    }
}

export default Logins;
