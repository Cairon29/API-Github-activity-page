import mysql from 'mysql2/promise.js'
import config from './config.js'


export const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  port: Number(config.db.port),

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})