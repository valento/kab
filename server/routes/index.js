import express from 'express';
import path from 'path';
import DB from '../db.js';

const router = express.Router({
  mergeParams: true
})

router.all('/', (req, res, next) => {
  if(req.params.locationID !== 'stara zagora'){
    res.send('NO SERVICE there! Move to available zone')
  }
  else {
    next();
  }
})

router.get('/', (req, res) => {
  res.send('Show us some pizza!');
})

router.get('/:zoneID', (req, res) => {
  res.send('Zone: ' + req.params.zoneID);
})

export default router;
