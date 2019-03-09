import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faExclamationTriangle} from '@fortawesome/fontawesome-free-solid';
import {css} from 'glamor';

import Header from '../components/Login/Header.jsx';

const constants = require('../js/constants');
const styles = {
    main: css({width: '100%', height: '100vh', backgroundColor: constants.colors.backgroundLite, color: constants.colors.font}),
    wrapper: css({
        width: 'calc(100% - 40px)',
        backgroundColor: constants.colors.backgroundLite,
        boxSizing: 'borderBox',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '20px'
    }),
    triangle: css({fontSize: '2em', marginTop: '1.5em', marginBottom: '.5em', textAlign: 'center', color: constants.colors.redCard}),
    heading: css({fontSize: '4em', textAlign: 'center'}),
    subHeading: css({textAlign: 'center', fontSize: '1.5em'})
};

class NotFound extends Component {

    componentDidMount() {
        document.title = 'Spoti-Vote | Join a room';
        if (document.getElementsByTagName('META')[2]) {
            document.getElementsByTagName('META')[2].content = 'You should not be here! Return home';
        }
    }

    render() {
        return (<main className={`${styles.main}`}>
            <Header/>
            <div className={`${styles.wrapper}`}>
                <div className={`${styles.triangle}`}>
                    <FontAwesomeIcon icon={faExclamationTriangle} size='4x'/>
                </div>
                <div className={`${styles.heading}`}>404! (What does that even mean?)</div><br/>
                <br/>
                <div className={`${styles.subHeading}`}>You might wanted to test our site. Congratulations you found our boundaries, so please return&nbsp;
                    <a href="/">here</a>.
                </div>
            </div>
        </main>);
    }
}

export default NotFound;
