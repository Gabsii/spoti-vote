import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {css} from 'glamor';

const styles = {
	wrapper: css({
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		width: '66.66%',
		padding: '25px 5%',
		marginTop: '0.5em',
		marginBottom: '1em',
		'@media(min-width: 760px)': {
			width: '33.33%'
		}
	}),
	heading: css({fontSize: '2em', fontFamily: 'Circular Book, Arial, Sans-Serif', marginTop: '0.5em', marginBottom: '0.5em', textAlign: 'center'}),
	text: css({textAlign: 'center', fontSize: '1.1em'})
};

const Reason = (props) => {

	return (<div className={`${styles.wrapper}`}>

		<FontAwesomeIcon icon={props.icon} size='4x'/>
		<h3 className={`${styles.heading}`}>
			{props.title}
		</h3>
		<div className={`${styles.text}`}>
			{props.text}
		</div>
	</div>);
};

export default Reason;
