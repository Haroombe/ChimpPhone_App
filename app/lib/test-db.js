import { pool } from '@/utils/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const result = await pool.query('SELECT NOW()');
      res.status(200).json({ message: 'Database connection successful', time: result.rows[0].now });
    } catch (error) {
      console.error('Error connecting to the database:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}