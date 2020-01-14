import React, {PureComponent} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faVolumeDown} from '@fortawesome/free-solid-svg-icons/faVolumeDown';
import {faVolumeUp} from '@fortawesome/free-solid-svg-icons/faVolumeUp';
import {css} from 'glamor';

import '../../../css/Volumebar.css';
let constants = require('../../../js/constants');
const styles = {
    wrapper: css({
        height: '75px',
        maxWidth: '250px',
        minWidth: '200px',
        fontFamily: 'Circular Medium, Arial, Sans-Serif',
        position: 'absolute',
        right: 0,
        display: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: constants.colors.backgroundLite,
        '@media(min-width: 760px)': {
            display: 'flex'
        }
    }),
    slider: css({width: '50%!important', marginLeft: '10px!important', marginRight: '10px!important'})
};

class VolumeBar extends PureComponent {

    volumeHandler(event) {
        if (this.props.activePlayer !==null && this.props.activePlayer !==undefined) {
            if (event.target.value !== this.props.activePlayer.volume) {
                fetch(constants.config.url + '/rooms/' + window.location.pathname.split('/')[2] + '/volume' , 
                    {
                        method: 'post',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            myToken: this.props.myToken,
                            volume: event.target.value
                        })
                    }
                );
            }
        }
    }

    render() { //onChange={this.props.volumeHandler}
        let volume;
        if (this.props.activePlayer !==null && this.props.activePlayer !==undefined) {
            volume = this.props.activePlayer.volume;
        }
        return (<div className={`${styles.wrapper}`} id='player'>
            <FontAwesomeIcon icon={faVolumeDown} style={{
                color: constants.colors.fontSecondary
            }} size='lg'/>
            <input onChange={this.volumeHandler.bind(this)} type='range' min='0' step='2' max='100' defaultValue={volume} id='volume' className={`${styles.slider}`}/>
            <FontAwesomeIcon icon={faVolumeUp} style={{
                color: constants.colors.fontSecondary
            }} size='lg'/>
        </div>);
    }
}

export default VolumeBar;
