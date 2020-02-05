import SQLite from 'sqlite3';

function SQL(url, table){
  if(table === null){
    this.db = new SQLite.Database(url, (err) => {
      if(!err) return console.log('SQlite Success')
      console.log(err)
    })
  } else {
    this.db = new SQLite.Database(url, (err) => {
      if(!err){
        if(table){
          console.log('create table' + table)
          this.init(table)
        }
      } else {
        console.log(err.message)
      }
    })
  }
};

SQL.prototype.init = function (table) {
  switch(table){
    case 'users':
      this.db.run("CREATE TABLE if not exists users (" +
      "first TEXT," +
      "last TEXT," +
      "mail VARCHAR(50)," +
      "gender TEXT," +
      "rating REAL," +
      "credit INTEGER," +
      "location TEXT," +
      "auth_id VARCHAR(20)" +
      ");")
    break;
  }
}

SQL.prototype.list = function (que){
  const that = this;
  return new Promise((resolve,reject) => {
    switch (que){

// GAMES table
      case 'quiz':
        that.db.all("SELECT * FROM quiz LIMIT 0,30", (err, result) => {
          if(err){
            reject(err.message)
          } else {
            resolve(result)
          }
        })
      break;

// USERS table
      case 'users':
        that.db.all("SELECT * FROM users", (err,result) => {
          if(err){
            reject(err)
          } else {
            resolve(result)
          }
        })
      break;

      default :
        reject(new Error('Wrong DB!'))
    }// else {}
  });
};

SQL.prototype.addQ = function(val){
  const that = this;
  return new Promise((resolve,reject) => {
    const sttm = that.db.prepare("INSERT INTO quiz VALUES (?)");
    sttm.run(val, (err) => {
      if(err){
        reject('No data: ' + err.message)
      } else {
        resolve()
      }
    })
    //sttm.finalize()
  })
}

SQL.prototype.getUser = function(id){
  return new Promise((resolve, reject) => {
    this.db.get("SELECT first,last,credit FROM users WHERE auth_id=?", id, (err,row) => {
      if(err){
        reject(err)
      } else {
        if(row === undefined) resolve(null)
        else {
          resolve(row)
        }
      }
    })
  })
}

SQL.prototype.addUser = function(obj){
  return new Promise((resolve,reject) => {
    let sqlReq = "INSERT INTO users (first, last, mail, gender, rating, credit, location, auth_id)" +
                  "VALUES ($first, $last, $mail, $gender, $rating, $credit, $location, $id)"
    let sqlParams = {
      $first: obj.displayName.split(' ')[0],
      $last: obj.displayName.split(' ')[1],
      $gender: null,
      $mail: obj.emails[0].value,
      $rating: 5,
      $credit: 100,
      $location: null,
      $id: obj.id
    }
    let stm = this.db.prepare(sqlReq)
    stm.run(sqlParams, err => {
      if(err === null){
        resolve(true)
      } else if(this.changes == 0){
        reject(new Error('Entity not found'))
      } else {
        reject(new Error('Invalid Arguments'))
      }
    })
  })
  // get value object: {first:, last:, mail:, rating:, credit:, location:, id:}
}

export default SQL;
