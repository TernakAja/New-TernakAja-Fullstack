"use client";

import React, { useState } from 'react';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
    ArrowRight,
    ArrowLeft,
    ChevronLeft,
    ChevronRight,
    Check,
    HeartPulse,
    Thermometer,
    ThermometerSun,
    Activity,
    BellRing,
    ShieldCheck
} from 'lucide-react';

const FEATURES_DATA = [
    {
        icon: HeartPulse,
        title: "Continuous Heart Rate",
        description: "Real-time cardiac tracking to detect stress, illness, or estrus early before visual symptoms manifest."
    },
    {
        icon: Thermometer,
        title: "Core Body Temperature",
        description: "High-precision internal thermal sensors flag fever, mastitis, or heat stress instantly."
    },
    {
        icon: Activity,
        title: "SpO2 & Blood Oxygen",
        description: "Advanced photoplethysmography adapted for bovine tissue ensures accurate respiratory and oxygenation monitoring."
    },
    {
        icon: ThermometerSun,
        title: "Ambient Temperature",
        description: "Correlate internal animal health metrics with surrounding environmental data to manage herd microclimates."
    }
];

const HERO_IMAGES = [
    "/products/petsa-01/1.png",
    "/products/petsa-01/2.png",
    "/products/petsa-01/3.png"
];

const COMPARISON_DATA = [
    {
        feature: "Real-time SpO2 & Heart Rate telemetry",
        petsa: true,
        traditional: "—"
    },
    {
        feature: "Continuous Core Body Temperature tracking",
        petsa: true,
        traditional: "Requires manual rectal thermometry"
    },
    {
        feature: "Automated early illness & estrus alerts",
        petsa: true,
        traditional: "Reliant on lagging visual symptoms"
    },
    {
        feature: "Correlated ambient environmental sensing",
        petsa: true,
        traditional: "Requires separate barn infrastructure"
    },
    {
        feature: "Chew-proof, IP68 ruggedized form factor",
        petsa: true,
        traditional: "Standard plastic tags break or fade"
    },
    {
        feature: "Automated sync to TernakDashboard",
        petsa: true,
        traditional: "Manual data entry to spreadsheets"
    }
];

