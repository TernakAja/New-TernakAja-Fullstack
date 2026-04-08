import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Page() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col pt-24">
            <Navbar />
            <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Regulasi & Perizinan</h1>
                <p className="text-lg text-muted-foreground mb-12">Updates on government livestock policies, SKU/NIB requirements, and export-import rules.</p>
                <div className="bg-card border border-border p-8 rounded-3xl text-center">
                    <p className="text-muted-foreground">Content for this section is currently under development.</p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
