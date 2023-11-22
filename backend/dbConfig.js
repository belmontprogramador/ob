const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'bancoob',
  password: '01ummilhao',
  port: 5432,
});

module.exports = pool;


