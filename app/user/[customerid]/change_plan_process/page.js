"use client";
import { useRouter } from 'next/navigation';

import { use, useState, useEffect } from "react";

export default function PlansPage({ params }) {
    const unwrappedParams = use(params); 
    const { customerid } = unwrappedParams; // Get the customer ID from dynamic routing
    const [plans, setPlans] = useState([]);
    const [currentPlanId, setCurrentPlanId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const router = useRouter();

    const handlePlanChange = async (newPlanId) => {
        console.log(currentPlanId);
        if (newPlanId === currentPlanId) {
            alert("You are already subscribed to this plan.");
            return;
        }

        if (isButtonDisabled) {
            alert("Please wait before trying again.");
            return;
        }
    
        setIsButtonDisabled(true); // Disable button
        // Ask for confirmation before canceling
        const confirmed = window.confirm(
            "Are you sure you want to change your current plan? This action cannot be undone."
            );
        
            if (!confirmed) {
                setIsButtonDisabled(false);
                return; // Exit if the user cancels the confirmation
            }
    
        try {
            const response = await fetch('/api/change_plan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ customer_id: customerid, new_plan_id: newPlanId }),
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                console.log('Response Text:', errorText);
                throw new Error('Failed to update plan.');
            }
    
            const result = await response.json();
            alert(`Success: ${result.message}`);
            // Redirect user after success
            router.push(`/user/${customerid}/plan`);
        } catch (error) {
            alert(`Failed to change plan`);
            console.error('Failed to call change plan API:', error.message);
            alert('An error occurred while updating the plan. Please try again.');
        }finally {
            // Re-enable the button after a delay
            setTimeout(() => setIsButtonDisabled(false), 3000); // 3-second cooldown
        }
    };
    
    
    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await fetch('/api/fetch_change_plan');
                if (!response.ok) {
                    throw new Error("Failed to fetch plans.");
                }
                const data = await response.json();
                const processedData = data.map(plan => ({
                    ...plan,
                    MBs_soft_cap: plan.mbs_soft_cap ? Number(plan.mbs_soft_cap) : (Number(plan.MBs_soft_cap) || 0),
                    MBs_hard_cap: plan.mbs_hard_cap ? Number(plan.mbs_hard_cap) : (Number(plan.MBs_hard_cap) || 0),
                    rate_per_minute: Number.isFinite(Number(plan.rate_per_minute)) ? Number(plan.rate_per_minute) : 0,
                    rate_per_MB: plan.rate_per_mb ? Number(plan.rate_per_mb) : 0,
                    rate_per_char: Number.isFinite(Number(plan.rate_per_char)) ? Number(plan.rate_per_char) : 0,
                    monthly_charge: Number.isFinite(Number(plan.monthly_charge)) ? Number(plan.monthly_charge) : 0,
                    international_rate: Number.isFinite(Number(plan.international_rate)) ? Number(plan.international_rate) : 0,
                }));
                console.log("Processed Data:", processedData);

                setPlans(processedData);
            } catch (err) {
                console.error("Error fetching plans:", err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();

        const fetchCurrentPlan = async () => {
            try {
                const response = await fetch(`/api/fetchPlan?customerid=${customerid}`);
                const result = await response.json();
                console.log('Current Plan API Response:', result); // Debug log
    
                if (result.success) {
                    setCurrentPlanId(result.data[0]?.plan_id || null); // Use the first row
                } else {
                    setCurrentPlanId(null);
                }
            } catch (error) {
                console.error('Error fetching current plan:', error.message);
                setError(error.message);
            }
        };
    
        fetchCurrentPlan();
    }, [customerid]);

    if (loading) {
        return <div className="spinner text-center mt-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-600 mt-4">{error}</div>;
    }

    return (
        <section className="p-4 md:p-8 bg-gray-100">
            {/* Header and Navigation */}
            <div x-data="{ open: false }" className="relative overflow-hidden bg-sky-700 pb-25">
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
                <div className="mx-auto max-w-3xl text-center pb-12 md:pb-20">
                    <h2 className="text-3xl text-white font-bold sm:text-4xl mb-4 text-sky-700">Available Phone Plans</h2>
                    <p className="text-xl text-white">Choose a plan that best suits your data needs.</p>
                </div>
                </header>
            </div>
            <div className="py-8 max-w-screen-xl lg:py-16">

                <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
                    {plans.map(plan => (
                        <div
                            key={plan.plan_id}
                            className="flex flex-col p-6 mx-auto max-w-md text-center rounded-lg shadow-lg bg-white xl:p-8 border border-gray-200 hover:shadow-md"
                        >
                            <h3 className="mb-4 text-2xl font-semibold text-gray-800">{plan.plan_name}</h3>
                            <div className="flex justify-center items-baseline my-1 h-10">
                                <p className="font-light sm:text-lg text-gray-600">{plan.plan_type}</p>
                            </div>
                            <div className="flex justify-center items-baseline my-9">
                                <span className="mr-2 text-5xl font-extrabold text-sky-700">
                                    ${plan.monthly_charge.toFixed(2)}
                                </span>
                                <span className="text-gray-500">/month</span>
                            </div>
                            <ul role="list" className="mb-8 space-y-4 text-left">
                                <li className="flex items-center space-x-3">
                                    <span className="text-gray-600">Rate per Minute: ${plan.rate_per_minute.toFixed(2)}</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <span className="text-gray-600">Rate per MB: ${plan.rate_per_MB.toFixed(2)}</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <span className="text-gray-600">Rate per Character: ${plan.rate_per_char.toFixed(2)}</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <span className="text-gray-600">Soft Data Cap: {plan.MBs_soft_cap} MB</span>
                                </li>

                                <li className="flex items-center space-x-3">
                                    <span className="text-gray-600">International Rate: ${plan.international_rate.toFixed(2)}</span>
                                </li>
                            </ul>
                            <button className="mt-4 w-full bg-sky-700 text-white font-bold gap-2 shadow py-2 rounded-lg hover:bg-sky-800" onClick={() => handlePlanChange(plan.plan_id)}>
                                
                                Select Plan
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
