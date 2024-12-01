// utils/db.js

import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: 'db',
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

pool.on('connect', () => {
  console.log('Connected to the database');
});

export { pool };
