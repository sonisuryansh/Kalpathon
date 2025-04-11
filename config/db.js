const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// pool.connect(err => {
//   if (err) throw err;
//   console.log('MySQL connected');
// });

// module.exports = db;
module.exports = pool.promise();
