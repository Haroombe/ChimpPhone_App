"use client";
import { useState } from "react";
import CustomerPlanPieChart from "@/admin/components/CustomerPlanPieChart";
import RevenueByPlanDonutChart from "@/admin/components/RevenueByPlanDonutChart";
import DashboardMetricsCard from "@/admin/components/BasicMetricCard";
import AddCustomerForm from "@/admin/components/ManageCustomer/AddCustomerForm";
import PaymentForm from "@/admin/components/ManageCustomer/PaymentForm";
import MakeCallForm from "@/admin/components/ManageCustomer/CallForm";
import SimulateCallForm from "@/admin/components/ManageCustomer/SimulateCallForm";
import CallLogTable from "@/admin/components/ManageCustomer/CallLogTable";
import SimulateSMSForm from "@/admin/components/ManageCustomer/SMSForm";
import SMSLogTable from "@/admin/components/ManageCustomer/SMSLogTable";
import BillingCycleTable from "@/admin/components/ManageCustomer/BillingCycleTable";
import DataUsageTable from "@/admin/components/ManageCustomer/DataUsageTable";
import InternationalDataUsageTable from "@/admin/components/ManageCustomer/InternationalDataUsageTable";
import CustomersTable from "@/admin/components/ManageCustomer/CustomerTable";
import SubscriptionsTable from "@/admin/components/ManageCustomer/SubscriptionTable";
import BankAccountsTable from "@/admin/components/ManageCustomer/BankAccountTable";
import TRansactionTable from "@/admin/components/ManageCustomer/TransactionTable";
import PhoneNumberListTable from "@/admin/components/ManageCustomer/PhoneListTable";
import PhoneCallStressTest from "@/admin/components/StressSimulation/callspam";

function Sidebar({ setActiveTab }) {
    return (
        <aside className="w-64 h-screen bg-gray-800 text-gray-200 p-4 flex flex-col fixed top-0 left-0 z-50 overflow-y-auto">
            <div className="mb-6">
                <h1 className="text-lg font-bold">ChimpPhone</h1>
                <h2 className="text-lg font-bold">Admin Dashboard</h2>
            </div>
            <ul className="flex-grow flex flex-col">
                <li className="mb-2">
                    <button
                        onClick={() => setActiveTab("overview")}
                        className="block px-4 py-2 rounded hover:bg-gray-700 w-full text-left"
                    >
                        Dashboard Overview
                    </button>
                </li>
                <li className="mb-2">
                    <button
                        onClick={() => setActiveTab("manage_customers")}
                        className="block px-4 py-2 rounded hover:bg-gray-700 w-full text-left"
                    >
                        Manage Customers
                    </button>
                </li>
                <li className="mb-2">
                    <button
                        onClick={() => setActiveTab("manage_services")}
                        className="block px-4 py-2 rounded hover:bg-gray-700 w-full text-left"
                    >
                        Manage Services
                    </button>
                </li>

                <li className="mb-2">
                    <button
                        onClick={() => setActiveTab("stress_simulation")}
                        className="block px-4 py-2 rounded hover:bg-gray-700 w-full text-left"
                    >
                        Stress Simulation
                    </button>
                </li>
            </ul>
            <div className="mt-auto">
                <p className="text-sm">© 2024 ChimpPhone</p>
            </div>
        </aside>
    );
}


