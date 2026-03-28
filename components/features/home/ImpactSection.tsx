import React from 'react';
import { ShieldAlert } from 'lucide-react';

export const ImpactSection = () => {
    return (
        <section className="relative max-w-7xl mx-auto px-6 py-32 overflow-hidden border-t border-zinc-200 dark:border-white/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">

                {/* Konten Kiri: Fokus pada Konversi Pendekatan Startup */}
                <div className="max-w-sm">
                    <h2 className="text-3xl font-bold text-foreground mb-4 tracking-tight">
                        Bukan sekadar alat pantau.
                    </h2>
                    {/* Miller's Law: Memotong teks menjadi informasi padat */}
                    <p className="text-base text-muted-foreground mb-8 leading-relaxed">
                        Ini tentang mencegah kerugian ekonomi skala nasional sebelum gejala klinis muncul pada sapi Anda. Peralihan menuju peternakan modern berbasis data dimulai dari sini.
                    </p>
                    <button className="px-6 py-3 rounded-lg bg-foreground text-background text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity">
                        <ShieldAlert className="w-4 h-4" />
                        Mulai Pilot Project
                    </button>
                </div>

                {/* Gambar Kanan: Penyesuaian murni sebagai gambar di balik transisi (tanpa border/card) */}
                <div className="relative h-[450px] w-full md:w-[130%] -right-10 md:-right-20">
                    {/* Layer Fade (Shade) untuk integrasi dengan background utama */}
                    <div className="absolute inset-0 z-10 bg-gradient-to-r from-background via-background/20 to-transparent"></div>
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-transparent to-background/80"></div>
                    <div className="absolute inset-0 z-10 bg-gradient-to-b from-background via-transparent to-background"></div>

                    {/* Image Placeholder sebenarnya (Hanya bentuk gambar murni) */}
                    <div className="absolute inset-0 bg-zinc-200/50 dark:bg-zinc-900/40 flex flex-col items-center justify-center overflow-hidden">
                        {/* Tekstur grid hardware murni */}
                        <div className="absolute inset-0 opacity-20 dark:opacity-20 bg-[linear-gradient(to_right,#80808030_1px,transparent_1px),linear-gradient(to_bottom,#80808030_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>

                        <div className="relative z-0 flex flex-col items-center gap-2 text-zinc-500 dark:text-zinc-600">
                            <span className="uppercase tracking-widest text-xs font-semibold">[Gambar Flat Hardware/UI Ditempatkan di Sini]</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};
