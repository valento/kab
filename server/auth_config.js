import fs from 'fs'
import passport from 'passport'
import bodyParser from 'body-parser'
import session from 'express-session'
import fbStr from 'passport-facebook'
import DB from './sql'
//import googStr from 'passport-google'
import { auth } from './config'

function authConfig(app){

// ==== INIT DB: ==============================================
/* ---- INIT user table SQL_DB: ------------------------------- */
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

// =============================================================
// Configure Passport:

  passport.use(new fbStr({
      clientID: auth.fb.id,
      clientSecret: auth.fb.secret,
      callbackURL: 'http://localhost:3000/user/auth/fb/callback',
      profileFields: ['id', 'displayName', 'emails']
    },
  // !!! Callback: DONE, must be provided for verify to call it
    (accessToken, refreshToken, user, done) => {
      console.log(JSON.stringify(user))
      if(user){
  // check user ID in SQLite:
        db.getUser(user.id)
        .then(res => {
          if(res !== null){
            console.log('User Found')
            // add JWT
            return done(null, res)
          } else {
            console.log('New Usrer')
            db.addUser(user)
            .then(res => {
              if(res) return done(null, user)
            })
            .catch(err => {
              done(err)
            })
          }
          return done(null, res)
        })
        .catch(err => {
          done(err)
        })
      } else {
        return done(err)
      }
    })
  )

  passport.serializeUser((user, cb) => {
    cb(null,user)
  })
  passport.deserializeUser((obj, cb) => {
    cb(null, obj)
  })

// ================================================
// Use Passport:

  app.use(passport.initialize())
  app.use(passport.session())

// Set ROUTES:
  app.route('/user')
  .get((req,res) => {
    res.send('Give us a user')
  })

  app.get('/user/auth/fb',
    passport.authenticate('facebook',{scope: ['email']})
  )

  app.get('/user/auth/fb/callback', passport.authenticate('facebook', {failureRedirect: '/login'}),
    (req,res) => {
      res.redirect('/')
    }
  )

}

export { authConfig }
