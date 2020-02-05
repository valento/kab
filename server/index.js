import express from 'express'
import io from 'socket.io'
//import mDB from './db.js'
//import DB from './sql'
//import fs from 'fs'
//import { MongoClient } from 'mongodb';
import path from 'path'

// React Server:
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './app'
import template from './template'

// import ROUTERS:
import router from './routes/'
import sql_games from './routes/sql_games.js'
//import uRouter from './routes/users'

import bodyParser from 'body-parser'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import sharedsession from 'express-socket.io-session'
import { authConfig } from './auth_config'

// WebPack middlewares
import wb from 'webpack'
import wbMware from 'webpack-dev-middleware'
import wbHot from 'webpack-hot-middleware'
import wbCon from '../webpack.config.dev'

let app = express()

// =======================================================

const PORT = process.env.PORT || 3000
const ENV = process.env.NODE_ENV || 'development'
 if(ENV === 'development'){
   const compiler = wb(wbCon)

   app.use(wbMware(compiler, {
     hot: true,
     publicPath: wbCon.output.publicPath
   }))

   app.use(wbHot(compiler))
 } else if(ENV === 'production'){
   // Config Production:
   //app.use(express.static(path.resolve(__dirname, '../public/dist')))
 }

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

// Session:
let sessionMiddleware = session({
  name: 'server-session-cookie-id',
  secret: 'my express secret',
  saveUninitialized: true,
  resave: true
})

app.use(sessionMiddleware)

authConfig(app)

app.use(
  '/public',
  express.static(path.join(__dirname, '../public'))
);

//app.use('/db/:collection', game_router);
//app.use('/app/:locationID', router);

// React axios REST-call: endpoint for QUIZ Game
app.use('/games', sql_games)

//app.use('/user', uRouter)

/*
app.get('/test/cookie', (req,res) => {
  if(req.session.passport){
    res.end(res.json(req.session.passport.user))
  } else {
    console.log('No user')
    res.end(res.json(null))
  }
})
*/

// React User Login/Sign/Authentication
app.get('/authenticated',
  (req,res,next) => {
    if(req.isAuthenticated()){
      return next()
    } else {
      res.redirect('/login')
    }
  }
)

app.get('/',
  (req,res) => {
    if(req.cookies.authenticated) console.log(req.url.match)
// try Server Rendering:
//<script>window.APP_INITIAL_STATE = ${initialState}</script>
    const context = {}// contains the result of the render
    const markup = renderToString(
      <StaticRouter
        location={req.url}
        context={context}
      >
        <App />
      </StaticRouter>
    )

    res.send(
      template({
        params: null,
        body: markup
      })
    )//path.join(__dirname,'../public/index.html')
    res.end()
  }
)

let server = app.listen(
  PORT,
  () => console.log('Server running:' + PORT)
)


/* ----- PASSPORT: -------------------------------------- */


/* ----------- WEB SOCKET IO -------------------------------- */
let sio = io.listen(server)

sio.use(sharedsession(sessionMiddleware))//, session, socket.request.res, next))

sio.on('connection', socket => {

  if(socket.rooms.length > 0){
    console.log(socket.rooms)
  } else {
    let room = 'room_' + socket.id
    socket.join(room, () => {
      console.log(socket.rooms)
    })
  }
// Shared Session Access:
  //console.log(socket.handshake.session.passport)
  //console.log(socket.rooms)
  //console.log(socket.id);

  socket.on('io answ', data => {
    console.log('server IO Answer: ' + data.ans)
    socket.broadcast.emit('ioanswer', data);
  })

  socket.on('io restart', data => {
    console.log('server IO Next: ' + data.start)
    socket.broadcast.emit('ionext', data);
  })

  socket.on('io sysnext', data => {
    console.log('server IO Sys Next: ' + data.start)
    socket.broadcast.emit('iosysnext', data)
  })
})


//MongoClient.connect('mongodb://localhost:27017', (err,client) => {
  // handle error
  //const db = client.db(dbName);
//});
