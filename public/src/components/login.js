import React from 'react'
import axios from 'axios'
import { Switch, Route, Link } from 'react-router-dom'

import LogBar from './log_bar'
import FBlog from './fb_log'
import KABlog from './kab_log'
import GLog from './goog_log'
//import GOOGlog from './fb_log'

class Login extends React.Component {
  constructor(props) {
    super(props)
    //
    this.onLog = this.onLog.bind(this)
  }

  onLog(e){
    e.preventDefault()
    let that = this
    axios.post('/log', ({data: this.state}))
    .then((data)=>{
      console.log(data)
    })
  }

  handleInputChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  render(){
    // match object available:
    const { path } = this.props.match

    return(
      <div className='col-md-12 login'>
        <LogBar {...this.props} />
        <Switch>
          <Route
            path = {`${path}/kab`}//{match.path}
            component = {KABlog}
          />
          <Route
            path = {`${path}/fb`}//{match.path}
            component = {FBlog}
          />
          <Route
            path = {`${path}/goog`}//{match.path}
            component = {GLog}
          />
        </Switch>
      </div>
    )
  }
}

export default Login
