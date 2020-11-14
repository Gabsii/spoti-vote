import React from 'react';
import {css} from 'glamor';

let constants = require('../../js/constants').default;
const styles = {
    item: css({
        width: '100%',
        height: '50px',
        margin: '5px 0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px',
        borderTop: '1px solid rgba(255,255,255,0.1)'
    }),
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

const NavItem = (props) => {

    return (<li className={`${styles.item}`}>
        <a className={`${styles.link}`} href={props.href}>{props.name}</a>
    </li>);
};

export default NavItem;
