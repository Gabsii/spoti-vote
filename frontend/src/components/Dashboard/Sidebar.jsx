import React, {Component} from 'react';
import {css} from 'glamor';

import Profile from './Sidebar/Profile.jsx';
import Settings from './Sidebar/Settings.jsx';

let constants = require('../../js/constants');
const styles = {
    wrapper: css({
        height: '75px',
        width: '100vw',
        position: 'absolute',
        top: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        flexFlow: 'row',
        color: 'white',
        backgroundColor: constants.colors.backgroundLite,
        borderLeft: '1px solid black',
        '@media(min-width: 760px)': {
            height: '100vh',
            width: '200px',
            flexFlow: 'column'
        }
    })
};

class Sidebar extends Component {

    render() {
        return (<header id='sidebar' className={`${styles.wrapper}`}>
            <Profile profile={this.props.profile}/>
            <Settings/>
        </header>);
    }
}

export default Sidebar;
