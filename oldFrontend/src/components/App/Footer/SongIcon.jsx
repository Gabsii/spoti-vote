import React, {PureComponent} from 'react';
import {css} from 'glamor';

const styles = {
    image: css({height: '100%', width: '75px', position: 'absolute', bottom: 0, left: 0})
};

class SongIcon extends PureComponent {
    render() {
        return (<img className={`${styles.image}`} src={this.props.background} alt='Album Art'></img>);
    }
}

export default SongIcon;
