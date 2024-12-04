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
                    sl.phone_number,
                    sl.to_number,
                    sl.time,
                    sl.char_count,
                    sl.country_code,
                    sl.roaming_cost,
                    sl.total_cost
                FROM 
                    sms_log AS sl
                JOIN 
                    phone_number_list AS pnl
                ON 
                    sl.phone_number = pnl.phone_number
                WHERE 
                    pnl.customer_id = $1
                ORDER BY 
                    time DESC`,
                [customerid]
            );
            
    
            if (result.rows.length === 0) {
                return NextResponse.json(
                    { success: false, error: 'No customer smslog data found.' },
                    { status: 404 }
                );
            }
            //console.log(result.rows);
            return NextResponse.json({ success: true, data: result.rows });
        } catch (error) {
            console.error('Error fetching customer sms info:', error.message);
            return NextResponse.json(
                { success: false, error: 'Internal Server Error' },
                { status: 500 }
            );
        }
    }
    