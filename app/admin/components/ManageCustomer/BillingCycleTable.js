"use client";
import { useEffect, useState, useRef } from "react";
import { DataTable } from "simple-datatables";

export default function BillingCycleTable({ refreshTrigger }) {
    const [billingCycles, setBillingCycles] = useState([]);
    const dataTableRef = useRef(null); // Reference to the DataTable instance

    // Fetch billing cycle data
    useEffect(() => {
        async function fetchBillingCycles() {
            try {
                const response = await fetch(`/api/fetchBillingCycles?timestamp=${Date.now()}`);
                const result = await response.json();

                if (result.success) {
                    setBillingCycles(result.data);
                } else {
                    console.error("Failed to fetch billing cycles:", result.error);
                }
            } catch (error) {
                console.error("Error fetching billing cycles:", error);
            }
        }

        fetchBillingCycles();
    }, [refreshTrigger]);

    // Reinitialize DataTable when data changes
    useEffect(() => {
        const table = document.getElementById("billingCycleTable");

        // Destroy the existing DataTable instance if it exists
        if (dataTableRef.current) {
            dataTableRef.current.destroy();
            dataTableRef.current = null;
        }

        // Clear and repopulate table body
        const tbody = table.querySelector("tbody");
        tbody.innerHTML = ""; // Clear old data

        billingCycles.forEach((cycle) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td class="px-4 py-2 text-sm text-gray-700">${cycle.subscription_id}</td>
                <td class="px-4 py-2 text-sm text-gray-700">${new Date(cycle.billing_date).toLocaleDateString()}</td>
                <td class="px-4 py-2 text-sm text-gray-700">${new Date(cycle.start_date).toLocaleDateString()}</td>
                <td class="px-4 py-2 text-sm text-gray-700">${new Date(cycle.end_date).toLocaleDateString()}</td>
                <td class="px-4 py-2 text-sm text-gray-700">$${cycle.subscription_charge}</td>
                <td class="px-4 py-2 text-sm text-gray-700">$${cycle.call_charge}</td>
                <td class="px-4 py-2 text-sm text-gray-700">$${cycle.sms_charge}</td>
                <td class="px-4 py-2 text-sm text-gray-700">$${cycle.data_charge}</td>
                <td class="px-4 py-2 text-sm text-gray-700">$${cycle.tax}</td>
                <td class="px-4 py-2 text-sm text-gray-700">$${cycle.total_charge}</td>
                <td class="px-4 py-2 text-sm font-medium ${
                    cycle.status === "paid"
                        ? "text-green-500"
                        : cycle.status === "unpaid"
                        ? "text-yellow-500"
                        : "text-red-500"
                }">${cycle.status}</td>
            `;
            tbody.appendChild(row);
        });

        // Reinitialize DataTable
        if (billingCycles.length > 0) {
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
    }, [billingCycles]);

    return (
        <div className="max-w-6xl mx-auto mt-6">
            <h2 className="text-xl text-gray-700 font-bold mb-4">Billing Cycles</h2>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table id="billingCycleTable" className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Subscription ID</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Billing Date</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Start Date</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">End Date</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Subscription Charge</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Call Charge</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">SMS Charge</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Data Charge</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Tax</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Total Charge</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th>
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
