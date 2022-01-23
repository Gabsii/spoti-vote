import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faRandom} from '@fortawesome/free-solid-svg-icons/faRandom';
import {Helmet} from 'react-helmet';

import Header from '../components/Login/Header.jsx';
import step1 from '../img/Step1.PNG';
import step2 from '../img/Step2.PNG';
import step4 from '../img/Step4.PNG';

let sectionStyle = {
    width: '100%',
    position: 'relative',
    height: '50vh',
    display: 'flex',
    flexDirection: 'row',
    borderBottom: '1px solid black'
};
let linkStyle = {
    textDecoration: 'none',
    letterSpacing: '1px',
    color: 'black',
    fontWeight: 'bold'
};
let paragraphStyle = {
    width: '40%',
    height: 'calc( 50vh - 100px )',
    fontSize: '1.25em'
};
let imgStyle = { // TODO: rework whole page lmao im ashamed
    maxWidth: '60%',
    maxHeight: '50vh'
};

const constants = require('../js/constants').default;

class Usage extends Component {

    componentDidMount() {
        if (window.location.search !== '') {
            window.location.search = '';
        }
    }

    render() {
        window.addEventListener('touchmove', () => {}, {passive: true}); //(event)
        return (<main>
            <Helmet>
                <html lang="en"   />
                <title>Usage | Spoti-Vote</title>
                <meta name="author" content="Lukas Samir Gabsi, Michael Blank"></meta>
                <meta name="description" content="Spoti-Vote aims to improve your party! Ever had a fight over the music? Which song to play next? Spoti-Vote saves that problem! Simply start a new room, choose a playlist and invite your friends!"></meta>
                <meta property="og:image" content="https://spoti-vote.com/static/media/spotiLogo.4d91de47.svg"></meta>
                <meta property="og:description" content="Spoti-Vote aims to improve your party! Ever had a fight over the music? Which song to play next? Spoti-Vote saves that problem! Simply start a new room, choose a playlist and invite your friends!"></meta>
                <meta property="og:title" content="Get your party grooving with Spoti-Vote"></meta>
            </Helmet><Header/>
            <section style={{
                ...sectionStyle
            }}>
                <div style={{
                    ...paragraphStyle,
                    padding: '50px 7.5%'
                }}>
                    <h1 style={{
                        fontFamily: 'Circular Bold, Arial, Sans-Serif',
                        fontSize: '1.5em',
                        marginBottom: '1em'
                    }}>1.&nbsp;Sign in using your Spotify Account*</h1>
                    <div style={{
                        height: 'calc( 100% - 3em )',
                        position: 'relative'
                    }}>SpotiVote controls your party playlist, while Spotify is used to play the playlist. Connect an existing or new Spotify account by clicking
                        <a style={linkStyle} href={constants.config.url + '/login'}>
                            {' '}Host</a>
                        . {'Don\' t worry about your data.We save as little about you as we need(in fact we don \'t save anything about your account). We are not Facebook, you are save with us.'}
                        <div style={{
                            fontSize: '0.75em',
                            position: 'absolute',
                            bottom: 0,
                            left: 0
                        }}>* The Room Hoster is required to have a
                            <a style={linkStyle} href='https://www.spotify.com/premium/'>{' '}Spotify Premium Account</a>
                        </div>
                    </div>
                </div>
                <img alt='Login with Spotify' style={imgStyle} src={step1}></img>
            </section>
            <section style={{
                ...sectionStyle
            }}>
                <div style={{
                    ...paragraphStyle,
                    padding: '50px 7.5%'
                }}>
                    <h1 style={{
                        fontFamily: 'Circular Bold, Arial, Sans-Serif',
                        fontSize: '1.5em',
                        marginBottom: '1em'
                    }}>2.&nbsp;Share it with your friends!</h1>
                    <div>Once you logged into the room you see a unique Room Code. Through this Room Code your friends can join you by clicking
                        <a style={linkStyle} href='/join'>
                            {' '}Join</a>
                    </div>
                </div>
                <img alt='Share with your friends' style={imgStyle} src={step2}></img>
            </section>
            <section style={{
                ...sectionStyle
            }}>
                <div style={{
                    ...paragraphStyle,
                    padding: '50px 7.5%'
                }}>
                    <h1 style={{
                        fontFamily: 'Circular Bold, Arial, Sans-Serif',
                        fontSize: '1.5em',
                        marginBottom: '1em'
                    }}>3.&nbsp;Select a playlist, vote and enjoy!</h1>
                    <div>Select the playlist you want on the dropdown list, which displays all playlists you follow. As soon as the playlist finished loading 4 different Cards with songs should appear, by pressing on one of them you vote for them. The song with the most votes gets played after the current song finishes. If multiple songs have an equal amount of votes SpotiVote itself will decide which one would suit better</div>
                </div>
                <img alt='Select playlist and songs' style={imgStyle} src={step4}></img>
            </section>
            <section style={{
                ...sectionStyle
            }}>
                <div style={{
                    ...paragraphStyle,
                    padding: '50px 7.5%'
                }}>
                    <h1 style={{
                        fontFamily: 'Circular Bold, Arial, Sans-Serif',
                        fontSize: '1.5em',
                        marginBottom: '1em'
                    }}>4.&nbsp;'Eww I hate this song' (optional)</h1>
                    <div>No problem, just use the {' '}
                        <FontAwesomeIcon icon={faRandom} size='1x'/>-Button, get more than 66% of your friends to also vote and reroll the current Cards.</div>
                </div>
                <img alt='Reroll' style={imgStyle} src={step4}></img>
            </section>

        </main>);
    }
}
export default Usage;
