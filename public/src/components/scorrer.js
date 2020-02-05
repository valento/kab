import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

function Scorrer(props){
  return(
    <div className='top'>
      <span className={(props.lose)? 'papaya' : null}>{props.points[0]}</span>/
      <span className={(props.win)? 'papaya' : null}>{props.points[1]}</span>
  </div>
  )
}

export default Scorrer;
