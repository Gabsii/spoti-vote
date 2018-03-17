import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faAngleDown} from '@fortawesome/fontawesome-free-solid';

import '../css/parallax.css';
import '../js/parallax.js';

class Parallax extends React.Component {

	render() {
		return (<section className="">
			<div className="parallax">
				<div className="buttonBottomContainer">
					<FontAwesomeIcon icon={faAngleDown} size="7x" className=""/>
				</div>
			</div>
			<div className="parallaxContent buttonMiddleContainer middle" id="down">
				<button>Login</button>
			</div>
		</section>);
	}
}
export default Parallax;
