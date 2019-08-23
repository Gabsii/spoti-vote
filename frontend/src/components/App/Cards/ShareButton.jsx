import React, {PureComponent} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import swal from 'sweetalert2';
import {faShareAlt} from '@fortawesome/fontawesome-free-solid';
import {css} from 'glamor';

let constants = require('../../../js/constants');
const styles = {
    button: css({
        padding: '10px 25px',
        marginTop: '2.5em',
        color: constants.colors.fontSecondary,
        backgroundColor: constants.colors.backgroundLite,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        lineHeight: 1,
        borderRadius: '500px',
        borderWidth: 0,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        whiteSpace: 'normal'

    }),
    text: css({fontSize: '1.3em', marginRight: '0.8em'}),
    input: css({position: 'absolute', left: '-9999px'})
};

class ShareButton extends PureComponent {

    share() {
        if (navigator.share) {
            navigator.share({title: 'Spoti-Vote', text: 'Join my room!', url: window.location.href}).then(() => console.log('Successful share')).catch((error) => console.log('Error sharing', error));
        } else {
            const copyText = document.getElementById('share');
            copyText.select();
            document.execCommand('Copy');
            swal.fire({
                type: 'info',
                title: 'Link copied to clipboard!',
                toast: true,
                position: 'bottom',
                showConfirmButton: false,
                timer: 2000
            });
        }
    }

    render() {
        return (<button className={`${styles.button}`} onClick={this.share.bind(this)}>
            <div className={`${styles.text}`}>Share</div>
            <input className={`${styles.input}`} id='share' type='text' defaultValue={window.location.href} tabIndex='-1' aria-hidden='true'/>
            <FontAwesomeIcon icon={faShareAlt} size='3x'/>
        </button>);
    }
}

export default ShareButton;
