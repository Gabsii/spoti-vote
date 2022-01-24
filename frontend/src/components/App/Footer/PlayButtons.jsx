import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay} from '@fortawesome/free-solid-svg-icons/faPlay';
import {faPause} from '@fortawesome/free-solid-svg-icons/faPause';
import {faStepForward} from '@fortawesome/free-solid-svg-icons/faStepForward';
import {css} from 'glamor';

let constants = require('../../../js/constants').default;
const styles = {
    wrapper: css({
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        color: constants.colors.fontSecondary,
        display: 'flex',
        lineHeight: '60px', // kleiner cheat weil fontawesome icons zu hoch sind
        verticalAlign: 'center'
    }),
    play: css({paddingRight: '10px', ':hover': { cursor: 'pointer' }}),
    skip: css({paddingLeft: '5px', ':hover': { cursor: 'pointer' }})
};

class PlayButtons extends React.PureComponent {

    render() {
        return (<div className={`${styles.wrapper}`}>
            <div className={`${styles.play}`} onClick={this.props.playHandler}>
                {
                    this.props.isHost
                        ? this.props.activePlayer.isPlaying
                            ? <FontAwesomeIcon icon={faPause} size='2x'/>
                            : <FontAwesomeIcon icon={faPlay} size='2x'/>
                        : ''
                }
            </div>
            <div className={`${styles.skip}`} onClick={this.props.skipHandler}>
                {
                    this.props.isHost
                        ?<FontAwesomeIcon icon={faStepForward} size='2x'/> /* <div> skips/users </div> */
                        : ''
                }
            </div>
        </div>);
    }
}

export default PlayButtons;
