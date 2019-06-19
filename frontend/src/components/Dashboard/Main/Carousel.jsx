import React, {Component} from 'react';
import {css} from 'glamor';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretDown, faCaretRight} from '@fortawesome/fontawesome-free-solid';

import TopType from './TopType.jsx';
import Spinner from './Spinner.jsx';

let constants = require('../../../js/constants');
const styles = {
    wrapper: css({
        height: '340px',
        width: 'calc(100% - 220px)',
        position: 'absolute',
        bottom: 0,
        padding: '10px',
        backgroundColor: constants.colors.backgroundLite,
        display: 'flex',
        boxSizing: 'content-box',
        flexDirection: 'column',
        '@media(max-width: 760px)': {
            width: 'calc(100% - 20px)'
        },
        transition: 'height 0.4s cubic-bezier(0, 0.795, 0, 1)'

    }),
    heading: css({
        fontSize: '1.3em',
        width: '100%',
        padding: '2px 0 10px 5px',
        borderBottom: '1px solid' + constants.colors.barBackground,
        color: 'white'
    }),
    tracksWrapper: css({display: 'flex', flexDirection: 'row', justifyContent: 'center', overflow: 'hidden'}),
    minimizer: css({
        ':hover': {
            cursor: 'pointer'
        }
    })
};

class Carousel extends Component {

    constructor() {
        super();
        this.state = {
            minimized: false
        }
    }

    //height: 35px
    minimizeFooter() {
        if (this.state.minimized) {
            document.getElementById("carousel").style.height = '340px';
            this.setState({minimized: false});
        } else {
            document.getElementById("carousel").style.height = '35px';
            this.setState({minimized: true});
        }
    }

    render() {
        return (<footer id="carousel" className={`${styles.wrapper}`}>
            <h2 className={`${styles.heading}`}>
                {
                    this.state.minimized
                        ? <FontAwesomeIcon icon={faCaretRight} size='1x' className={`${styles.minimizer}`} style={{
                                    marginRight: '10px'
                                }} onClick={this.minimizeFooter.bind(this)}/>
                        : <FontAwesomeIcon icon={faCaretDown} size='1x' className={`${styles.minimizer}`} style={{
                                    marginRight: '10px'
                                }} onClick={this.minimizeFooter.bind(this)}/>
                }

                Your Top Tracks:
            </h2>
            <div className={`${styles.tracksWrapper}`}>
                {
                    this.props.topTracks !== null && this.props.topTracks !== undefined
                        ? this.props.topTracks.length !== 0
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
                            : <Spinner/>
                        : <Spinner/>
                }
            </div>
        </footer>);
    }
}

export default Carousel;
