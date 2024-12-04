"use client";
import { useState, useEffect } from "react";

export default function MakeCallFormComponent({onTextSuccess}) {
    const [customers, setCustomers] = useState([]);
    const [countryCodes, setCountryCodes] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [toNumber, setToNumber] = useState("");
    const [countryCode, setCountryCode] = useState("+1"); // Default to US/Canada code
    const [duration, setDuration] = useState(""); // Added duration state
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchCustomers() {
            try {
                const customer_phone_response = await fetch(`/api/fetch_phone_number?customerid=1`);
                const customer_phone_result = await customer_phone_response.json();
                const response = await fetch(`/api/fetchcustomer?customerid=1`);
                const result = await response.json();
                result.data[0].phone_number = customer_phone_result.data[0].phone_number;
                if (result.success) {
                    console.log(result.data)
                    setCustomers(result.data);
                    setSelectedCustomer(result.data[0]);
                } else {
                    console.error("Failed to fetch customers:", result.error);
                }
            } catch (error) {
                console.error("Error fetching customers:", error);
            }
        }

        fetchCustomers();
    }, []);

    // Fetch country codes
    useEffect(() => {
        async function fetchCountryCodes() {
            try {
                const response = await fetch("/api/fetchCountryCode");
                const result = await response.json();

                if (result.success) {
                    // Add United States manually to the list
                    const usOption = { country_code: "+1", country_name: "United States (Default)" };
                    setCountryCodes([usOption, ...result.data]);
                } else {
                    console.error("Failed to fetch country codes:", result.error);
                }
            } catch (error) {
                console.error("Error fetching country codes:", error);
            }
        }

        fetchCountryCodes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);

        if (!selectedCustomer || !toNumber || !duration) {
            setMessage({ type: "error", text: "Please select a customer, provide a valid phone number, and specify the duration." });
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("/api/makeCall", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    customer_id: selectedCustomer.customer_id,
                    phone_number: selectedCustomer.phone_number,
                    to_number: toNumber,
                    country_code: countryCode === "+1" ? null : countryCode, // Logic for US (NULL) vs Canada (1)
                    call_duration: parseInt(duration, 10), // Pass duration to the backend
                }),
            });

            const result = await response.json();

            if (result.success) {
                setMessage({ type: "success", text: result.message });
                setToNumber("");
                setCountryCode("+1"); // Reset to US/Canada code
                setDuration(""); // Reset duration
                onTextSuccess();
            } else {
                setMessage({ type: "error", text: result.error });
            }
        } catch (error) {
            console.error("Error submitting call:", error);
            setMessage({ type: "error", text: "An unexpected error occurred." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg w-full bg-white rounded-lg shadow dark:bg-gray-800 p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Add a Call
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
                        className="mt-1 text-gray-900 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        required
                    >
                        <option value="">Select a Customer</option>
                        {customers.map((customer) => (
                            <option key={customer.customer_id} value={customer.customer_id}>
                                {`${customer.first_name} ${customer.last_name}`}
                            </option>
                        ))}
                    </select>
                </div>
                {selectedCustomer && (
                    <div>
                        <label
                            htmlFor="phone_number"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            From Phone Number
                        </label>
                        <input
                            type="text"
                            id="phone_number"
                            name="phone_number"
                            value={selectedCustomer.phone_number}
                            readOnly
                            className="mt-1 text-gray-900 block w-full bg-gray-100 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        />
                    </div>
                )}
                <div>
                    <label
                        htmlFor="to_number"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        To Number
                    </label>
                    <input
                        type="text"
                        id="to_number"
                        name="to_number"
                        value={toNumber}
                        onChange={(e) => setToNumber(e.target.value)}
                        className="mt-1 text-gray-900 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        placeholder="Enter the destination number"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="country_code"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Country Code
                    </label>
                    <select
                        id="country_code"
                        name="country_code"
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="mt-1 text-gray-900 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        required
                    >
                        <option value="">Select a Country Code</option>
                        {countryCodes.map((code) => (
                            <option key={code.country_code} value={code.country_code}>
                                {`${code.country_name} (${code.country_code})`}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label
                        htmlFor="duration"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Call Duration (minutes)
                    </label>
                    <input
                        type="number"
                        id="duration"
                        name="duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="mt-1 text-gray-900 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        placeholder="Enter call duration in minutes"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    disabled={loading}
                >
                    {loading ? "Processing..." : "Submit Call"}
                </button>
            </form>
        </div>
    );
}
