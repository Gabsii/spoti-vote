import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faExclamationTriangle} from '@fortawesome/fontawesome-free-solid';

import Header from '../components/Login/Header.jsx';

const constants = require('../js/constants');

class NotFound extends Component {

    componentDidMount() {
        document.title = 'Spoti-Vote | Join a room';
        document.getElementsByTagName('META')[2].content = 'You should not be here! Return home';
    }

    render() {
        return (<main style={{
                width: '100%',
                height: '100vh',
                backgroundColor: constants.colors.backgroundLite,
                color: constants.colors.font

            }}>
            <Header/>
            <div style={{
                    width: 'calc(100% - 40px)',
                    backgroundColor: constants.colors.backgroundLite,
                    boxSizing: 'borderBox',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    padding: '20px'
                }}>
                <div style={{
                        fontSize: '2em',
                        marginTop: '1.5em',
                        marginBottom: '.5em',
                        textAlign: 'center',
                        color: constants.colors.redCard
                    }}>
                    <FontAwesomeIcon icon={faExclamationTriangle} size='4x'/>
                </div>
                <div style={{
                        fontSize: '4em',
                        textAlign: 'center'
                    }}>404! (What does that even mean?)</div><br/>
                <br/>
                <div style={{
                        textAlign: 'center',
                        fontSize: '1.5em'
                    }}>You might wanted to test our site. Congratulations you found our boundaries, so please return&nbsp;
                    <a href="/">here</a>.
                </div>
            </div>
        </main>);
    }
}

export default NotFound;
