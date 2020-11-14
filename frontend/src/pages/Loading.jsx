import React, { Component } from 'react';
import Spinner from '../components/Dashboard/Main/Spinner.jsx';

const constants = require('../js/constants').default;

class Loading extends Component {
    render() {
        return ( <div style={
            {
                width: '100vw',
                height: '100vh',
                backgroundColor: constants.colors.backgroundLite,
                color: constants.colors.font,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }
        }><Spinner/></div>);
    }
}
export default Loading;