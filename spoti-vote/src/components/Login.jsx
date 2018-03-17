import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faAngleDown} from '@fortawesome/fontawesome-free-solid';
import '../css/parallax.css';
import Header from './Header.jsx';

class Login extends Component {

	handleClick(e) {
		var target = document.getElementById("down");
		var targetx = target.offsetLeft;
		var targety = target.offsetTop;
		window.scrollTo(targetx, targety);
	}

	render() {
		return (<section className="">
			<div className="centerparent fullheight background" id="parallax">
				<div className="">
					<button id="loginbutton" className="sticky">
						Login
					</button>
				</div>
				<div className="introduction front center centerparent columns">
					<div>
						<h1 className="title" id="scroller">Spoti Vote</h1>
					</div>
					<div>
						Kahoot x Spotify Collabs
					</div>
				</div>
				<div className="bcenter black">
					<a href="#down" className="scroll" onClick={this.handleClick.bind(this)}>
						<FontAwesomeIcon icon={faAngleDown} size="7x" className=""/>
					</a>
				</div>
			</div>
			<div className="fullheight background2" id="down">
				<Header></Header>
				<div className="container">
					<p>
						Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet,
					</p>
				</div>
			</div>
			<script>
				this.a();
			</script>
		</section>);
	}
}
export default Login;
