import React, {Component} from 'react';
import {css} from 'glamor';
import swal from 'sweetalert2';

import LoginCode from '../../Login/LoginCode.jsx';

let constants = require('../../../js/constants');

const styles = {
    wrapper: css({
        height: 'calc(100% - 360px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        color: 'white',
        '@media(min-width: 760px)': {
            marginTop: '150px'
        }
    }),
    button: css({
        padding: '17px 48px',
        fontSize: '0.9em',
        lineHeight: 1,
        borderRadius: '500px',
        borderWidth: 0,
        letterSpacing: '2px',
        minWidth: '160px',
        maxHeight: '50px',
        textTransform: 'uppercase',
        whiteSpace: 'normal',
        backgroundColor: constants.colors.green,
        marginTop: '1.5em',
        cursor: 'context-menu',
        '@media(min-width: 760px)': {
            marginRight: '2em'
        },
        ':hover': {
            cursor: 'pointer',
            backgroundColor: constants.colors.greenHover
        }
    }),
    buttonWrapper: css({display: 'flex', flexDirection: 'column'}),
    buttonDisabled: css({
        padding: '17px 48px',
        fontSize: '0.9em',
        lineHeight: 1,
        borderRadius: '500px',
        borderWidth: 0,
        letterSpacing: '2px',
        minWidth: '160px',
        maxHeight: '50px',
        textTransform: 'uppercase',
        whiteSpace: 'normal',
        color: 'black',
        backgroundColor: constants.colors.fontSecondary,
        marginTop: '1.5em',
        cursor: 'context-menu',
        '@media(min-width: 760px)': {
            marginRight: '2em'
        },
        ':hover': {
            color: 'white',
            cursor: 'pointer',
            backgroundColor: constants.colors.barBackground
        }
    }),
    heading: css({fontSize: '2.5em'}),
    subHeading: css({fontSize: '1.5em', marginTop: '25px'}),
    error: css({fontWeight: 'bold', color: constants.colors.redCard})
};

class Logins extends Component {
    errorMsg(message) {
        swal.fire({type: 'error', title: 'Oops...', text: message}).then( () => {
            window.location.pathname = '/';
        });
    }

    createRoom() {

        let defaultOptions = {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                myToken: this.props.host.myToken
            })
        };

        //Check if there is already a room
        fetch(constants.config.url + '/rooms/checkCreate' , 
            defaultOptions
        ).then((response) => response.json()).then((data) => {
            if (data.error) {
                this.errorMsg(data.message);
            } else {
                if (data.roomId) {        //If there is a room
                    swal.fire({
                        title: 'You are already hosting a room.',
                        text: 'You are currently hosting room [' + data.roomId + ']. Do you want to delete it?',
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Yes, delete it!',
                        cancelButtonText: 'No, dont do it!'
                    }).then((result) => {
                        if (result.value) {                                     //If host wants to delete old / create new
                            fetch(constants.config.url + '/rooms/' + data.roomId + '/delete' , 
                                defaultOptions
                            );
                            fetch(constants.config.url + '/rooms/create' , 
                                defaultOptions
                            ).then((response2) => response2.json()).then((data2) => {
                                if (data2.error) {
                                    this.errorMsg(data2.message);
                                } else {
                                    window.location = '/app/' + data2.roomId;
                                }
                            });
                        } else {                                                // If host wants to keep the old
                            window.location = '/app/' + data.roomId;
                        }
                    });
                } else {                                                        //If there is no old Roomd
                    fetch(constants.config.url + '/rooms/create' , 
                        defaultOptions
                    ).then((response2) => response2.json()).then((data2) => {
                        if (data2.error) {
                            this.errorMsg(data2.message);
                        } else {
                            window.location = '/app/' + data2.roomId;
                        }
                    });
                }
            }
        });
    }

    render() {
        return (<div className={`${styles.wrapper}`}>
            <h1 className={`${styles.heading}`}>Create a Room:</h1>
            {
                this.props.host
                    ? this.props.host.premium
                        ? <button id='loginbutton' className={`${styles.button}`} onClick={this.createRoom.bind(this)} tabIndex='0'>
                                Host
                        </button>
                        : <div className={`${styles.buttonWrapper}`}>
                            <button className={`${styles.buttonDisabled}`} onClick={this.createRoom.bind(this)} tabIndex='0' disabled="disabled">
                                    Host
                            </button>
                            <div className={`${styles.error}`}>You need Spotify Premium to host a room!</div>
                        </div>
                    : ''
            }

            <h2 className={`${styles.subHeading}`}>Or join one:</h2>
            <LoginCode/>
        </div>);
    }
}

export default Logins;
