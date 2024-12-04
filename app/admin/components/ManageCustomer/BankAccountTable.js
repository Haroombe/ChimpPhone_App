"use client";
import { useEffect, useState, useRef } from "react";
import { DataTable } from "simple-datatables";

export default function BankAccountsTable({ refreshTrigger }) {
    const [bankAccounts, setBankAccounts] = useState([]);
    const dataTableRef = useRef(null); // Reference to the DataTable instance

    // Fetch bank account data
    useEffect(() => {
        async function fetchBankAccounts() {
            try {
                const response = await fetch("/api/fetchBankAccounts");
                const result = await response.json();

                if (result.success) {
                    setBankAccounts(result.data);
                } else {
                    console.error("Failed to fetch bank accounts:", result.error);
                }
            } catch (error) {
                console.error("Error fetching bank accounts:", error);
            }
        }

        fetchBankAccounts();
    }, [refreshTrigger]);

    // Initialize or reinitialize DataTable
    useEffect(() => {
        const table = document.getElementById("bankAccountTable");

        // Destroy any existing DataTable instance
        if (dataTableRef.current) {
            dataTableRef.current.destroy();
            dataTableRef.current = null;
        }

        // Clear and repopulate table body dynamically
        const tbody = table.querySelector("tbody");
        tbody.innerHTML = ""; // Clear old data

        bankAccounts.forEach((account) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="px-4 py-2 text-sm text-gray-700">${account.bank_account_id}</td>
                <td class="px-4 py-2 text-sm text-gray-700">${account.customer_id}</td>
                <td class="px-4 py-2 text-sm text-gray-700">${account.card_number.replace(/\d{12}(\d{4})/, "************$1")}</td>
                <td class="px-4 py-2 text-sm text-gray-700">${account.name}</td>
                <td class="px-4 py-2 text-sm text-gray-700">${new Date(account.exp_date).toLocaleDateString()}</td>
                <td class="px-4 py-2 text-sm text-gray-700">${account.cvv}</td>
                <td class="px-4 py-2 text-sm text-gray-700">$${account.balance}</td>
                <td class="px-4 py-2 text-sm text-gray-700">${account.default_flag ? "Yes" : "No"}</td>
            `;
            tbody.appendChild(row);
        });

        // Reinitialize DataTable
        if (bankAccounts.length > 0) {
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
    }, [bankAccounts]);

    return (
        <div className="max-w-6xl mx-auto mt-6">
            <h2 className="text-xl text-gray-700 font-bold mb-4">Bank Accounts</h2>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table id="bankAccountTable" className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Bank Account ID</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Customer ID</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Card Number</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Account Name</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Expiration Date</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">CVV</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Balance</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Default</th>
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
