"use client";
import { useEffect, useState, useRef } from "react";
import { DataTable } from "simple-datatables";

export default function SMSLogTable({ refreshTrigger }) {
    const [smsLogs, setSmsLogs] = useState([]);
    const dataTableRef = useRef(null); // Reference to the DataTable instance

    useEffect(() => {
        async function fetchSmsLogs() {
            try {
                const response = await fetch("/api/fetchSMSLog");
                const result = await response.json();

                if (result.success) {
                    setSmsLogs(result.data);
                } else {
                    console.error("Failed to fetch SMS logs:", result.error);
                }
            } catch (error) {
                console.error("Error fetching SMS logs:", error);
            }
        }

        fetchSmsLogs();
    }, [refreshTrigger]);

    useEffect(() => {
        const table = document.getElementById("smsLogTable");

        // Destroy any existing DataTable instance
        if (dataTableRef.current) {
            dataTableRef.current.destroy();
            dataTableRef.current = null;
        }

        // Clear and repopulate table body dynamically
        const tbody = table.querySelector("tbody");
        tbody.innerHTML = ""; // Clear old data

        smsLogs.forEach((log) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="px-4 py-2 text-sm text-gray-700">${log.phone_number}</td>
                <td class="px-4 py-2 text-sm text-gray-700">${log.to_number}</td>
                <td class="px-4 py-2 text-sm text-gray-700">${new Date(log.time).toLocaleString()}</td>
                <td class="px-4 py-2 text-sm text-gray-700">${log.char_count}</td>
                <td class="px-4 py-2 text-sm text-gray-700">${log.country_code || "Domestic"}</td>
                <td class="px-4 py-2 text-sm text-gray-700">$${log.roaming_cost}</td>
                <td class="px-4 py-2 text-sm text-gray-700">$${log.total_cost}</td>
            `;
            tbody.appendChild(row);
        });

        // Reinitialize DataTable
        if (smsLogs.length > 0) {
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
    }, [smsLogs]);

    return (
        <div className="max-w-4xl mx-auto mt-6">
            <h2 className="text-xl text-gray-700 font-bold mb-4">SMS Logs</h2>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table id="smsLogTable" className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Phone Number</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">To Number</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Time</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Char Count</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Country Code</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Roaming Cost</th>
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
