import passport from 'passport'
import FbStrategy from 'passport-facebook'
import DB from './sql'
// import Authentication Configuration:
import { auth } from './config'

// authenticate(strategy,callback)
export function fbStr() {
  passport.use(new FbStrategy({
    clientID: '380447152056700',
    clientSecret: 'ea4370b02e162a83acabb029de4fe091',
    callbackURL: 'http://localhost:3000/user/auth/fb/callback',
    profileFields: ['id', 'displayName', 'gender', 'email']
  },
// !!! Callback must be provided for verify to call it
  (accessToken, refreshToken, profile, done) => {
    console.log('passport done well? : ' + (profile)? 'YES!':'NO!')
// check user ID in SQLite:

// make new User and save to SQLite:
    return done(null,profile)
  })
)}

passport.serializeUser((user,done) => {
  done(null,user)
})

passport.deserializeUser((obj,done) => {
  done(null,obj)//User Object
})


//export default passport
