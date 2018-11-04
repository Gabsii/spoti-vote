import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faHeadphones} from '@fortawesome/fontawesome-free-solid';
import {css} from 'glamor';

let constants = require('../../../js/constants');
const styles = {
    wrapper: css({
        position: 'absolute',
        top: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexFlow: 'column',
        height: '75px',
        '@media(min-width: 760px)': {
            height: '300px'
        }
    }),
    room: css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '10px',
        marginBottom: '5px',
        fontWeight: 'bold',
        fontSize: '18px'
    }),
    playlist: css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '10px',
        marginBottom: '5px',
        fontSize: '14px'
    }),
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
        backgroundSize: 'cover',
        border: '1px solid black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }),
    hostWrapper: css({marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center'}),
    hostName: css({marginLeft: '10px'})
};

class Infos extends Component {

    render() {
        let option = <div>Playlist:{' ' + this.props.activePlaylist.name}</div>;

        if (this.props.isHost === true) {
            option = <select style={{
                    width: '175px'
                }} onChange={this.props.playlistHandler}>
                <option>Select a Playlist</option>
                {this.props.playlists.map((playlist) => <option key={playlist.id} id={playlist.id}>{playlist.name}</option>)}
            </select>;
        }

        let iconColor = {};
        if (this.props.host.voted === null) {
            iconColor.color = constants.colors.font;
        }
        for (var j = 0; j < this.props.activeTracks.length; j++) {
            if (this.props.activeTracks[j].id === this.props.host.voted) {
                iconColor.color = constants.iterateCardColors(j);
            }
        }
        if (this.props.host.voted === 'skip') {
            iconColor.color = constants.colors.skip;
        }

        return (<div className={`${styles.wrapper}`}>
            <div className={`${styles.room}`}>Room
                <strong>{': ' + window.location.pathname.split('/')[2]}</strong>
            </div>
            <div className={`${styles.room}`}>{option}
            </div>
            <div className={`${styles.breaker}`}>
                <a href={this.props.activePlaylist.external_urls.spotify}>
                    <img alt='Current Playlist' src={this.props.activePlaylist.images[0].url} className={`${styles.playlistImage}`}/>
                </a>
                <div className={`${styles.hostWrapper}`}>
                    <FontAwesomeIcon style={iconColor} icon={faHeadphones} size='2x'/>
                    <div className={`${styles.hostName}`}>{this.props.host.name || this.props.host.id}
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default Infos;
