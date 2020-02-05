import React from 'react'
import UserLog from './user_log'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {Link} from 'react-router-dom'

class Bar extends React.Component{
  constructor(props){
    super(props)
    //this.componentDidMount = this.componentDidMount.bind('this')
  }

  render(){
    return (
      <div className='row dashbar'>
        <div className='col dash_home'>
          <div className='float-left'>
            <Link to='/'><FontAwesomeIcon icon='home' size="lg" color='#eaf0f2' /></Link>
          </div>
        </div>
        <div className='col'>
          <Link to='/login'>
            <UserLog
            name={(!this.props.logged)? 'Anon' : this.props.name}
            logged={this.props.logged} />
          </Link>
        </div>
        <div className='col dash_score'>
          <div className='float-right'>
            <FontAwesomeIcon icon='piggy-bank' size="lg" color='#eaf0f2' />
            <span className='playfair'> : {this.props.credit}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Bar
