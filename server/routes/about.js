import express from 'express';
import path from 'path';

const router = express.Router();

router.get('/', ( req, res, next ) => {
  console.log('About Router');
  res.sendFile('about.html', {root: path.join(__dirname, '../../public')});
})

export default router;
