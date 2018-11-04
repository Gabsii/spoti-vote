import React, {Component} from 'react';
import MediaQuery from 'react-responsive';
import {
    faUsers,
    faPiggyBank,
    faUnlink,
    faCar,
    faHome,
    faHeadphones
} from '@fortawesome/fontawesome-free-solid';
import {faFacebook, faTwitter, faGithub} from '@fortawesome/fontawesome-free-brands';
import {css} from 'glamor';

import image from '../img/samantha-gades-540989-unsplash.jpg';
import for1 from '../img/etienne-boulanger-409520-unsplash.jpg'; //car
import for2 from '../img/eric-nopanen-624212-unsplash.jpg'; //home
import for3 from '../img/austin-neill-247237-unsplash.jpg'; //dj
import Header from '../components/Login/Header.jsx';
import LoginFooter from '../components/Login/LoginFooter.jsx';
import LoginButton from '../components/Login/LoginButton.jsx';
import LoginButtonSecondary from '../components/Login/LoginButtonSecondary.jsx';
import Reason from '../components/Login/Reason.jsx';
import CookieMessage from '../components/Login/CookieMessage.jsx';
import SocialIcon from '../components/Login/SocialIcon.jsx';

let constants = require('../js/constants');
const styles = {
    heroWrapper: css({
        width: '100%',
        height: '750px',
        backgroundColor: constants.colors.backgroundLite,
        backgroundImage: 'url(' + image + ')',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top',
        backgroundAttachment: 'fixed'
    }),
    hero: css({
        height: '100%',
        width: '100%',
        alignItems: 'center',
        padding: '10px 10%',
        boxSizing: 'border-box',
        overflow: 'hidden',
        alignItems: 'flex-start',
        display: 'flex',
        background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,1))'
    }),
    textWrapper: css({color: constants.colors.font, display: 'flex', alignItems: 'flex-start', flexDirection: 'column', marginTop: '25%'}),
    heroHeading: css({fontFamily: 'Circular Bold', fontSize: '3em'}),
    heroSubheading: css({fontSize: '1.5em', marginTop: '0.25em'}),
    buttonsWrapper: css({
        display: 'flex',
        flexDirection: 'column',
        '@media(min-width: 760px)': {
            flexDirection: 'row'
        }
    }),
    plainSection: css({width: '100%', minHeight: '500px', backgroundColor: constants.colors.font}),
    plainContainer: css({
        height: '100%',
        width: '100%',
        alignItems: 'center',
        padding: '10px 10%',
        boxSizing: 'border-box',
        overflow: 'hidden'
    }),
    plainHeading: css({
        display: 'flex',
        justifyContent: 'center',
        fontSize: '2em',
        fontFamily: 'Circular Book',
        marginTop: '1.5em',
        marginBottom: '2em'
    }),
    imageSection: css({
        width: '100%',
        minHeight: '500px',
        backgroundColor: constants.colors.backgroundLite,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top',
        backgroundAttachment: 'fixed',
        color: constants.colors.font
    }),
    imageContainer: css({
        height: '100%',
        width: '100%',
        alignItems: 'center',
        padding: '10px 10%',
        boxSizing: 'border-box',
        overflow: 'hidden',
        minHeight: '500px',
        background: 'linear-gradient(rgba(0,0,0,1), rgba(0,0,0,0.4), rgba(0,0,0,1))'
    }),
    imageHeading: css({
        display: 'flex',
        justifyContent: 'center',
        fontSize: '2em',
        fontFamily: 'Circular Book',
        marginTop: '1.5em',
        marginBottom: '2em',
        textAlign: 'center'
    }),
    socialSection: css({width: '100%', height: '250px', backgroundColor: constants.colors.font}),
    socialHeading: css({display: 'flex', justifyContent: 'center', fontSize: '2em', fontFamily: 'Circular Book', marginTop: '1.5em'}),
    socialWrapper: css({display: 'flex', flexDirection: 'row', justifyContent: 'center'}),
    reasonWrapper: css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '@media(min-width: 760px)': {
            flexDirection: 'row'
        }
    })
};

class Login extends Component {

    constructor() {
        super();
        this.state = {
            image: image
        };
    }

    componentDidMount() {
        if (window.location.search !== '') {
            window.location.search = '';
        }
        document.title = 'Spoti-Vote';
        document.getElementsByTagName('META')[2].content = 'Spoti Vote provides you with a party mode for Spotify. Let your friends choose the music!';
        var random = Math.floor((Math.random() * 3) + 1);
        switch (random) {
            case 1:
                this.setState({image: for1});
                break;
            case 2:
                this.setState({image: for2});
                break;
            case 3:
                this.setState({image: for3});
                break;
            default:
                this.setState({image: null});
                break;
        }
    }

    render() {
        window.addEventListener('touchmove', (event) => {}, {passive: true});
        return (<main>
            <Header/>
            <CookieMessage/>
            <section className={`${styles.heroWrapper}`}>
                <div className={`${styles.hero}`}>
                    <div className={`${styles.textWrapper}`}>
                        <div>
                            <h1 className={`${styles.heroHeading}`}>Let your friends
                                <br/>choose the music</h1>
                        </div>
                        <h2 className={`${styles.heroSubheading}`}>All you need is Spotify</h2>
                        <div className={`${styles.buttonsWrapper}`}>
                            <LoginButton/>
                            <LoginButtonSecondary/>
                        </div>
                    </div>
                </div>
            </section>
            <section className={`${styles.plainSection}`}>
                <div className={`${styles.plainContainer}`}>
                    <h2 id='features' className={`${styles.plainHeading}`}>Why Spoti-Vote?</h2>
                    <div className={`${styles.reasonWrapper}`}>
                        <Reason icon={faPiggyBank} title="No Costs" text="Save your piggy bank by using Spoti-Vote. Our service is completely free of charge!"/>
                        <Reason icon={faUsers} title="No Dictatorship" text="We empower the users! The DJ plays a song you don't like? Use your voice and just skip it!"/>
                        <Reason icon={faUnlink} title="No Registration" text="We have no strings on you! Just log in with your Spotify Premium account and invite your friends to join your room!"/>
                    </div>
                </div>
            </section>
            <section className={`${styles.imageSection}`} style={{
                    backgroundImage: 'url(' + this.state.image + ')'
                }}>
                <div className={`${styles.imageContainer}`}>
                    <h2 className={`${styles.imageHeading}`}>Spoti-Vote is perfect for...</h2>
                    <div className={`${styles.reasonWrapper}`}>
                        <Reason icon={faCar} title="Road Trips" text="You're feeling like James Corden, do you? Sing along with your friends to your favourite songs"/>
                        <Reason icon={faHome} title="House Parties" text="Create a collabarative playlist and party to your finest tunes"/>
                        <Reason icon={faHeadphones} title="DJs/Streamer" text="Let your crowd set the tone while you lean back and relax"/>
                    </div>);
                </div>
            </section>
            <section className={`${styles.socialSection}`}>
                <div className={`${styles.plainContainer}`}>
                    <h2 className={`${styles.socialHeading}`}>Connect with us</h2>
                    <div className={`${styles.socialWrapper}`}>
                        <SocialIcon icon={faFacebook} url={'https://www.facebook.com/Spoti-Vote-600357846990340/'}/>
                        <SocialIcon icon={faTwitter} url={'https://twitter.com/SpotiVote'}/>
                        <SocialIcon icon={faGithub} url={'https://github.com/Gabsii/spoti-vote'}/>
                    </div>
                </div>
            </section>
            <LoginFooter/>
        </main>);
    }
}
export default Login;
