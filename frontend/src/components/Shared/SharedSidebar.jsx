import React, {Component} from 'react';
import {css} from 'glamor';

import Profile from './SharedSidebar/Profile.jsx';
import Navbar from './SharedSidebar/Navbar.jsx';

let constants = require('../../js/constants');
const styles = {
    wrapper: css({
        height: '75px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: constants.colors.backgroundLite,
        flexFlow: 'column',
        color: 'white',
        borderLeft: '1px solid black',
        '@media(min-width: 760px)': {
            width: '200px',
            height: 'auto'
        }
    })
};

class DashboardSidebar extends Component {

    render() {
        return (<aside id='sidebar' className={`${styles.wrapper}`}>
            <Profile host={this.props.host}/>
            <Navbar/>
        </aside>);
    }
}

export default DashboardSidebar;
