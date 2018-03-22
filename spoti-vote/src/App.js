import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faAngleDown} from '@fortawesome/fontawesome-free-solid';
import './css/App.css';

let defaultStyle = {
	position: 'absolute',
	marginLeft: 'auto',
	marginRight: 'auto',
	marginTop: 'auto',
	color: '#191414'
}

class App extends Component {

	componentDidMount() {

		let target = document.getElementById('button');
		let start = Date.now(); // remember start time

		let timer = setInterval(function() {
			// how much time passed from the start?
			let timePassed = Date.now() - start;

			// draw the animation at the moment timePassed
			draw(timePassed);

		}, 20);

		function draw(timePassed) {
			let center = (window.innerWidth/2 - target.clientWidth/2);
			let abschnitt = timePassed/100 % (Math.PI*7);
			if (abschnitt <= Math.PI*2) {
				target.style.left = (center + (Math.sin(timePassed/100)*10)) + 'px';
			} else if (abschnitt <= Math.PI*3) {
				target.style.left = (center + (Math.sin(timePassed/100)*2)) + 'px';
			}
			else {
				target.style.left = (center) + 'px';
			}
		}
	}

	render() {
		return (
			<div id="button" style={defaultStyle}>
				<a href="#down" className="scroll">
					<FontAwesomeIcon icon={faAngleDown} size="7x" className=""/>
				</a>
			</div>);
	}
}

export default App;
