import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlayCircle} from '@fortawesome/free-solid-svg-icons/faPlayCircle';
import {faPauseCircle} from '@fortawesome/free-solid-svg-icons/faPauseCircle';
import {faStepForward} from '@fortawesome/free-solid-svg-icons/faStepForward';
import {css} from 'glamor';

let constants = require('../../../js/constants');
const styles = {
    wrapper: css({
        position: 'absolute',
        bottom: 0,
        left: '235px',
        color: constants.colors.fontSecondary,
        display: 'flex',
        lineHeight: '75px',
        verticalAlign: 'center'
    }),
    play: css({}),
    skip: css({bottom: 0})
};

class PlayButtons extends React.PureComponent {

    render() {
        return (<div className={`${styles.wrapper}`}>
            <div className={`${styles.play}`}>
                {
                    this.props.isHost
                        ? this.props.activePlayer.isPlaying
                            ? <FontAwesomeIcon icon={faPauseCircle} size='3x'/>
                            : <FontAwesomeIcon icon={faPlayCircle} size='3x'/>
                        : ''
                }
            </div>
            <div className={`${styles.skip}`}>
                <FontAwesomeIcon icon={faStepForward} size='3x'/> {/* <div> skips/users </div> */}
            </div>
        </div>);
    }
}

export default PlayButtons;
