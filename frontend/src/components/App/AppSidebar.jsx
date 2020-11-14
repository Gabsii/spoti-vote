import React, {Component} from 'react';
import {css} from 'glamor';

import Infos from './AppSidebar/Infos.jsx';
import UserContainer from './AppSidebar/UserContainer.jsx';
import SettingsBar from './AppSidebar/SettingsBar.jsx';

let constants = require('../../js/constants').default;
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
};

class AppSidebar extends Component {

    render() {
        return (<aside id='sidebar' className={`${styles.wrapper}`}>
            <Infos isHost={this.props.isHost} host={this.props.host} playlistHandler={this.props.playlistHandler} activeTracks={this.props.activeTracks} activePlaylist={this.props.activePlaylist} playlists={this.props.playlists}/> {
                this.props.isHost
                    ? <UserContainer activeTracks={this.props.activeTracks} connectedUser={this.props.connectedUser}/>
                    : ''
            }
            <SettingsBar rerollHandler={this.props.rerollHandler} isPhone={false} isHost={this.props.isHost} connectedUser={this.props.connectedUser} host={this.props.host}/>
        </aside>);
    }
}

export default AppSidebar;
