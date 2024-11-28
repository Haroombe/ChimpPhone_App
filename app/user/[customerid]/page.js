"use client";

import { use, useState, useEffect } from "react";

export default function BillingPage({ params }) {
    // Unwrap params if it is a promise
    const unwrappedParams = use(params); 
    const { customerid } = unwrappedParams; // Access the dynamic route parameter

    const [billingData, setBillingData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (customerid) {
            fetch(`/api/fetchBilling?customerid=${customerid}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("Failed to fetch billing data");
                    }
                    return res.json();
                })
                .then((data) => {
                    setBillingData(data.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Error fetching billing data:", err);
                    setError("Failed to fetch billing data.");
                    setLoading(false);
                });
        }
    }, [customerid]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!billingData || billingData.length === 0) return <p>No billing data found.</p>;

    return (
        <div>
            <h1>Billing Details for Customer {customerid}</h1>
            <div className="billing-container">
                {billingData.map((bill, index) => (
                    <div key={index} className="billing-card">
                        <h2>Plan: {bill.plan_name} ({bill.plan_type})</h2>
                        <p>Billing Date: {bill.billing_date}</p>
                        <p>Period: {bill.start_date} to {bill.end_date}</p>
                        <p>Subscription Charge: ${bill.subscription_charge}</p>
                        <p>Call Charge: ${bill.call_charge}</p>
                        <p>Data Charge: ${bill.data_charge}</p>
                        <p>SMS Charge: ${bill.sms_charge}</p>
                        <p>Tax: ${bill.tax}</p>
                        <p>Total: ${bill.total_charge}</p>
                        <p>Status: {bill.status}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
