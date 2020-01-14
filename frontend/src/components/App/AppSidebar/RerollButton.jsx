import React, {PureComponent} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDice} from '@fortawesome/free-solid-svg-icons/faDice';
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
        }, 
        ':hover': {
            cursor: 'pointer'
        }
    }),
    count: css({
        marginLeft: 0,

        '@media(min-width: 760px)': {
            marginLeft: '1em'
        }
    })
};

class RerollButton extends PureComponent {

    render() {
        let users,
            rerolls;

        if (this.props.connectedUser !== null && this.props.connectedUser !== undefined) {
            users = this.props.connectedUser.length + 1;
            rerolls = 0;
            for (let j = 0; j < this.props.connectedUser.length; j++) {
                if (this.props.connectedUser[j].voted === 'reroll') {
                    rerolls++;
                }
            }
        }

        if (this.props.host !== null && this.props.host !== undefined) {
            if (this.props.host.voted === 'reroll') {
                rerolls++;
            }
        }

        return (<button className={`${styles.button}`} onClick={this.props.rerollHandler}>
            <FontAwesomeIcon icon={faDice} size='2x'/>
            <div className={`${styles.count}`}>{rerolls + '/' + users}</div>
        </button>);
    }
}

export default RerollButton;
