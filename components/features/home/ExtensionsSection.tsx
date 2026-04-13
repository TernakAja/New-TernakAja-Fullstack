import React from 'react';
import { Stethoscope, Database, Activity } from 'lucide-react';

const extensions = [
    {
        id: 'ai-health',
        name: 'Klasifikasi Kesehatan AI',
        icon: Stethoscope,
        description: 'Menganalisis HR dan suhu inti secara kontinu untuk mengklasifikasikan kesehatan kawanan dan memprediksi wabah PMK.',
        glowColor: 'bg-emerald-500/20'
    },
    {
        id: 'isikhnas',
        name: 'Gateway ISIKHNAS',
        icon: Database,
        description: 'Integrasi API otomatis untuk mendorong telemetri lapangan dan riwayat vaksin langsung ke database nasional.',
        glowColor: 'bg-blue-500/20'
    },
    {
        id: 'hardware',
        name: 'Manajer IoT Eartag',
        icon: Activity,
        description: 'Kelola perangkat tag 40g Polypropylene. Pantau uptime sensor PPG & Infrared, serta tingkat daya baterai.',
        glowColor: 'bg-indigo-500/20'
    }
];

export const ExtensionsSection = () => {
    return (
        <section className="max-w-7xl mx-auto px-6 py-24 border-t border-border">
            <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-2">Infrastruktur untuk skala nasional.</h2>
                <p className="text-muted-foreground text-lg">Modul terintegrasi yang dirancang khusus untuk peternakan Indonesia.</p>
            </div>

            <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {extensions.map((ext) => (
                    <div
                        key={ext.id}
                        className="relative flex-none w-[340px] rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950 p-6 flex flex-col overflow-hidden snap-start group cursor-pointer shadow-sm dark:shadow-none"
                    >
                        <div className={`absolute -bottom-20 -right-20 w-64 h-64 rounded-full blur-[80px] opacity-20 dark:opacity-60 group-hover:opacity-40 dark:group-hover:opacity-100 transition-opacity duration-500 ${ext.glowColor}`}></div>

                        <div className="relative z-10 flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 flex items-center justify-center">
                                    <ext.icon className="w-5 h-5 text-foreground" />
                                </div>
                                <span className="font-semibold text-foreground">{ext.name}</span>
                            </div>
                        </div>

                        <p className="relative z-10 text-sm font-medium text-zinc-600 dark:text-zinc-200 leading-relaxed">
                            {ext.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};
