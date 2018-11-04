import React, {Component} from 'react';
import {css} from 'glamor';

class SongIcon extends Component {
    render() {
        return (<img className={`${styles.image}`} src={this.props.background} alt='Album Art'></img>);
    }
}

const styles = {
    image: css({height: '100%', position: 'absolute', bottom: 0, left: 0})
}

export default SongIcon;
