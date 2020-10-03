import React from 'react';
import {css} from 'glamor';

import '../../../css/Spinner.css';

let constants = require('../../../js/constants');

const styles = {
    wrapper: css({
        height: '300px',
        marginTop: '40px',
        position: 'relative',
        bottom: 0,
        padding: '10px',
        backgroundColor: constants.colors.backgroundLite,
        display: 'flex',
        boxSizing: 'content-box',
        flexDirection: 'column'
    }),
    loading: css({color: 'white', fontSize: '1.2em', bottom: '30px', position: 'fixed'})
};

const Spinner = () => (
    <div className={`${styles.wrapper}`}>
        <div id="spinner"></div>
        <span className={`${styles.loading}`}>Loading...</span>
    </div>
)

export default Spinner;
