import { NextResponse } from 'next/server';
import { pool } from '@/utils/db';

export async function GET(req) {
    try {
        // Queries for number active customer, total data, number overdue bill
        const activeSubscriptionsQuery = `
            SELECT COUNT(DISTINCT customer_id) AS total_customers
            FROM subscription
            WHERE active = TRUE;
        `;

        const totalDataQuery = `
            SELECT 
                COALESCE(SUM(data_used), 0) AS total_data
            FROM data_usage
            UNION ALL
            SELECT 
                COALESCE(SUM(data_used), 0) AS total_data
            FROM international_data_usage;
        `;

        const overdueBillsQuery = `
            SELECT COUNT(*) AS overdue_bills_count
            FROM billing_cycle
            WHERE status = 'overdue';
        `;

        // Execute queries concurrently
        const [activeSubscriptionsResult, totalDataResult, overdueBillsResult] = await Promise.all([
            pool.query(activeSubscriptionsQuery),
            pool.query(totalDataQuery),
            pool.query(overdueBillsQuery),
        ]);

        // Handle empty results
        const totalCustomers = activeSubscriptionsResult.rows[0]?.total_customers || 0;
        const totalDataUsedMB =
            parseFloat(totalDataResult.rows[0]?.total_data || 0) +
            parseFloat(totalDataResult.rows[1]?.total_data || 0);
        const totalDataUsedGB = totalDataUsedMB / 1024;
        const overdueBillsCount = overdueBillsResult.rows[0]?.overdue_bills_count || 0;

        // Format response
        const metrics = {
            total_customers: totalCustomers,
            total_data_used: totalDataUsedGB,
            overdue_bills_count: overdueBillsCount,
        };

        return NextResponse.json({
            success: true,
            data: metrics,
        });
    } catch (error) {
        console.error('Error fetching dashboard metrics:', error.message);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
