"use client";
import { useEffect, useState, useRef } from "react";
import { DataTable } from "simple-datatables";

export default function SubscriptionsTable({refreshTrigger}) {
    const [subscriptions, setSubscriptions] = useState([]);
    const dataTableRef = useRef(null); // Reference to the DataTable instance

    // Fetch subscription data
    useEffect(() => {
        async function fetchSubscriptions() {
            try {
                const response = await fetch("/api/fetchSubscriptions");
                const result = await response.json();

                if (result.success) {
                    setSubscriptions(result.data);
                } else {
                    console.error("Failed to fetch subscriptions:", result.error);
                }
            } catch (error) {
                console.error("Error fetching subscriptions:", error);
            }
        }

        fetchSubscriptions();
    }, [refreshTrigger]);

    // Initialize or reinitialize DataTable when data changes
    useEffect(() => {
        const table = document.getElementById("subscriptionTable");

        // Destroy any existing DataTable instance
        if (dataTableRef.current) {
            dataTableRef.current.destroy();
            dataTableRef.current = null;
        }

        // Clear and repopulate table body dynamically
        const tbody = table.querySelector("tbody");
        tbody.innerHTML = ""; // Clear old data

        subscriptions.forEach((subscription) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="px-4 py-2 text-sm text-gray-700">${subscription.subscription_id}</td>
                <td class="px-4 py-2 text-sm text-gray-700">${subscription.customer_id}</td>
                <td class="px-4 py-2 text-sm text-gray-700">${subscription.plan_id}</td>
                <td class="px-4 py-2 text-sm text-gray-700">${new Date(subscription.start_date).toLocaleDateString()}</td>
                <td class="px-4 py-2 text-sm text-gray-700">${
                    subscription.end_date ? new Date(subscription.end_date).toLocaleDateString() : "Ongoing"
                }</td>
                <td class="px-4 py-2 text-sm text-gray-700">${subscription.active ? "Yes" : "No"}</td>
                <td class="px-4 py-2 text-sm text-gray-700">${
                    subscription.prepaid_balance ? `$${subscription.prepaid_balance}` : "-"
                }</td>
            `;
            tbody.appendChild(row);
        });

        // Reinitialize DataTable
        if (subscriptions.length > 0) {
            dataTableRef.current = new DataTable(table, {
                searchable: true,
                fixedHeight: true,
                perPage: 5,
            });
        }

        // Cleanup on unmount
        return () => {
            if (dataTableRef.current) {
                dataTableRef.current.destroy();
            }
        };
    }, [subscriptions]);

    return (
        <div className="max-w-6xl mx-auto mt-6">
            <h2 className="text-xl text-gray-700 font-bold mb-4">Subscriptions</h2>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table id="subscriptionTable" className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Subscription ID</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Customer ID</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Plan ID</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Start Date</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">End Date</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Active</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Prepaid Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Table rows are dynamically populated */}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
