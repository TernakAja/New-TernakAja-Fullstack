"use client";

import { useState } from "react";
import Link from "next/link";
import { LogoutButton } from "../logout-button";

export default function NavLinks({ user }: { user: any }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200"
                onClick={() => setOpen(!open)}
            >
                <div className="space-y-1">
                    <span className="block w-5 h-0.5 bg-gray-700"></span>
                    <span className="block w-5 h-0.5 bg-gray-700"></span>
                    <span className="block w-5 h-0.5 bg-gray-700"></span>
                </div>
            </button>

            {open && (
                <div className="absolute top-20 left-0 w-full bg-white shadow-md p-5 flex flex-col gap-4 lg:hidden">
                    <Link href="/">Home</Link>
                    <Link href="/products">Products</Link>
                    <Link href="/about-us">About Us</Link>

                    {user ? (
                        <LogoutButton />
                    ) : (
                        <>
                            <Link
                                href="/auth/login"
                                className="border py-2 rounded text-center"
                            >
                                Login
                            </Link>
                            <Link
                                href="/auth/sign-up"
                                className="bg-primary text-white py-2 rounded text-center"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            )}
        </>
    );
}
