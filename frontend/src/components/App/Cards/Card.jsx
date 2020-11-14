import React, {PureComponent} from 'react';
import Marquee from 'react-text-marquee';
import {css} from 'glamor';

let constants = require('../../../js/constants').default;
const styles = {
    button: css({
        userSelect: 'none',
        border: 0,
        padding: 0,
        position: 'relative',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.75)',
        color: constants.colors.font,
        borderRadius: '3px',
        WebKitUserSelect: 'none',
        MozUserSelect: 'none',
        flexBasis: 'calc(50% - 10px)',
        margin: '5px',
        '@media(min-width: 760px)': {
            flexBasis: 'calc(50% - 40px)',
            margin: '20px'
        }, 
        ':hover': {
            cursor: 'pointer'
        }
    }),
    image: css({
        width: '100%',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        borderRadius: '3px'
    }),
    wrapper: css({width: '100%', padding: '15px 0px', textShadow: '2px 2px 8px #000000', background: 'rgba(0, 0, 0, 0.5)'}),
    track: css({fontSize: '2em', textAlign: 'center', textOverflow: 'clip', whiteSpace: 'nowrap', overflow: 'hidden'}),
    artist: css({textOverflow: 'clip', whiteSpace: 'nowrap', overflow: 'hidden'}),
    votes: css({fontSize: '1.25em'})
};

class Card extends PureComponent {

    hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            }
            : null;
    }

    render() {
        //declare variables that are generated through the hexToRgb function

        let redValue,
            greenValue,
            blueValue;

        if (this.props.color) {
            let tint = this.hexToRgb(this.props.color);
            redValue = tint.r;
            blueValue = tint.b;
            greenValue = tint.g;

        }

        //declare variables that are used in the randomTrack array

        let albumUrl = 'https://picsum.photos/640',
            votes,
            id,
            name,
            artistString = '';

        if (this.props.randomTrack) {
            votes = this.props.randomTrack.votes || 0;
            albumUrl = this.props.randomTrack.img;
            id = this.props.randomTrack.id;
            name = this.props.randomTrack.name;

            if (!votes || votes === 0) {
                votes = '-';
            }

            for (var i = 0; i < this.props.randomTrack.artists.length; i++) {
                artistString += this.props.randomTrack.artists[i];
                if (i < this.props.randomTrack.artists.length - 1) {
                    artistString += ', ';
                }
            }

        }

        return (<button onClick={this.props.onClick} className={`card ${styles.button}`} style={{
            backgroundImage: 'url(' + albumUrl + ')'
        }} id={id || 0}>
            <div className={`${styles.image}`} style={{
                backgroundColor: 'rgba(' + redValue + ',' + greenValue + ',' + blueValue + ',0.5)'
            }}>
                <div className={`${styles.wrapper}`}>
                    <div className={`${styles.track}`}><Marquee text={name || '-'}/></div>
                    <div className={`${styles.artist}`}><Marquee text={artistString || '-'}/></div>
                    <div className={`${styles.votes}`}>{votes + ' Votes'}</div>
                </div>
            </div>
        </button>);
    }
}

export default Card;
