import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

let constants = require('../../js/constants');

class SocialIcon extends Component {

    render() {

        return (<a href={this.props.url} style={{
                textDecoration: 'none',
                color: constants.colors.background
            }}>
            <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    width: '100px',
                    padding: '25px 25px'
                }}>
                <div style={{
                        marginTop: '0.5em',
                        marginBottom: '1em'
                    }}>
                    <FontAwesomeIcon icon={this.props.icon} size='4x'/>
                </div>
            </div>
        </a>);
    }
}

export default SocialIcon;
