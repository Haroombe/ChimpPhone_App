// utils/db.js

import { Pool, Client } from 'pg';
import winston from 'winston';

// Configure Winston logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: 'query.sql',
      level: 'info',
      format: winston.format.printf(({ message }) => message), // Log only the message
    }),
  ],
});

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

// Override pool.query to log queries
const originalPoolQuery = pool.query.bind(pool);
pool.query = (...args) => {
  const queryText = args[0];
  logger.info(queryText);
  return originalPoolQuery(...args);
};

// Override Client.query to log queries
const originalClientQuery = Client.prototype.query;
Client.prototype.query = function (...args) {
  const queryText = args[0];
  logger.info(queryText);
  return originalClientQuery.apply(this, args);
};

export { pool };