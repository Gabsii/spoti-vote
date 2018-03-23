import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faAngleDown} from '@fortawesome/fontawesome-free-solid';
let color = require('../../css/colors.js');

let defaultStyle = {
	position: 'absolute',
	bottom: '0',
	color: color.background
}

class ScrollDown extends Component {

	handleClick(e) {
		// To be implemented

	 	let target = document.getElementById("down");
		let targetx = target.offsetLeft;
		let targety = target.offsetTop;
		window.scrollTo(targetx, targety);
	}

	componentDidMount() {
		let animationTarget = document.getElementById('scrollDownButton');
		let start = Date.now(); // remember start time

		let timer = setInterval(function() {
			// how much time passed from the start?
			let timePassed = Date.now() - start;

			// draw the animation at the moment timePassed
			draw(timePassed);

		}, 20);

		function draw(timePassed) {
			let center = (window.innerWidth/2 - animationTarget.clientWidth/2);
			let abschnitt = timePassed/100 % (Math.PI*7);
			if (abschnitt <= Math.PI*2) {
				animationTarget.style.left = (center + (Math.sin(timePassed/100)*10)) + 'px';
			} else if (abschnitt <= Math.PI*3) {
				animationTarget.style.left = (center + (Math.sin(timePassed/100)*2)) + 'px';
			}
			else {
				animationTarget.style.left = (center) + 'px';
			}
		}
	}

	render() {

		return (
			<div id="scrollDownButton" style={defaultStyle}>
				<a href="#down" className="scroll" onClick={this.handleClick.bind(this)}>
					<FontAwesomeIcon icon={faAngleDown} size="7x" className=""/>
				</a>
			</div>
		);
	}
}

export default ScrollDown;
