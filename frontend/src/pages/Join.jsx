import React, {Component} from 'react';
import {css} from 'glamor';
import {Helmet} from 'react-helmet';

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

    render() {
        return (<main className={`${styles.main}`}>
            <Helmet>
                <html lang="en"   />
                <title>Join | Spoti-Vote</title>
                <meta name="author" content="Lukas Samir Gabsi, Michael Blank"></meta>
                <meta name="description" content="Spoti-Vote aims to improve your party! Ever had a fight over the music? Which song to play next? Spoti-Vote saves that problem! Simply start a new room, choose a playlist and invite your friends!"></meta>
                <meta property="og:image" content="https://spoti-vote.com/static/media/spotiLogo.4d91de47.svg"></meta>
                <meta property="og:description" content="Spoti-Vote aims to improve your party! Ever had a fight over the music? Which song to play next? Spoti-Vote saves that problem! Simply start a new room, choose a playlist and invite your friends!"></meta>
                <meta property="og:title" content="Get your party grooving with Spoti-Vote"></meta>
            </Helmet>
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
