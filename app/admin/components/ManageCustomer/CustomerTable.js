"use client";
import { useEffect, useState, useRef } from "react";
import { DataTable } from "simple-datatables";

export default function CustomersTable({ refreshTrigger }) {
    const [customers, setCustomers] = useState([]);
    const dataTableRef = useRef(null); // Reference to the DataTable instance

    // Fetch customer data
    useEffect(() => {
        async function fetchCustomers() {
            try {
                const response = await fetch("/api/fetchCustomers");
                const result = await response.json();

                if (result.success) {
                    setCustomers(result.data);
                } else {
                    console.error("Failed to fetch customers:", result.error);
                }
            } catch (error) {
                console.error("Error fetching customers:", error);
            }
        }

        fetchCustomers();
    }, [refreshTrigger]);

    // Initialize or reinitialize DataTable when data changes
    useEffect(() => {
        const table = document.getElementById("customerTable");

        // Destroy any existing DataTable instance
        if (dataTableRef.current) {
            dataTableRef.current.destroy();
            dataTableRef.current = null;
        }

        // Clear and repopulate table body dynamically
        const tbody = table.querySelector("tbody");
        tbody.innerHTML = ""; // Clear old data

        customers.forEach((customer) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="px-4 py-2 text-sm text-gray-700">${customer.customer_id}</td>
                <td class="px-4 py-2 text-sm text-gray-700">${customer.first_name}</td>
                <td class="px-4 py-2 text-sm text-gray-700">${customer.last_name}</td>
                <td class="px-4 py-2 text-sm text-gray-700">${customer.email}</td>
                <td class="px-4 py-2 text-sm text-gray-700">${
                    customer.date_of_birth ? new Date(customer.date_of_birth).toLocaleDateString() : "-"
                }</td>
                <td class="px-4 py-2 text-sm text-gray-700">${customer.zip_code || "-"}</td>
                <td class="px-4 py-2 text-sm text-gray-700">${new Date(customer.created_time).toLocaleString()}</td>
            `;
            tbody.appendChild(row);
        });

        // Reinitialize DataTable
        if (customers.length > 0) {
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
    }, [customers]);

    return (
        <div className="max-w-6xl mx-auto mt-6">
            <h2 className="text-xl text-gray-700 font-bold mb-4">Customers</h2>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table id="customerTable" className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Customer ID</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">First Name</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Last Name</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Email</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Date of Birth</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Zip Code</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Created Time</th>
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
