import React, {PureComponent} from 'react';
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

class LoginCode extends PureComponent {

    constructor() {
        super();
        this.state = {
            roomExists: '',
            room: false
        };
    }

    submitHandler(event) {
        event.preventDefault();
        if (this.state.room) {
            window.location.href = window.location.origin + '/app/' + this.state.room;
        }
    }

    checkRoom(event) {
        if (event.target.value.length === 5) {
            let str = event.target.value.toUpperCase();
            let exists = false;
            fetch(constants.config.url + '/rooms').then((response) => response.json().then(data => {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].roomName === str) {
                        exists = true;
                        this.setState({room: str, roomExists: true});
                    }
                }
                if (this.state.room && this.props.isPhone) {
                    window.location.href = window.location.origin + '/app/' + this.state.room;
                }
                if (!exists) {
                    this.setState({roomExists: false});
                }
                return exists;
            }));
        } else {
            this.setState({roomExists: '', room: false});
        }
    }


    componentDidUpdate() {
        if (this.state.room === false && this.state.roomExists === false) {
            document.getElementById('code').style.border = '1px solid ' + constants.colors.redCard;
        } else if (this.state.roomExists === true) {
            document.getElementById('code').style.border = '1px solid ' + constants.colors.greenCard;
        } else {
            document.getElementById('code').style.border = '';
        }
    }

    render() {
        return (<div className={`${styles.wrapper}`}>
            <form onSubmit={this.submitHandler.bind(this)}>
                <input type='text' id='code' maxLength='5' placeholder='Room Code' className={`${styles.input}`} autoComplete='off' onChange={this.checkRoom.bind(this)} pattern='[A-Za-z]{5}'/>
                <input type='submit' id='loginCode' value='join' className={`${styles.submit}`}/>
            </form>
            {
                this.state.room === false && this.state.roomExists === false
                    ? <h5 className={`${styles.error}`}>Room doesn't exist</h5>
                    : ''
            }
        </div>);
    }
}

export default LoginCode;
