import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
let constants = require('../../js/constants');

class Reason extends Component {

	render() {

		return (<div style={{
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
				width: '33.33%',
				padding: '25px 75px'
			}}>
			<div style={{
					marginTop: '0.5em',
					marginBottom: '1em'
				}}>
				<FontAwesomeIcon icon={this.props.icon} size="4x"/>
			</div>
			<div style={{
					fontSize: '1.5em',
					fontFamily: 'Circular Book',
					marginTop: '0.5em',
					marginBottom: '0.5em'
				}}>
				{this.props.title}
			</div>
			<div style={{
					textAlign: 'center'
				}}>
				{this.props.text}
			</div>
		</div>);
	}
}

export default Reason;
