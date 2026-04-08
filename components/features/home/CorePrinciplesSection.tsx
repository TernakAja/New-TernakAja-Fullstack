import React from 'react';
import { Activity, Cpu, Database } from 'lucide-react';

export const CorePrinciplesSection = () => {
    return (
        <section className="max-w-7xl mx-auto px-6 py-24 border-t border-border">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-20 max-w-5xl leading-tight">
                <span className="text-foreground">Standar baru ekosistem peternakan.</span>{' '}
                <span className="text-muted-foreground">
                    Dirancang khusus untuk menekan defisit daging nasional dengan analitik AI di intinya, TernakAja meredefinisi cara mengelola ketahanan pangan.
                </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                {/* Kolom 1 */}
                <div className="group flex flex-col border-t border-zinc-200 dark:border-white/10 pt-6">
                    <div className="text-[10px] text-zinc-500 dark:text-zinc-600 font-mono mb-8 tracking-widest uppercase">Fig 0.1</div>

                    <div className="h-48 w-full mb-8 relative flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute w-32 h-32 border border-zinc-300 dark:border-zinc-700/50 rotate-45 group-hover:border-emerald-500/30 transition-colors"></div>
                        <div className="absolute w-28 h-28 border border-zinc-300 dark:border-zinc-700/50 rotate-45 translate-y-4 group-hover:border-emerald-500/20 transition-colors"></div>
                        <div className="absolute w-24 h-24 border border-zinc-300 dark:border-zinc-700/50 rotate-45 translate-y-8 group-hover:border-emerald-500/10 transition-colors"></div>
                        <Activity className="w-6 h-6 text-zinc-400 dark:text-zinc-500 group-hover:text-emerald-400 absolute z-10 transition-colors" />
                    </div>

                    <h3 className="text-foreground font-medium mb-3">Hardware Terkalibrasi</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Eartag 40g Polypropylene dilengkapi sensor PPG & Infrared. Memantau HR, Suhu Inti, dan SpO2 secara persisten dalam kondisi lingkungan ekstrem.
                    </p>
                </div>

                {/* Kolom 2 */}
                <div className="group flex flex-col border-t border-zinc-200 dark:border-white/10 md:border-l md:border-t-0 md:pl-8 pt-6 md:pt-0 mt-6 md:mt-0 relative">
                    <div className="hidden md:block absolute top-0 left-0 w-px h-6 bg-emerald-500/30"></div>
                    <div className="text-[10px] text-zinc-500 dark:text-zinc-600 font-mono mb-8 tracking-widest uppercase md:mt-6">Fig 0.2</div>

                    <div className="h-48 w-full mb-8 relative flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="grid grid-cols-2 gap-2 transform -skew-x-12">
                            <div className="w-12 h-12 border border-zinc-300 dark:border-zinc-700/50 group-hover:bg-emerald-500/5 transition-colors"></div>
                            <div className="w-12 h-12 border border-zinc-300 dark:border-zinc-700/50 group-hover:bg-emerald-500/10 transition-colors translate-y-4"></div>
                            <div className="w-12 h-12 border border-zinc-300 dark:border-zinc-700/50 group-hover:bg-emerald-500/10 transition-colors -translate-y-4"></div>
                            <div className="w-12 h-12 border border-zinc-300 dark:border-zinc-700/50 group-hover:bg-emerald-500/20 transition-colors"></div>
                        </div>
                        <Cpu className="w-6 h-6 text-zinc-400 dark:text-zinc-500 group-hover:text-emerald-400 absolute z-10 transition-colors" />
                    </div>

                    <h3 className="text-foreground font-medium mb-3">Ditenagai Agen AI</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Algoritma klasifikasi menganalisis data deret waktu untuk mengisolasi penanda penyakit dan anomali estrus sebelum gejala fisik termanifestasi.
                    </p>
                </div>

                {/* Kolom 3 */}
                <div className="group flex flex-col border-t border-zinc-200 dark:border-white/10 md:border-l md:border-t-0 md:pl-8 pt-6 md:pt-0 mt-6 md:mt-0 relative">
                    <div className="hidden md:block absolute top-0 left-0 w-px h-6 bg-emerald-500/30"></div>
                    <div className="text-[10px] text-zinc-500 dark:text-zinc-600 font-mono mb-8 tracking-widest uppercase md:mt-6">Fig 0.3</div>

                    <div className="h-48 w-full mb-8 relative flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="flex flex-col gap-1 items-end transform -rotate-12">
                            <div className="h-1 bg-zinc-300 dark:bg-zinc-700/50 w-24 group-hover:bg-emerald-500/20 transition-colors"></div>
                            <div className="h-1 bg-zinc-300 dark:bg-zinc-700/50 w-20 group-hover:bg-emerald-500/30 transition-colors"></div>
                            <div className="h-1 bg-zinc-300 dark:bg-zinc-700/50 w-28 group-hover:bg-emerald-500/40 transition-colors"></div>
                            <div className="h-1 bg-zinc-300 dark:bg-zinc-700/50 w-16 group-hover:bg-emerald-500/50 transition-colors"></div>
                            <div className="h-1 bg-zinc-300 dark:bg-zinc-700/50 w-32 group-hover:bg-emerald-500/60 transition-colors"></div>
                        </div>
                        <Database className="w-6 h-6 text-zinc-400 dark:text-zinc-500 group-hover:text-emerald-400 absolute z-10 transition-colors" />
                    </div>

                    <h3 className="text-foreground font-medium mb-3">Dirancang Untuk Skala</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Penyelarasan langsung dengan ISIKHNAS & SIKOMANDAN. Otomatisasi push data suspek dan vaksinasi ke database nasional tanpa intervensi manual.
                    </p>
                </div>
            </div>
        </section>
    );
};
