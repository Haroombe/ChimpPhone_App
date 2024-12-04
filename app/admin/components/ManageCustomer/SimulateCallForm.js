"use client";
import { useState, useEffect } from "react";

export default function MakeCallForm({onCallSuccess}) {
    const [customers, setCustomers] = useState([]);
    const [countryCodes, setCountryCodes] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [toNumber, setToNumber] = useState("");
    const [countryCode, setCountryCode] = useState("1"); // Default to US/Canada code
    const [callId, setCallId] = useState(null); // Store the callId returned from the backend
    const [startTime, setStartTime] = useState(null); // Store the call start time
    const [duration, setDuration] = useState(0); // Call duration in seconds
    const [timerInterval, setTimerInterval] = useState(null); // Timer interval reference
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

    const startCall = async () => {
        if (!selectedCustomer || !toNumber) {
            setMessage({ type: "error", text: "Please select a customer and provide a valid phone number." });
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            const response = await fetch("/api/simulation/startCall", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    customer_id: selectedCustomer.customer_id,
                    phone_number: selectedCustomer.phone_number,
                    to_number: toNumber,
                    country_code: countryCode === "+1" ? null : countryCode,
                }),
            });

            const result = await response.json();

            if (result.success) {
                setMessage({ type: "success", text: "Call started successfully." });
                setCallId(result.data.callId); // Store callId for ending the call
                const now = Date.now();
                setStartTime(now); // Store the start time
                const interval = setInterval(() => {
                    setDuration((prev) => prev + 1); // Increment duration every second
                }, 1000);
                setTimerInterval(interval); // Save the interval reference
                onCallSuccess();
            } else {
                setMessage({ type: "error", text: result.error });
            }
        } catch (error) {
            console.error("Error starting call:", error);
            setMessage({ type: "error", text: "An unexpected error occurred." });
        } finally {
            setLoading(false);
        }
    };

    const endCall = async () => {
        if (!callId) {
            setMessage({ type: "error", text: "No active call to end." });
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            const response = await fetch("/api/simulation/endCall", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    call_id: callId,
                    duration: Math.ceil(duration / 60), // Send duration in minutes to backend
                }),
            });

            const result = await response.json();

            if (result.success) {
                setMessage({ type: "success", text: "Call ended successfully." });
                setCallId(null); // Reset callId after ending the call
                setToNumber("");
                setCountryCode("+1");
                setDuration(0); // Reset duration
                setStartTime(null); // Clear start time
                if (timerInterval) {
                    clearInterval(timerInterval); // Stop the timer
                    setTimerInterval(null);
                }
                onCallSuccess();
            } else {
                setMessage({ type: "error", text: result.error });
            }
        } catch (error) {
            console.error("Error ending call:", error);
            setMessage({ type: "error", text: "An unexpected error occurred." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg w-full bg-white rounded-lg shadow dark:bg-gray-800 p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Simulate a Call
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
            {!callId ? (
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
                    <button
                        type="button"
                        onClick={startCall}
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Start Call"}
                    </button>
                </form>
            ) : (
                <div className="text-center">
                    <div className="text-sm text-gray-700 mb-2">
                        Call Duration: {Math.floor(duration / 60)}m {duration % 60}s
                    </div>
                    <button
                        type="button"
                        onClick={endCall}
                        className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none"
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "End Call"}
                    </button>
                </div>
            )}
        </div>
    );
}
