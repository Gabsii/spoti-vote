import React, {Component} from 'react';
import {css} from 'glamor';

let constants = require('../../../js/constants');
const styles = {
	wrapper: css({
		width: '200px',
		minWidth: '150px',
		padding: '20px 10px',
		backgroundColor: constants.colors.backgroundLite,
		textOverflow: 'ellipsis',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		textAlign: 'center'
	}),
	album: css({}),
	heading: css({marginTop: '20px', fontSize: '1em', color: 'white'}),
	subHeading: css({fontSize: '0.8em', color: constants.colors.fontSecondary})
};

class TopType extends Component {

	render() {
		return (<div className={`${styles.wrapper}`}>
			<img className={`${styles.album}`} alt={this.props.name} src={this.props.img || 'https://via.placeholder.com/152x152'}/>
			<div>
				<h3 className={`${styles.heading}`}>{this.props.name}</h3>
				<h4 className={`${styles.subHeading}`}>{this.props.artist}</h4>
			</div>
		</div>);
	}
}

export default TopType;
