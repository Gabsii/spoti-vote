import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faVolumeDown, faVolumeUp} from '@fortawesome/fontawesome-free-solid';
import {css} from 'glamor';

import '../../../css/Volumebar.css';
let constants = require('../../../js/constants');

class VolumeBar extends Component {

    volumeHandler(event) {
        if (event.target.value !== this.props.activePlayer.volume) {
            this.props.socket.emit('changeVolume', {volume: event.target.value});
        }
    }

    render() { //onChange={this.props.volumeHandler}
        return (<div className={`${styles.wrapper}`} id='player'>
            <FontAwesomeIcon icon={faVolumeDown} style={{
                    color: constants.colors.fontSecondary
                }} size='lg'/>
            <input onChange={this.volumeHandler.bind(this)} type='range' min='0' step='2' max='100' defaultValue={this.props.activePlayer.volume} id='volume' className={`${styles.slider}`}/>
            <FontAwesomeIcon icon={faVolumeUp} style={{
                    color: constants.colors.fontSecondary
                }} size='lg'/>
        </div>);
    }
}

const styles = {
    wrapper: css({
        height: '75px',
        maxWidth: '250px',
        minWidth: '200px',
        fontFamily: 'Circular Medium',
        position: 'absolute',
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: constants.colors.backgroundLite
    }),
    slider: css({width: '50%!important', marginLeft: '10px!important', marginRight: '10px!important'})
}

export default VolumeBar;
