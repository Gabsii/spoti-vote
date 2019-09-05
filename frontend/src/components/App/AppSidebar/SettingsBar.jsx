import React, {PureComponent} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import {css} from 'glamor';
import swal from 'sweetalert2';

import RerollButton from './RerollButton.jsx';

let constants = require('../../../js/constants');
const styles = {
    wrapper: css({
        width: '100%',
        minWidth: 0,
        height: '32px',
        boxSizing: 'border-box',
        marginTop: 'auto',
        padding: '4px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 'auto',
        '@media(min-width: 760px)': {
            marginBottom: 0
        }
    }),
    button: css({border: 0, color: constants.colors.fontSecondary, background: 'none', ':hover': {cursor: 'pointer'}})
};

class SettingsBar extends PureComponent {
    
    logoutHandler() {
        if (this.props.isHost === true) {
            swal.fire({
                title: 'Close Room.',
                text: 'This will close the room, are you sure?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, close it!',
                cancelButtonText: 'No, dont do it!'
            }).then((result) => {
                if (!result.dismiss) {
                    this.props.socket.emit('logout');
                    window.location.pathname = '/dashboard';
                }
            });
        } else {
            swal.fire({
                title: 'Logout.',
                text: 'Do you really want to leave us already?',
                type: 'question',
                showCancelButton: true,
                confirmButtonText: 'Yes, close it!',
                cancelButtonText: 'No, dont do it!'
            }).then((result) => {
                if (!result.dismiss) {
                    window.location.pathname = '/dashboard';
                }
            });
        }
    }

    render() {
        return (<div className={`${styles.wrapper}`}>
            <RerollButton socket={this.props.socket} rerollHandler={this.props.rerollHandler} connectedUser={this.props.connectedUser} host={this.props.host}/>
            <button className={`${styles.button}`} onClick={this.logoutHandler.bind(this)}>
                <FontAwesomeIcon icon={faSignOutAlt} size='2x'/>
            </button>
        </div>);
    }
}

export default SettingsBar;
