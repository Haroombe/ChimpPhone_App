"use client";

import { use, useState, useEffect } from "react";

export default function BillingPage({ params }) {
    const unwrappedParams = use(params); 
    const { customerid } = unwrappedParams; // Get the customer ID from dynamic routing
    const [billingData, setBillingData] = useState(null);
    const [unpaidBills, setUnpaidBills] = useState([]); // Past unpaid bills
    const [customerName, setCustomerName] = useState(""); // State to store customer name
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isPaying, setIsPaying] = useState(false);
    const [paymentMessage, setPaymentMessage] = useState("");

    // Helper function to format date
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Intl.DateTimeFormat("en-US", options).format(new Date(dateString));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Fetch billing data
                const billingResponse = await fetch(`/api/fetchBilling?customerid=${customerid}`);
                if (!billingResponse.ok) {
                    throw new Error("Failed to fetch billing data");
                }
                const billingResult = await billingResponse.json();
                //console.log(billingResult);
                setBillingData(billingResult.data);

                // Fetch unpaid bills
                const unpaidResponse = await fetch(`/api/fetchUnpaidBill?customerid=${customerid}`);
                if (!unpaidResponse.ok) {
                    throw new Error("Failed to fetch unpaid bills");
                }
                const unpaidResult = await unpaidResponse.json();
                setUnpaidBills(unpaidResult.data.unpaid_bills || []);

                // Fetch customer name
                const profileResponse = await fetch(`/api/fetchProfile?customerid=${customerid}`);
                if (!profileResponse.ok) {
                    throw new Error("Failed to fetch customer profile");
                }
                const profileResult = await profileResponse.json();
                const fullName = `${profileResult.data[0].first_name} ${profileResult.data[0].last_name}`;
                setCustomerName(fullName);
            } catch (error) {
                console.error(error.message);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [customerid]);

    const handlePayment = async (subscription_id, start_date, total_charge) => {
        try {
            setIsPaying(true);
            setPaymentMessage("");

            const response = await fetch("/api/makePayment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    customer_id: customerid,
                    subscription_id,
                    start_date,
                    company_bank_account_id: 1,
                }),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.error || "Failed to make payment.");
            }

            setPaymentMessage(`Payment of $${total_charge} was successful!`);
            alert(`Payment of $${total_charge} was successful!`);
            // Refresh billing data to reflect changes
            window.location.reload();
        } catch (error) {
            console.error("Error making payment:", error.message);
            setPaymentMessage(`Payment failed: ${error.message}`);
            alert(error);
        } finally {
            setIsPaying(false);
        }
    };

    if (loading) {
        return <div className="spinner text-center mt-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 mt-4">{error}</div>;
    }

    if (!billingData || billingData.length === 0) {
        return <div className="text-center text-gray-600 mt-4">No billing data found.</div>;
    }

    // Calculate total unpaid amount
    const totalUnpaid = unpaidBills.reduce((sum, bill) => sum + parseFloat(bill.total_charge), 0);

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Header and Navigation */}
            <div x-data="{ open: false }" className="relative overflow-hidden bg-sky-700 pb-32">
                <nav className="bg-transparent relative z-10 border-b border-teal-500 border-opacity-25 lg:border-none lg:bg-transparent">
                    <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between lg:border-b lg:border-sky-800">
                            <div className="flex items-center px-2 lg:px-0">
                                <div className="flex-shrink-0">
                                    {/*
                                    <Image className="block h-8 w-auto" src="/path-to-logo" alt="Logo" />
                                        */}
                                </div>
                                <div className="hidden lg:ml-6 lg:block lg:space-x-4">
                                    <div className="flex">

                                        <a
                                            href={`/user/${customerid}/plan`}
                                            className="hover:bg-sky-800 rounded-md py-2 px-3 text-sm font-medium text-white"
                                        >
                                            Plan
                                        </a>


                                        <a
                                            href={`/user/${customerid}/billing`}
                                            className="bg-black bg-opacity-25 rounded-md py-2 px-3 text-sm font-medium text-white hover:bg-sky-800"
                                        >
                                            Billing
                                        </a>
                                        <a
                                            href={`/user/${customerid}/callHistory`}
                                            className="hover:bg-sky-800 rounded-md py-2 px-3 text-sm font-medium text-white"
                                        >
                                            History
                                        </a>
                                        <a
                                            href= {`/user/${customerid}/setting`}
                                            className="hover:bg-sky-800 rounded-md py-2 px-3 text-sm font-medium text-white"
                                        >
                                            Settings
                                        </a>

                                        <a
                                            href={`/user/${customerid}/transactionHistory`}
                                            className="hover:bg-sky-800 rounded-md py-2 px-3 text-sm font-medium text-white"
                                        >
                                            Transaction
                                        </a>
                                        <a
                                            href={`/admin`}
                                            className="hover:bg-sky-800 rounded-md py-2 px-3 text-sm font-medium text-white"
                                        >
                                            admin
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
                                <div className="w-full max-w-lg lg:max-w-xs">
                                    <label htmlFor="search" className="sr-only">
                                        Search
                                    </label>
                                    <div className="relative text-sky-100 focus-within:text-gray-400">
                                        <input
                                            id="search"
                                            name="search"
                                            className="block w-full rounded-md border border-transparent bg-sky-700 bg-opacity-50 py-2 pl-10 pr-3 leading-5 placeholder-sky-100 focus:border-white focus:bg-white focus:text-gray-900 focus:placeholder-gray-500 focus:outline-none focus:ring-white sm:text-sm"
                                            placeholder="Search"
                                            type="search"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <header className="relative py-10">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-white">Billing Details</h1>
                        <p className="text-lg text-sky-100 mt-2">Customer: {customerName}</p>
                    </div>
                </header>
            </div>

            {/* Main Content */}
            <main className="relative -mt-32">
                <div className="mx-auto max-w-screen-xl px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16">
                    <div className="overflow-hidden rounded-lg bg-white shadow">
                        <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
                            {/* Billing Details Table */}
                            <div className="py-6 lg:col-span-8">
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h2 className="text-lg font-semibold text-sky-700">Billing Details</h2>
                                    <table className="w-full mt-4">
                                        <thead>
                                            <tr>
                                                <th className="text-left font-semibold text-gray-800">Plan</th>
                                                <th className="text-left font-semibold text-gray-800">Billing Date</th>
                                                <th className="text-left font-semibold text-gray-800">Period</th>
                                                <th className="text-left font-semibold text-gray-800">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {billingData.map((bill, index) => (
                                                <tr key={index} className="border-t border-gray-200">
                                                    <td className="py-4">
                                                        <div className="flex flex-col">
                                                            <span className="font-semibold text-gray-900">
                                                                {bill.plan_name} ({bill.plan_type})
                                                            </span>
                                                            <span className="text-sm text-gray-600">
                                                                Call Charge: ${bill.call_charge}
                                                            </span>
                                                            <span className="text-sm text-gray-600">
                                                                Subscription Charge: ${bill.subscription_charge}
                                                            </span>
                                                            <span className="text-sm text-gray-600">
                                                                SMS Charge: ${bill.sms_charge}
                                                            </span>
                                                            <span className="text-sm text-gray-600">
                                                                Data Charge: ${bill.data_charge}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 text-gray-800">{formatDate(bill.billing_date)}</td>
                                                    <td className="py-4 text-gray-800">
                                                        {formatDate(bill.start_date)} to {formatDate(bill.end_date)}
                                                    </td>
                                                    <td className="py-4 text-gray-800">${bill.total_charge - bill.tax}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            {/* Unpaid Past Bills */}
                            <div className="py-6 lg:col-span-8">
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h2 className="text-lg font-semibold text-sky-700">Past Unpaid Bills</h2>
                                    {unpaidBills.length > 0 ? (
                                        <table className="w-full mt-4">
                                            <thead>
                                                <tr>
                                                    <th className="text-left font-semibold text-gray-800">Period</th>
                                                    <th className="text-left font-semibold text-gray-800">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {unpaidBills.map((bill, index) => (
                                                    <tr key={index} className="border-t border-gray-200">
                                                        <td className="py-4 text-gray-800">
                                                            {formatDate(bill.start_date)} to {formatDate(bill.end_date)}
                                                        </td>
                                                        <td className="py-4 text-gray-800">${bill.total_charge}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <p className="text-center text-gray-600">No unpaid bills.</p>
                                    )}
                                </div>
                            </div>
                            </div>
                            
                            {/* Summary Section */}
                            <div className="py-6 lg:col-span-4 lg:row-span-1">
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h2 className="text-lg font-semibold text-sky-700">Summary</h2>
                                    <div className="flex justify-between text-gray-900 mt-4">
                                        <span>Total Unpaid</span>
                                        <span>
                                        ${totalUnpaid.toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-gray-900">
                                        <span>Total Current Cycle</span>
                                        <span>
                                        $
                                        {billingData
                                            .reduce((sum, bill) => {
                                                return bill.status === "unpaid"
                                                    ? sum + parseFloat(bill.total_charge)
                                                    : sum;
                                            }, 0)
                                            .toFixed(2)}
                                        </span>
                                    </div>
                                    <hr className="my-2" />
                                    <div className="flex justify-between font-semibold text-gray-900">
                                        <span>Grand Total</span>
                                        <span>
                                        $
                                        {(
                                            totalUnpaid +
                                            billingData.reduce((sum, bill) => {
                                                return bill.status === "unpaid"
                                                    ? sum + parseFloat(bill.total_charge)
                                                    : sum;
                                            }, 0)
                                        ).toFixed(2)}
                                            </span>
                                    </div>


                                    {/* Buttons for Each Billing Cycle */}
                                    <div className="mt-4">
                                        <h3 className="text-lg font-semibold text-gray-800">Pay Current Bill</h3>
                                        {billingData.map((bill, index) => (
                                            <div key={index} className="mb-4">
                                                {bill.status === "paid" ? (
                                                    <button
                                                        className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg w-full cursor-not-allowed"
                                                        disabled
                                                    >
                                                        Already Paid
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="bg-sky-700 text-white py-2 px-4 rounded-lg w-full"
                                                        onClick={() =>
                                                            handlePayment(
                                                                bill.subscription_id,
                                                                bill.start_date,
                                                                bill.total_charge
                                                            )
                                                        }
                                                        disabled={isPaying}
                                                    >
                                                        {isPaying ? "Processing..." : "Pay Now"}
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <div>
                                    {/* Buttons for Past Unpaid Bills */}
                                    {unpaidBills.length > 0 && (
                                        <div className="mt-6">
                                            <h3 className="text-lg font-semibold text-gray-800">Pay Past Bill</h3>
                                            {unpaidBills.map((bill, index) => (
                                                <div key={index} className="mb-4">
                                                    <button
                                                        className="bg-sky-700 text-white py-2 px-4 rounded-lg w-full"
                                                        onClick={() =>
                                                            handlePayment(
                                                                bill.subscription_id,
                                                                bill.start_date,
                                                                bill.total_charge
                                                            )
                                                        }
                                                        disabled={isPaying}
                                                    >
                                                        {isPaying ? "Processing..." : `Pay Now`}
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Prepaid Balance Card */}
                                <div className="py-6 lg:col-span-4">
                                    <div className="bg-white rounded-lg shadow-md p-6">
                                        <h2 className="text-lg font-semibold text-sky-700">Prepaid Balance</h2>
                                        <div className="flex justify-between mb-2 text-gray-900 mt-4">
                                            <span>Prepaid Balance</span>
                                            <span>
                                            $
                                            {billingData
                                                .reduce(
                                                    (sum, bill) => sum + (parseFloat(bill.prepaid_balance) || 0), // Parse string to number
                                                    0 // Initial value for reduce
                                                )
                                                .toFixed(2)} {/* Ensure 2 decimal places */}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        


                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
