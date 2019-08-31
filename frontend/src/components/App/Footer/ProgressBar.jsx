import React, {Component} from 'react';
import {css} from 'glamor';

let constants = require('../../../js/constants');
let progress = {
    width: '0%'
};
const styles = {
    wrapper: css({
        backgroundColor: constants.colors.barBackground,
        borderRadius: '11px',
        width: '100%',
        display: 'flex',
        alignSelf: 'flex-start',
        justifySelf: 'start',
        position: 'relative',
        top: '-2px',
        '@media(min-width: 760px)': {
            width: 'calc(100% - 200px)'
        },
        ':hover': {
            cursor: 'pointer'
        }
    }),
    progress: css({
        background: constants.colors.fontSecondary,
        borderStyle: 'solid',
        borderColor: '#333',
        margin: '1px',
        animation: 'width 3s ease-out infinite',
        height: '3px',
        borderRadius: 0
    })
};

class Progressbar extends Component {

    render() {
        if (this.props.activePlayer !== null && this.props.activePlayer !== undefined) {
            progress.width = this.props.activePlayer.progress + '%';
        }

        return (<div className={`${styles.wrapper}`}>
            <div role='progressbar' className={`${styles.progress}`} style={{
                ...progress
            }}></div>
        </div>);

    }
}

export default Progressbar;
