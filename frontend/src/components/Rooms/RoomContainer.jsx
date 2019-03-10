import React, {Component} from 'react';
import {css} from 'glamor';

import Room from './Room.jsx';
const constants = require('../../js/constants');
const styles = {
    main: css({
        backgroundColor: constants.colors.background,
        minHeight: '100vh',
        height: '100%',
        width: 'calc(100% - 200px)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '25px',
        boxSizing: 'border-box',
        '@media(max-width: 760px)': {
            width: '100%',
            minHeight: 'calc(100% - 75px)',
            height: 'auto',
            position: 'absolute',
            top: '75px'
        }
    })
};

class RoomContainer extends Component {

    constructor() {
        super();
        this.state = {
            rooms: [
                {
                    roomName: 'ADFKJ',
                    roomHost: 'HostName',
                    roomCover: 'https://via.placeholder.com/640'
                }, {
                    roomName: 'ADFKJ',
                    roomHost: 'HostName',
                    roomCover: 'https://via.placeholder.com/640'
                }, {
                    roomName: 'ADFKJ',
                    roomHost: 'HostName',
                    roomCover: 'https://via.placeholder.com/640'
                }, {
                    roomName: 'ADFKJ',
                    roomHost: 'HostName',
                    roomCover: 'https://via.placeholder.com/640'
                }, {
                    roomName: 'ADFKJ',
                    roomHost: 'HostName',
                    roomCover: 'https://via.placeholder.com/640'
                }
            ]
        }
    }

    componentDidMount() {
        this.fetchRoomData();
    }

    fetchRoomData() {
        fetch(constants.config.url + '/rooms').then(response => response.json()).then(response => {
            console.log(response);
            this.setState({rooms: response.content})
        }).catch((err) => console.log(err));
    }

    render() {
        return (<main className={`${styles.main}`}>
            {
                this.state.rooms.length > 2
                    ? this.state.rooms.map((room, index) => {
                        return (<Room name={room.roomName} host={room.roomHost} cover={room.roomCover} key={index}/>)
                    })
                    : this.state.rooms.length === 1
                        ? <Room name={this.state.rooms[0].roomName} host={this.state.rooms[0].roomHost} cover={this.state.rooms[0].roomCover}/>
                        : <div>No Rooms found</div>
            }
        </main>);
    }
}

export default RoomContainer;
