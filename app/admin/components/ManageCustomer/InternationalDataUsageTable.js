"use client";
import { useEffect, useState, useRef } from "react";
import { DataTable } from "simple-datatables";

export default function InternationalDataUsageTable({refreshTrigger}) {
    const [dataUsage, setDataUsage] = useState([]);
    const dataTableRef = useRef(null); // Reference to the DataTable instance

    // Fetch international data usage logs
    useEffect(() => {
        async function fetchDataUsage() {
            try {
                const response = await fetch("/api/fetchInternationalDataUsage");
                const result = await response.json();

                if (result.success) {
                    setDataUsage(result.data);
                } else {
                    console.error("Failed to fetch international data usage:", result.error);
                }
            } catch (error) {
                console.error("Error fetching international data usage:", error);
            }
        }

        fetchDataUsage();
    }, [refreshTrigger]);

    // Initialize or reinitialize DataTable when data changes
    useEffect(() => {
        const table = document.getElementById("internationalDataUsageTable");

        // Destroy any existing DataTable instance
        if (dataTableRef.current) {
            dataTableRef.current.destroy();
            dataTableRef.current = null;
        }

        // Clear and repopulate table body dynamically
        const tbody = table.querySelector("tbody");
        tbody.innerHTML = ""; // Clear old data

        dataUsage.forEach((usage) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="px-4 py-2 text-sm text-gray-700">${usage.phone_number}</td>
                <td class="px-4 py-2 text-sm text-gray-700">${new Date(usage.month).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</td>
                <td class="px-4 py-2 text-sm text-gray-700">${usage.data_used} MB</td>
                <td class="px-4 py-2 text-sm text-gray-700">$${usage.cost}</td>
            `;
            tbody.appendChild(row);
        });

        // Reinitialize DataTable
        if (dataUsage.length > 0) {
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
    }, [dataUsage]);

    return (
        <div className="max-w-6xl mx-auto mt-6">
            <h2 className="text-xl text-gray-700 font-bold mb-4">International Data Usage</h2>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table
                    id="internationalDataUsageTable"
                    className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg"
                >
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Phone Number</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Month</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Data Used (MB)</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Cost</th>
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
