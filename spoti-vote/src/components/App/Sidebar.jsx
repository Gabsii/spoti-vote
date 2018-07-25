import React, {Component} from 'react';
import MediaQuery from 'react-responsive';
import Infos from './Sidebar/Infos.jsx';
import UserContainer from './Sidebar/UserContainer.jsx';
import SettingsBar from './Sidebar/SettingsBar.jsx';

let constants = require('../../js/constants');

class Sidebar extends Component {

    render() {
        let defaultStyle;
        if (this.props.isPhone) {
            defaultStyle = {
                height: '75px',
                width: '100vw',
                position: 'absolute',
                top: 0,
                left: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexFlow: 'row',
                color: 'white',
                backgroundColor: constants.colors.backgroundLite
            };
        } else {
            defaultStyle = {
                height: 'calc(100vh - 75px)',
                // maxWidth: '250px',
                width: '200px',
                position: 'absolute',
                top: 0,
                right: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexFlow: 'column',
                color: 'white',
                backgroundColor: constants.colors.backgroundLite
            };
        }
        return (<div id='sidebar' style={defaultStyle}>
            <MediaQuery maxWidth={constants.breakpoints.medium}>{
                    (matches) => {
                        if (matches) {
                            return (<Infos isPhone={true} isHost={this.props.isHost} host={this.props.host} playlistHandler={this.props.playlistHandler} activeTracks={this.props.activeTracks} activePlaylist={this.props.activePlaylist} playlists={this.props.playlists}/>);
                        } else {
                            return (<Infos isPhone={false} isHost={this.props.isHost} host={this.props.host} playlistHandler={this.props.playlistHandler} activeTracks={this.props.activeTracks} activePlaylist={this.props.activePlaylist} playlists={this.props.playlists}/>);
                        }
                    }
                }
            </MediaQuery>
            <MediaQuery minWidth={constants.breakpoints.medium}>{
                    this.props.isHost
                        ? <UserContainer activeTracks={this.props.activeTracks} connectedUser={this.props.connectedUser}/>
                        : ''
                }
            </MediaQuery>
            <MediaQuery maxWidth={constants.breakpoints.medium}>{
                    (matches) => {
                        if (matches) {
                            return (<SettingsBar skipHandler={this.props.skipHandler} isPhone={true} isHost={this.props.isHost} socket={this.props.socket} connectedUser={this.props.connectedUser} host={this.props.host}/>);
                        } else {
                            return (<SettingsBar skipHandler={this.props.skipHandler} isPhone={false} isHost={this.props.isHost} socket={this.props.socket} connectedUser={this.props.connectedUser} host={this.props.host}/>);
                        }
                    }
                }</MediaQuery>
        </div>);
    }
}
export default Sidebar;
