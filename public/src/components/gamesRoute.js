import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const GamesRoute = ({component: Component, path, isLogged, ...rest}) => {
  return(
    <Route
      path={path}
      {...rest}
      render={(props)=>{
        return isLogged ? <Component {...props}/> : <Redirect to='/' />
      }}
    />
  )
}

export default GamesRoute
