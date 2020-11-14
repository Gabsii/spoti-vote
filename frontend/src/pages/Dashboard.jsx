import React, {Component} from 'react';
import {css} from 'glamor';
import Cookies from 'universal-cookie';
import {Helmet} from 'react-helmet';
import swal from 'sweetalert2';

import SharedSidebar from '../components/Shared/SharedSidebar.jsx';
import Main from '../components/Dashboard/Main.jsx';

const cookies = new Cookies();
const constants = require('../js/constants').default;
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

    errorMessage(message) {
        swal.fire({type: 'error', title: 'Oops...', text: message}).then( () => {
            window.location.pathname = '';
        });
    }

    constructor() {
        super();
        this.state = {
            host: {
                name: null,
                id: 0,
                img: 'https://via.placeholder.com/152x152'
            },
            topTracks: []
        };
    }

    componentDidMount() {
        let myToken = cookies.get('myToken');

        if (window.location.search) {
            myToken = window.location.search.split('=')[1];
        }

        if (myToken) {
            cookies.set('myToken', myToken);
        } else {
            window.location.pathname = '';
        }

        //Gets rid of the search in window.location
        var myNewURL = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + window.location.pathname;
        window.history.pushState({}, document.title, myNewURL);

        this.fetchProfile(myToken);
    }

    async fetchProfile(myToken) {
        let [data] = await constants.api('/profile', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                myToken: myToken
            })
        });
        if (data.error) {
            this.errorMessage(data.message);
        } else {
            this.setState({
                host: {
                    name: data.host.name,
                    myToken: data.host.myToken,
                    img: data.host.img || 'https://via.placeholder.com/152x152',
                    premium: data.host.premium
                },
                topTracks: data.host.topTracks
            });
        }
    }

    render() {
        return (<div className={`${styles.main}`}>
            <Helmet>
                <html lang="en"   />
                <title>Dashboard | Spoti-Vote</title>
                <meta name="author" content="Lukas Samir Gabsi, Michael Blank"></meta>
            </Helmet>
            <Main topTracks={this.state.topTracks} host={this.state.host}/>
            <SharedSidebar host={this.state.host}/>
        </div>);
    }
}

export default Dashboard;
