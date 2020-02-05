import React from 'react'
import axios from 'axios'
import FacebookLogin from 'react-facebook-login'
import configFBlog from '../config_auth'

class FBlog extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isAuthenticated: false,
      user: null,
      token: ''
    }

    this.logout = this.logout.bind(this)
    this.fbResponse = this.fbResponse.bind(this)
  }

  logout() {
    this.setState({
      isAuthenticated: false,
      token: '',
      user: null
    })
  }

  fbResponse(response) {
    console.log(JSON.stringify(response));
/*    const token = new Blob(
      [JSON.stringify(
        {access_token: response.accessToken},
        null,
        2
      )],
      {type: 'application/json'}
    );
*/

    axios.get('http://localhost:3000/user/auth/fb/', {
      body: JSON.stringify(response.user),
      mode: 'cors'
    })
    .then(res => {
      res.json().then( user => {
        console.log(user, token);
      })
    })
    .catch( err => console.log(err.message))
  }

  render() {
/*
<hr/>
<FacebookLogin
  appId={configFBlog.FB_APP_ID}
  fields='name,email'
  autoLoad={true}
  callback={this.fbResponse}
/>
*/
    return(
      <div className='login blue'>
        <a href='/user/auth/fb'>Login With Faceoobk</a>
      </div>
    )
  }
}

export default FBlog
