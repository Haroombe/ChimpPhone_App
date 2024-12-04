"use client";

import { use, useState, useEffect } from "react";


export default function CallHistoryPage({ params }) {
    const unwrappedParams = use(params); 
    const { customerid } = unwrappedParams; // Get the customer ID from dynamic routing
    const [callHistory, setCallHistory] = useState([]);
    const [tranHistory, setTranHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCallHistory = async () => {
            try {
                const response = await fetch(`/api/fetchCallHistory?customerid=${customerid}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch call history");
                }
                const data = await response.json();
                if (data.success) {
                    setCallHistory(data.data);
                } else {
                    setError(data.error);
                }
                setLoading(false);
            } catch (err) {
                console.error("Error fetching call history:", err.message);
                setError("Failed to fetch call history.");
                setLoading(false);
            }
        };
        
        const fetchTransaction = async () => {
            try {
                const response = await fetch(`/api/fetchTransaction?customerid=${customerid}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch transaction");
                }
                const data = await response.json();
                if (data.success) {
                    setTranHistory(data.data);
                } else {
                    setError(data.error);
                }
                setLoading(false);
            } catch (err) {
                console.error("Error feching transaction history:", err.message);
                setError("Failed to fetch transaction history.");
                setLoading(false);
            }
        };

        fetchCallHistory();
        fetchTransaction();
    }, [customerid]);

    if (loading) {
        return <div className="spinner text-center mt-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-600 mt-4">{error}</div>;
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Header and Navigation */}
            <div x-data="{ open: false }" className="relative overflow-hidden bg-sky-700 pb-32">
                <nav
                    className="bg-transparent relative z-10 border-b border-teal-500 border-opacity-25 lg:border-none lg:bg-transparent"
                >
                    <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between lg:border-b lg:border-sky-800">
                            <div className="flex items-center px-2 lg:px-0">
                                <div className="flex-shrink-0">
                                    {/*}
                                    <Image className="block h-8 w-auto" src="#" alt="Logo" />
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
                                            className="hover:bg-sky-800 rounded-md py-2 px-3 text-sm font-medium text-white"
                                        >
                                            Billing
                                        </a>
                                        <a
                                            href={`/user/${customerid}/callHistory`}
                                            className="bg-black bg-opacity-25 rounded-md py-2 px-3 text-sm font-medium text-white hover:bg-sky-800"
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
                        <h1 className="text-3xl font-bold tracking-tight text-white">Call History</h1>
                    </div>
                </header>
            </div>

            {/* Main Content */}
            <main className="relative -mt-32">
                <div className="mx-auto max-w-screen-xl px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16">
                    <div className="overflow-hidden rounded-lg bg-white shadow">
                        <div className="divide-y divide-gray-200">
                            {callHistory.length > 0 ? (
                                callHistory.map((group) => (
                                    <div key={group.call_date} className="p-5 bg-gray-50">
                                        {/* Group Header */}
                                        <h2 className="text-lg font-semibold text-sky-700">
                                            {new Date(group.call_date).toLocaleDateString()}
                                        </h2>
                                        {/* Calls in Group */}
                                        <ul className="divide-y divide-gray-200 mt-3">
                                            {group.calls.map((log, index) => (
                                                <li
                                                    key={index}
                                                    className="py-3 flex justify-between items-center"
                                                >
                                                    <div>
                                                        <p className="text-gray-600">
                                                            <span className="font-medium text-gray-900">
                                                                From: {log.from_phone_number}
                                                            </span>{" "}
                                                            to{" "}
                                                            <span className="font-medium text-gray-900">
                                                                {log.to_number}
                                                            </span>
                                                        </p>
                                                        <p className="text-sm text-gray-500 mt-1">
                                                            Duration: {log.duration} min | Cost: $
                                                            {Number(log.total_cost || 0).toFixed(2)}
                                                        </p>
                                                        <p className="text-xs text-gray-400">
                                                            {new Date(log.start_time).toLocaleTimeString()} -{" "}
                                                            {new Date(log.end_time).toLocaleTimeString()}
                                                        </p>
                                                    </div>
                                                    <span className="text-sm font-semibold text-sky-700">
                                                        {log.call_type}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-600">No call history available.</p>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}