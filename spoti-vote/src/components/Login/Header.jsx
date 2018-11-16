import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/fontawesome-free-solid';
import {css} from 'glamor';

import NavItem from './NavItem.jsx';
import BarItem from './BarItem.jsx';
import logo from '../../img/spotiLogo.svg';
let constants = require('../../js/constants');

const styles = {
    header: css({backgroundColor: constants.colors.background, height: '90px', overflow: 'hidden', display: 'flex', alignItems: 'center'}),
    logoWrapper: css({height: '5em', width: '5em', marginLeft: '5px', marginRight: '20px'}),
    link: css({textDecoration: 'none', letterSpacing: '1px'}),
    title: css({color: constants.colors.font, fontSize: '2em'}),
    logo: css({height: '5em', width: '5em', marginLeft: '5px'}),
    navList: css({
        width: '100%',
        position: 'absolute',
        top: '90px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: '1.2em',
        color: constants.colors.font,
        backgroundColor: constants.colors.background
    }),
    nav: css({
        padding: 0,
        margin: 0,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: '2em'
    }),
    navButton: css({
        padding: 0,
        margin: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
        color: constants.colors.font,
        flexGrow: 1,
        marginRight: '20px',
        display: 'flex!important',
        background: 'none',
        border: 'none',
        outline: 'none',
        '@media(min-width: 760px)': {
            display: 'none!important'
        }
    }),
    divider: css({height: '19px', margin: '0px 9px 0px 1.5em', borderLeft: '1px solid #5b5a5a'}),
    breakTablet: css({
        display: 'none!important',
        flexGrow: 1,
        marginRight: '20px',
        '@media(min-width: 760px)': {
            display: 'block!important'
        }
    })
};

class Header extends Component {

    constructor() {
        super();

        this.showNav = this.showNav.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.state = {
            popupVisible: false
        };
    }

    showNav() {
        if (!this.state.popupVisible) {
            document.addEventListener('click', this.handleOutsideClick, false);
        } else {
            document.removeEventListener('click', this.handleOutsideClick, false);
        }
        this.setState(prevState => ({
            popupVisible: !prevState.popupVisible
        }));
    }

    handleOutsideClick(e) {
        // ignore clicks on the component itself
        if (this.node.contains(e.target)) {
            return;
        }
        this.showNav();
    }

    render() {
        return (<header className={`${styles.header}`}>
            <div className={`${styles.logoWrapper}`}>
                <a href='/' className={`${styles.link}`}>
                    <img className={`${styles.logo}`} src={logo} alt={'logo'}></img>
                </a>
            </div>
            <a href='/' className={`${styles.link}`}>
                <b className={`${styles.title}`}>Spoti Vote</b>
                {/* TODO: Logo (b/w) + text as one image */}
            </a>
            {/* Phone */}
            <nav className={`${styles.breakTablet}`}>
                <ul className={`${styles.nav}`}>
                    <BarItem url='/#features' name='Features'/>
                    <BarItem url='/usage' name='Usage'/>
                    <li className={`${styles.divider}`}></li>
                    <BarItem url={constants.config.url + '/login'} name='Login'/>
                    <BarItem url='/join' name='Join'/>
                </ul>
            </nav>
            {/* Tablet */}
            <button className={`${styles.navButton}`} href='#' onClick={this.showNav}>
                <FontAwesomeIcon icon={faBars} size='3x'/>
            </button>
            {
                this.state.popupVisible
                    ? <ul id='nav' className={`${styles.navList}`} ref={(node) => {
                                this.node = node;
                            }}>
                            <NavItem name='Host' href={constants.config.url + '/login'}/>
                            <NavItem name='Join' href={'/join'}/>
                            <NavItem name='Features' href={'#features'}/>
                            <NavItem name='Usage' href={'/usage'}/>
                            <NavItem name='Contact Us' href={'/'}/>
                        </ul>
                    : ''
            }
        </header>);
    }
}

export default Header;
