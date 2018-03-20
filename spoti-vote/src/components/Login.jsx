import React, {Component} from 'react';
import '../css/parallax.css';
import FullscreenImage from './FullscreenImage.jsx';
import LoginButton from './Buttons/LoginButton.jsx';
import ScrollDown from './Buttons/ScrollDown.jsx';
import LoginTitle from './LoginTitle.jsx';
import Header from './Header.jsx';
import pictureOne from '../img/austin-neill-247237-unsplash.jpg';
import pictureTwo from '../img/andre-benz-276974-unsplash.jpg';

let pictures = {
	One: {
		uri: pictureOne
	},
	Two: {
		uri: pictureTwo
	}
};

class Login extends Component {

	render() {
		return (<section>
			<FullscreenImage id="parallax" source={pictures.One}>
				<LoginButton/>
				<LoginTitle/>
				<ScrollDown/>
			</FullscreenImage>
			<FullscreenImage id="down" source={pictures.Two}>
				<Header></Header>
				<div className="center container">
					<p>
						Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet,
					</p>
				</div>
			</FullscreenImage>
		</section>);
	}
}
export default Login;
