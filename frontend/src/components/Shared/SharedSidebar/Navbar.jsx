import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import {faUsers} from '@fortawesome/free-solid-svg-icons/faUsers'; 
import {faHome} from '@fortawesome/free-solid-svg-icons/faHome';
import Cookies from 'universal-cookie';
import {css} from 'glamor';
import swal from 'sweetalert2';

let constants = require('../../../js/constants');
const cookies = new Cookies();
const styles = {
    wrapper: css({
        width: '100%',
        maxHeight: 'calc(100% - 10px)',
        minWidth: 0,
        boxSizing: 'border-box',
        padding: '4px 16px',
        display: 'flex',
        marginTop: '10px',
        alignItems: 'center',
        textAlign: 'center',
        color: constants.colors.fontSecondary,
        justifyContent: 'space-between',
        '@media(min-width: 760px)': {
            flexDirection: 'column',
            marginTop: '25px',
            color: constants.colors.fontSecondary,
            marginBottom: 'auto',
            ':hover': {
                color: constants.colors.fontSecondary
            }
        }
    }),
    buttonWrapper: css({
        display: 'flex',
        flexDirection: 'column',
        margin: '5px 10px 15px 10px',
        '@media(min-width: 760px)': {
            padding: '15px'
        }
    }),
    button: css({border: 0, color: constants.colors.fontSecondary, background: 'none', paddingBottom: '5px', ':hover': {cursor: 'pointer'}})
};

class NavBar extends Component {

    logoutHandler() {
        swal.fire({
            title: 'Logout.',
            text: 'Do you really want to leave us already?',
            type: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, close it!',
            cancelButtonText: 'No, dont do it!'
        }).then((result) => {
            if (!result.dismiss) {
                cookies.remove('token');
                window.location.pathname = '/';
            }
        });
    }

    render() {
        return (<div className={`${styles.wrapper}`}>
            {
                window.location.pathname === '/dashboard'
                    ? <div className={`${styles.buttonWrapper}`}>
                        <a className={`${styles.button}`} href="/rooms">
                            <FontAwesomeIcon icon={faUsers} size='3x'/>
                        </a>
                        <span>Rooms</span>
                    </div>
                    : window.location.pathname === '/rooms'
                        ? <div className={`${styles.buttonWrapper}`}>
                            <a className={`${styles.button}`} href="/dashboard">
                                <FontAwesomeIcon icon={faHome} size='3x'/>
                            </a>
                            <span>Home</span>
                        </div>
                        : ''
            }
            <div className={`${styles.buttonWrapper}`}>
                <button className={`${styles.button}`} onClick={this.logoutHandler.bind(this)}>
                    <FontAwesomeIcon icon={faSignOutAlt} size='3x'/>
                </button>
                <span>Logout</span>
            </div>
        </div>);
    }
}

export default NavBar;
