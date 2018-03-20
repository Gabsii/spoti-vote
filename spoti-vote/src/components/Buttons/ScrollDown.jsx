import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faAngleDown} from '@fortawesome/fontawesome-free-solid';

let defaultStyle = {
	marginLeft: 'auto',
	marginRight: 'auto',
	marginTop: 'auto',
	color: '#191414'
}

class ScrollDown extends Component {

	handleClick(e) {
		// To be implemented
		// let target = document.getElementById("down");
		// let targetx = target.offsetLeft;
		// let targety = target.offsetTop;
		// window.scrollTo(targetx, targety);
	}

	componentDidMount() {}

	render() {
		return (<div style={defaultStyle}>
			<a href="#down" className="scroll" onClick={this.handleClick.bind(this)}>
				<FontAwesomeIcon icon={faAngleDown} size="7x" className=""/>
			</a>
		</div>);
	}
}

export default ScrollDown;
