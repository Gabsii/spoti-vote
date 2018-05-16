import React, {Component} from 'react';
import MediaQuery from 'react-responsive';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

let constants = require('../../js/constants');

class Reason extends Component {

	render() {

		return (<MediaQuery minWidth={constants.breakpoints.medium}>
			{
				(matches) => {
					if (matches) {
						return (<div style={{
								display: 'flex',
								alignItems: 'center',
								flexDirection: 'column',
								width: '33.33%',
								padding: '25px 5%'
							}}>
							<div style={{
									marginTop: '0.5em',
									marginBottom: '1em'
								}}>
								<FontAwesomeIcon icon={this.props.icon} size="4x"/>
							</div>
							<h3 style={{
									fontSize: '2em',
									fontFamily: 'Circular Book',
									marginTop: '0.5em',
									marginBottom: '0.5em',
									textAlign: 'center'
								}}>
								{this.props.title}
							</h3>
							<div style={{
									textAlign: 'center',
									fontSize: '1.1em'
								}}>
								{this.props.text}
							</div>
						</div>);
					} else {
						return (<div style={{
								display: 'flex',
								alignItems: 'center',
								flexDirection: 'column',
								width: '66.66%',
								padding: '25px 5%'
							}}>
							<div style={{
									marginTop: '0.5em',
									marginBottom: '1em'
								}}>
								<FontAwesomeIcon icon={this.props.icon} size="4x"/>
							</div>
							<h3 style={{
									fontSize: '2em',
									fontFamily: 'Circular Book',
									marginTop: '0.5em',
									marginBottom: '0.5em',
									textAlign: 'center'
								}}>
								{this.props.title}
							</h3>
							<div style={{
									textAlign: 'center',
									fontSize: '1.1em'
								}}>
								{this.props.text}
							</div>
						</div>);
					}
				}
			}
		</MediaQuery>);
	}
}

export default Reason;
