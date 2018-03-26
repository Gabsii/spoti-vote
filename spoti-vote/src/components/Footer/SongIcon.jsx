import React, {Component} from 'react';

let defaultStyle = {
	height: '75px',
	width: '75px',
	position: 'absolute',
	bottom: 0,
	left: 0
}

class SongIcon extends Component {
	render() {
		return (<img style={defaultStyle} src={this.props.background} alt="Album Art"></img>);
	}
}
export default SongIcon;
