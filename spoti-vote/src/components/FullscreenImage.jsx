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
		this.setState({background: this.props.source.uri, childrenMounted: true}); // works
		let children = React.Children.map(this.props.children, (child) => {
			return React.cloneElement(child, {mounted: this.state.childrenMounted})
		});

	}

	render() {
		// console.log(this.state);
		// let children = React.Children.map(this.props.children, function(child) {
		// 	return React.cloneElement(child, {mounted: this.state.childrenMounted})
		// });

		return (<div style={{
				...defaultStyle,
				backgroundImage: 'url(' + this.state.background + ')'
			}}>
			{this.props.children}
		</div>);
	}
}
export default FullscreenImage;
