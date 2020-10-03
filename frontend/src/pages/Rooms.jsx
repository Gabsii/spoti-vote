import React, {Component} from 'react';
import {css} from 'glamor';
import Cookies from 'universal-cookie';
import {Helmet} from 'react-helmet';

import SharedSidebar from '../components/Shared/SharedSidebar.jsx';
import RoomContainer from '../components/Rooms/RoomContainer.jsx';

//const cookies = new Cookies();
const constants = require('../js/constants');
const styles = {
    main: css({
        backgroundColor: constants.colors.greenCard,
        minHeight: '100%',
        height: '100%',
        maxWidth: '100vw',
        display: 'flex',
        flexDirection: 'row'
    })
};

class Rooms extends Component {

    constructor() {
        super();
        this.state = {
            profile: {
                name: null,
                id: 0,
                img: 'https://via.placeholder.com/152x152'
            }
        };
    }

    componentDidMount() {
        /*
        let token = cookies.get('token');

        if (window.location.search) {
            token = window.location.search.split('=')[1];
        }

        if (token) {
            cookies.set('token', token);
        } else {
            window.location.pathname = '';
        }

        //Gets rid of the search in window.location
        var myNewURL = window.location.protocol + '//' + window.location.hostname + window.location.pathname;
        window.history.pushState({}, document.title, myNewURL);

        this.fetchProfileData(token);
        */
    }

    // asynchronously fetch all the comments for the current post and add it to the comments array in the state
    fetchProfileData(token) {
        fetch('https://api.spotify.com/v1/me/', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response => response.json()).then(response => {
            if (!response.error) {
                this.setState({
                    profile: {
                        name: response.display_name,
                        id: response.id,
                        img: response.images[0].url || 'https://via.placeholder.com/152x152'
                    }
                });
            } else if (response.error.status === 401) {
                window.location.href = constants.config.url + '/login';
            }
        }).catch((err) => console.error(err));
    }

    render() {
        return (<div className={`${styles.main}`}>
            <Helmet>
                <html lang="en"   />
                <title>Rooms | Spoti-Vote</title>
                <meta name="author" content="Lukas Samir Gabsi, Michael Blank"></meta>
            </Helmet>
            <RoomContainer/>
            <SharedSidebar profile={this.state.profile}/>
        </div>);
    }
}

export default Rooms;
