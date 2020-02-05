import express from 'express'
import DB from '../sql'//ite
import fs from 'fs'
import {format_game} from './helpers.js'

const router = express.Router({
  mergeParams: true
})

// -- Route: /games
// -- Try SQLite DB ----------------------------------------
let database = {},
    url = './data/game.db'

database = new DB(url, null);


// ------- Error handling: -----------------------


router.use(function(req,res,next) {
  if(Object.keys(database).length === 0){
    res.status(500).send('Wrong DB')
  }
  else next()
})

// --------------------------------------------------------
// Routes:

// GET: full quiz game ---------------------
router.route('/data/:game')
.get((req, res) => {
    database.list(req.params.game)
    .then( result => {
      result = format_game(result)
      res.end(res.json(result))
    } )
    .catch( err => res.send(err.message) )
})
// ADD: new question -----------------------
.post((req, res) => {
  if(req.params.game === 'quiz'){
    console.log(req.body)
    res.end('Update sent')
    //res.redirect('/done/');
  }
  //database.addQ(req.bodyParser());
})

router.route('/done')
.get((req,res) => {
  res.send('Ask more questions...')
})

router.route('/data/:game')

export default router;
