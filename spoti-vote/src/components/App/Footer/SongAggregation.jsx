import React, {Component} from 'react';
import Marquee from 'react-text-marquee';
import {css} from 'glamor';

let constants = require('../../../js/constants');
const styles = {
    wrapper: css({
        height: '75px',
        width: '150px',
        position: 'absolute',
        bottom: 0,
        left: '75px',
        marginLeft: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        whiteSpace: 'nowrap',
        overflow: 'hidden'
    }),
    track: css({fontSize: '0.9em', color: constants.colors.font}),
    artist: css({marginTop: '5px', fontSize: '0.8em', color: constants.colors.fontSecondary})
};

class SongAggregation extends Component {
    render() {
        let artistString = '';
        for (var i = 0; i < this.props.artists.length; i++) {
            artistString += this.props.artists[i].name;
            if (i < this.props.artists.length - 1) {
                artistString += ', ';
            }
        }
        return (<div className={`${styles.wrapper}`}>
            <div className={`${styles.track}`}>
                <Marquee text={this.props.songName}/>
            </div>
            <div className={`${styles.artist}`}>
                <Marquee text={artistString}/>
            </div>
        </div>);
    }
}

export default SongAggregation;
