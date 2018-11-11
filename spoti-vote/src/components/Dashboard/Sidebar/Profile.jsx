import React, {Component} from 'react';
import {css} from 'glamor';

const styles = {
    breaker: css({
        display: 'none',
        '@media(min-width: 760px)': {
            display: 'block'
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
        return (<div className={`${styles.breaker}`}>
            <a>
                <img alt='Current Playlist' src={this.props.profile.img} className={`${styles.playlistImage}`}/>
            </a>
            <div className={`${styles.hostWrapper}`}>
                <div className={`${styles.hostName}`}>{this.props.profile.name || this.props.profile.id}
                </div>
            </div>
        </div>);
    }
}

export default Profile;
