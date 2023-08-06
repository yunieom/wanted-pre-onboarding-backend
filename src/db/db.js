const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  connectionLimit: 10, // 커넥션 풀에 생성할 최대 커넥션 수
});

const connectToDatabase = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }

      console.log("Database connected successfully.");
      resolve(connection);
    });
  });
};

module.exports = connectToDatabase;
