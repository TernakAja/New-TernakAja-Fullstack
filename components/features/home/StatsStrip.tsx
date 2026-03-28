import React from 'react';

export const StatsStrip = () => {
    return (
        <section className="border-y border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-zinc-900/20 relative z-20">
            <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 text-center md:text-left">
                <div>
                    <div className="text-3xl md:text-4xl font-bold text-red-600 dark:text-red-400 mb-1">-Rp 8 Triliun</div>
                    <div className="text-xs md:text-sm text-zinc-600 dark:text-zinc-500 uppercase tracking-wider font-medium">Kerugian Ekonomi Akibat PMK</div>
                </div>
                <div className="hidden md:block w-px h-12 bg-zinc-300 dark:bg-white/10"></div>
                <div>
                    <div className="text-3xl md:text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">245 Ribu Ton</div>
                    <div className="text-xs md:text-sm text-zinc-600 dark:text-zinc-500 uppercase tracking-wider font-medium">Defisit Daging Nasional</div>
                </div>
                <div className="hidden md:block w-px h-12 bg-zinc-300 dark:bg-white/10"></div>
                <div>
                    <div className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-1">Rp 120.000</div>
                    <div className="text-xs md:text-sm text-zinc-600 dark:text-zinc-500 uppercase tracking-wider font-medium">Target Skalabilitas COGS Hardware</div>
                </div>
            </div>
        </section>
    );
};
