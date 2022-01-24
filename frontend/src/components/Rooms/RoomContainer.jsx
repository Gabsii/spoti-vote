import React, {Component} from 'react';
import {css} from 'glamor';

import SearchRooms from './SearchRooms.jsx';
import Room from './Room.jsx';
const constants = require('../../js/constants').default;
const styles = {
    main: css({
        backgroundColor: constants.colors.background,
        minHeight: '100vh',
        height: '100%',
        width: 'calc(100% - 200px)',
        padding: '25px',
        boxSizing: 'border-box',
        '@media(max-width: 760px)': {
            width: '100%',
            minHeight: 'calc(100% - 75px)',
            height: 'auto',
            position: 'absolute',
            top: '75px'
        }
    }),
    roomWrapper: css({display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', flexWrap: 'wrap'})
};

class RoomContainer extends Component {

    constructor() {
        super();
        this.state = {
            rooms: [],
            search: '',
            searchRooms: []
        };
        this.displayRooms.bind(this);
    }

    componentDidMount() {
        this.fetchRoomData().then(() => {
            this.displayRooms();
        });
    }

    filterRooms(e) {
        let value = e.target.value.toLowerCase();
        this.setState({
            search: value
        }, () => {
            this.displayRooms();
        });
    }

    displayRooms() {
        if (this.state.search === '' || !this.state.search) {
            this.setState({searchRooms: this.state.rooms});
        } else {
            console.log(this.state.rooms);
            let res = [];
            this.state.rooms.filter((room) => {
                let roomName = room.roomName.toLowerCase();
                let roomHost = room.roomHost.toLowerCase();
                if (roomName.includes(this.state.search) || roomHost.includes(this.state.search)) {
                    return res.push(room);
                }
                return null;
            });
            this.setState({searchRooms: res});
        }

    }

    async fetchRoomData() {
        let [data] = await constants.api('/rooms');
        this.setState({rooms: data.content});
    }

    render() {
        return (<main className={`${styles.main}`}>
            <SearchRooms rooms={this.state.rooms} filterRooms={this.filterRooms.bind(this)}/>
            <div className={`${styles.roomWrapper}`}>
                {
                    this.state.rooms.length >= 1
                        ? this.state.searchRooms.map((room, index) => {
                            return (<Room name={room.roomName} host={room.roomHost} cover={room.roomCover} key={index}/>);
                        })
                        : <div style={{
                            color: 'white'
                        }}>No Rooms found</div>
                }</div>
        </main>);
    }
}

export default RoomContainer;
