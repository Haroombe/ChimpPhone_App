"use client";
import { useEffect, useState, useRef } from "react";
import { DataTable } from "simple-datatables";

export default function CallLogTable({ refreshTrigger }) {
    const [callLogs, setCallLogs] = useState([]);
    const dataTableRef = useRef(null); // Reference to the DataTable instance

    useEffect(() => {
        async function fetchCallLogs() {
            try {
                const response = await fetch("/api/fetchCallLogs");
                const result = await response.json();

                if (result.success) {
                    setCallLogs(result.data);
                } else {
                    console.error("Failed to fetch call logs:", result.error);
                }
            } catch (error) {
                console.error("Error fetching call logs:", error);
            }
        }

        fetchCallLogs();
    }, [refreshTrigger]);

    useEffect(() => {
        const table = document.getElementById("callLogTable");

        // Destroy any existing DataTable instance
        if (dataTableRef.current) {
            dataTableRef.current.destroy();
            dataTableRef.current = null;
        }

        // Clear and repopulate table body dynamically
        const tbody = table.querySelector("tbody");
        tbody.innerHTML = ""; // Clear old data

        callLogs.forEach((log) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="px-4 py-2 text-sm text-gray-700">${log.call_id}</td>
                <td class="px-4 py-2 text-sm text-gray-700">${log.from_phone_number}</td>
                <td class="px-4 py-2 text-sm text-gray-700">${log.to_number}</td>
                <td class="px-4 py-2 text-sm text-gray-700">${new Date(log.start_time).toLocaleString()}</td>
                <td class="px-4 py-2 text-sm text-gray-700">${log.end_time ? new Date(log.end_time).toLocaleString() : "In Progress"}</td>
                <td class="px-4 py-2 text-sm text-gray-700">${log.duration?.toFixed(2) || "-"}</td>
                <td class="px-4 py-2 text-sm text-gray-700 capitalize">${log.call_type}</td>
                <td class="px-4 py-2 text-sm text-gray-700">$${log.total_cost}</td>
            `;
            tbody.appendChild(row);
        });

        // Reinitialize DataTable
        if (callLogs.length > 0) {
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
    }, [callLogs]);

    return (
        <div className="max-w-4xl mx-auto mt-6">
            <h2 className="text-xl text-gray-700 font-bold mb-4">Call Logs</h2>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table id="callLogTable" className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Call ID</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">From</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">To</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Start Time</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">End Time</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Duration (min)</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Type</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Total Cost</th>
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
