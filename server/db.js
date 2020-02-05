import { MongoClient } from 'mongodb';

const USER = 'master';
const PASS = 'kolombo';

function DB(){
  this.db = null;
}

DB.prototype.connect = function(uri, dbase){
  let url = uri +'/' + dbase + '?authSource=admin';
  let that = this;

  return new Promise((resolve, reject) => {
    if (that.db) {
      resolve(that);
    }
    else {
      const _that = that;
      MongoClient.connect(url)
        .then(
          (client) => {
            _that.db = client.db(dbase);
            resolve(); // data base as a value??
          },
          (err) => {
            console.log('Error: ' + err.message);
            reject(err.message);
          }
        );

    }
  });
}

DB.prototype.close = function(){
  if (this.db) {
    this.db.close()
    .then(
      result => {},
      err => console.log( 'Failed to close DB: ' + err.message )
    )
  }
}

DB.prototype.list = function(coll){
  const that = this;
  return new Promise((resolve, reject) => {
      that.db.collection(coll, {strict: true}, (err, collection) => {
        if(err){
          console.log('In DB-class: ' + err.message);
          reject(err.message);
        } else {
          collection.find().toArray()
          .then( (result) => resolve(result) )
          .catch( (err) => console.log('Colection error: ' + err.message) )
        }
      });
  })
}

export default DB;
