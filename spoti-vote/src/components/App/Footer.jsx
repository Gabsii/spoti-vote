import React, {Component} from 'react';
import MediaQuery from 'react-responsive';
import {css} from 'glamor';

import SongIcon from './Footer/SongIcon.jsx';
import SongAggregation from './Footer/SongAggregation.jsx';
import VolumeBar from './Footer/VolumeBar.jsx';
import Progressbar from './Footer/ProgressBar.jsx';

let constants = require('../../js/constants');

class Footer extends Component {

    render() {
        let track = {
            img: '',
            name: '',
            artists: []
        };
        if (this.props.activePlayer !== null && this.props.activePlayer !== undefined) {

            if (this.props.activePlayer.track !== null && this.props.activePlayer.track !== undefined) {
                track = {
                    img: this.props.activePlayer.track.album.images[this.props.activePlayer.track.album.images.length - 1].url,
                    name: this.props.activePlayer.track.name,
                    artists: this.props.activePlayer.track.artists
                };
            }
        }

        return (<footer className={`${styles.wrapper}`}>
            <SongIcon background={track.img}/>
            <SongAggregation songName={track.name} artists={track.artists}/>
            <Progressbar activePlayer={this.props.activePlayer}/>
            <MediaQuery minWidth={constants.breakpoints.medium}>{
                    (matches) => {
                        if (this.props.isHost) {
                            if (matches) {
                                return (<VolumeBar activePlayer={this.props.activePlayer} socket={this.props.socket}/>);
                            } else {
                                return '';
                            }
                        } else {
                            return '';
                        }
                    }
                }</MediaQuery>
        </footer>);
    }
}

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
}
export default Footer;
