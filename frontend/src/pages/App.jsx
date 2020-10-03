import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import swal from 'sweetalert2';
import {css} from 'glamor';
import {Helmet} from 'react-helmet';

import Footer from '../components/App/Footer.jsx';
import AppSidebar from '../components/App/AppSidebar.jsx';
import CardContainer from '../components/App/Cards/CardContainer.jsx';
import placeHolderImage from '../img/logos/Spotivote_Logo_svg.svg';

const constants = require('../js/constants');
const cookies = new Cookies();
const styles = {
    main: css({backgroundColor: constants.colors.background, height: '100vh', width: '100vw'})
};
class App extends Component {

    errorMessage(message) {
        swal.fire({type: 'error', title: 'Oops...', text: message}).then( () => {
            if (this.state.isHost) {
                window.location.pathname = '/dashboard';
            } else {
                window.location.pathname = '';
            }
        });
    }

    constructor() {
        super();

        let myToken = cookies.get('myToken');
        if (!myToken) {
            myToken = null;
        }

        this.state = {
            myToken: myToken,
            clientName: '',
            isPhone: (typeof window.orientation !== 'undefined') || (navigator.userAgent.indexOf('IEMobile') !== -1),
            roomId: window.location.pathname.split('/')[2],
            loginPage: constants.config.url,
            isHost: false,
            connectedUser: [],
            playlists: [],
            host: {
                img: placeHolderImage, //You now have the user icon in here
                name: null,
                voted: null
            },
            activePlaylist: {
                name: 'Loading',
                playlistUrl: '',
                playlistImage: placeHolderImage
            },
            activeTracks: [],
            activePlayer: {
                volume: 0,
                timeLeft: 0,
                progressMS: 0,
                progress: 0,
                isPlaying: false,
                track: {
                    img: placeHolderImage,
                    id: '',
                    name: 'Spotify is not running',
                    artists: []
                }
            },
            voted: null
        };
    }

    async componentDidMount() {
        let [data] = await constants.api('/rooms/' + this.state.roomId + '/checkToken', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                myToken: this.state.myToken
            })
        });
        if (data.error) {
            clearInterval(this.timer);
            this.errorMessage(data.message);
        } else {
            if (!data.isHost) {
                if (data.name === '') {
                    swal.fire({
                        title: 'Whats your name?',
                        type: 'question',
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        input: 'text',
                        inputPlaceholder: 'Enter your name or nickname',
                        inputValidator: () => {
                            return new Promise((resolve) => {
                                return resolve();
                            });
                        }
                    }).then(async (result) => {
                        let [data2] = await constants.api('/rooms/' + this.state.roomId + '/connectUser' , {
                            method: 'post',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({
                                myToken: this.state.myToken,
                                clientName: result.value
                            })
                        });
                        if (data2.myToken) {
                            this.setState({
                                myToken: data2.myToken,
                                clientName: result.value
                            });
                        } else {
                            this.setState({
                                clientName: result.value
                            });
                        }
                        cookies.set('myToken', this.state.myToken);
                        this.timer = setInterval(()=> this.getData(), 1000);
                    });
                } else {
                    this.setState({
                        myToken: cookies.get('myToken')
                    });
                    this.timer = setInterval(()=> this.getData(), 1000);
                }
            } else {
                this.timer = setInterval(()=> this.getData(), 1000);
            }
        }
    }

    async getData() {
        let [data] = await constants.api('/rooms/' + this.state.roomId + '/update' , {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                myToken: this.state.myToken
            })
        });
        if (data.error) {
            clearInterval(this.timer);
            this.errorMessage(data.message);
        } else {
            let newState = constants.insertObjectDifference(this.state, data);
            this.setState({
                playlists: newState.playlists,
                isHost: newState.isHost,
                host: newState.host,
                activeTracks: newState.activeTracks,
                activePlaylist: newState.activePlaylist,
                connectedUser: newState.connectedUser,
                activePlayer: newState.activePlayer
            });
        }
    }
    
    selectPlaylist(event) {
        let playlistId = event.target.options[event.target.selectedIndex].getAttribute('id');
        if (playlistId && playlistId !== 'none') {
            constants.api('/rooms/' + this.state.roomId + '/selectPlaylist', {
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    myToken: this.state.myToken,
                    playlistId: playlistId
                })
            });
        }
    }

    /**
     * Get siblings of an element
     * @author cferdinandi
     * @param  {Element} elem
     * @return {Object}
     */
    getSiblings(elem) {
        let siblings = [];
        let sibling = elem.parentNode.firstChild;
        let skipMe = elem;
        for (; sibling; sibling = sibling.nextSibling) 
            if (sibling.nodeType === 1 && sibling !== skipMe) {
                siblings.push(sibling);
            }
        return siblings;
    }

    voteHandler(trackId, event) {
        let buttons = this.getSiblings(event.target.closest('button'));
        event.target.closest('button').style.opacity = 1;
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].style.opacity = 0.5;
        }
        if (this.state.voted !== trackId) {
            this.setState({voted: trackId});

            constants.api('/rooms/' + window.location.pathname.split('/')[2] + '/vote' , {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    myToken: this.state.myToken,
                    trackId: trackId
                })
            });
        }
    }

    rerollHandler() { 
        const cards = document.getElementsByClassName('card');
        if (cards.length > 0) {
            this.setState({voted: null});

            constants.api('/rooms/' + window.location.pathname.split('/')[2] + '/vote' , {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    myToken: this.state.myToken,
                    trackId: 'reroll'
                })
            });

            for (var i = 0; i < cards.length; i++) {
                cards[i].style.opacity = 1;
            }
        }
    }

    skipHandler() {
        constants.api('/rooms/' + this.state.roomId + '/skip', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                myToken: this.state.myToken,
            })
        });
    }

    playHandler() {
        constants.api('/rooms/' + this.state.roomId + '/pause', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                myToken: this.state.myToken,
            })
        });
    }
    
    render() {
        return (<main className={`${styles.main}`}>
            <Helmet>
                <html lang="en" />
                <title> {this.state.roomId || ''} | Spoti-Vote</title>
                <meta name="author" content="Lukas Samir Gabsi, Michael Blank"></meta>
            </Helmet>
            <AppSidebar rerollHandler={this.rerollHandler.bind(this)} isHost={this.state.isHost} connectedUser={this.state.connectedUser} host={this.state.host} playlistHandler={this.selectPlaylist.bind(this)} activePlaylist={this.state.activePlaylist} activeTracks={this.state.activeTracks} playlists={this.state.playlists}/>
            <CardContainer voteHandler={this.voteHandler.bind(this)} isPhone={false} roomId={this.state.roomId} activeTracks={this.state.activeTracks}/>
            <Footer playHandler={this.playHandler.bind(this)} skipHandler={this.skipHandler.bind(this)} isHost={this.state.isHost} activePlayer={this.state.activePlayer} myToken={this.state.myToken}/>
        </main>);
    }
}

export default App;
