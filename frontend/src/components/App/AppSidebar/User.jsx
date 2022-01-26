import React, {PureComponent} from 'react';
import {css} from 'glamor';

import icon from '../../../img/userIcon.svg';
const styles = {
    wrapper: css({display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px'}),
    img: css({
        height: '32px',
        width: '32px',
        marginLeft: '10px',
        marginRight: '20px',
        marginTop: '5px',
        marginBottom: '5px'
    }),
    name: css({width: 'calc(100% - 108px)', marginRight: 'auto', textOverflow: 'clip', whiteSpace: 'nowrap', overflow: 'hidden'}),
    vote: css({width: '24px', height: '24px', borderRadius: '20px', margin: '10px', border: '1px solid black'})
};

class User extends PureComponent {

    render() {
        return (<div className={`${styles.wrapper}`}>
            <img alt='icon' src={icon} className={`${styles.img}`}/>
            <div className={`${styles.name}`}>
                {this.props.name}
            </div>
            <div className={`vote ${styles.vote}`} style={{
                backgroundColor: this.props.voteColor
            }}></div>
        </div>);
    }
}

export default User;