export default function Petsa01Page() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);
    };

    return (
        <div className="min-h-screen w-full bg-white dark:bg-[#0A0A0A] font-sans antialiased selection:bg-neutral-200 dark:selection:bg-white/30 text-black dark:text-white">
            <Navbar />
            <main className="flex-1">

                {/* --- SECTION 1: HERO --- */}
                <section className="relative flex w-full flex-col items-center justify-center overflow-hidden px-4 pt-32 pb-16">
                    {/* Ambient Glow */}
                    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden">
                        <div className="absolute inset-0 blur-[100px] bg-blue-500/5 dark:bg-white/5 rounded-full" />
                    </div>

                    <div className="relative z-10 flex w-full max-w-5xl flex-col items-center text-center">
                        <header className="mb-16 flex flex-col items-center">
                            <h2 className="mb-4 text-4xl font-bold tracking-tight text-black dark:text-white md:text-5xl lg:text-[2.75rem]">
                                PETSA 01
                            </h2>
                            <p className="max-w-[45rem] text-sm leading-relaxed text-gray-600 dark:text-[#888888] sm:text-base">
                                Precision livestock monitoring. Real-time SpO2, heart rate, and temperature tracking
                                <br className="hidden sm:block" />
                                engineered into a rugged, non-invasive eartag.
                            </p>
                        </header>

                        <div className="group relative flex w-full max-w-xs items-center justify-center sm:max-w-sm md:max-w-md lg:max-w-lg">
                            <img
                                src={HERO_IMAGES[0]}
                                className="invisible h-auto w-full object-contain pointer-events-none"
                                aria-hidden="true"
                                alt=""
                            />

                            {HERO_IMAGES.map((src, index) => (
                                <img
                                    key={index}
                                    src={src}
                                    alt={`PETSA 01 View ${index + 1}`}
                                    className={`absolute left-0 top-0 h-full w-full object-contain drop-shadow-2xl transition-all duration-700 ease-in-out ${index === currentImageIndex
                                        ? 'opacity-100 z-10 scale-100 hover:scale-105'
                                        : 'opacity-0 z-0 scale-95 pointer-events-none'
                                        }`}
                                    loading={index === 0 ? "eager" : "lazy"}
                                />
                            ))}

                            <button
                                onClick={prevImage}
                                className="absolute -left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-[#171717]/60 text-gray-600 dark:text-white/70 backdrop-blur-md transition-colors hover:bg-gray-100 dark:hover:bg-white/20 hover:text-black dark:hover:text-white sm:-left-12"
                                aria-label="Previous image"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>

                            <button
                                onClick={nextImage}
                                className="absolute -right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-[#171717]/60 text-gray-600 dark:text-white/70 backdrop-blur-md transition-colors hover:bg-gray-100 dark:hover:bg-white/20 hover:text-black dark:hover:text-white sm:-right-12"
                                aria-label="Next image"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>

                            <div className="absolute -bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
                                {HERO_IMAGES.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${index === currentImageIndex ? 'w-6 bg-black dark:bg-white' : 'w-1.5 bg-black/20 dark:bg-white/30 hover:bg-black/40 dark:hover:bg-white/50'
                                            }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- SECTION 2: ALERTS & RUGGEDNESS --- */}
                <section className="relative z-10 flex w-full flex-col items-center px-4 pb-24">
                    <div className="w-full max-w-5xl space-y-6">

                        {/* Banner */}
                        <div className="relative overflow-hidden rounded-xl border border-amber-500/20 bg-amber-50 dark:bg-[#110808] p-6 shadow-sm dark:shadow-[0_0_30px_-10px_rgba(245,158,11,0.1)] sm:p-8">
                            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between relative z-10">
                                <div className="flex-1">
                                    <h3 className="mb-2 text-lg font-semibold text-amber-800 dark:text-amber-500 sm:text-xl flex items-center gap-2">

                                        Coming Soon
                                    </h3>
                                    <p className="text-sm text-amber-700/80 dark:text-[#a3a3a3]">
                                        Join the beta program for our next-generation herd analytics platform.
                                    </p>
                                </div>

                                <form className="flex w-full flex-col gap-3 sm:flex-row md:w-auto md:items-center">
                                    <input
                                        type="email"
                                        placeholder="farm-manager@domain.com"
                                        className="w-full rounded-lg border border-amber-500/20 dark:border-white/5 bg-white dark:bg-[#171717] px-4 py-2.5 text-sm text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-[#555] focus:border-amber-500/50 focus:outline-none sm:w-64"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="group flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-amber-500/10 dark:bg-[#2a170f] px-5 py-2.5 text-sm font-medium text-amber-700 dark:text-amber-500 transition-colors hover:bg-amber-500/20 dark:hover:bg-[#3d2415] sm:w-auto border border-amber-500/20"
                                    >
                                        Notify Me
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            {/* Card: Alerts */}
                            <div className="relative flex flex-col justify-between overflow-hidden rounded-xl border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-[#111111] p-8 hover:bg-gray-100 dark:hover:bg-white/[0.05] transition-colors">
                                <div className="relative z-10 lg:w-[65%]">
                                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 shadow-sm dark:shadow-none">
                                        <BellRing className="w-6 h-6 text-gray-700 dark:text-[#d4d4d4]" />
                                    </div>
                                    <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">Real-time health alerts</h3>
                                    <p className="text-sm leading-relaxed text-gray-600 dark:text-[#888888]">
                                        Receive instant notifications for abnormal SpO2, elevated core temperatures, or irregular heartbeats before clinical symptoms appear in your livestock.
                                    </p>
                                </div>

                                {/* Timeline Log Decor */}
                                <div className="absolute bottom-0 right-0 top-0 hidden w-[35%] flex-col justify-center border-l border-dashed border-gray-200 dark:border-white/10 pl-6 lg:flex">
                                    <div className="absolute left-[-1px] top-1/2 h-48 w-[1px] -translate-y-1/2 bg-gradient-to-b from-transparent via-gray-300 dark:via-[#4b4b4b] to-transparent" />

                                    <div className="flex flex-col gap-6">
                                        <div className="relative flex items-center">
                                            <div className="absolute -left-[30px] flex h-[10px] w-[10px] items-center justify-center rounded-full border border-red-500 bg-white dark:bg-[#171717]">
                                                <div className="h-[4px] w-[4px] rounded-full bg-red-500" />
                                            </div>
                                            <span className="whitespace-nowrap rounded-md border border-gray-200 dark:border-white/5 bg-white dark:bg-white/5 px-2 py-1 font-mono text-[10px] text-gray-500 dark:text-[#888888]">
                                                Cow #142: High Temp
                                            </span>
                                        </div>

                                        <div className="relative flex items-center">
                                            <div className="absolute -left-[30px] flex h-[10px] w-[10px] items-center justify-center rounded-full border border-amber-500 bg-white dark:bg-[#171717]">
                                                <div className="h-[4px] w-[4px] rounded-full bg-amber-500" />
                                            </div>
                                            <span className="whitespace-nowrap rounded-md border border-gray-200 dark:border-white/5 bg-white dark:bg-white/5 px-2 py-1 font-mono text-[10px] text-gray-500 dark:text-[#888888]">
                                                Cow #089: SpO2 drop
                                            </span>
                                        </div>

                                        <div className="relative flex items-center">
                                            <div className="absolute -left-[30px] flex h-[10px] w-[10px] items-center justify-center rounded-full border border-emerald-500 bg-white dark:bg-[#171717]">
                                                <div className="h-[4px] w-[4px] rounded-full bg-emerald-500" />
                                            </div>
                                            <span className="whitespace-nowrap rounded-md border border-gray-200 dark:border-white/5 bg-white dark:bg-white/5 px-2 py-1 font-mono text-[10px] text-gray-500 dark:text-[#888888]">
                                                Herd: Activity normal
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card: Hardware */}
                            <div className="flex flex-col rounded-xl border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-[#111111] p-8 hover:bg-gray-100 dark:hover:bg-white/[0.05] transition-colors">
                                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 shadow-sm dark:shadow-none">
                                    <ShieldCheck className="w-6 h-6 text-gray-700 dark:text-[#d4d4d4]" />
                                </div>
                                <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">Ruggedized for the farm</h3>
                                <p className="text-sm leading-relaxed text-gray-600 dark:text-[#888888]">
                                    Built to withstand extreme agricultural environments. The IP68 rated, UV-resistant, and chew-proof design ensures continuous data transmission regardless of weather or herd behavior.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- SECTION 3: VITAL SENSORS GRID --- */}
                <section className="relative z-10 flex w-full flex-col items-center px-4 pb-24 pt-12">
                    <div className="w-full max-w-6xl">
                        <header className="mb-16 flex flex-col items-center text-center">
                            <h2 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl md:text-5xl">
                                Comprehensive Vital Sensing
                            </h2>
                            <p className="max-w-2xl text-base leading-relaxed text-gray-600 dark:text-[#888888] sm:text-lg">
                                Continuous monitoring of critical health metrics. Engineered for precision and animal welfare.
                            </p>
                        </header>

                        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {FEATURES_DATA.map((feature, index) => {
                                const Icon = feature.icon;
                                return (
                                    <div
                                        key={index}
                                        className="flex flex-col rounded-xl border border-gray-200 dark:border-white/5 bg-white dark:bg-white/[0.02] p-6 transition-colors hover:bg-gray-50 dark:hover:bg-white/[0.05]"
                                    >
                                        <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 shadow-sm dark:shadow-inner">
                                            <Icon className="w-5 h-5 text-gray-600 dark:text-[#a3a3a3]" strokeWidth={1.5} />
                                        </div>
                                        <h3 className="mb-3 text-sm font-semibold text-black dark:text-white">
                                            {feature.title}
                                        </h3>
                                        <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                                            {feature.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* --- SECTION 4: FEATURE SHOWCASE --- */}
                <section className="relative z-10 flex w-full flex-col items-center px-4 pb-24">
                    <div className="w-full max-w-6xl">
                        <div className="relative flex flex-col overflow-hidden rounded-[2rem] border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#0f0f0f] md:flex-row md:items-stretch shadow-sm dark:shadow-none">
                            <div className="relative min-h-[300px] w-full md:w-1/2">
                                <div
                                    className="absolute inset-0 bg-white dark:bg-[#141414]"

                                />
                                <img
                                    src="/e-isometric.png"
                                    alt="Placeholder Wireframe"
                                    className="absolute inset-0 h-full w-full object-cover object-left opacity-30 "
                                    loading="lazy"
                                />
                                <div className="absolute inset-y-0 right-0 hidden w-24 bg-gradient-to-l from-gray-50 dark:from-[#0f0f0f] to-transparent md:block" />
                            </div>

                            <div className="relative z-10 flex w-full flex-col justify-center p-8 md:w-1/2 md:p-16 lg:p-24 bg-white/50 dark:bg-transparent backdrop-blur-sm dark:backdrop-blur-none">
                                <h3 className="mb-4 text-2xl font-bold tracking-tight text-black dark:text-white sm:text-3xl md:text-4xl">
                                    Complete historical health data at your fingertips
                                </h3>
                                <p className="text-base leading-relaxed text-gray-600 dark:text-[#888888]">
                                    Track individual cow vitals over their entire lifecycle. Identify long-term trends, optimize breeding cycles, and prove animal welfare compliance with immutable historical records.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- SECTION 5: INTEGRATION & STATS --- */}
                <section className="relative flex w-full flex-col items-center pt-24 pb-12">
                    <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent" />

                    <div className="w-full max-w-5xl px-4 text-center">
                        <div className="mb-12 flex flex-col items-center">
                            <span className="mb-4 font-mono text-xs font-medium px-2 py-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
                                Integrated Software
                            </span>
                            <h2 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl md:text-5xl">
                                Connect with TernakBoard
                            </h2>
                            <p className="text-base text-gray-600 dark:text-[#888888] sm:text-lg">
                                Native synchronization with the TernakDashboard Application
                            </p>
                        </div>

                        <div className="relative mx-auto h-[280px] w-full max-w-3xl overflow-hidden rounded-t-xl border border-b-0 border-gray-200 dark:border-white/10 bg-white dark:bg-[#121212] shadow-xl dark:shadow-2xl">
                            <div className="flex items-center border-b border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-[#1a1a1a] px-4 py-3">
                                <div className="mr-3 flex h-6 w-6 items-center justify-center rounded bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-[#a3a3a3]">
                                    <ArrowLeft className="w-3 h-3" />
                                </div>
                                <span className="text-sm font-medium text-gray-600 dark:text-[#888888]">
                                    Ternak Dashboard Console
                                </span>
                            </div>
                            <div className="h-full w-full bg-gradient-to-b from-gray-100 dark:from-[#121212] to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-[#0A0A0A] to-transparent" />
                        </div>
                    </div>

                    <div className="w-full border-y border-emerald-500/20 dark:border-emerald-500/10 bg-emerald-50/50 dark:bg-emerald-950/20 py-16 backdrop-blur-sm">
                        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-12 px-4 text-center sm:grid-cols-3 sm:gap-8 relative z-10">
                            <div className="flex flex-col items-center justify-center">
                                <h4 className="mb-2 text-4xl font-bold tracking-tight text-emerald-600 dark:text-emerald-500 sm:text-5xl">
                                    14 days
                                </h4>
                                <p className="text-lg font-medium text-gray-700 dark:text-white/90">
                                    Early illness detection
                                </p>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <h4 className="mb-2 text-4xl font-bold tracking-tight text-emerald-600 dark:text-emerald-500 sm:text-5xl">
                                    30%
                                </h4>
                                <p className="text-lg font-medium text-gray-700 dark:text-white/90">
                                    Reduction in mortality
                                </p>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <h4 className="mb-2 text-4xl font-bold tracking-tight text-emerald-600 dark:text-emerald-500 sm:text-5xl">
                                    24/7
                                </h4>
                                <p className="text-lg font-medium text-gray-700 dark:text-white/90">
                                    Continuous herd visibility
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- SECTION 6: COMPARISON TABLE --- */}
                <section className="relative z-10 flex w-full flex-col items-center px-4 pb-32 pt-12">
                    <div className="w-full max-w-5xl overflow-x-auto pb-4">
                        <div className="min-w-[768px] rounded-2xl bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/5 p-8 md:p-12 shadow-sm dark:shadow-2xl">

                            <div className="mb-2 grid grid-cols-[2fr_1fr_1fr] gap-6 border-b border-gray-200 dark:border-white/10 pb-6 text-lg font-medium text-black dark:text-white">
                                <div></div>
                                <div className="text-center font-bold text-emerald-600 dark:text-emerald-500">PETSA 01</div>
                                <div className="text-center text-gray-500">Traditional Methods</div>
                            </div>

                            <div className="flex flex-col">
                                {COMPARISON_DATA.map((row, index) => (
                                    <div
                                        key={index}
                                        className={`grid grid-cols-[2fr_1fr_1fr] items-center gap-6 py-6 ${index !== COMPARISON_DATA.length - 1 ? 'border-b border-gray-100 dark:border-white/5' : ''
                                            }`}
                                    >
                                        <div className="text-sm leading-relaxed text-gray-700 dark:text-[#d4d4d4] md:text-base">
                                            {row.feature}
                                        </div>

                                        <div className="flex justify-center">
                                            {row.petsa && (
                                                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                                    <Check className="w-3 h-3" strokeWidth={3} />
                                                </div>
                                            )}
                                        </div>

                                        <div className="text-center text-sm text-gray-500 dark:text-[#888888] md:text-base">
                                            {row.traditional}
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}