import React from 'react'
import { connect } from 'react-redux'
import openSocket from 'socket.io-client'
import Bar from './dashbar'
import Home from './home'
import Quiz from './quiz'
import Login from './login'
import Form from './form'
import GamesRoute from './gamesRoute'
import GamesHome from './gamesHome'
import { Switch, Route, Link } from 'react-router-dom'
import axios from 'axios'
//import { subscribeSocket } from './socket';

class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      single: true,
      credit: 0,
      name: '',
      logged: false,
      assets: {
        ans: true,
        jocker: false,
        bailout: false
      },
      counter: 1
    }

    //subscribeSocket((err,payload) => {
      //console.log(payload);
    //});

    this.addCredit = this.addCredit.bind(this);
  }

  componentDidMount(){
    axios.get('test/cookie')
    .then(res => {
      if(res.data !== null && res.data !== undefined){
        this.setState(
          {
            credit: res.data.credit,
            name: res.data.first,
            logged: true
          }
        )
      }
    })
    .catch(err => console.log(err))
  }

/*
  ioAction(e,data){
    openSocket.emit('answer', {data: data});
  }
*/
  addCredit(d){
    this.setState({
      credit: this.state.credit + d
    })
  }

  render(){
    let props = {
      count: this.state.count,
      updatebar: this.addCredit,
      counter: this.state.counter,
      single: this.state.single,
      credit: this.state.credit,
      name: this.state.name,
      logged: this.state.logged,
      assets: this.state.assets
    }
    return (
      <div className='col-md-6 content'>
        {/*<h1 className='text-center'>{this.props.game}:</h1>*/}
        <Bar
          name={this.state.name}
          credit={this.state.credit}
          logged={this.state.logged}
        />

        <Switch>
          <Route exact
            path='/'
            component = {Home}/>

          <Route
            path='/quiz'
            render = {({match}) => {
              return <Quiz {...props} />
            }
          }/>

          <GamesRoute
            path='/games'
            isLogged={true}//{this.state.logged}
            component={GamesHome}
          />

          <Route
            path='/login'
            component = {Login}
          />
        </Switch>

        {/*<Quiz credit={this.state.credit} count={this.state.count} updatebar={this.update}/>*/}
        {/*{this.props.children}*/}
      </div>
    )
  }
}

/*
mapStateToProps(state){
  return {
    user: state.user
  }
}
*/
export default App// connect(mapStateToProps)(App)
