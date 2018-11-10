import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faSignOutAlt, faQuestion} from '@fortawesome/fontawesome-free-solid';
import Cookies from 'universal-cookie';
import {css} from 'glamor';

let constants = require('../../../js/constants');
const cookies = new Cookies();
const styles = {
    wrapper: css({
        width: '100%',
        minWidth: 0,
        height: '32px',
        boxSizing: 'border-box',
        padding: '4px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        '@media(min-width: 760px)': {
            position: 'absolute',
            bottom: '50px',
            marginTop: 'auto',
            marginBottom: 0
        }
    }),
    button: css({border: 0, color: constants.colors.fontSecondary, background: 'none'})
};

class SettingsBar extends Component {

    logoutHandler() {
        let cookie = cookies.get('token');

        if (window.confirm('Are you sure you want to log out?')) {
            cookies.remove('token');
            window.location = '/';
        }
    }

    render() {

        return (<div className={`${styles.wrapper}`}>
            <button className={`${styles.button}`}>
                <FontAwesomeIcon icon={faQuestion} size='2x'/>
            </button>
            <button className={`${styles.button}`} onClick={this.logoutHandler.bind(this)}>
                <FontAwesomeIcon icon={faSignOutAlt} size='2x'/>
            </button>
        </div>);
    }
}

export default SettingsBar;
