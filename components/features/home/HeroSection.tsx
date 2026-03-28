import React from 'react';
import { Leaf, ChevronRight, Activity, ShieldAlert, Database, Cpu, Stethoscope, X } from 'lucide-react';

export const HeroSection = () => {
    return (
        <section className="relative max-w-[1400px] mt-12 mx-auto px-6 pt-12 pb-20">

            {/* Header Copy */}
            <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 mb-16 relative z-10 max-w-6xl mx-auto">
                <div className="max-w-3xl">
                    <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-bold tracking-tight text-foreground leading-[1.05] mb-6">
                        Sistem manajemen peternakan untuk tim dan AI.
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
                        <Leaf className="w-3 h-3" />
                        <span>TernakAja</span>
                        <ChevronRight className="w-3 h-3 text-zinc-700" />
                    </div>
                </div>

                {/* Dashboard Content */}
                <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar */}
                    <div className="w-60 border-r border-white/5 bg-[#0F0F0F] hidden md:flex flex-col py-4">
                        <div className="px-4 mb-6 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Workspace</div>
                        <div className="space-y-1 px-2">
                            <div className="flex items-center gap-3 px-2 py-1.5 rounded-md bg-white/5 text-sm text-white font-medium">
                                <Activity className="w-4 h-4 text-emerald-500" /> Vital Stats
                            </div>
                            <div className="flex items-center gap-3 px-2 py-1.5 rounded-md text-sm text-zinc-400 hover:text-white transition-colors cursor-pointer">
                                <ShieldAlert className="w-4 h-4" /> PMK Alerts
                            </div>
                            <div className="flex items-center gap-3 px-2 py-1.5 rounded-md text-sm text-zinc-400 hover:text-white transition-colors cursor-pointer">
                                <Database className="w-4 h-4" /> ISIKHNAS Sync
                            </div>
                        </div>
                    </div>

                    {/* Main Area */}
                    <div className="flex-1 bg-[#141414] p-6 md:p-10 relative">
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-white/5 pb-6 mb-6">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 uppercase tracking-wider">Warning</span>
                                    <span className="text-sm text-zinc-500">Tag-4092 • Sapi Limousin</span>
                                </div>
                                <h2 className="text-2xl font-semibold text-white">Lonjakan Suhu Inti Terdeteksi</h2>
                            </div>
                            <div className="hidden md:flex items-center gap-2">
                                <button className="px-3 py-1.5 rounded-md border border-white/10 text-xs font-medium text-zinc-300 hover:bg-white/5">Abaikan</button>
                                <button className="px-3 py-1.5 rounded-md bg-white text-black text-xs font-medium hover:bg-zinc-200">Karantina</button>
                            </div>
                        </div>

                        {/* Content Body */}
                        <div className="space-y-4">
                            <div className="p-4 rounded-lg border border-white/5 bg-[#1A1A1A]">
                                <div className="flex items-center gap-2 mb-2">
                                    <Cpu className="w-4 h-4 text-indigo-400" />
                                    <span className="text-sm font-medium text-indigo-400">TernakAI Agent</span>
                                    <span className="text-xs text-zinc-600">· 2 mnt lalu</span>
                                </div>
                                <p className="text-sm text-zinc-300 leading-relaxed">
                                    Mendeteksi anomali pada Suhu Inti (39.5°C) dan penurunan SpO2 (92%). Kondisi ini memiliki korelasi 87% dengan fase awal PMK berdasarkan data historis bulan lalu.
                                </p>
                            </div>
                            <div className="p-4 rounded-lg border border-white/5 bg-transparent flex items-center gap-4 opacity-50">
                                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs">Dr</div>
                                <div className="text-sm text-zinc-400">
                                    <span className="text-white font-medium">Dr. Hendra</span> sedang meninjau data ini...
                                </div>
                            </div>
                        </div>

                        {/* Floating AI Panel (Copilot equivalent) */}
                        <div className="absolute bottom-6 right-6 w-80 rounded-xl border border-white/10 bg-[#1C1C1C] shadow-2xl hidden lg:flex flex-col">
                            <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Stethoscope className="w-4 h-4 text-emerald-400" />
                                    <span className="text-xs font-medium text-white">TernakAI Copilot</span>
                                </div>
                                <X className="w-3 h-3 text-zinc-500" />
                            </div>
                            <div className="p-4 space-y-3">
                                <div className="h-2 w-full bg-white/5 rounded"></div>
                                <div className="h-2 w-3/4 bg-white/5 rounded"></div>
                                <div className="text-[10px] text-zinc-500 mt-4">Generate laporan ISIKHNAS otomatis...</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
