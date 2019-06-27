import React, {Component} from 'react';
import {css} from 'glamor';
import Cookies from 'universal-cookie';

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
		var myNewURL = window.location.protocol + '//' + window.location.hostname + window.location.pathname;
		window.history.pushState({}, document.title, myNewURL);

		this.fetchProfileData(token);
		this.fetchTopTracks(token);
	}

	// asynchronously fetch all the comments for the current post and add it to the comments array in the state
	fetchProfileData(token) {
		fetch('https://api.spotify.com/v1/me/', {
			headers: {
				'Authorization': 'Bearer ' + token
			}
		}).then(response => response.json()).then(response => {
			if (response.error === undefined) {
				let premium;
				if (response.product === 'premium') {
					premium = true;
				} else {
					premium = false;
				}
				this.setState({
					profile: {
						name: response.display_name,
						id: response.id,
						img: response.images[0].url || 'https://via.placeholder.com/152x152',
						premium: premium
					}
				});
			} else if (response.error.status === 401) {
				window.location.href = constants.config.url + '/login';
			}
		}).catch((err) => console.log(err));

	}

	// asynchronously fetch all the comments for the current post and add it to the comments array in the state
	fetchTopTracks(token) {
		let maxTracks = Math.floor((window.innerWidth - 221) / 200);
		let amountTopTracks = (maxTracks > 0)
			? maxTracks
			: 1;
		fetch('https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=' + amountTopTracks, {
			headers: {
				'Authorization': 'Bearer ' + token
			}
		}).then(response => response.json()).then(response => {
			if (response.error === undefined) {
				this.setState({topTracks: response});
			} else if (response.error.status === 401) {
				window.location.href = constants.config.url + '/login';
			}
		}).catch((err) => console.log(err));

	}

	render() {
		return (<div className={`${styles.main}`}>
			<Main topTracks={this.state.topTracks} profile={this.state.profile}/>
			<SharedSidebar profile={this.state.profile}/>
		</div>);
	}
}

export default Dashboard;
