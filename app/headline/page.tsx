import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function HeadlinePage() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-emerald-500/30 flex flex-col">
            <Navbar />
            <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-32 mt-16">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">Berita & Pengumuman</h1>
                <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed mb-16">
                    Ikuti perkembangan terbaru mengenai teknologi peternakan modern dan terobosan IoT menuju ketahanan pangan.
                </p>

                <div className="flex flex-col gap-10">
                    <article className="pb-10 border-b border-border">
                        <div className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold tracking-wider mb-3">PERS BARU</div>
                        <h2 className="text-2xl font-bold mb-4 hover:underline cursor-pointer">TernakAja Memulai Pilot Project Eartag Generasi 2</h2>
                        <p className="text-muted-foreground mb-4">Kami dengan senang hati mengumumkan dimulainya pengujian lapangan untuk prototipe hardware terbaru dengan baterai bertahan hingga 3 tahun di wilayah dengan kondisi cuaca menantang.</p>
                        <div className="text-sm text-zinc-500">28 Maret 2026</div>
                    </article>

                    <article className="pb-10 border-b border-border">
                        <div className="text-sm text-indigo-500 font-semibold tracking-wider mb-3">PRODUK</div>
                        <h2 className="text-2xl font-bold mb-4 hover:underline cursor-pointer">Fitur Sinkronisasi ISIKHNAS Resmi Diluncurkan</h2>
                        <p className="text-muted-foreground mb-4">Kini integrasi API kami mendukung pelaporan otomatis anomali kesehatan untuk langsung meneruskan peringatan wabah ke database kementerian.</p>
                        <div className="text-sm text-zinc-500">12 Maret 2026</div>
                    </article>
                </div>
            </main>
            <Footer />
        </div>
    );
}