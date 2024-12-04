'use client';

import Link from "next/link";
import Image from "next/image";


export default function Navbar({ userId,plans }) {

    return (
        <div className="navbar bg-base-100">
            <div className="navbar start">
                    <Link href="/" className="btn">
                        <div className="flex items-center">
                            <Image
                                alt="ChimpPhone Logo"
                                src="/chimpphone_logo.png"
                                width={40}
                                height={40}
                            />
                        </div>
                    </Link>
            </div>
            <div className="navbar-center px-48">
                <Link href={`/user/${userId}/call`} className="btn btn-ghost text-xl">
                    Make Call
                </Link>
                <Link href={`/user/${userId}/msg`} className="btn btn-ghost text-xl">
                    Send Message
                </Link>
                {/* Plans Dropdown */}
                <Link href={`/user/${userId}/change_plan_process`} className="btn btn-ghost text-xl">
                   Phone Plans
                </Link>
                <Link href="/about" className="btn btn-ghost text-xl">
                About
                </Link>
            </div>

            <div className="navbar-end">
     
                {/* Profile Dropdown */}

                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <Image
                                alt="Profile Avatar"
                                src="/blank-profile-picture-973460_1280.png"
                                width={40}
                                height={40}
                            />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        {/* TODO: Add check to see if user logged in, if not display sign in button else display user profile link */}
                        <li>
                            <Link href={`/user/${userId}/setting`}>
                                Profile
                            </Link>
                        </li>
                        <li>
                            <Link href="/logout">
                                Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
