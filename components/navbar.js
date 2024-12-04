'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar({ userId, plans }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="bg-sky-700 p-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                
                {/* Logo Section */}
                <div className="flex items-center">
                    <Link href="/" className="flex items-center">
                        <Image
                            alt="ChimpPhone Logo"
                            src="/chimpphone_logo.png"
                            width={40}
                            height={40}
                        />
                        <span className="ml-2 text-white text-lg font-semibold">ChimpPhone</span>
                    </Link>
                </div>

                {/* Center Links */}
                <div className="hidden md:flex space-x-4">
                    <Link href={`/user/${userId}/call`} className="hover:bg-sky-800 rounded-md py-2 px-3 text-sm font-medium text-white">
                        Make Call
                    </Link>
                    <Link href={`/user/${userId}/msg`} className="hover:bg-sky-800 rounded-md py-2 px-3 text-sm font-medium text-white">
                        Send Message
                    </Link>
                    <Link href={`/user/${userId}/change_plan_process`} className="hover:bg-sky-800 rounded-md py-2 px-3 text-sm font-medium text-white">
                        Phone Plans
                    </Link>
                    <Link href="/about" className="hover:bg-sky-800 rounded-md py-2 px-3 text-sm font-medium text-white">
                        About
                    </Link>
                </div>

                {/* Profile Section */}
                <div className="relative">
                    <button
                        onClick={toggleDropdown}
                        className="flex items-center text-sm bg-sky-700 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-sky-700 focus:ring-white"
                    >
                        <Image
                            alt="Profile Avatar"
                            src="/blank-profile-picture-973460_1280.png"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                            <Link href={`/user/${userId}/setting`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Profile
                            </Link>
                            <Link href="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Logout
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden mt-4">
                <div className="flex flex-col space-y-2">
                    <Link href={`/user/${userId}/call`} className="hover:bg-sky-800 rounded-md py-2 px-3 text-sm font-medium text-white">
                        Make Call
                    </Link>
                    <Link href={`/user/${userId}/msg`} className="hover:bg-sky-800 rounded-md py-2 px-3 text-sm font-medium text-white">
                        Send Message
                    </Link>
                    <Link href={`/user/${userId}/change_plan_process`} className="hover:bg-sky-800 rounded-md py-2 px-3 text-sm font-medium text-white">
                        Phone Plans
                    </Link>
                    <Link href="/about" className="hover:bg-sky-800 rounded-md py-2 px-3 text-sm font-medium text-white">
                        About
                    </Link>
                </div>
            </div>
        </nav>
    );
}