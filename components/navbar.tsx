"use client";
import React, { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full p-4 flex justify-center">
      <nav className="w-full max-w-[75vw] bg-white px-5 py-4 lg:px-8 lg:py-5 shadow-sm rounded-2xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold tracking-tight text-primary">
            TernakAja
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6 text-[15px] font-semibold text-gray-900">
            <a href="#" className="hover:text-primary transition-colors">
              Home
            </a>
            <span className="text-gray-300">|</span>
            <a href="#" className="hover:text-primary transition-colors">
              Products
            </a>
            <span className="text-gray-300">|</span>
            <a href="#" className="hover:text-primary transition-colors">
              About Us
            </a>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <button className="rounded px-6 py-2.5 text-sm font-bold text-primary border border-primary hover:bg-muted transition">
              Login
            </button>
            <button className="rounded px-6 py-2.5 text-sm font-bold bg-primary text-white hover:opacity-90 transition shadow-sm">
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
            <a href="#" className="hover:text-primary">
              Home
            </a>
            <a href="#" className="hover:text-primary">
              Products
            </a>
            <a href="#" className="hover:text-primary">
              About Us
            </a>

            <div className="pt-4 flex gap-3">
              <button className="flex-1 rounded py-2 font-bold text-primary border border-primary">
                Login
              </button>
              <button className="flex-1 rounded py-2 font-bold bg-primary text-white">
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
