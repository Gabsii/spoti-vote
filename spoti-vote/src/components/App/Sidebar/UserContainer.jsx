import React, {Component} from 'react';
import User from './User.jsx';

let constants = require('../../../js/constants');
let defaultStyle = {
    height: 'calc(100% - 340px)',
    width: '100%',
    marginTop: '300px',
    overflowY: 'auto'
};

let titleStyle = {
    height: '35px',
    fontSize: '24px',
    border: '1px solid black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};

class UserContainer extends Component {

    render() {
        for (var i = 0; i < this.props.connectedUser.length; i++) {
            if (this.props.connectedUser[i].voted === null) {
                this.props.connectedUser[i].color = constants.colors.font;
            }
            for (var j = 0; j < this.props.activeTracks.length; j++) {
                if (this.props.activeTracks[j].id === this.props.connectedUser[i].voted) {
                    this.props.connectedUser[i].color = constants.iterateCardColors(j);
                }
            }
            if (this.props.connectedUser[i].voted === 'skip') {
                this.props.connectedUser[i].color = constants.colors.skip;
            }
        }

        return (<div style={defaultStyle}>
            <div style={titleStyle}>Users</div>
            <div>
                {
                    this.props.connectedUser.map(function(user, index) {
                        return (<User voteColor={user.color} key={index} name={user.name}/>);
                    })
                }
            </div>
        </div>);
    }
}
export default UserContainer;
