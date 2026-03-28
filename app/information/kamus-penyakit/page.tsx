import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Page() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col pt-24">
            <Navbar />
            <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Kamus Penyakit & Obat</h1>
                <p className="text-lg text-muted-foreground mb-12">Database of symptoms, prevention, and localized medicine recommendations.</p>
                <div className="bg-zinc-50 dark:bg-zinc-900 border border-border p-8 rounded-3xl text-center">
                    <p className="text-muted-foreground">Content for this section is currently under development.</p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
