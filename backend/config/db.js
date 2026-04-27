const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
  host:     process.env.DB_HOST     || 'localhost',
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || '12345678',
  database: process.env.DB_NAME     || 'digitech_db',
  port: process.env.DB_PORT         || 3308 ,
  waitForConnections: true,
  connectionLimit: 10,
});

pool.getConnection()
  .then(() => console.log('✅ Connexion MySQL réussie'))
  .catch(err => console.error('❌ Erreur MySQL :', err.message));

module.exports = pool;
