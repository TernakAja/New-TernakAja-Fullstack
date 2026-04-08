import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function InformationPage() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-emerald-500/30 flex flex-col">
            <Navbar />
            <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-32 mt-16">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">Information</h1>
                <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed">
                    Pelajari lebih lanjut tentang bagaimana sistem AI dan IoT TernakAja bekerja dalam ekosistem peternakan skala nasional.
                </p>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="py-8 px-10 rounded-3xl border border-border bg-card">
                        <div className="text-emerald-600 dark:text-emerald-400 font-bold tracking-widest text-xs mb-4">SISTEM TERINTEGRASI</div>
                        <h2 className="text-2xl font-semibold mb-4">Masa Depan Pemantauan</h2>
                        <p className="text-muted-foreground leading-relaxed">Platform kami menggabungkan telemetri lapangan dengan analitik AI yang dikonfigurasi khusus untuk mendeteksi penyakit dan manajemen peternakan skala besar. Sinkronisasi dengan database eksternal seperti ISIKHNAS menjadikan kepatuhan regulasi menjadi sebuah proses otomatis tanpa intervensi manual.</p>
                    </div>

                    <div className="py-8 px-10 rounded-3xl border border-border bg-card flex flex-col items-center justify-center opacity-80 border-dashed min-h-[300px]">
                        <span className="text-sm font-medium text-muted-foreground text-center uppercase tracking-widest">[Diagram Arsitektur IoT]</span>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
