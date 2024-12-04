"use client";
import { useEffect, useState, useRef } from "react";
import { DataTable } from "simple-datatables";

export default function PhoneNumberListTable({ refreshTrigger }) {
    const [phoneNumbers, setPhoneNumbers] = useState([]);
    const dataTableRef = useRef(null); // Reference to the DataTable instance

    // Fetch phone number data
    useEffect(() => {
        async function fetchPhoneNumbers() {
            try {
                const response = await fetch("/api/fetchPhoneNumbers");
                const result = await response.json();

                if (result.success) {
                    setPhoneNumbers(result.data);
                } else {
                    console.error("Failed to fetch phone numbers:", result.error);
                }
            } catch (error) {
                console.error("Error fetching phone numbers:", error);
            }
        }

        fetchPhoneNumbers();
    }, [refreshTrigger]);

    // Initialize or reinitialize DataTable when data changes
    useEffect(() => {
        const table = document.getElementById("phoneNumberTable");

        // Destroy any existing DataTable instance
        if (dataTableRef.current) {
            dataTableRef.current.destroy();
            dataTableRef.current = null;
        }

        // Clear and repopulate table body dynamically
        const tbody = table.querySelector("tbody");
        tbody.innerHTML = ""; // Clear old data

        phoneNumbers.forEach((number) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="px-4 py-2 text-sm text-gray-700">${number.phone_number}</td>
                <td class="px-4 py-2 text-sm text-gray-700">${number.customer_id}</td>
                <td class="px-4 py-2 text-sm text-gray-700">${number.is_primary ? "Yes" : "No"}</td>
                <td class="px-4 py-2 text-sm text-gray-700">${new Date(number.added_date).toLocaleDateString()}</td>
            `;
            tbody.appendChild(row);
        });

        // Reinitialize DataTable
        if (phoneNumbers.length > 0) {
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
    }, [phoneNumbers]);

    return (
        <div className="max-w-6xl mx-auto mt-6">
            <h2 className="text-xl text-gray-700 font-bold mb-4">Phone Number List</h2>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table id="phoneNumberTable" className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Phone Number</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Customer ID</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Is Primary</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Added Date</th>
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
