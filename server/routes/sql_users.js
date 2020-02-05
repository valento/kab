import express from 'express'
import path from 'path'
import passport from 'passport'
import fs from 'fs'
import DB from '../sql'//ite
import { fbStr } from '../pass_strat'
import { format_user } from './helpers'

const userRouter = express.Router({
  mergeParams: true
})

// --- INIT DB: ---------------------------
let database = {},
    url = './data/game.db'

database = new DB(url, 'users')

// ---- ROUTES: ------------------------------

userRouter.get('/', (req,res)=>{
  database.list('users')
  .then(result => {
    res.send(result)
  })

})

userRouter.get('/:id', (req,res)=>{
  //res.redirect('../../')
  database.getUser(req.params.id)
  .then(result => {
    res.redirect('/')//res.send(result)
  })
  .catch(err => {
// New User to create:
    database.addUser(req.user)
    .then(result => {
      res.send('User Saved')
    })
  })
})

userRouter.get('/auth/fb',
  passport.authenticate('facebook',{scope: ['email']}),
  (req,res,next) => {
    if(req.user){
      console.log(req.user)
      req.auth = {
        id: req.user.id
      }
      next()
    } else {
      return res.send(401, 'User Not Authenticated')
    }
  },
// Import These first!!!!!!!!!!!!!!!
  //genToken,
  //sendToken
)

userRouter.get('/auth/fb/callback', passport.authenticate('facebook', {
          failureRedirect: '/login',
          //successRedirect: '../../../'
        }),
        (req,res) => {
          //res.send(res.json());
          //console.log(res.user);
          res.redirect('../../../');
        }
)




// TEST
userRouter.post('/', (req,res) => {
  console.log('save this curl: ' + req.body)
  //database.addUser(req.user)
})

export default userRouter
