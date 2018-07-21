import React, {Component} from 'react';

let constants = require('../../js/constants');
let defaultStyle = {
    color: constants.colors.font,
    height: '100px',
    width: '100%',
    backgroundColor: constants.colors.backgroundLite,
    textOverflow: 'ellipsis',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};

class LoginFooter extends Component {

    render() {

        return (<footer style={defaultStyle}>Help us to keep Spoti-Vote running
            <br/>
            &copy; Lukas Gabsi, Michael Blank</footer>);
    }
}
export default LoginFooter;
