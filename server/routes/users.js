import express from 'express'
import path from 'path'
import fs from 'fs'
import DB from '../sql'//ite
import { format_user } from './helpers'

const userRouter = express.Router({
  mergeParams: true
})

// --- INIT DB: ------------------------------------
// ---- INIT user table SQL_DB: --------------------
let db = {},
    db_uri = './data/game.db'

try {
  fs.stat(db_uri, (err,res) => {
    if(err){
      throw err
    } else {
      db = new DB(db_uri, 'users')
    }
  })
}
catch(err) {
  console.log('Wrong DB: ' + err.message);
}

// ---- ROUTES: -------------------------------------

userRouter.route('/user/:id')
.get((req,res)=>{
  db.getUser(req.params.id)
  .then(result => {
    res.send(result)
  })
  .catch(err => {
    res.send(err.message)
  })
})
.post((req,res) => {
  db.addUser(req.body)
  .then(result => console.log(result))
  .catch(err => console.log(err))
})

// Create-Save User:
userRouter.route('/')
.get((req,res)=>{
  res.send(res)
})
.post((req,res) => {
  //
})

export default userRouter
