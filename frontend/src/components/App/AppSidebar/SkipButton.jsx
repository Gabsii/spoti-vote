import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faDice} from '@fortawesome/fontawesome-free-solid';
import {css} from 'glamor';

let constants = require('../../../js/constants');
const styles = {
    button: css({
        border: 0,
        color: constants.colors.fontSecondary,
        background: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
        '@media(min-width: 760px)': {
            flexDirection: 'row'
        }
    }),
    count: css({
        marginLeft: 0,

        '@media(min-width: 760px)': {
            marginLeft: '1em'
        }
    })
};

class SkipButton extends Component {

    constructor() {
        super();
        this.state = {
            hover: false
        };
    }

    toggleHover() {
        this.setState({
            hover: !this.state.hover
        });
    }

    render() {
        let linkStyle;
        this.state.hover
            ? linkStyle = {
                cursor: 'pointer'
            }
            : linkStyle = {
                cursor: 'context-menu'
            };

        let users,
            skips;

        if (this.props.connectedUser != null && this.props.connectedUser != undefined) {
            users = this.props.connectedUser.length + 1;
            skips = 0;
            for (let j = 0; j < this.props.connectedUser.length; j++) {
                if (this.props.connectedUser[j].voted === 'skip') {
                    skips++;
                }
            }
        }

        if (this.props.host != null && this.props.host != undefined) {
            if (this.props.host.voted === 'skip') {
                skips++;
            }
        }

        return (<button className={`${styles.button}`} style={linkStyle} onClick={this.props.skipHandler} onMouseEnter={this.toggleHover.bind(this)} onMouseLeave={this.toggleHover.bind(this)}>
            <FontAwesomeIcon icon={faDice} size='2x'/>
            <div className={`${styles.count}`}>{skips + '/' + users}</div>
        </button>);
    }
}

export default SkipButton;
