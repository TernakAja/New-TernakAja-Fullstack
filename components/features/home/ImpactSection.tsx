
import { ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ImpactSection = () => {
    return (
        <section className="relative max-w-7xl mx-auto px-6 py-32 overflow-hidden border-t border-border">
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
                    <Button className="gap-2">
                        <ShieldAlert className="w-4 h-4" />
                        Mulai Pilot Project
                    </Button>
                </div>

                {/* Gambar Kanan: Penyesuaian murni sebagai gambar di balik transisi (tanpa border/card) */}
                <div className="relative h-[450px] w-full md:w-[130%] -right-10 md:-right-20">
                    {/* Layer Fade (Shade) Radial untuk integrasi dengan background utama */}
                    <div className="absolute inset-0 z-10 pointer-events-none" style={{ maskImage: 'radial-gradient(circle at 40% 50%, transparent 20%, black 80%)', WebkitMaskImage: 'radial-gradient(circle at 40% 50%, transparent 20%, black 80%)' }}>
                        <div className="absolute inset-0 bg-background"></div>
                    </div>

                    {/* Image Placeholder sebenarnya (Hanya bentuk gambar murni) */}
                    <div className="absolute inset-0 bg-transparent flex flex-col items-center justify-center overflow-hidden">
                        {/* Tekstur grid hardware murni (diturunkan ke belakang opacity image) */}
                        <div className="absolute inset-0 opacity-20 dark:opacity-20 bg-[linear-gradient(to_right,#80808030_1px,transparent_1px),linear-gradient(to_bottom,#80808030_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10"></div>

                        <div className="relative z-0 flex flex-col items-center gap-2">
                            <img className='mr-56 w-full h-[450px] object-cover [mask-image:radial-gradient(circle_at_45%_50%,black_30%,transparent_75%)]' src="/cow-assembly.png" alt="Cow with IoT sensor" />
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};
