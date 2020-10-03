import React, {PureComponent, useEffect, useState} from 'react';
import {css} from 'glamor';

import '../../css/selectors.css';
let constants = require('../../js/constants.js');

const styles = {
    wrapper: css({display: 'flex', textAlign: 'center', justifyContent: 'center', alignItems: 'center'}),
    input: css({
        outline: 'none',
        marginTop: '1em',
        textAlign: 'center',
        backgroundColor: constants.colors.backgroundLite,
        color: constants.colors.font,
        borderRadius: '500px',
        padding: '17px 40px',
        fontSize: '0.9em',
        lineHeight: 1,
        borderWidth: 0,
        letterSpacing: '2px',
        minWidth: '120px',
        maxWidth: '150px',
        maxHeight: '50px',
        textTransform: 'uppercase',
        whiteSpace: 'normal',
        marginRight: '0'
    }),
    submit: css({
        padding: '17px 40px',
        fontSize: '0.9em',
        lineHeight: 1,
        borderWidth: 0,
        letterSpacing: '2px',
        minWidth: '120px',
        maxWidth: '150px',
        maxHeight: '50px',
        textTransform: 'uppercase',
        whiteSpace: 'normal',
        backgroundColor: constants.colors.green,
        marginRight: '0',
        borderRadius: '500px',
        marginTop: '0.5em',
        fontFamily: 'Circular Bold, Arial, Sans-Serif'
    }),
    error: css({color: constants.colors.redCard, marginTop: '5px', textShadow: 'none'})
};

const LoginCode = ({isPhone}) => {
    const [state, setState] = useState({ roomExists: '', room: false })
    const submitHandler = (event) => {
        event.preventDefault();
        if (state.room) {
            window.location.href = window.location.origin + '/app/' + state.room;
        }
    }
    const checkRoom = async (event) => {
        if (event.target.value.length === 5) {
            let str = event.target.value.toUpperCase();
            let exists = false;
            let [data] = await constants.api('/rooms');
            for (var i = 0; i < data.length; i++) {
                if (data[i].roomName === str) {
                    exists = true;
                    setState(state => ({...state, room: str, roomExists: true}));
                }
            }
            if (state.room && isPhone) {
                window.location.href = window.location.origin + '/app/' + state.room;
            }
            if (!exists) {
                setState(state => ({...state, roomExists: false}));
            }
            return exists;
        } else {
            setState(state => ({...state, roomExists: '', room: false}));
        }
    }
    useEffect(() => {
        if (state.room === false && state.roomExists === false) {
            document.getElementById('code').style.border = '1px solid ' + constants.colors.redCard;
        } else if (state.roomExists === true) {
            document.getElementById('code').style.border = '1px solid ' + constants.colors.greenCard;
        } else {
            document.getElementById('code').style.border = '';
        }
    }, [state.roomExists, state.room])
    
    return (
        <div className={`${styles.wrapper}`}>
            <form onSubmit={() => submitHandler()}>
                <input type='text' id='code' maxLength='5' placeholder='Room Code' className={`${styles.input}`} autoComplete='off' onChange={() => checkRoom()} pattern='[A-Za-z]{5}'/>
                <input type='submit' id='loginCode' value='join' className={`${styles.submit}`}/>
            </form>
            {
                state.room === false && state.roomExists === false
                    ? <h5 className={`${styles.error}`}>Room doesn't exist</h5>
                    : null
            }
        </div>
    );
}

export default LoginCode;
