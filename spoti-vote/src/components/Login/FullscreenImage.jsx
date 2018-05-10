import React, {Component} from 'react';

const defaultStyle = {
	minHeight: '100vh',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	backgroundAttachment: 'fixed',
	backgroundPosition: 'center',
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover',
	overflow: 'hidden'
};

class FullscreenImage extends Component {

	constructor() {
		super();
		this.state = {
			defaultStyle: defaultStyle,
			background: {}
		};
	}

	componentDidMount() {
		this.setState({background: this.props.source});
	}

	render() {
		return (<div id={this.props.id} style={{
				...defaultStyle,
				backgroundImage: 'url(' + this.state.background + ')'
			}}>
			{this.props.children}
		</div>);
	}
}
export default FullscreenImage;
