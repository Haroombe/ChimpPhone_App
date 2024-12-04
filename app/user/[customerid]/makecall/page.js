"use client";

import Image from "next/image";
import { use, useState, useEffect } from "react";
import MakeCallFormComponent from "@/components/makeCallFormComponent";
export default function SettingPage({ params }) {
  const unwrappedParams = use(params);
  const { customerid } = unwrappedParams;
//   const [customerData, setCustomerData] = useState(null);
//   const [bankData, setBankAccounts] = useState(null);
//   const [PrimarybankData, setPrimaryBankAccount] = useState(null);
//   const [phoneData, setPhone] = useState(null);
  const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [formData, setFormData] = useState({});
//   const [editing, setEditing] = useState({}); // Tracks which sections are being edited
//   const [successMessage, setSuccessMessage] = useState(null);
//   const [errorEmail, setErrorEmail] = useState(null);
//   const [successMessageEmail, setSuccessMessageEmail] = useState(null);
//   const [successMessageProfile, setSuccessMessageProfile] = useState(null); 
//   const [errorMessageProfile, setErrorMessageProfile] = useState(null);
//   const [successMessageBank, setSuccessMessageBank] = useState(null); // Track success messages
//   const [errorMessageBank, setErrorMessageBank] = useState(null);

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
    /*
    const fetchBankData = async () => {
        try {
          const response = await fetch(`/api/fetchBankInfo?customerid=${customerid}`);
          if (!response.ok) {
            throw new Error('Failed to fetch bank account information');
          }
          const data = await response.json();
          if (data.success) {
            setBankAccounts(data.data.bank_accounts);
            setPrimaryBankAccount(data.data.primary_bank_account);
          } else {
            throw new Error(data.error || 'No bank account data found.');
          }
        } catch (error) {
          console.error('Error fetching bank account info:', error.message);
          setError(error.message);
        }
      };*/
    
//     const fetchPhoneNumber = async () => {
//         try {
//           const response = await fetch(`/api/fetch_phone_number?customerid=${customerid}`);
//           if (!response.ok) {
//             throw new Error('Failed to fetch phone number');
//           }
//           const data = await response.json();
//           if (data.success) {
//             setPhone(data.data);
//           } else {
//             throw new Error(data.error || 'No bank phone number found.');
//           }
//         } catch (error) {
//           console.error('Error fetching phone number:', error.message);
//           setError(error.message);
//         }
//       };
//     fetchPhoneNumber();
//     //fetchBankData();
//     fetchData();
//   }, [customerid]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   //for profile card
//   const handleSubmitProfile = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrorMessageProfile(null);
//     setSuccessMessageProfile(null);

//     try {
//       const response = await fetch("/api/change_profile", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           customer_id: customerid,
//           first_name: formData.first_name,
//           last_name: formData.last_name,
//           email: formData.email,
//           phone_number: formData.primary_phone_number,
//         }),
//       });

//       const result = await response.json();

//       if (!response.ok || !result.success) {
//         throw new Error(result.error || "Failed to update profile.");
//       }

//       // Update parent state with new data
//       setCustomerData((prev) => ({
//         ...prev,
//         first_name: formData.first_name,
//         last_name: formData.last_name,
//         email: formData.email,
//         primary_phone_number: formData.primary_phone_number,
//       }));

//       setSuccessMessageProfile("Customer profile updated successfully.");
//       setEditing(false); // Exit editing state
//     } catch (error) {
//       setErrorMessageProfile(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   //For password card
//   const handlePasswordSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setSuccessMessage(null);
//     setError(null);

//     if (formData.password !== formData.confirm_password) {
//       setError("Passwords do not match.");
//       return;
//     }

//     try {
//       const response = await fetch(`/api/changePassword`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           customer_id: customerid,
//           new_password: formData.password,
//         }),
//       });

//       const result = await response.json();
//       if (!response.ok || !result.success) {
//         throw new Error(result.error || "Failed to change password.");
//       }

//       setSuccessMessage("Password changed successfully.");
//       setEditing({}); // Reset editing state
//       setFormData({}); // Clear password fields
//     } catch (err) {
//       setError(err.message);
//     } finally {
//         setLoading(false);
//       }
//   };
//   // For email card
//   const handleEmailPrefSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setSuccessMessageEmail(null);
//     setErrorEmail(null);

//     try {
//         const response = await fetch("/api/change_advertise_agree", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             customer_id: customerid,
//             email_advertise_agree: formData.email_advertise_agree === "true", // Convert to boolean
//           }),
//         });
  
//         const result = await response.json();
  
//         if (!response.ok || !result.success) {
//           throw new Error(result.error || "Failed to update preferences.");
//         }
  
//         // Update parent state with new value
//         setCustomerData((prev) => ({
//           ...prev,
//           email_advertise_agree: formData.email_advertise_agree,
//         }));
  
//         setSuccessMessageEmail("Email advertising preference updated successfully.");
//         setEditing(false); // Exit editing state
//       } catch (error) {
//         setErrorEmail(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     //for bank card
//     const handleSubmitBank = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setErrorMessageBank(null);
//         setSuccessMessageBank(null);
    
//         try {
//             console.log("Payload to API:", {
//                 customer_id: customerid,
//                 bank_account_id: formData.primary_bank_account,
//               });
//           const response = await fetch("/api/changePrimaryBank", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               customer_id: customerid,
//               bank_account_id: formData.primary_bank_account,
//             }),
//           });
    
//           const result = await response.json();
    
//           if (!response.ok || !result.success) {
//             throw new Error(result.error || "Failed to update primary bank account.");
//           }
    
//           // Update the primary bank account in the parent component state
//           const updatedPrimaryBank = bankData.find(
//             (account) => account.bank_account_id === formData.primary_bank_account
//           );
//           setPrimaryBankAccount(updatedPrimaryBank);
    
//           setSuccessMessageBank("Primary bank account updated successfully.");
//           setEditing(false); // Exit editing state
//         } catch (error) {
//           setErrorMessageBank(error.message);
//         } finally {
//           setLoading(false);
//         }
//       };
      
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
                    <h1 className="text-3xl font-bold tracking-tight text-white">Make a Call</h1>
                </div>
                </header>
            </div>
            </div>

      <main className="relative -mt-60">
        <div className="container mx-auto px-4 space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
                <MakeCallFormComponent />
            </div>
        </div>
      </main>
    </div>
  );
}