export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("overview");
    const [refreshTrigger, setRefreshTrigger] = useState(false);

    const handleRefresh = () => {
        console.log("Toggling refreshTrigger...");
        setRefreshTrigger((prev) => !prev); // Toggle to trigger refresh
    };

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <Sidebar setActiveTab={setActiveTab} />
            <div className="ml-64 w-full p-6">
                {/* Main Content */}
                <main className="flex-1">
                    {activeTab === "overview" && (
                        <>
                            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                                Dashboard Overview
                            </h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 min-h-[300px]">
                                    <CustomerPlanPieChart />
                                </div>
                                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 min-h-[300px]">
                                    <RevenueByPlanDonutChart />
                                </div>
                                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 min-h-[300px]">
                                    <DashboardMetricsCard />
                                </div>
                            </div>
                        </>
                    )}
                    {activeTab === "manage_customers" && (
                        <>
                            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                                Manage Customers
                            </h1>
                            <div className="mb-6">
                                {/* Customer Table */}
                                <div className="bg-transparent border-transparent dark:bg-gray-800 shadow rounded-lg p-4 overflow-auto">
                                    <CustomersTable refreshTrigger={refreshTrigger}/>
                                </div>

                                {/* number list Table */}
                                <div className="bg-transparent border-transparent dark:bg-gray-800 shadow rounded-lg p-4 overflow-auto">
                                    <PhoneNumberListTable refreshTrigger={refreshTrigger}/>
                                </div>

                                {/* Subscriptions Table */}
                                <div className="bg-transparent border-transparent dark:bg-gray-800 shadow rounded-lg p-4 overflow-auto">
                                    <SubscriptionsTable refreshTrigger={refreshTrigger}/>
                                </div>

                                {/* Bank Account Table */}
                                <div className="bg-transparent border-transparent dark:bg-gray-800 shadow rounded-lg p-4 overflow-auto">
                                    <BankAccountsTable refreshTrigger={refreshTrigger}/>

                                {/* Transaction Table */}
                                <div className="bg-transparent border-transparent dark:bg-gray-800 shadow rounded-lg p-4 overflow-auto">
                                    <TRansactionTable refreshTrigger={refreshTrigger}/>
                                </div>

                                {/* Billing Cycle Table */}
                                <div className="bg-transparent border-transparent dark:bg-gray-800 shadow rounded-lg p-4 overflow-auto">
                                    <BillingCycleTable refreshTrigger={refreshTrigger}/>
                                </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
                                    <AddCustomerForm onAddSuccess = {handleRefresh}/>
                                </div>
                                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
                                    <PaymentForm onPaymentSuccess={handleRefresh} />
                                </div>
                            </div>
                        </>
                    )}
                    {activeTab === "manage_services" && (
                        <>
                            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                                Manage Services
                            </h1>
                            <div className="mb-6">
                                {/* Call Log Table */}
                                <div className="bg-transparent border-transparent dark:bg-gray-800 shadow rounded-lg p-4 overflow-auto">
                                    <CallLogTable refreshTrigger={refreshTrigger}/>
                                </div>

                                {/* Billing Cycle Table */}
                                <div className="bg-transparent border-transparent dark:bg-gray-800 shadow rounded-lg p-4 overflow-auto">
                                    <BillingCycleTable refreshTrigger={refreshTrigger}/>
                                </div>

                                {/* SMS Log Table */}
                                <div className="bg-transparent border-transparent dark:bg-gray-800 shadow rounded-lg p-4 overflow-auto">
                                    <SMSLogTable refreshTrigger={refreshTrigger}/>
                                </div>

                                {/* Data Usage Table */}
                                <div className="bg-transparent border-transparent dark:bg-gray-800 shadow rounded-lg p-4 overflow-auto">
                                    <DataUsageTable refreshTrigger={refreshTrigger}/>
                                </div>

                                {/* International Data Usage Table */}
                                <div className="bg-transparent border-transparent dark:bg-gray-800 shadow rounded-lg p-4 overflow-auto">
                                    <InternationalDataUsageTable refreshTrigger={refreshTrigger}/>
                                </div>

                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
                                    <MakeCallForm onCallAddSuccess = {handleRefresh}/>
                                </div>
                                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
                                    <SimulateCallForm onCallSuccess = {handleRefresh}/>
                                </div>
                                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
                                    <SimulateSMSForm onTextSuccess = {handleRefresh}/>
                                </div>
                            </div>
                        </>
                    )}
                    {activeTab === "stress_simulation" && (
                        <>
                            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                                Stress Simulation
                            </h1>
                            <div className="mb-6">
                                {/* Call Log Table */}
                                <div className="bg-transparent border-transparent dark:bg-gray-800 shadow rounded-lg p-4 overflow-auto">
                                    <CallLogTable refreshTrigger={refreshTrigger}/>
                                </div>

                                {/* Billing Cycle Table */}
                                <div className="bg-transparent border-transparent dark:bg-gray-800 shadow rounded-lg p-4 overflow-auto">
                                    <BillingCycleTable refreshTrigger={refreshTrigger}/>
                                </div>

                                {/* Data Usage Table */}
                                <div className="bg-transparent border-transparent dark:bg-gray-800 shadow rounded-lg p-4 overflow-auto">
                                    <DataUsageTable refreshTrigger={refreshTrigger}/>
                                </div>

                                {/* International Data Usage Table */}
                                <div className="bg-transparent border-transparent dark:bg-gray-800 shadow rounded-lg p-4 overflow-auto">
                                    <InternationalDataUsageTable refreshTrigger={refreshTrigger}/>
                                </div>

                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
                                    <PhoneCallStressTest OnTestSuccess = {handleRefresh}/>
                                </div>
                            </div>
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}    
