import express from 'express'
import passport from '../pass_strat'
import path from 'path'
import DB from '../sqlite.js'

const userRouter = express.Router({
  mergeParams: true
})

// FACEBOOK Authentication:
userRouter.get('/fb', passport.authenticate('facebook', {scope: 'email'}))

userRouter.get('/fb/callback', passport.authenticate('facebook', {
          failureRedirect: '/login',
          successRedirect: '../../../'
        }),
        //(err,user) => {
          //console.log(user);
          //res.send(res.json());
          //res.redirect('/users/' + res.);
        //}
)

// GOOGLE Authentication:

// KAB Authentication:

export default userRouter;
