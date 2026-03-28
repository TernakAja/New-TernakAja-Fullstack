"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Leaf, ChevronDown } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle'; // <-- Imported ThemeToggle

export const Navbar = () => {
    const [isInformationOpen, setIsInformationOpen] = useState<boolean>(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2 text-foreground font-semibold text-lg tracking-tight">
                        <div className="w-6 h-6 rounded bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                            <Leaf className="w-4 h-4 text-black dark:text-zinc-900" />
                        </div>
                        TernakAja
                    </Link>
                    <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
                        <Link href="/about" className="hover:text-foreground transition-colors">About</Link>

                        {/* Information Dropdown (Mega Menu) */}
                        <div
                            className="relative group"
                            onMouseEnter={() => setIsInformationOpen(true)}
                            onMouseLeave={() => setIsInformationOpen(false)}
                        >
                            <button
                                onClick={() => setIsInformationOpen(!isInformationOpen)}
                                className={`flex items-center gap-1 transition-colors ${isInformationOpen ? 'text-foreground' : 'hover:text-foreground'}`}
                                aria-expanded={isInformationOpen}
                            >
                                Information
                                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isInformationOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Content */}
                            {isInformationOpen && (
                                <div className="absolute top-full left-0 pt-4">
                                    {/* Bridge to keep hover active */}
                                    <div className="absolute top-0 left-0 w-full h-4 bg-transparent cursor-default"></div>
                                    <div className="w-[600px] bg-background border border-border rounded-xl shadow-xl p-6 grid grid-cols-2 gap-x-8 gap-y-6 animate-in fade-in slide-in-from-top-2 duration-200">



                                        <div className="group/item">
                                            <Link href="/information/panduan-budidaya" className="block">
                                                <h3 className="text-foreground font-medium mb-1 transition-colors group-hover/item:text-emerald-500">Panduan Budidaya (SOP)</h3>
                                                <p className="text-muted-foreground text-xs leading-relaxed">Step-by-step guides on breeding, fattening, and waste management.</p>
                                            </Link>
                                        </div>

                                        <div className="group/item">
                                            <Link href="/information/kamus-penyakit" className="block">
                                                <h3 className="text-foreground font-medium mb-1 transition-colors group-hover/item:text-emerald-500">Kamus Penyakit & Obat</h3>
                                                <p className="text-muted-foreground text-xs leading-relaxed">Database of symptoms, prevention, and localized medicine recommendations.</p>
                                            </Link>
                                        </div>

                                        <div className="group/item">
                                            <Link href="/information/regulasi" className="block">
                                                <h3 className="text-foreground font-medium mb-1 transition-colors group-hover/item:text-emerald-500">Regulasi & Perizinan</h3>
                                                <p className="text-muted-foreground text-xs leading-relaxed">Updates on government livestock policies, SKU/NIB requirements, and export-import rules.</p>
                                            </Link>
                                        </div>



                                        <div className="group/item">
                                            <Link href="/information/faq" className="block">
                                                <h3 className="text-foreground font-medium mb-1 transition-colors group-hover/item:text-emerald-500">FAQ & Bantuan</h3>
                                                <p className="text-muted-foreground text-xs leading-relaxed">Technical troubleshooting and reducing customer support load.</p>
                                            </Link>
                                        </div>

                                    </div>
                                </div>
                            )}
                        </div>

                        <Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
                        <Link href="/headline" className="hover:text-foreground transition-colors">News</Link>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Login</Link>
                    <button className="bg-foreground text-background px-4 py-1.5 rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
                        Join Us
                    </button>
                    {/* Fitts's Law: CTA target now has a theme toggler neighbor */}
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
};
