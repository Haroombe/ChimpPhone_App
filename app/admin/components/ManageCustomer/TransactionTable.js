"use client";
import { useEffect, useState, useRef } from "react";
import { DataTable } from "simple-datatables";

export default function TRansactionTable({ refreshTrigger }) {
    const [transactions, setTransactions] = useState([]);
    const dataTableRef = useRef(null); // Reference to the DataTable instance

    // Fetch transaction data
    useEffect(() => {
        async function fetchTransactions() {
            try {
                const response = await fetch("/api/fetchTransactionForTable");
                const result = await response.json();

                if (result.success) {
                    setTransactions(result.data);
                } else {
                    console.error("Failed to fetch transactions:", result.error);
                }
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        }

        fetchTransactions();
    }, [refreshTrigger]);

    // Initialize or reinitialize DataTable when data changes
    useEffect(() => {
        const table = document.getElementById("transactionTable");

        // Destroy any existing DataTable instance
        if (dataTableRef.current) {
            dataTableRef.current.destroy();
            dataTableRef.current = null;
        }

        // Clear and repopulate table body dynamically
        const tbody = table.querySelector("tbody");
        tbody.innerHTML = ""; // Clear old data

        transactions.forEach((transaction) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="px-4 py-2 text-sm text-gray-700">${transaction.transaction_id}</td>
                <td class="px-4 py-2 text-sm text-gray-700">${transaction.customer_id}</td>
                <td class="px-4 py-2 text-sm text-gray-700">$${transaction.amount}</td>
                <td class="px-4 py-2 text-sm text-gray-700">${new Date(transaction.transaction_date).toLocaleString()}</td>
                <td class="px-4 py-2 text-sm text-gray-700 capitalize">${transaction.transaction_type}</td>
            `;
            tbody.appendChild(row);
        });

        // Reinitialize DataTable
        if (transactions.length > 0) {
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
    }, [transactions]);

    return (
        <div className="max-w-6xl mx-auto mt-6">
            <h2 className="text-xl text-gray-700 font-bold mb-4">Transactions</h2>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table id="transactionTable" className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Transaction ID</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Customer ID</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Amount</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Transaction Date</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Transaction Type</th>
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
