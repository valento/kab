import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

function UserLog (props){
    return (
      (props.logged)?
      <div><FontAwesomeIcon icon='lock' color='#eaf0f2' /> : {props.name} </div>:
      <div><FontAwesomeIcon icon='lock-open' color='#f4dc42' /> | {props.name}</div>
    )
  }

export default UserLog;
