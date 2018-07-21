import React, {Component} from 'react';
import MediaQuery from 'react-responsive';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faHeadphones} from '@fortawesome/fontawesome-free-solid';

let constants = require('../../../js/constants');

let defaultStyle = {
    height: '300px',
    position: 'absolute',
    top: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexFlow: 'column'
};

let imgStyle = {
    height: '150px',
    width: '150px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '15px',
    marginBottom: '20px',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    border: '1px solid black'
};

let nameContainer = {
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};

let centerContainer = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10px',
    marginBottom: '5px'
};

class Infos extends Component {

    render() {
        let heightStyle;
        this.props.isPhone
            ? heightStyle = {
                height: '75px'
            }
            : heightStyle = {
                height: '300px'
            }
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

        let roomName = ': ' + window.location.pathname.split('/')[2];

        return (<div style={{
                ...defaultStyle,
                ...heightStyle
            }}>
            <div style={{
                    ...centerContainer,
                    fontWeight: 'bold',
                    fontSize: '18px'
                }}>Room
                <strong>{roomName}</strong>
            </div>
            <div style={{
                    ...centerContainer,
                    fontSize: '14px'
                }}>{option}
            </div>
            <MediaQuery minWidth={constants.breakpoints.medium}>
                <a href={this.props.activePlaylist.external_urls.spotify}>
                    <img alt='Current Playlist' src={this.props.activePlaylist.images[0].url} style={{
                            ...imgStyle,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}/>
                </a>
                <div style={nameContainer}>
                    <FontAwesomeIcon style={iconColor} icon={faHeadphones} size='2x'/>
                    <div style={{
                            marginLeft: '10px'
                        }}>
                        {this.props.host.name || this.props.host.id}
                    </div>
                </div>
            </MediaQuery>
        </div>);
    }
}
export default Infos;
