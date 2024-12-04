"use client";

import { use, useState, useEffect } from "react";


export default function CurrentPlanPage({ params }) {
    const unwrappedParams = use(params); 
    const { customerid } = unwrappedParams; // Get the customer ID from dynamic routing
    const [planDetails, setPlanDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cancelSuccess, setCancelSuccess] = useState(false); // Track cancel success state
    const [cancelError, setCancelError] = useState(null); // Track cancel error state
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    useEffect(() => {
        const fetchPlan = async () => {
            try {
                const response = await fetch(`/api/fetchPlan?customerid=${customerid}`);
                if (response.status === 404) {
                    setPlanDetails(null); // Set to null if the plan is not found
                    setLoading(false);
                    return;
                }
                if (!response.ok) {
                    throw new Error("Failed to fetch current plan");
                }
                const data = await response.json();

                
                if (data.success) {
                    const processedData = data.data.map(plan => ({
                        ...plan,
                        MBs_soft_cap: Number(plan.mbs_soft_cap) || Number(plan.MBs_soft_cap) || 0,
                        rate_per_minute: Number(plan.rate_per_minute) || 0,
                        rate_per_MB: Number(plan.rate_per_mb) || 0,
                        rate_per_char: Number(plan.rate_per_char) || 0,
                        monthly_charge: Number(plan.monthly_charge) || 0,
                        international_rate: Number(plan.international_rate) || 0,
                    }));
                    setPlanDetails(processedData);
                } else {
                    setError(data.error);
                }
                setLoading(false);
            } catch (err) {
                console.error("Error fetching current plan:", err.message);
                setError("Failed to fetch current plan.");
                setLoading(false);
            }
        };
    
        fetchPlan();
    }, [customerid]);

    // Cancel plan button call
    const handleCancelPlan = async () => {
        if (isButtonDisabled) {
            alert("Please wait before trying again.");
            return;
        }
    
        setIsButtonDisabled(true); // Disable button

        // Ask for confirmation before canceling
        const confirmed = window.confirm(
        "Are you sure you want to cancel your current plan? This action cannot be undone."
        );
    
        if (!confirmed) {
            setIsButtonDisabled(false);
            return; // Exit if the user cancels the confirmation
        }

        try {
            setCancelSuccess(false);
            setCancelError(null);

            const response = await fetch(`/api/cancel_plan?customerid=${customerid}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ customer_id: customerid }),
            });

            const data = await response.json();
            if (!response.ok || !data.success) {
                throw new Error(data.error || "Failed to cancel subscription.");
            }

            setCancelSuccess(true);
            alert("Plan canceled successfully.");
            // Redirect user after success
            window.location.reload();
        } catch (err) {
            alert("Error canceling subscription.");
            console.error("Error canceling subscription:", err.message);
            setCancelError(err.message);
        } finally {
            // Re-enable the button after a delay
            setTimeout(() => setIsButtonDisabled(false), 3000); // 3-second cooldown
        }
    };

    if (loading) {
        return <div className="spinner text-center mt-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-600 mt-4">{error}</div>;
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Header and Navigation */}
            <div x-data="{ open: false }" className="relative overflow-hidden bg-sky-700 pb-32">
                <nav
                    className="bg-transparent relative z-10 border-b border-teal-500 border-opacity-25 lg:border-none lg:bg-transparent"
                >
                    <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between lg:border-b lg:border-sky-800">
                            <div className="flex items-center px-2 lg:px-0">
                                <div className="flex-shrink-0">
                                    {/*}
                                    <Image className="block h-8 w-auto" src="#" alt="Logo" />
                                    */}
                                </div>
                                <div className="hidden lg:ml-6 lg:block lg:space-x-4">
                                    <div className="flex">

                                        <a
                                            href={`/user/${customerid}/plan`}
                                            className="bg-black bg-opacity-25 rounded-md py-2 px-3 text-sm font-medium text-white hover:bg-sky-800"
                                        >
                                            Plan
                                        </a>

                                        <a
                                            href={`/user/${customerid}/billing`}
                                            className="hover:bg-sky-800 rounded-md py-2 px-3 text-sm font-medium text-white"
                                        >
                                            Billing
                                        </a>
                                        <a
                                            href={`/user/${customerid}/callHistory`}
                                            className="hover:bg-sky-800 rounded-md py-2 px-3 text-sm font-medium text-white"
                                        >
                                            History
                                        </a>
                                        <a
                                            href= {`/user/${customerid}/setting`}
                                            className="hover:bg-sky-800 rounded-md py-2 px-3 text-sm font-medium text-white"
                                        >
                                            Settings
                                        </a>
                                        <a
                                            href={`/user/${customerid}/transactionHistory`}
                                            className="hover:bg-sky-800 rounded-md py-2 px-3 text-sm font-medium text-white"
                                        >
                                            Transaction
                                        </a>
                                        <a
                                            href={`/admin`}
                                            className="hover:bg-sky-800 rounded-md py-2 px-3 text-sm font-medium text-white"
                                        >
                                            admin
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
                                <div className="w-full max-w-lg lg:max-w-xs">
                                    <label htmlFor="search" className="sr-only">
                                        Search
                                    </label>
                                    <div className="relative text-sky-100 focus-within:text-gray-400">
                                        <input
                                            id="search"
                                            name="search"
                                            className="block w-full rounded-md border border-transparent bg-sky-700 bg-opacity-50 py-2 pl-10 pr-3 leading-5 placeholder-sky-100 focus:border-white focus:bg-white focus:text-gray-900 focus:placeholder-gray-500 focus:outline-none focus:ring-white sm:text-sm"
                                            placeholder="Search"
                                            type="search"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <header className="relative py-10">
                    <div className="mx-auto max-w-8x1 px-4 sm:px-6 lg:px-8 ">
                        <h1 className="text-3xl font-bold tracking-tight text-white">Current Plan Details</h1>
                    </div>
                </header>
            </div>

            {/* Main Content */}
            <main className="relative -mt-32 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto px-4">
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Plan: {planDetails[0]?.plan_name || "0.00"}
                        </h2>

                        <div className="divide-y divide-gray-200">
                            <div className="py-4 flex justify-between">
                                <span className="text-gray-700">Rate per Minute</span>
                                <span className="text-gray-900 font-medium">
                                    ${planDetails[0]?.rate_per_minute || "0.00"}
                                </span>
                            </div>
                            <div className="py-4 flex justify-between">
                                <span className="text-gray-700">Rate per MB</span>
                                <span className="text-gray-900 font-medium">
                                    ${planDetails[0]?.rate_per_MBs || "0.00"}
                                </span>
                            </div>
                            <div className="py-4 flex justify-between">
                                <span className="text-gray-700">Rate per Character</span>
                                <span className="text-gray-900 font-medium">
                                    ${planDetails[0]?.rate_per_char || "0.00"}
                                </span>
                            </div>
                            <div className="py-4 flex justify-between">
                                <span className="text-gray-700">Data Soft Cap (MBs)</span>
                                <span className="text-gray-900 font-medium">
                                    {planDetails[0]?.MBs_soft_cap || "0.00"} MB
                                </span>
                            </div>
                            <div className="py-4 flex justify-between">
                                <span className="text-gray-700">International Rate</span>
                                <span className="text-gray-900 font-medium">
                                    ${planDetails[0]?.international_rate || "0.00"}
                                </span>
                            </div>
                            <div className="py-4 flex justify-between">
                                <span className="text-gray-700">Plan Type</span>
                                <span className="text-gray-900 font-medium">
                                    {planDetails[0]?.plan_type || "0.00"}
                                </span>
                            </div>
                            <div className="py-4 flex justify-between">
                                <span className="text-gray-700">Monthly Charge</span>
                                <span className="text-gray-900 font-medium">
                                    ${planDetails[0]?.monthly_charge || "0.00"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/*Buttons*/ }
                    <div className="mt-6 flex justify-left space-x-20">
                        <a
                            onClick={handleCancelPlan}
                            className="bg-sky-700 text-white px-6 py-3 rounded-lg shadow hover:bg-sky-800"
                        >
                            Cancel Plan
                        </a>
                        <a
                            href={`/user/${customerid}/change_plan_process`}
                            className="bg-sky-700 text-white px-6 py-3 rounded-lg shadow hover:bg-sky-800"
                        >
                            Change Plan
                        </a>
                    </div>

                    {/* Error or Success Messages */}
                    {cancelError && (
                        <div className="mt-4 text-red-600">
                            {cancelError}
                        </div>
                    )}
                    {cancelSuccess && (
                        <div className="mt-4 text-green-600">
                            Plan canceled successfully.
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
}