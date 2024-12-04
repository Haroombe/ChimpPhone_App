"use client";
import { useState, useEffect } from "react";

export default function PaymentForm({ onPaymentSuccess }) {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch customers with unpaid/overdue bills
    useEffect(() => {
        async function fetchCustomers() {
            try {
                const response = await fetch("/api/fetchAllPayableBill");
                const result = await response.json();

                if (result.success) {
                    setCustomers(result.data);
                } else {
                    console.error("Failed to fetch customers:", result.error);
                }
            } catch (error) {
                console.error("Error fetching customers:", error);
            }
        }

        fetchCustomers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);

        if (!selectedCustomer) {
            setMessage({ type: "error", text: "Please select a customer." });
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("/api/makePayment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    customer_id: selectedCustomer.customer_id,
                    subscription_id: selectedCustomer.subscription_id,
                    start_date: selectedCustomer.start_date,
                    company_bank_account_id: 1,
                }),
            });

            const result = await response.json();

            if (result.success) {
                setMessage({ type: "success", text: result.message });
                setSelectedCustomer(null);
                // Trigger refresh in the parent component
                onPaymentSuccess();
            } else {
                setMessage({ type: "error", text: result.error });
            }
        } catch (error) {
            console.error("Error submitting payment:", error);
            setMessage({ type: "error", text: "An unexpected error occurred." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow dark:bg-gray-800 p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Make a Payment
            </h2>
            {message && (
                <div
                    className={`p-2 mb-4 text-sm ${
                        message.type === "success"
                            ? "text-green-700 bg-green-100"
                            : "text-red-700 bg-red-100"
                    } rounded`}
                >
                    {message.text}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label
                        htmlFor="customer"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Select a Customer
                    </label>
                    <select
                        id="customer"
                        name="customer"
                        value={selectedCustomer ? selectedCustomer.customer_id : ""}
                        onChange={(e) => {
                            const customer = customers.find(
                                (c) => c.customer_id.toString() === e.target.value
                            );
                            setSelectedCustomer(customer || null);
                        }}
                        className="mt-1 text-gray-800 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        required
                    >
                        <option value="">Select a Customer</option>
                        {customers.map((customer) => (
                            <option
                                key={`${customer.customer_id}-${customer.subscription_id}-${customer.start_date}`}
                                value={customer.customer_id}
                            >
                                {`${customer.first_name} ${customer.last_name} (Subscription ID: ${customer.subscription_id}, Start Date: ${customer.start_date}, Status: ${customer.status})`}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    disabled={loading}
                >
                    {loading ? "Processing..." : "Submit Payment"}
                </button>
            </form>
        </div>
    );
}