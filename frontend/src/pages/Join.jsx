import React, {Component} from 'react';
import {css} from 'glamor';

import Header from '../components/Login/Header.jsx';
import LoginCode from '../components/Login/LoginCode.jsx';
import bg from '../img/mohammad-metri-421904-unsplash.jpg';

const constants = require('../js/constants');
const styles = {
    main: css({
        width: '100%',
        height: '100vh',
        backgroundColor: constants.colors.backgroundLite,
        backgroundImage: 'url(' + bg + ')',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top',
        backgroundAttachment: 'fixed',
        color: constants.colors.font
    }),
    wrapper: css({
        backgroundColor: 'rgba(0,0,0, 0.4)',
        boxSizing: 'borderBox',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '20px'
    }),
    heading: css({fontSize: '2em', marginTop: '1.5em', textAlign: 'center'}),
    subheading: css({fontSize: '1.5em'}),
    text: css({textAlign: 'center'})
};

class Join extends Component {

    componentDidMount() {
        document.title = 'Spoti-Vote | Join a room';
        if (document.getElementsByTagName('META')[2]) {
            document.getElementsByTagName('META')[2].content = 'Join a room to fulfill your wish of musically democracy';
        }
    }

    render() {
        return (<main className={`${styles.main}`}>
            <Header/>
            <div className={`${styles.wrapper}`}>
                <h1 className={`${styles.heading}`}>Join a Spoti-Vote Room</h1><br/>
                <br/>
                <div className={`${styles.text}`}>Ask your friend for the Room Code and enter it below:</div>
                <br/>
                <br/>
                <br/>
                <h2 className={`${styles.subHeading}`}>Room Code</h2>
                <LoginCode/>
            </div>
        </main>);
    }
}

export default Join;
