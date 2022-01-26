import React, {PureComponent} from 'react';
import {css} from 'glamor';

let constants = require('../../../js/constants').default;
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

class SongAggregation extends PureComponent {
    render() {
        let artistString = '';
        if (this.props.artists !==null && this.props.artists !==undefined) {
            for (var i = 0; i < this.props.artists.length; i++) {
                artistString += this.props.artists[i];
                if (i < this.props.artists.length - 1) {
                    artistString += ', ';
                }
            }
        }
        return (<div className={`${styles.wrapper}`}>
            <div className={`${styles.track}`}>
                {this.props.songName}
            </div>
            <div className={`${styles.artist}`}>
                {artistString}
            </div>
        </div>);
    }
}

export default SongAggregation;
