import express from 'express';
import DB from '../db.js';

const url = 'mongodb://master:kolombo@localhost:27017';
const dbName = 'wired';

const router = express.Router({
  mergeParams: true
});

router.get('/', (req, res, next) => {
  const database = new DB;
  database.connect(url, dbName) // returns data base
    .then( ()  => {
      database.list(req.params.collection)
      .then( result => {
        res.send('Questions: ' + res.json(result));
      } )
    })
    .catch( err => res.send(err.message) )
});

export default router;
