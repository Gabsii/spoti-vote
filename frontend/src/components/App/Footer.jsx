import React, {PureComponent} from 'react';
import {css} from 'glamor';

import SongIcon from './Footer/SongIcon.jsx';
import SongAggregation from './Footer/SongAggregation.jsx';
import VolumeBar from './Footer/VolumeBar.jsx';
import ProgressBar from './Footer/ProgressBar.jsx';
import PlayButtons from './Footer/PlayButtons.jsx';

let constants = require('../../js/constants').default;
const styles = {
    wrapper: css({
        height: '75px',
        width: '100vw',
        position: 'absolute',
        bottom: 0,
        backgroundColor: constants.colors.backgroundLite,
        textOverflow: 'ellipsis',
        display: 'flex'
    })
};

class Footer extends PureComponent {

    render() {
        let { activePlayer } = this.props;
        if (!activePlayer) {
            activePlayer = {
                volume: 0,
                timeLeft: 0,
                progressMS: 0,
                progress: 0,
                isPlaying: false,
                track: {
                    img: '',
                    id: '',
                    name: '',
                    artists: []
                }
            };
        }

        return (<footer className={`${styles.wrapper}`}>
            <SongIcon background={activePlayer.track.img}/>
            <SongAggregation songName={activePlayer.track.name} artists={activePlayer.track.artists}/>
            <ProgressBar activePlayer={activePlayer}/> {
                this.props.isHost
                    ? <VolumeBar activePlayer={activePlayer} myToken={this.props.myToken}/>
                    : ''
            }
            <PlayButtons playHandler={this.props.playHandler} skipHandler={this.props.skipHandler} activePlayer={activePlayer} isHost={this.props.isHost}/>
        </footer>);
    }
}

export default Footer;
