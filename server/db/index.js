const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pokedex'
})

db.connect((err) => { if (err) {
  console.log(err) } else {console.log('Success!')} });

module.exports = db;