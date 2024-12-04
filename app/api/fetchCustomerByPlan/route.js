import { NextResponse } from 'next/server';
import { pool } from '@/utils/db';

export async function GET(req) {
    try {
        // Query to count customers grouped by their phone plan
        const query = `
            SELECT 
                pp.plan_name,
                COUNT(s.customer_id) AS total_customers
            FROM 
                subscription s
            INNER JOIN 
                phone_plan pp ON s.plan_id = pp.plan_id
            GROUP BY 
                pp.plan_name
            ORDER BY 
                total_customers DESC;
        `;

        const result = await pool.query(query);

        // Format the response
        const data = result.rows;
        //console.log(data);
        return NextResponse.json({
            success: true,
            data: data,
        });
    } catch (error) {
        console.error('Error fetching customers by plan:', error.message);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
