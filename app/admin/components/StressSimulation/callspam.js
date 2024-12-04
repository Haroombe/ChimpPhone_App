"use client";
import { useState, useEffect } from "react";

export default function StressTestCallCard({OnTestSuccess}) {
    const [customers, setCustomers] = useState([]);
    const [countryCodes, setCountryCodes] = useState([]);
    const [numCalls, setNumCalls] = useState(10); // Default number of calls
    const [inProgress, setInProgress] = useState(false);
    const [results, setResults] = useState([]);
    const [activeCalls, setActiveCalls] = useState([]);
    const [progress, setProgress] = useState(0);

    // Fetch customers and country codes
    useEffect(() => {
        async function fetchData() {
            try {
                const [customerRes, countryCodeRes] = await Promise.all([
                    fetch("/api/fetchAllCustomerWithPhone"),
                    fetch("/api/fetchCountryCode"),
                ]);

                const customerResult = await customerRes.json();
                const countryCodeResult = await countryCodeRes.json();

                if (customerResult.success) {
                    setCustomers(customerResult.data);
                } else {
                    console.error("Failed to fetch customers:", customerResult.error);
                }

                if (countryCodeResult.success) {
                    const usOption = { country_code: "+1", country_name: "United States (Default)" };
                    setCountryCodes([usOption, ...countryCodeResult.data]);
                } else {
                    console.error("Failed to fetch country codes:", countryCodeResult.error);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, []);

    // Helper to select a random country code
    const getRandomCountryCode = () => {
        if (countryCodes.length === 0) return "+1"; // Default to US if no codes available
        const randomIndex = Math.floor(Math.random() * countryCodes.length);
        return countryCodes[randomIndex].country_code;
    };

    // Helper to generate a random phone number
    const generateRandomNumber = (countryCode) =>
        `${countryCode}${Math.floor(1000000000 + Math.random() * 9000000000)}`;

    // Handle stress test
    const handleStressTest = async () => {
        if (inProgress || activeCalls.length > 0) return;

        if (!customers.length) {
            alert("No customers available for the test.");
            return;
        }

        setInProgress(true);
        setResults([]);
        setProgress(0);

        const selectedCustomers = customers.slice(0, numCalls); // Select first customers
        const ongoingCalls = [];
        const usedNumbers = new Set(); // Track used numbers to introduce duplicates

        for (let i = 0; i < selectedCustomers.length; i++) {
            const customer = selectedCustomers[i];
            const randomCountryCode = getRandomCountryCode();

            // Introduce a duplicate number randomly
            let toNumber = generateRandomNumber(randomCountryCode);
            if (Math.random() < 0.3 && usedNumbers.size > 0) {
                // 30% chance to reuse an existing number
                toNumber = Array.from(usedNumbers)[
                    Math.floor(Math.random() * usedNumbers.size)
                ];
            } else {
                usedNumbers.add(toNumber);
            }

            try {
                const response = await fetch("/api/simulation/startCall", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        customer_id: customer.customer_id,
                        phone_number: customer.phone_number,
                        to_number: toNumber,
                        country_code: randomCountryCode,
                    }),
                });

                const result = await response.json();

                if (result.success) {
                    ongoingCalls.push({
                        customer,
                        toNumber,
                        callId: result.data.callId,
                        status: "In Progress",
                        startTime: Date.now(),
                    });
                    setResults((prevResults) => [
                        ...prevResults,
                        {
                            customer,
                            toNumber,
                            status: "Call Started Successfully",
                        },
                    ]);
                    OnTestSuccess();

                } else if (result.error === "The destination number is currently busy.") {
                    setResults((prevResults) => [
                        ...prevResults,
                        {
                            customer,
                            toNumber,
                            status: "Call Rejected: Number Busy. Retrying with new number...",
                        },
                    ]);
                    // Retry with a new number
                    const newToNumber = generateRandomNumber(randomCountryCode);
                    usedNumbers.add(newToNumber);
                    await retryCall(customer, newToNumber, randomCountryCode);
                } else {
                    setResults((prevResults) => [
                        ...prevResults,
                        { customer, toNumber, status: `Failed: ${result.error}` },
                    ]);
                }
            } catch (error) {
                setResults((prevResults) => [
                    ...prevResults,
                    { customer, toNumber, status: `Error: ${error.message}` },
                ]);
            }

            setProgress(((i + 1) / selectedCustomers.length) * 100); // Update progress
        }

        setActiveCalls(ongoingCalls);
        setInProgress(false);
    };

    // Retry call with a new number
    const retryCall = async (customer, toNumber, countryCode) => {
        try {
            const response = await fetch("/api/simulation/startCall", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    customer_id: customer.customer_id,
                    phone_number: customer.phone_number,
                    to_number: toNumber,
                    country_code: countryCode,
                }),
            });

            const result = await response.json();

            if (result.success) {
                setActiveCalls((prevCalls) => [
                    ...prevCalls,
                    {
                        customer,
                        toNumber,
                        callId: result.data.callId,
                        status: "In Progress",
                        startTime: Date.now(),
                    },
                ]);
                setResults((prevResults) => [
                    ...prevResults,
                    {
                        customer,
                        toNumber,
                        status: "Call Started Successfully after retry",
                    },
                ]);
                OnTestSuccess();
            } else {
                setResults((prevResults) => [
                    ...prevResults,
                    { customer, toNumber, status: `Retry Failed: ${result.error}` },
                ]);
            }
        } catch (error) {
            setResults((prevResults) => [
                ...prevResults,
                { customer, toNumber, status: `Retry Error: ${error.message}` },
            ]);
        }
    };
        // Handle end call
    const handleEndCall = async (callId, index) => {
        const call = activeCalls[index];
        const duration = Math.ceil((Date.now() - call.startTime) / 60000); // Duration in minutes

        try {
            const response = await fetch("/api/simulation/endCall", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ call_id: callId, duration }),
            });

            const result = await response.json();

            if (result.success) {
                setResults((prevResults) => [
                    ...prevResults,
                    { customer: call.customer, toNumber: call.toNumber, status: "Call Ended Successfully" },
                ]);
                OnTestSuccess();
            } else {
                setResults((prevResults) => [
                    ...prevResults,
                    { customer: call.customer, toNumber: call.toNumber, status: `End Failed: ${result.error}` },
                ]);
            }
        } catch (error) {
            setResults((prevResults) => [
                ...prevResults,
                { customer: call.customer, toNumber: call.toNumber, status: `Error Ending Call: ${error.message}` },
            ]);
        } finally {
            setActiveCalls((prevCalls) => prevCalls.filter((_, callIndex) => callIndex !== index));
        }
    };

    // Handle end all calls
    const handleEndAllCalls = async () => {
        const callsToEnd = [...activeCalls]; // Clone to avoid mutation during iteration
        for (let i = 0; i < callsToEnd.length; i++) {
            await handleEndCall(callsToEnd[i].callId, 0); // Always pass index 0 since the array is filtered
        }
        setActiveCalls([]); // Clear all active calls
    };
    return (
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Stress Test Calls</h2>
            <div className="mb-4">
                <label className="block text-gray-800 text-sm font-medium text-gray-700">Number of Calls</label>
                <input
                    type="number"
                    min="1"
                    max="100"
                    value={numCalls}
                    onChange={(e) => setNumCalls(Number(e.target.value))}
                    className="mt-2 text-gray-800 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            {activeCalls.length === 0 && (
                <button
                    onClick={handleStressTest}
                    className="w-full py-2 px-4 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                >
                    Start Stress Test
                </button>
            )}
            {activeCalls.length > 0 && (
                <button
                    onClick={handleEndAllCalls}
                    className="w-full mt-4 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                    End All Calls
                </button>
            )}
            {inProgress && (
                <div className="mt-4">
                    <p className="text-sm text-gray-600">Progress: {Math.round(progress)}%</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            )}
            <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-700">Active Calls:</h3>
                <div className="overflow-y-auto max-h-60 border-t border-gray-200 mt-2">
                    {activeCalls.length === 0 ? (
                        <p className="text-sm text-gray-500">No active calls.</p>
                    ) : (
                        activeCalls.map((call, index) => (
                            <div key={index} className="py-2 px-3 flex items-center justify-between">
                                <div className="text-gray-800 text-sm">
                                    {call.customer.first_name} {call.customer.last_name} is calling{" "}
                                    {call.toNumber}: {call.status}
                                </div>
                                <button
                                    onClick={() => handleEndCall(call.callId, index)}
                                    className="py-1 px-3 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
                                >
                                    End Call
                                </button>
                            </div>
                        ))
                    )}
                </div>
                </div>
            <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-700">Results:</h3>
                <div className="overflow-y-auto max-h-60 border-t border-gray-200 mt-2">
                    {results.length === 0 ? (
                        <p className="text-sm text-gray-500">No results yet.</p>
                    ) : (
                        results.map((result, index) => (
                            <div
                                key={index}
                                className={`py-2 px-3 text-sm ${
                                    result.status.includes("Successfully")
                                        ? "text-green-600"
                                        : result.status.includes("Retry")
                                        ? "text-orange-600"
                                        : "text-red-600"
                                }`}
                            >
                                {result.customer.first_name} {result.customer.last_name} is calling{" "}
                                {result.toNumber}: {result.status}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
