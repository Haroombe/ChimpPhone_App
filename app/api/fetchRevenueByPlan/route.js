import { NextResponse } from 'next/server';
import { pool } from '@/utils/db';

export async function GET(req) {
    try {
        // Query to calculate revenue grouped by phone plan for the current month
        const query = `
            SELECT 
                pp.plan_name,
                SUM(bc.total_charge) AS revenue
            FROM 
                billing_cycle bc
            INNER JOIN 
                subscription s ON bc.subscription_id = s.subscription_id
            INNER JOIN 
                phone_plan pp ON s.plan_id = pp.plan_id
            WHERE 
                DATE_TRUNC('month', bc.billing_date) = DATE_TRUNC('month', CURRENT_DATE)
            GROUP BY 
                pp.plan_name
            ORDER BY 
                revenue DESC;
        `;

        const result = await pool.query(query);

        // Handle empty results
        if (result.rows.length === 0) {
            return NextResponse.json({
                success: true,
                data: [],
                message: 'No revenue data available for the current month.',
            });
        }

        // Convert revenue to numbers
        const formattedData = result.rows.map(row => ({
            plan_name: row.plan_name,
            revenue: parseFloat(row.revenue),
        }));

        return NextResponse.json({
            success: true,
            data: formattedData,
        });
    } catch (error) {
        console.error('Error fetching revenue by plan:', error.message);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
