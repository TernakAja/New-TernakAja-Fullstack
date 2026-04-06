import React from 'react';
import { Leaf, ChevronRight, Activity, ShieldAlert, Database, Cpu, Stethoscope, X } from 'lucide-react';
import { cn } from "@/lib/utils";

export const HeroSection = () => {
    return (
        <section className="relative w-full mt-12 pt-12 pb-20 overflow-hidden px-6">
            {/* Grid Background */}
            <div
                className={cn(
                    "absolute inset-0 z-0",
                    "[background-size:40px_40px]",
                    "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
                    "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
                )}
            />
            {/* Radial gradient mask to fade grid at the edges */}
            <div className="pointer-events-none absolute inset-0 z-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>


            {/* Header Copy */}
            <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 mb-16 relative z-10 max-w-6xl mx-auto">
                <div className="max-w-5xl">
                    <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-bold tracking-tight text-foreground leading-[1.05] mb-6">
                        Merevolusi peternakan dengan teknologi AI dan IoT.
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl font-medium">
                        Dirancang khusus untuk merencanakan bobot dan memantau kesehatan. Dibangun untuk mengamankan pasokan pangan di era IoT.
                    </p>
                </div>


            </div>



            {/* App Dashboard Mockup (Above the fold centerpiece) */}
            <div className="relative w-full max-w-6xl mx-auto rounded-xl border border-white/10 bg-[#111111] overflow-hidden shadow-[0_30px_100px_-20px_rgba(0,0,0,1)] flex flex-col z-20 h-[500px] md:h-[650px]">
                {/* Window Controls */}
                <div className="flex items-center gap-2 px-4 h-12 border-b border-white/5 bg-[#161616]">
                    <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                    <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                    <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                    <div className="ml-4 flex items-center gap-2 text-xs font-medium text-zinc-500">

                        <span>TernakBoard</span>
                        <ChevronRight className="w-3 h-3 text-zinc-700" />
                    </div>
                </div>

                {/* Dashboard Content */}
                <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar */}
                    <div className="w-[200px] border-r border-white/5 bg-[#0A0A0A] hidden md:flex flex-col py-6 px-4">
                        <div className="px-2 mb-6 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Menu</div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-3 px-3 py-2 rounded-md bg-emerald-500/10 text-sm text-emerald-500 font-medium">
                                <Activity className="w-4 h-4" /> Overview
                            </div>
                            <div className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-zinc-400 hover:text-white transition-colors cursor-pointer">
                                <Database className="w-4 h-4" /> Livestock
                            </div>
                            <div className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-zinc-400 hover:text-white transition-colors cursor-pointer">
                                <Stethoscope className="w-4 h-4" /> Health
                            </div>
                        </div>
                    </div>

                    {/* Main Area */}
                    <div className="flex-1 bg-[#141414] p-6 md:p-8 overflow-y-auto hidden-scrollbar">
                        {/* Header */}
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-white">Farm Overview</h2>
                            <p className="text-sm text-zinc-400 mt-1">Monitor real-time telemetry from your herds.</p>
                        </div>

                        {/* 4 Stat Cards Grid */}
                        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
                            {/* Card 1 */}
                            <div className="p-5 rounded-xl border border-white/5 bg-[#1A1A1A] flex flex-col justify-between">
                                <div className="text-sm text-zinc-400 mb-3">Total Livestock</div>
                                <div>
                                    <div className="text-3xl font-bold text-white mb-1">1,248</div>
                                    <div className="text-xs text-emerald-500 font-medium">+12 this month</div>
                                </div>
                            </div>
                            {/* Card 2 */}
                            <div className="p-5 rounded-xl border border-white/5 bg-[#1A1A1A] flex flex-col justify-between">
                                <div className="text-sm text-zinc-400 mb-3">Avg Herd Temp</div>
                                <div>
                                    <div className="text-3xl font-bold text-white mb-1">38.7°C</div>
                                    <div className="text-xs text-emerald-500 font-medium">-0.2°C from normal</div>
                                </div>
                            </div>
                            {/* Card 3 */}
                            <div className="p-5 rounded-xl border border-white/5 bg-[#1A1A1A] flex flex-col justify-between">
                                <div className="text-sm text-zinc-400 mb-3">Critical Sensors</div>
                                <div>
                                    <div className="text-3xl font-bold text-white mb-1">3</div>
                                    <div className="text-xs text-red-500 font-medium">Needs immediate attention</div>
                                </div>
                            </div>
                            {/* Card 4 */}
                            <div className="p-5 rounded-xl border border-white/5 bg-[#1A1A1A] flex flex-col justify-between">
                                <div className="text-sm text-zinc-400 mb-3">Offline Devices</div>
                                <div>
                                    <div className="text-3xl font-bold text-zinc-500 mb-1">No Data</div>
                                    <div className="text-xs text-zinc-500 font-medium">Last 24 hours</div>
                                </div>
                            </div>
                        </div>

                        {/* Chart and Alerts Area */}
                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                            {/* Chart */}
                            <div className="xl:col-span-2 p-5 rounded-xl border border-white/5 bg-[#1A1A1A] flex flex-col h-56">
                                <div className="text-sm font-medium text-white mb-4">Telemetry & Health Trends</div>
                                <div className="flex-1 w-full relative">
                                    {/* Mock area chart with SVG gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/20 to-transparent clip-path-chart"></div>
                                    <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                                        <defs>
                                            <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                                                <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                                                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>
                                        <path d="M0,100 L0,70 C20,80 30,85 45,65 C60,45 70,30 100,50 L100,100 Z" fill="url(#chartGradient)" />
                                        <path d="M0,70 C20,80 30,85 45,65 C60,45 70,30 100,50" fill="none" stroke="#10b981" strokeWidth="2.5" className="drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                    </svg>
                                </div>
                                {/* X-axis mock labels */}
                                <div className="flex justify-between text-[10px] text-zinc-500 mt-2">
                                    <span>12 AM</span>
                                    <span>4 AM</span>
                                    <span>8 AM</span>
                                    <span>12 PM</span>
                                    <span>4 PM</span>
                                    <span>8 PM</span>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="p-5 rounded-xl border border-white/5 bg-[#1A1A1A] flex flex-col items-center justify-center text-center h-56">
                                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
                                    <ShieldAlert className="w-6 h-6 text-emerald-500" />
                                </div>
                                <div className="text-base font-semibold text-white mb-2">No Critical Alerts</div>
                                <div className="text-xs text-zinc-400 px-4 leading-relaxed">
                                    All environmental sensors and health markers are operating within expected parameters.
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};
