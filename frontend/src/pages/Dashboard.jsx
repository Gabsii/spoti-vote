import React, {Component} from 'react';
import {css} from 'glamor';
import Cookies from 'universal-cookie';
import {Helmet} from 'react-helmet';

import SharedSidebar from '../components/Shared/SharedSidebar.jsx';
import Main from '../components/Dashboard/Main.jsx';

const cookies = new Cookies();
const constants = require('../js/constants');
const styles = {
    main: css({
        backgroundColor: constants.colors.background,
        minHeight: '100vh',
        height: '100%',
        maxWidth: '100vw',
        display: 'flex',
        flexDirection: 'row'
    })
};

class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            profile: {
                name: null,
                id: 0,
                img: 'https://via.placeholder.com/152x152'
            },
            topTracks: []
        };
    }

    componentDidMount() {
        let token = cookies.get('token');

        if (window.location.search) {
            token = window.location.search.split('=')[1];
        }

        if (token === undefined) {
            window.location.pathname = '';
        } else {
            cookies.set('token', token);
        }

        //Gets rid of the search in window.location
        var myNewURL = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + window.location.pathname;
        window.history.pushState({}, document.title, myNewURL);

        this.fetchProfile(token);
    }

    fetchProfile(token) {
        fetch(constants.config.url + '/profile', {
            headers: {
                'Token': token
            }
        }).then(response => response.json().then(response => {
            if (response === null) {
                window.location.pathname = '';
            } else {
                this.setState({
                    profile: {
                        name: response.display_name,
                        id: response.id,
                        img: response.img || 'https://via.placeholder.com/152x152',
                        premium: response.premium
                    },
                    topTracks: response.topTracks
                });
            }
        }));
    }

    render() {
        return (<div className={`${styles.main}`}>
            <Helmet>
                <html lang="en"   />
                <title>Dashboard | Spoti-Vote</title>
                <meta name="author" content="Lukas Samir Gabsi, Michael Blank"></meta>
            </Helmet>
            <Main topTracks={this.state.topTracks} profile={this.state.profile}/>
            <SharedSidebar profile={this.state.profile}/>
        </div>);
    }
}

export default Dashboard;
