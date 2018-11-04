import React, {Component} from 'react';
import {css} from 'glamor';

import Infos from './Sidebar/Infos.jsx';
import UserContainer from './Sidebar/UserContainer.jsx';
import SettingsBar from './Sidebar/SettingsBar.jsx';

let constants = require('../../js/constants');

class Sidebar extends Component {

    render() {
        return (<div id='sidebar' className={`${styles.wrapper}`}>
            <Infos isHost={this.props.isHost} host={this.props.host} playlistHandler={this.props.playlistHandler} activeTracks={this.props.activeTracks} activePlaylist={this.props.activePlaylist} playlists={this.props.playlists}/> {
                this.props.isHost
                    ? <UserContainer activeTracks={this.props.activeTracks} connectedUser={this.props.connectedUser}/>
                    : ''
            }
            <SettingsBar skipHandler={this.props.skipHandler} isPhone={false} isHost={this.props.isHost} socket={this.props.socket} connectedUser={this.props.connectedUser} host={this.props.host}/>
        </div>);
    }
}
const styles = {
    wrapper: css({
        height: '75px',
        width: '100vw',
        position: 'absolute',
        top: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexFlow: 'row',
        color: 'white',
        backgroundColor: constants.colors.backgroundLite,
        '@media(min-width: 760px)': {
            height: 'calc(100vh - 75px)',
            width: '200px',
            flexFlow: 'column'
        }
    })
}

export default Sidebar;
