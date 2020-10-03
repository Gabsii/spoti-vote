import React from 'react';
import {css} from 'glamor';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons/faSearch';

const constants = require('../../js/constants');
const styles = {
    wrapper: css({
        minWidth: '250px',
        width: 'calc(100% - 30px)',
        height: '50px',
        color: constants.colors.font,
        backgroundColor: constants.colors.barBackground,
        padding: '10px 15px',
        marginBottom: '40px'
    }),
    input: css({
        textAlign: 'left',
        backgroundColor: 'transparent',
        color: constants.colors.font,
        borderRadius: '500px',
        padding: '17px 30px',
        fontSize: '0.9em',
        lineHeight: 1,
        borderWidth: 0,
        letterSpacing: '2px',
        minWidth: 'calc(100% - 95px)',
        maxHeight: '50px',
        textTransform: 'uppercase',
        whiteSpace: 'normal',
        marginRight: '0',
        '::placeholder': {
            color: constants.colors.font
        }
    }),
    icon: css({})
};

const SearchRooms = ({filterRooms} = {filterRooms: () => {}}) => {
    const focusInput = ()  => {
        document.getElementById('code').focus();
    }
    return (
        <div className={`${styles.wrapper}`}>
            <FontAwesomeIcon icon={faSearch} size={'2x'} className={`${styles.icon}`} onClick={() => focusInput()}/>
            <input type='text' id='code' placeholder='Search for a Room...' className={`${styles.input}`} autoComplete='off' onChange={() => filterRooms()}/>
        </div>
    );
}

export default SearchRooms;
