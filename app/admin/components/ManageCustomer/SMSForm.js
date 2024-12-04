"use client";
import { useState, useEffect } from "react";

export default function SimulateSMSForm({onTextSuccess}) {
    const [customers, setCustomers] = useState([]);
    const [countryCodes, setCountryCodes] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [toNumber, setToNumber] = useState("");
    const [countryCode, setCountryCode] = useState("+1"); // Default to US/Canada code
    const [messageText, setMessageText] = useState("");
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch active customers with their phone numbers
    useEffect(() => {
        async function fetchCustomers() {
            try {
                const response = await fetch("/api/fetchAllCustomerWithPhone");
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

    // Fetch country codes
    useEffect(() => {
        async function fetchCountryCodes() {
            try {
                const response = await fetch("/api/fetchCountryCode");
                const result = await response.json();

                if (result.success) {
                    // Add US as default option
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

    const sendSMS = async () => {
        if (!selectedCustomer || !toNumber || !messageText) {
            setMessage({ type: "error", text: "Please fill out all fields before sending the SMS." });
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            const response = await fetch("/api/makeSMS", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    customer_id: selectedCustomer.customer_id,
                    phone_number: selectedCustomer.phone_number,
                    to_number: toNumber,
                    message_text: messageText,
                    country_code: countryCode === "+1" ? null : countryCode, // Set country code logic
                }),
            });

            const result = await response.json();

            if (result.success) {
                setMessage({ type: "success", text: "SMS sent successfully!" });
                setToNumber("");
                setMessageText("");
                setSelectedCustomer(null); // Reset the customer selection
                setCountryCode("+1"); // Reset country code to default
                onTextSuccess();
            } else {
                setMessage({ type: "error", text: result.error });
            }
        } catch (error) {
            console.error("Error sending SMS:", error);
            setMessage({ type: "error", text: "An unexpected error occurred." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg w-full shadow-2xl  bg-white rounded-lg dark:bg-gray-800 p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Simulate Sending an SMS
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
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
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
                        htmlFor="message_text"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Message Text
                    </label>
                    <textarea
                        id="message_text"
                        name="message_text"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        className="mt-1 text-gray-900 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        placeholder="Enter your message"
                        rows={4}
                        required
                    />
                </div>
                <button
                    type="button"
                    onClick={sendSMS}
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    disabled={loading}
                >
                    {loading ? "Sending..." : "Send SMS"}
                </button>
            </form>
        </div>
    );
}
