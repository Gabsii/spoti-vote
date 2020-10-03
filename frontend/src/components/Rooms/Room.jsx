import React from 'react';
import {css} from 'glamor';

const constants = require('../../js/constants');
const styles = {
    wrapper: css({
        minHeight: '250px',
        minWidth: '250px',
        height: '20vw',
        width: '20vw',
        backgroundColor: constants.colors.barBackground,
        borderRadius: '3px',
        border: 'none',
        margin: '20px',
        padding: 0,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        color: 'white',
        fontSize: 'inherit',
        outline: 'none',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'relative',
        ':hover': {
            cursor: 'pointer'
        }
    }),
    cover: css({height: '100%', width: '100%', borderRadius: '3px 3px 0 0'}),
    room: css({
        position: 'absolute',
        bottom: 0,
        width: '100%',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '18px',
        padding: '15px 0',
        background: 'rgba(0,0,0,0.5)'
    })
};

const Room = ({cover, name, host}) => {
    const joinRoom = () => {
        window.location = window.location.origin + '/app/' + name;
    }
    return (
        <button className={`${styles.wrapper}`} onClick={() => joinRoom()} style={{backgroundImage: 'url(' + cover + ')'}}>
            <div className={`${styles.room}`}>{name + ' - ' + host}</div>
        </button>
    );
}

export default Room;
