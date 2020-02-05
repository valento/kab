import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

function LogBar(props){
  const { path } = props.match
  return (
    <div className='row'>
      <p className='row'>Login with:</p>
      <div className='col text-center'>
        <div className='v-center blue'><Link to={`${path}/kab`}>KAB</Link></div>
      </div>
      <div className='col text-center'>
        <div className='v-center'>
          <Link to={`${path}/fb`}>
            <FontAwesomeIcon icon={['fab','facebook']} size="2x" color='#005073'/>
          </Link>
        </div>
      </div>
      <div className='col text-center'>
        <div className='v-center'>
          <Link to={`${path}/goog`}><FontAwesomeIcon icon={['fab','google']} size="2x" color='#005073'/></Link>
        </div>
      </div>
    </div>
  )
}

export default LogBar
