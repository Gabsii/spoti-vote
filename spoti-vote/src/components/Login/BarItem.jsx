import React, {Component} from 'react';
import {css} from 'glamor';

let constants = require('../../js/constants');

class BarItem extends Component {

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

        return (<li className={`${styles.item}`} onMouseEnter={this.toggleHover.bind(this)} onMouseLeave={this.toggleHover.bind(this)}>
            <a style={hoverStyle} className={`${styles.link}`} href={this.props.url}>{this.props.name}</a>
        </li>);
    }
}

const styles = {
    item: css({listStyle: 'none', margin: '0 0 0 1em', textShadow: '0 2px 0 darken(#fff, 50%)'}),
    link: css({textDecoration: 'none', fontSize: '1.2em', letterSpacing: '1px'})
}
export default BarItem;
