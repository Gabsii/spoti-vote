import React, {Component} from 'react';
import {css} from 'glamor';

const styles = {
	breaker: css({
		display: 'none',
		'@media(min-width: 760px)': {
			display: 'block',
			width: '100%',
			textAlign: 'center'
		}
	}),
	playlistImage: css({
		height: '150px',
		width: '150px',
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: '15px',
		marginBottom: '20px',
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		border: '1px solid black',
		objectFit: 'cover'
	}),
	hostWrapper: css({marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center'}),
	hostName: css({marginLeft: '10px'})
};

class Profile extends Component {

	render() {
		let img,
			name,
			id;
		if (this.props.profile !== null && this.props.profile !== undefined) {
			img = this.props.profile.img;
			name = this.props.profile.name;
			id = this.props.profile.id;
		}
		return (<div className={`${styles.breaker}`}>
			<a>
				<img alt='Current Playlist' src={img} className={`${styles.playlistImage}`}/>
			</a>
			<div className={`${styles.hostWrapper}`}>
				<div className={`${styles.hostName}`}>{name || id}
				</div>
			</div>
		</div>);
	}
}

export default Profile;
