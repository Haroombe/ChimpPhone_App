import { pool } from '@/utils/db';

export async function call_history(req, res) {
    const { Customer_Id } = req.params;

    try {
        const history = await pool.query(
            `SELECT 
                l.from_phone_number, 
                l.to_number, 
                l.call_type, 
                l.start_time, 
                l.end_time, 
                l.duration, 
                l.total_cost
            FROM customer c
            JOIN phone_number_list n ON c.customer_id = n.customer_id
            JOIN call_log l ON n.phone_number = l.from_phone_number
            JOIN subscription s ON c.customer_id = s.customer_id
            JOIN billing_cycle b ON s.subscription_id = b.subscription_id
            WHERE c.customer_id = $1
            AND CURRENT_DATE BETWEEN b.start_date AND b.end_date
            AND s.active = TRUE;`,
            [Customer_Id]
        );

        return res.status(200).json({ success: true, data: history.rows });
    } catch (error) {
        console.error('Error fetching call history:', error);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}