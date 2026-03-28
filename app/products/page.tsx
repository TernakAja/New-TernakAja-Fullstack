import React from 'react';
import { ArrowRight, Cpu, Battery, Terminal, Sun, Activity, Bell } from 'lucide-react';
import NextLink from 'next/link';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from '@/components/layout/Footer';

export const products = [
    {
        id: '02',
        name: 'PETSA 02',
        tagline: 'The Evolution.',
        description: 'Advanced metrics and superior materials. Built for the absolute edge. Re-engineered from the ground up to exceed modern performance standards.',
        price: '$299',
        comingSoon: true,
        specs: [
            { icon: Sun, text: 'Continuous Solar Charging' },
            { icon: Activity, text: 'Advanced Behavior Tracking' },
            { icon: Cpu, text: 'Pro-grade Processing' }
        ],
        theme: {
            bg: 'bg-white dark:bg-black',
            glow: 'bg-red-500/10 dark:bg-red-500/20',
            border: 'border-gray-200 dark:border-white/10',
            text: 'text-black dark:text-white',
            muted: 'text-gray-500 dark:text-[#888888]',
            card: 'bg-gray-50 dark:bg-white/[0.03] border-gray-200 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-white/[0.06]',
            buttonPrimary: 'bg-black text-white hover:bg-neutral-800 dark:bg-white/10 dark:text-white dark:hover:bg-white/20',
            buttonSecondary: 'bg-transparent text-gray-500 dark:text-[#888888] hover:text-black dark:hover:text-white border border-transparent hover:border-gray-200 dark:hover:border-white/10'
        }
    },
    {
        id: '01',
        name: 'PETSA 01',
        tagline: 'The Foundation.',
        description: 'Engineered for everyday reliability. The original standard in performance, stripped down to the essentials without compromising quality.',
        price: '$199',
        comingSoon: true,
        specs: [
            { icon: Cpu, text: 'Core Processing' },
            { icon: Battery, text: 'Standard Battery' },
            { icon: Terminal, text: 'Essential Connectivity' }
        ],
        theme: {
            bg: 'bg-gray-50 dark:bg-[#0A0A0A]',
            glow: 'bg-indigo-500/10 dark:bg-indigo-500/20',
            border: 'border-gray-200 dark:border-white/5',
            text: 'text-black dark:text-white',
            muted: 'text-gray-500 dark:text-[#888888]',
            card: 'bg-white dark:bg-white/[0.02] border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/[0.05]',
            buttonPrimary: 'bg-black text-white hover:bg-neutral-800 dark:bg-white/10 dark:text-white dark:hover:bg-white/20',
            buttonSecondary: 'bg-transparent text-gray-500 dark:text-[#888888] hover:text-black dark:hover:text-white border border-transparent hover:border-gray-200 dark:hover:border-white/10'
        }
    }
];

export default function ProductsPage() {
    return (
        <div className="min-h-screen w-full bg-white dark:bg-black font-sans antialiased selection:bg-neutral-200 dark:selection:bg-white/30 selection:text-black dark:selection:text-white text-black dark:text-white">
            <Navbar />
            {/* Main Split Layout */}
            <main className="grid grid-cols-1 lg:grid-cols-2 min-h-screen pt-14">
                {products.map((product, index) => (
                    <section
                        key={product.id}
                        className={`relative flex flex-col justify-between p-8 sm:p-12 lg:p-16 lg:pt-32 lg:h-screen overflow-hidden ${product.theme.bg} ${index === 0 ? 'lg:border-r' : ''} ${product.theme.border}`}
                    >
                        {/* Ambient Radial Glow */}
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                            <div className={`absolute -top-[20%] -left-[10%] w-[80%] h-[80%] rounded-full blur-[120px] ${product.theme.glow} opacity-60`} />
                        </div>

                        {/* Top Content */}
                        <div className="relative z-10 max-w-xl">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="font-mono text-xs font-medium px-2 py-1 rounded bg-black/5 dark:bg-white/10 text-black/70 dark:text-white/80 border border-black/10 dark:border-white/10">
                                    REV_{product.id}
                                </span>
                                {product.comingSoon && (
                                    <span className="font-mono text-xs font-medium px-2 py-1 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400 animate-pulse" />
                                        COMING SOON
                                    </span>
                                )}
                            </div>

                            <h2 className="text-5xl sm:text-6xl font-semibold tracking-tight mb-4">
                                {product.name}
                            </h2>
                            <p className={`text-xl font-medium mb-6 ${product.theme.text}`}>
                                {product.tagline}
                            </p>
                            <p className={`text-[15px] leading-relaxed mb-10 ${product.theme.muted}`}>
                                {product.description}
                            </p>

                            {/* Specs - Raycast Command Style */}
                            <div className="flex flex-col gap-2 mb-12">
                                {product.specs.map((spec, idx) => {
                                    const Icon = spec.icon;
                                    return (
                                        <div
                                            key={idx}
                                            className={`flex items-center gap-3 p-3 rounded-lg border transition-colors cursor-default ${product.theme.card}`}
                                        >
                                            <div className="p-1.5 rounded-md bg-black/5 dark:bg-white/5 text-black/70 dark:text-white/70">
                                                <Icon className="w-4 h-4" />
                                            </div>
                                            <span className="text-[13px] font-medium text-black/90 dark:text-white/90">
                                                {spec.text}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Bottom Content / CTA */}
                        <div className={`relative z-10 mt-auto pt-8 border-t ${product.theme.border} flex flex-col sm:flex-row sm:items-center justify-between gap-6`}>
                            <div className="flex flex-col">
                                <span className="text-[11px] font-mono uppercase tracking-wider text-gray-500 dark:text-[#888888] mb-1">
                                    {product.comingSoon ? 'Target MSRP' : 'Starting at'}
                                </span>
                                <span className="text-2xl font-semibold font-mono tracking-tight">
                                    {product.price}
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <NextLink href={`/products/${product.name.toLowerCase().replace(/\s+/g, '-')}`}>
                                    <button className={`px-5 py-2.5 rounded-lg text-[13px] font-medium transition-all flex items-center gap-2 ${product.theme.buttonSecondary}`}>
                                        Learn More
                                    </button>
                                </NextLink>
                                <button className={`px-5 py-2.5 rounded-lg text-[13px] font-medium transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.1)] ${product.theme.buttonPrimary}`}>
                                    {product.comingSoon ? 'Get Notified' : 'Order Now'}
                                    {product.comingSoon ? <Bell className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                    </section>
                ))}

            </main>
            <Footer />
        </div>

    );
}