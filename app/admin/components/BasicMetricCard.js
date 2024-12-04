"use client";
import { useEffect, useState } from "react";

export default function DashboardMetricsCard() {
    const [metrics, setMetrics] = useState({
        total_customers: 0,
        total_data_used: 0,
        total_overdue_bills: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMetrics() {
            try {
                const response = await fetch("/api/fetchBasicMetric");
                const result = await response.json();

                if (result.success) {
                    setMetrics(result.data);
                }
            } catch (error) {
                console.error("Error fetching metrics:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchMetrics();
    }, []);

    return (
        <div className="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
            <div className="mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                    Metrics
                </h5>
            </div>

            {loading ? (
                <p className="text-gray-500">Loading...</p>
            ) : (
                <ul className="space-y-4">
                    <li className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Total Active Customers:
                        </span>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                            {metrics.total_customers}
                        </span>
                    </li>
                    <li className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Total Data Used:
                        </span>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                            {metrics.total_data_used.toFixed(2)} GB
                        </span>
                    </li>
                    <li className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Number Overdue Bills:
                        </span>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                            {metrics.overdue_bills_count}
                        </span>
                    </li>
                </ul>
            )}
        </div>
    );
}
