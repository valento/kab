import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

function BtNext(props) {
  let nextStyle = '';
  if(props.single){
    nextStyle = (props.gameover || props.timeout || props.win)? 'skip' : 'skip disabled';
  } else {
    nextStyle = (props.win)? 'skip' : 'skip disabled';
  }

  return (
    <div
      className={nextStyle}
      onClick={props.onNext}>
      <FontAwesomeIcon icon='long-arrow-alt-right' size="2x" color='#51585b' />
    </div>
  )
}

export default BtNext;
