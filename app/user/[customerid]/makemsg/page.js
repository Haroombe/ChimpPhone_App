"use client";

import Image from "next/image";
import { use, useState, useEffect } from "react";
// import MakeCallFormComponent from "@/components/makeCallFormComponent";
import SimulateSMSForm from "@/components/SMSFormComponent";
import SMSLogTable from "@/components/SMSLogTable";

export default function SettingPage({ params }) {
  const unwrappedParams = use(params);
  const { customerid } = unwrappedParams;

  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const handleRefresh = () => {
      console.log("Toggling refreshTrigger...");
      setRefreshTrigger((prev) => !prev); // Toggle to trigger refresh
  };



  useEffect(() => {
    const fetchData = async () => {
        try {
          setLoading(true);
        
        } catch (err) {
          console.error("Error fetching data:", err.message);
          setError(err.message);
        } finally {
          setLoading(false);
        }
    };
    fetchData();
  }, [customerid]);
 
    
// turn form 
  const toggleEdit = (section) => {
    setEditing((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
    setSuccessMessage(null);
    setError(null);
  };

  if (loading) {
    return <div className="text-center mt-4 text-blue-500">Loading...</div>;
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
                                    {/*
                                    <Image className="block h-8 w-auto" src="\" alt="Logo" />
                                    */}
                                    <h1 className="text-2xl block h-8 w-auto">Chimpphone</h1>
                                </div>
                                <div className="hidden lg:ml-6 lg:block lg:space-x-4">
                                    <div className="flex">

                                        <a
                                            href={`/user/${customerid}/plan`}
                                            className="hover:bg-sky-800 rounded-md py-2 px-3 text-sm font-medium text-white"
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
                                            className="bg-black bg-opacity-25 rounded-md py-2 px-3 text-sm font-medium text-white hover:bg-sky-800"
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
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="relative overflow-hidden bg-sky-700 pb-32">
                <header className="relative py-10">
                <div className="mx-auto max-w-2x1 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-white">Send a message</h1>
                </div>
                </header>
            </div>
            </div>

      <main className="relative -mt-60">
        <div className="container mx-auto px-4 py-4 space-y-6">
            <div className="bg-white shadow-2xl place-items-center rounded-lg p-6">
                <SimulateSMSForm onTextSuccess={handleRefresh}/>
            </div>
        </div>
        <div className="container mx-auto px-4 space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
                <SMSLogTable refreshTrigger={refreshTrigger} />
            </div>
        </div>
      </main>
    </div>
  );
}
