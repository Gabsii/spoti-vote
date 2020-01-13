import React, {Component} from 'react';
import socketIOClient from 'socket.io-client';
import Cookies from 'universal-cookie';
import swal from 'sweetalert2';
import {css} from 'glamor';
import {Helmet} from 'react-helmet';

import Footer from '../components/App/Footer.jsx';
import AppSidebar from '../components/App/AppSidebar.jsx';
import CardContainer from '../components/App/Cards/CardContainer.jsx';

const constants = require('../js/constants');
const cookies = new Cookies();
const styles = {
    main: css({backgroundColor: constants.colors.background, height: '100vh', width: '100vw'})
};
class App extends Component {
    constructor() {
        super();

        let token = cookies.get('token');
        if (token === undefined) {
            token = null;
        }

        this.state = {
            isPhone: (typeof window.orientation !== 'undefined') || (navigator.userAgent.indexOf('IEMobile') !== -1),
            token: token,
            roomId: window.location.pathname.split('/')[2],
            loginPage: constants.config.url,
            isHost: false,
            connectedUser: [],
            playlists: [],
            host: {
                img: '', //You now have the user icon in here
                name: null,
                voted: null
            },
            activePlaylist: {
                name: 'Loading',
                external_urls: {
                    spotify: ''
                },
                images: [
                    {
                        url: ''
                    }
                ]
            },
            activeTracks: {},
            activePlayer: null,
            voted: null
        };
    }

    componentDidMount() {

        this.timer = setInterval(()=> this.getData(), 1000);

        if (this.state.isHost) {
            swal.fire({titleText: 'Hello from the other side!', type: 'info', text: 'Please make sure that you are running Spotify in the background!', allowOutsideClick: false, allowEscapeKey: false});
        }
    }

    getData() {
        fetch(constants.config.url + '/rooms/get/' + this.state.roomId , 
            {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    token: this.state.token
                })
            })
            .then((response) => response.json())
            .then((data) =>
            {
                if (data.error) {
                    clearInterval(this.timer);
                    swal.fire({type: 'error', title: 'Oops...', text: data.message}).then( () => {
                        window.location.pathname = '/dashboard';
                    });
                } else {
                    console.log(data.room.activePlayer);
                    this.setState({
                        playlists: data.room.playlists,
                        isHost: data.room.isHost,
                        host: data.room.host,
                        activeTracks: data.room.activeTracks,
                        activePlaylist: data.room.activePlaylist,
                        connectedUser: data.room.connectedUser,
                        activePlayer: data.room.activePlayer
                    });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    
    selectPlaylist(event) {
        let playlistId = event.target.options[event.target.selectedIndex].getAttribute('id');
        if (playlistId !== null && playlistId !== 'none') {
            fetch(constants.config.url + '/rooms/get/' + this.state.roomId + '/selectPlaylist', 
                {
                    method: 'post',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify({
                        token: this.state.token,
                        playlistId: playlistId
                    })
                }
            );
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
            this.socket.emit('vote', {trackId: trackId});
        }
    }

    rerollHandler() { 
        const cards = document.getElementsByClassName('card');
        if (cards.length > 0) {
            this.setState({voted: null});
            this.socket.emit('vote', {trackId: 'skip'});
            for (var i = 0; i < cards.length; i++) {
                cards[i].style.opacity = 1;
            }
        }
    }

    skipHandler() {
        this.socket.emit('skip');
    }

    playHandler() {
        this.socket.emit('pause');
    }
    
    render() {
        return (<main className={`${styles.main}`}>
            <Helmet>
                <html lang="en" />
                <title> {this.state.roomId || ''} | Spoti-Vote</title>
                <meta name="author" content="Lukas Samir Gabsi, Michael Blank"></meta>
            </Helmet>
            <AppSidebar rerollHandler={this.rerollHandler.bind(this)} socket={this.socket} isHost={this.state.isHost} connectedUser={this.state.connectedUser} host={this.state.host} token={this.state.token} playlistHandler={this.selectPlaylist.bind(this)} activePlaylist={this.state.activePlaylist} activeTracks={this.state.activeTracks} playlists={this.state.playlists}/>
            <CardContainer voteHandler={this.voteHandler.bind(this)} isPhone={false} room={this.state.roomId} name={this.state.name} isHost={this.state.isHost} activeTracks={this.state.activeTracks} socket={this.socket}/>
            <Footer playHandler={this.playHandler.bind(this)} skipHandler={this.skipHandler.bind(this)} isHost={this.state.isHost} activePlayer={this.state.activePlayer} socket={this.socket}/>
        </main>);
    }
}

export default App;
