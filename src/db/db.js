const mysql = require('mysql2');
require('dotenv').config();

const connectToDatabase = () => {
  const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
  });

  con.connect(err => {
    if (err) {
      throw err;
    }

    console.log('Database connected Successfully.');
  });

  con.query('USE test', (err, result) => {
    if (err) {
      throw err;
    }

    console.log('USE test');
  });

  return con;
}

module.exports = connectToDatabase;
