import React from 'react';
import { ArrowRight, Cpu, Battery, Terminal, Sun, Activity, Bell } from 'lucide-react';
import NextLink from 'next/link';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from '@/components/layout/Footer';
import { products } from "./data"
export default function ProductsPage() {
    return (
        <div className="min-h-screen w-full bg-background text-foreground antialiased selection:bg-neutral-200 dark:selection:bg-white/30">
            <Navbar />
            {/* Main Split Layout */}
            <main className="grid grid-cols-1 lg:grid-cols-2 min-h-screen pt-14">
                {products.map((product, index) => (
                    <section
                        key={product.id}
                        className={`relative flex flex-col justify-between p-8 sm:p-12 lg:p-16 lg:pt-32 min-h-screen lg:min-h-[calc(100vh-3.5rem)] lg:h-auto overflow-hidden ${product.theme.bg} ${index === 0 ? 'lg:border-r' : ''} ${product.theme.border}`}
                    >
                        {/* Ambient Radial Glow */}
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                            <div className={`absolute -top-[20%] -left-[10%] w-[80%] h-[80%] rounded-full blur-[120px] ${product.theme.glow} opacity-60`} />
                        </div>

                        {/* Top Content */}
                        <div className="relative z-10 max-w-xl">
                            <div className="flex items-center gap-3 mb-6">


                            </div>

                            {/* {product.img && (
                                <img
                                    src={product.img}
                                    alt={product.name}
                                    className="w-full h-auto max-h-48 invert dark:invert-0 sm:max-h-64 lg:max-h-80 object-contain object-left drop-shadow-2xl transition-transform "
                                />
                            )} */}


                            <h2 className="text-5xl sm:text-6xl font-semibold tracking-tight mb-4 mt-10">
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
                                <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
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
