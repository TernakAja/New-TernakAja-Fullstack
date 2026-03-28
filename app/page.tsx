import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/features/home/HeroSection";
import { StatsStrip } from "@/components/features/home/StatsStrip";
import { CorePrinciplesSection } from "@/components/features/home/CorePrinciplesSection";
import { ExtensionsSection } from "@/components/features/home/ExtensionsSection";
import { ImpactSection } from "@/components/features/home/ImpactSection";

export default function HomePage() {
    // We use standard tailwind classes 'bg-background text-foreground' to enable automatic
    // switching using the globals.css variables between light/dark themes.
    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-emerald-500/30 overflow-hidden">
            <Navbar />
            <main>
                <HeroSection />
                <StatsStrip />
                <CorePrinciplesSection />
                <ExtensionsSection />
                <ImpactSection />
            </main>
            <Footer />
        </div>
    );
}
