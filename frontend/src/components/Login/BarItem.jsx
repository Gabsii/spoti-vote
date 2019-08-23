import React from 'react';
import {css} from 'glamor';

let constants = require('../../js/constants');
const styles = {
    item: css({listStyle: 'none', margin: '0 0 0 1em', textShadow: '0 2px 0 darken(#fff, 50%)'}),
    link: css({
        textDecoration: 'none',
        fontSize: '1.2em',
        letterSpacing: '1px',
        color: constants.colors.font,
        ':hover': {
            cursor: 'pointer',
            color: constants.colors.green
        }
    })
};

const BarItem = (props) => {
    return (<li className={`${styles.item}`}>
        <a className={`${styles.link}`} href={props.url}>{props.name}</a>
    </li>);
};

export default BarItem;
