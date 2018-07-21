import React, {Component} from 'react';

import Header from '../components/Login/Header.jsx';
import LoginCode from '../components/Login/LoginCode.jsx';

const constants = require('../js/constants');
const ipAddress = window.location.hostname || 'localhost';
const portBack = 8888;

class Join extends Component {

    componentDidMount() {
        document.title = "Spoti-Vote | Join a room";
        document.getElementsByTagName("META")[2].content = "Join a room to fulfill your wish of musically democracy";
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
                        fontSize: "2em",
                        marginTop: "1.5em",
                        textAlign: 'center'
                    }}>Join a Spoti-Vote Room</div><br/>
                <br/>
                <div style={{
                        textAlign: 'center'
                    }}>Ask your friend for the Room Code and enter it below:</div>
                <br/>
                <br/>
                <br/>
                <div style={{
                        fontSize: "1.5em"
                    }}>Room Code</div>
                <LoginCode/>
            </div>
        </main>);
    }
}

export default Join;
