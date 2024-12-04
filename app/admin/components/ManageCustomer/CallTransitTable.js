"use client";
import { useEffect, useState, useRef } from "react";
import { DataTable } from "simple-datatables";

export default function CallTransitTable({ refreshTrigger }) {
    const [callTransits, setCallTransits] = useState([]);
    const dataTableRef = useRef(null); // Reference to the DataTable instance

    // Fetch call transit data
    useEffect(() => {
        async function fetchCallTransits() {
            try {
                const response = await fetch("/api/fetchCallTransits");
                const result = await response.json();

                if (result.success) {
                    setCallTransits(result.data);
                } else {
                    console.error("Failed to fetch call transits:", result.error);
                }
            } catch (error) {
                console.error("Error fetching call transits:", error);
            }
        }

        fetchCallTransits();
    }, [refreshTrigger]);

    // Initialize or reinitialize DataTable when data changes
    useEffect(() => {
        const table = document.getElementById("callTransitTable");

        // Destroy any existing DataTable instance
        if (dataTableRef.current) {
            dataTableRef.current.destroy();
            dataTableRef.current = null;
        }

        // Clear and repopulate table body dynamically
        const tbody = table.querySelector("tbody");
        tbody.innerHTML = ""; // Clear old data

        callTransits.forEach((transit) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="px-4 py-2 text-sm text-gray-700">${transit.transit_id}</td>
                <td class="px-4 py-2 text-sm text-gray-700">${transit.call_id}</td>
                <td class="px-4 py-2 text-sm text-gray-700">${transit.from_area}</td>
                <td class="px-4 py-2 text-sm text-gray-700">${transit.to_area}</td>
                <td class="px-4 py-2 text-sm text-gray-700">${new Date(transit.transit_time).toLocaleString()}</td>
            `;
            tbody.appendChild(row);
        });

        // Reinitialize DataTable
        if (callTransits.length > 0) {
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
    }, [callTransits]);

    return (
        <div className="max-w-6xl mx-auto mt-6">
            <h2 className="text-xl text-gray-700 font-bold mb-4">Call Transit Logs</h2>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table id="callTransitTable" className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Transit ID</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Call ID</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">From Area</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">To Area</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Transit Time</th>
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
