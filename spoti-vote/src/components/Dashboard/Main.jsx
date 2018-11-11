import React, {Component} from 'react';
import {css} from 'glamor';

import Logins from './Main/Logins.jsx';
import Carousel from './Main/Carousel.jsx';

const constants = require('../../js/constants');
const styles = {
    main: css({
        backgroundColor: constants.colors.background,
        height: '100vh',
        width: 'calc(100vw - 200px)',
        '@media(max-width: 760px)': {
            width: '100vw'
        }
    })
};

class Main extends Component {

    render() {
        return (<main className={`${styles.main}`}>
            <Logins/> {/* TODO: add top tracks/artist */}
            <Carousel topTracks={this.props.topTracks}/>
        </main>);
    }
}

export default Main;
