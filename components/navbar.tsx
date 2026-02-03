"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="w-full p-4 py-10 flex justify-center">
      <nav className="w-full max-w-[75vw] bg-white px-5 py-4 lg:px-8 lg:py-5 shadow-sm rounded-2xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold tracking-tight text-primary">
            TernakAja
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6 text-[15px] font-semibold text-gray-900">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/products"
              className="hover:text-primary transition-colors"
            >
              Products
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/about-us"
              className="hover:text-primary transition-colors"
            >
              About Us
            </Link>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => router.push("/auth/login")}
              className="rounded px-6 py-2.5 text-sm font-bold text-primary border border-primary hover:bg-muted transition"
            >
              Login
            </button>
            <button
              onClick={() => router.push("/auth/sign-up")}
              className="rounded px-6 py-2.5 text-sm font-bold bg-primary text-white hover:opacity-90 transition shadow-sm"
            >
              Register
            </button>
          </div>

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
        </div>

        {/* Mobile Dropdown */}
        {open && (
          <div className="mt-5 flex flex-col gap-4 lg:hidden text-sm font-semibold text-gray-900">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <Link href="/products" className="hover:text-primary">
              Products
            </Link>
            <Link href="/about-us" className="hover:text-primary">
              About Us
            </Link>

            <div className="pt-4 flex gap-3">
              <button
                onClick={() => router.push("/auth/login")}
                className="flex-1 rounded py-2 font-bold text-primary border border-primary"
              >
                Login
              </button>
              <button
                onClick={() => router.push("/auth/sign-up")}
                className="flex-1 rounded py-2 font-bold bg-primary text-white"
              >
                Register
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
