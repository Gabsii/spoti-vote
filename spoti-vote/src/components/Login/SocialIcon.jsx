import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {css} from 'glamor';

let constants = require('../../js/constants');

class SocialIcon extends Component {

    render() {

        return (<a href={this.props.url} className={`${styles.link}`}>
            <div className={`${styles.wrapper}`}>
                <FontAwesomeIcon icon={this.props.icon} size='4x'/>
            </div>
        </a>);
    }
}

const styles = {
    link: css({textDecoration: 'none', color: constants.colors.background}),
    wrapper: css({
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100px',
        padding: '25px 25px',
        marginTop: '0.5em',
        marginBottom: '1em'
    })
}

export default SocialIcon;
