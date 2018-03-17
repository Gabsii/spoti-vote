import React, {Component} from 'react';

class Header extends Component {

	render() {
		var width = window.innerWidth;
		var imgSrc = "https://picsum.photos/g/" + width + "/?random&blur";
		return (<section className="hero">
			<div className="app">
				<header className="app-header">
					<h1 className="title">Welcome to React
						<img id="myImg" className="App-logo" alt="This should be the Background" src={imgSrc}/>
					</h1>
				</header>
			</div>
		</section>);
	}
}
export default Header;
