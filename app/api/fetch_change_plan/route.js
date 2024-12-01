import { pool } from '@/utils/db';

export async function GET(req) {
    try {
        const plans = await pool.query('SELECT * FROM phone_plan;');
        return new Response(JSON.stringify(plans.rows), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching plans:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to fetch plans.' }),
            { status: 500 }
        );
    }
}