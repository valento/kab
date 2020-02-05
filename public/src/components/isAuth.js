import React from 'react'
import Login from './login'
import { Route } from 'react-router-dom'

 const IsAuth = (props) => {
  return (
    <Route path={'/login'} component={Login} />
  )
}

export default IsAuth
