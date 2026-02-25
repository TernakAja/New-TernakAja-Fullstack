import Link from "next/link";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import NavLinks from "./navbar-client";
import { LogoutButton } from "../logout-button";

export default async function Navbar() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <div className="w-full p-4 py-10 flex justify-center absolute top-0 left-0 z-50">
            <nav className="w-full max-w-[75vw] bg-white px-5 py-4 lg:px-8 lg:py-5 shadow-sm rounded-2xl">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="text-2xl font-bold tracking-tight text-primary">
                        TernakAja
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden lg:flex items-center gap-6 text-xl 2xl:text-2xl font-semibold text-gray-900">
                        <Link href="/" className="hover:text-primary">
                            Home
                        </Link>
                        <span className="text-gray-300">|</span>
                        <Link href="/products" className="hover:text-primary">
                            Products
                        </Link>
                        <span className="text-gray-300">|</span>
                        <Link href="/about-us" className="hover:text-primary">
                            About Us
                        </Link>
                    </div>

                    {/* Auth Section */}
                    <div className="hidden lg:flex items-center gap-4">
                        {user ? (
                            <>
                                <span className="font-semibold text-xl">
                                    {user.user_metadata?.name ?? user.email}
                                </span>
                                <LogoutButton />
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/auth/login"
                                    className="rounded px-6 py-2.5 text-sm font-bold text-primary border border-primary"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/auth/sign-up"
                                    className="rounded px-6 py-2.5 text-sm font-bold bg-primary text-white"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile */}
                    <NavLinks user={user} />
                </div>
            </nav>
        </div>
    );
}
