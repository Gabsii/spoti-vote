import React, {useEffect, useState} from 'react';
import {css} from 'glamor';

import SearchRooms from './SearchRooms.jsx';
import Room from './Room.jsx';
const constants = require('../../js/constants');
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

const RoomContainer = () => {
    const [state, setState] = useState({ rooms: [], search: '', searchRooms: [] })
    
    const filterRooms = (e) => {
        let value = e.target.value.toLowerCase();
        setState( state => ({...state, search: value}));
    }

    const fetchRoomData = async () => {
        let [data] = await constants.api('/rooms');
        this.setState(state => ({...state, rooms: data}));
    }

    const displayRooms = () => {
        if (state.search === '' || !state.search) {
            setState(state => ({...state, searchRooms: state.rooms}));
        } else {
            let res = [];
            state.rooms.filter((room) => {
                let roomName = room.roomName.toLowerCase();
                let roomHost = room.roomHost.toLowerCase();
                if (roomName.includes(state.search) || roomHost.includes(state.search)) {
                    return res.push(room);
                }
                return null;
            });
            setState(state => ({...state, searchRooms: res}));
        }
    }

    useEffect(() => {
        fetchRoomData().then(() => displayRooms());
    }, [])
    
    return (
        <main className={`${styles.main}`}>
            <SearchRooms rooms={state.rooms} filterRooms={() => filterRooms()}/>
            <div className={`${styles.roomWrapper}`}>
                {
                    state.rooms.length >= 1
                        ? state.searchRooms.map((room, index) => {
                            return (<Room name={room.roomName} host={room.roomHost} cover={room.roomCover} key={index}/>);
                        }) : <div style={{color: 'white'}}>No Rooms found</div>
                }</div>
        </main>
    );
}

export default RoomContainer;
