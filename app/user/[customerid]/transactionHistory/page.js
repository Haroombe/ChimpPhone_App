"use client";

import {use, useState, useEffect } from "react";

export default function TransactionHistoryPage({ params }) {
    const unwrappedParams = use(params);
    const { customerid } = unwrappedParams;
    const [tranHistory, setTranHistory] = useState([]);
    const [groupedTransactions, setGroupedTransactions] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const response = await fetch(`/api/fetchTransaction?customerid=${customerid}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch transaction history.");
                }
                const data = await response.json();
                if (data.success) {
                    const groupedData = groupTransactionsByDate(data.data);
                    setTranHistory(data.data);
                    setGroupedTransactions(groupedData);
                } else {
                    setError(data.error);
                }
                setLoading(false);
            } catch (err) {
                console.error("Error fetching transaction history:", err.message);
                setError("Failed to fetch transaction history.");
                setLoading(false);
            }
        };
        fetchTransaction();
    }, [customerid]);

    // Function to group transactions by date
    const groupTransactionsByDate = (transactions) => {
        return transactions.reduce((acc, transaction) => {
            const date = new Date(transaction.transaction_date).toLocaleDateString();
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(transaction);
            return acc;
        }, {});
    };

    if (loading) {
        return <div className="spinner text-center mt-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-600 mt-4">{error}</div>;
    }


    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Header and Navigation */}
            <div className="relative overflow-hidden bg-sky-700 pb-32">
                <nav className="relative z-10 border-b border-teal-500 border-opacity-25 lg:border-none">
                    <div className="mx-auto max-w-7xl px-4">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center">
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
                                    href={`/user/${customerid}/transactionHistory`}
                                    className="hover:bg-sky-800 rounded-md py-2 px-3 text-sm font-medium text-white"
                                >
                                    History
                                </a>
                                <a
                                    href={`/user/${customerid}/setting`}
                                    className="hover:bg-sky-800 rounded-md py-2 px-3 text-sm font-medium text-white"
                                >
                                    Settings
                                </a>
                                <a
                                    href={`/user/${customerid}/transactionHistory`}
                                    className="bg-black bg-opacity-25 rounded-md py-2 px-3 text-sm font-medium text-white"
                                >
                                    Transaction
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>
                <header className="relative py-10">
                    <div className="mx-auto max-w-7xl px-4">
                        <h1 className="text-3xl font-bold tracking-tight text-white">Transaction History</h1>
                    </div>
                </header>
            </div>

            {/* Main Content */}
            <main className="relative -mt-32">
                <div className="mx-auto max-w-screen-xl px-4 pb-6">
                    <div className="overflow-hidden rounded-lg bg-white shadow">
                        <div className="divide-y divide-gray-200">
                            {Object.keys(groupedTransactions).length > 0 ? (
                                Object.entries(groupedTransactions).map(([date, transactions]) => (
                                    <div key={date} className="p-5 bg-gray-50">
                                        {/* Group Header */}
                                        <h2 className="text-lg font-semibold text-sky-700">
                                            {date}
                                        </h2>
                                        {/* Transactions in Group */}
                                        <ul className="divide-y divide-gray-200 mt-3">
                                            {transactions.map((transaction) => (
                                                <li
                                                    key={transaction.transaction_id}
                                                    className="py-3 flex justify-between items-center"
                                                >
                                                    <div>
                                                        <p className="text-gray-600">
                                                            Transaction ID:{" "}
                                                            <span className="font-medium text-gray-900">
                                                                {transaction.transaction_id}
                                                            </span>
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            Amount: ${parseFloat(transaction.amount).toFixed(2)}{" | "}
                                                            {transaction.transaction_type}
                                                        </p>
                                                    </div>
                                                    <span className="text-sm font-semibold text-sky-700">
                                                        {new Date(transaction.transaction_date).toLocaleTimeString()}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-600">No transaction history available.</p>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}