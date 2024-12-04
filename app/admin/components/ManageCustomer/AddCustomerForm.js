"use client";
import { useState, useEffect } from "react";

export default function AddCustomerForm({ onAddSuccess }) {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone_plan_id: "",
        start_date: "",
    });
    const [phonePlans, setPhonePlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);

    // Fetch phone plans on mount
    useEffect(() => {
        async function fetchPhonePlans() {
            try {
                const response = await fetch("/api/fetch_change_plan");
    
                // Ensure response is OK
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
    
                const result = await response.json();
                console.log("API Response:", result); // Debug the response
    
                // Check if result is valid
                if (result && Array.isArray(result) && result.length > 0) {
                    setPhonePlans(result); // Set the plans if valid
                } else {
                    console.warn("API returned no plans or invalid data.");
                    setPhonePlans([]);
                }
            } catch (error) {
                console.error("Error fetching phone plans:", error);
                setPhonePlans([]); // Clear phonePlans on error
            } finally {
                setLoading(false);
            }
        }
    
        fetchPhonePlans();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);

        try {
            const response = await fetch("/api/addCustomer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (result.success) {
                setMessage("Customer added successfully!");
                setFormData({
                    first_name: "",
                    last_name: "",
                    email: "",
                    phone_plan_id: "",
                    start_date: "",
                });
                onAddSuccess();
            } else {
                setMessage(result.error || "Failed to add customer.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setMessage("An unexpected error occurred.");
        }
    };

    return (
        <div className="max-w-lg w-full bg-white rounded-lg shadow dark:bg-gray-800 p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Add New Customer
            </h2>
            {message && (
                <div
                    className={`p-2 mb-4 text-sm ${
                        message.includes("success")
                            ? "text-green-700 bg-green-100"
                            : "text-red-700 bg-red-100"
                    } rounded`}
                >
                    {message}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label
                        htmlFor="first_name"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        First Name
                    </label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="mt-1 text-gray-700 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="last_name"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="mt-1 text-gray-700 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 text-gray-700 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="phone_plan_id"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Phone Plan
                    </label>
                    <select
                        id="phone_plan_id"
                        name="phone_plan_id"
                        value={formData.phone_plan_id}
                        onChange={handleChange}
                        className="mt-1 text-gray-700  block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        required
                    >
                        <option value="">Select a Plan</option>
                        {phonePlans.length > 0 ? (
                            phonePlans.map(plan => (
                                <option key={plan.plan_id} value={plan.plan_id}>
                                    {plan.plan_name}
                                </option>
                            ))
                        ) : (
                            <option disabled>No plans available</option>
                        )}
                    </select>
                </div>
                <div>
                    <label
                        htmlFor="start_date"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Subscription Start Date
                    </label>
                    <input
                        type="date"
                        id="start_date"
                        name="start_date"
                        value={formData.start_date}
                        onChange={handleChange}
                        className="mt-1 text-gray-700 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                    Add Customer
                </button>
            </form>
        </div>
    );
}
