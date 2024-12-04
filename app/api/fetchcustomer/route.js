    // get current cycle bill
    import { NextResponse } from 'next/server';
    import { pool } from '@/utils/db';
    
    export async function GET(req) {
        const { searchParams } = new URL(req.url);
        const customerid = searchParams.get('customerid');
    
        if (!customerid) {
            return NextResponse.json(
                { success: false, error: 'Customer ID is required.' },
                { status: 400 }
            );
        }
    
        try {
            const result = await pool.query(
                `SELECT 
                    *
                FROM customer c
                WHERE c.customer_id = $1
                `,
                [customerid]
            );
    
            if (result.rows.length === 0) {
                return NextResponse.json(
                    { success: false, error: 'No customer data found.' },
                    { status: 404 }
                );
            }
            //console.log(result.rows);
            return NextResponse.json({ success: true, data: result.rows });
        } catch (error) {
            console.error('Error fetching customer info:', error.message);
            return NextResponse.json(
                { success: false, error: 'Internal Server Error' },
                { status: 500 }
            );
        }
    }
    