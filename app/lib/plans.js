// pages/api/plans.js

import { pool } from '@/utils/db';

export async function fetchPlans() {
  console.log(pool)
  try {
    console.log(pool)
    const result = await pool.query('SELECT * FROM phone_plan;');

    return result.rows
  } catch (error) {
    console.error('Error fetching plans:', error);
  }
}