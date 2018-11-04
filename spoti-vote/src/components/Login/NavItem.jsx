import React, {Component} from 'react';
import {css} from 'glamor';

let constants = require('../../js/constants');

class NavItem extends Component {

    constructor() {
        super();
        this.state = {
            hover: false
        };
    }

    toggleHover(event) {
        this.setState({
            hover: !this.state.hover
        });
    }

    render() {
        let hoverStyle;
        if (this.state.hover) {
            hoverStyle = {
                cursor: 'pointer',
                color: constants.colors.green
            };
        } else {
            hoverStyle = {
                cursor: 'context-menu',
                color: constants.colors.font
            };
        }
        return (<li className={`${styles.item}`} style={hoverStyle} onMouseEnter={this.toggleHover.bind(this)} onMouseLeave={this.toggleHover.bind(this)}>
            <a className={`${styles.link}`} style={hoverStyle} href={this.props.href}>{this.props.name}</a>
        </li>);
    }
}

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
    link: css({textDecoration: 'none', fontSize: '1.2em', letterSpacing: '1px'})
}
export default NavItem;
