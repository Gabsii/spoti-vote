import React, {Component} from 'react';
import MediaQuery from 'react-responsive';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/fontawesome-free-solid';
import NavItem from './NavItem.jsx';
import BarItem from './BarItem.jsx';
import logo from '../../img/spotiLogo.svg';

let constants = require('../../js/constants');
let backgroundColor = constants.colors.background;
const ipAddress = window.location.hostname || 'localhost';
const portBack = 8888;

let defaultDimensions = {
    height: '5em',
    width: '5em',
    marginLeft: '5px'
};

let divider = { // TODO: display:none if screen too small
    height: '19px',
    margin: '0px 9px 0px 1.5em',
    borderLeft: '1px solid #5b5a5a'
};

let navStyle = {
    padding: 0,
    margin: 0,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: '2em'
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
        return (<header style={{
                backgroundColor,
                height: '90px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center'
            }}>
            <div style={{
                    ...defaultDimensions,
                    marginRight: '20px'
                }}>
                <a href='/' style={{
                        textDecoration: 'none',
                        letterSpacing: '1px'
                    }}>
                    <img style={defaultDimensions} src={logo} alt={'logo'}></img>
                </a>
            </div>
            <a href='/' style={{
                    textDecoration: 'none',
                    letterSpacing: '1px'
                }}>
                <b style={{
                        color: constants.colors.font,
                        fontSize: '2em'
                    }}>Spoti Vote</b>
                {/* TODO: Logo (b/w) + text as one image */}
            </a>
            <MediaQuery minWidth={constants.breakpoints.medium}>
                {
                    (matches) => {
                        if (matches) {
                            return (<nav style={{
                                    flexGrow: 1,
                                    marginRight: '20px'
                                }}>
                                <ul style={navStyle}>
                                    <BarItem url='/#features' name='Features'/>
                                    <BarItem url='/usage' name='Usage'/>
                                    <li style={divider}></li>
                                    <BarItem url={'http://' + ipAddress + ':' + portBack + '/login'} name='Host'/>
                                    <BarItem url='/join' name='Join'/>
                                </ul>
                            </nav>);
                        } else {
                            // eslint-disable-next-line
                            return (<a style={{
                                    ...navStyle,
                                    color: constants.colors.font,
                                    flexGrow: 1,
                                    marginRight: '20px'
                                }} href='#' onClick={this.showNav}>
                                <FontAwesomeIcon icon={faBars} size='3x'/>
                            </a>);
                        }
                    }
                }

            </MediaQuery>
            <MediaQuery maxWidth={constants.breakpoints.medium}>
                {
                    (matches) => {
                        if (this.state.popupVisible && matches) {
                            return (<ul id='nav' style={{
                                    width: '100%',
                                    position: 'absolute',
                                    top: '90px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    fontSize: '1.2em',
                                    color: constants.colors.font,
                                    backgroundColor: constants.colors.background
                                }} ref={node => {
                                    this.node = node;
                                }}>
                                <NavItem name='Host' href={'http://' + ipAddress + ':' + portBack + '/login'}/>
                                <NavItem name='Join' href={'/join'}/>
                                <NavItem name='Features' href={'#features'}/>
                                <NavItem name='Usage' href={'/usage'}/>
                                <NavItem name='Contact Us' href={'/'}/>
                            </ul>);
                        } else {
                            return ('');
                        }
                    }
                }
            </MediaQuery>
        </header>);
    }
}
export default Header;
