import React, {Component} from 'react';
import {css} from 'glamor';
import Cookies from 'universal-cookie';

import TopType from './TopType.jsx';

let constants = require('../../../js/constants');
const styles = {
    wrapper: css({
        height: '340px',
        position: 'relative',
        bottom: 0,
        padding: '10px',
        backgroundColor: constants.colors.backgroundLite,
        display: 'flex',
        boxSizing: 'content-box',
        flexDirection: 'column'
    }),
    heading: css({
        fontSize: '1.3em',
        width: '100%',
        padding: '2px 0 10px 5px',
        borderBottom: '1px solid' + constants.colors.barBackground,
        color: 'white'
    }),
    tracksWrapper: css({display: 'flex', flexDirection: 'row', justifyContent: 'center', overflow: 'hidden'})
};

class Carousel extends Component {

    render() {
        return (<footer className={`${styles.wrapper}`}>
            <h2 className={`${styles.heading}`}>Your Top Tracks:
            </h2>
            <div className={`${styles.tracksWrapper}`}>
                {
                    this.props.topTracks.length !== 0
                        ? this.props.topTracks.items.map((track, index) => {
                            // console.log(track);
                            let artistString = '';
                            for (var i = 0; i < track.artists.length; i++) {
                                artistString += track.artists[i].name;
                                if (i < track.artists.length - 1) {
                                    artistString += ', ';
                                }
                            }
                            return (<TopType img={track.album.images[1].url} name={track.name} artist={artistString} key={index}/>);
                        })
                        : ''
                }
            </div>
        </footer>);
    }
    1
}

export default Carousel;
