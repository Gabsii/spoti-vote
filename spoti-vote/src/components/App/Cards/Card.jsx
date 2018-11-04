import React, {Component} from 'react';
import Marquee from 'react-text-marquee';
import {css} from 'glamor';

let constants = require('../../../js/constants');

class Card extends Component {

    constructor() {
        super();
        this.state = {
            hover: false
        };
    }

    toggleHover() {
        this.setState({
            hover: !this.state.hover
        });
    }

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
        const tint = this.hexToRgb(this.props.color);
        let linkStyle;
        if (this.state.hover) {
            linkStyle = {
                cursor: 'pointer'
            };
        } else {
            linkStyle = {
                cursor: 'context-menu'
            };
        }

        let votes = this.props.randomTrack.votes;
        if (votes === undefined || votes === 0) {
            votes = '-';
        }

        let artistString = '';
        for (var i = 0; i < this.props.randomTrack.artists.length; i++) {
            artistString += this.props.randomTrack.artists[i].name;
            if (i < this.props.randomTrack.artists.length - 1) {
                artistString += ', ';
            }
        }

        return (<button onMouseLeave={this.toggleHover.bind(this)} onClick={this.props.onClick} onMouseEnter={this.toggleHover.bind(this)} className={`card ${styles.button}`} style={{
                ...linkStyle,
                backgroundImage: 'url(' + this.props.randomTrack.album.images[0].url + ')'
            }} id={this.props.randomTrack.id}>
            <div className={`${styles.image}`} style={{
                    backgroundColor: 'rgba(' + tint.r + ',' + tint.g + ',' + tint.b + ',0.5)'
                }}>
                <div className={`${styles.wrapper}`}>
                    <div className={`${styles.track}`}><Marquee text={this.props.randomTrack.name || '-'}/></div>
                    <div className={`${styles.artist}`}><Marquee text={artistString || '-'}/></div>
                    <div className={`${styles.votes}`}>{votes + ' Votes'}</div>
                </div>
            </div>
        </button>);
    }
}

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

}
export default Card;
