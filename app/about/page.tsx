import React from 'react';
import { Sprout, ChevronRight } from 'lucide-react';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-black text-white font-sans antialiased selection:bg-neutral-800 selection:text-white">
            <Navbar />
            <main className="relative pt-32 pb-40 overflow-hidden">

                {/* Background Dot Grid + Radial Glow */}
                <div className="absolute inset-0 z-0 flex justify-center pointer-events-none">
                    {/* Dot Grid */}
                    <div
                        className="absolute inset-0 opacity-[0.15]"
                        style={{
                            backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"24\" height=\"24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Ccircle cx=\"2\" cy=\"2\" r=\"1\" fill=\"white\"/%3E%3C/svg%3E')",
                            maskImage: 'radial-gradient(ellipse at center 20%, black 20%, transparent 60%)',
                            WebkitMaskImage: 'radial-gradient(ellipse at center 20%, black 20%, transparent 60%)',
                        }}
                    />
                    {/* Soft Glow */}
                    <div className="absolute top-[30%] w-[800px] h-[300px] bg-white/[0.03] blur-[120px] rounded-[100%]" />
                </div>

                {/* Hero Section */}
                <div className="relative z-10 max-w-[1200px] mx-auto px-6 flex flex-col items-start mt-12 md:mt-24">

                    <h1 className="text-4xl md:text-6xl lg:text-[5.5rem] tracking-tight text-white text-left leading-[1.05] max-w-4xl mb-6">
                        We want to build a smarter and sustainable livestock ecosystem in Indonesia
                    </h1>

                    <p className="text-[#888888] text-lg md:text-xl text-left max-w-2xl leading-relaxed">
                        Mewujudkan sistem peternakan digital yang berkelanjutan untuk meningkatkan ketahanan pangan nasional dan kesejahteraan peternak Indonesia.
                    </p>
                </div>

                {/* Story / Mission Section */}
                <div className="relative z-10 max-w-[1200px] mx-auto px-6 mt-40 md:mt-60">
                    <h2 className="text-3xl md:text-4xl font-medium text-white text-center mb-16 tracking-tight">
                        Our mission
                    </h2>

                    <div className="max-w-[640px] mx-auto text-[1.1rem] md:text-[1.2rem] text-[#888888] space-y-8 leading-relaxed">
                        <p>
                            TernakAja mengembangkan solusi <strong className="text-white font-medium">IoT</strong> dan <strong className="text-white font-medium">data analytics</strong> untuk memantau kesehatan ternak secara <strong className="text-white font-medium">real-time</strong>.
                        </p>
                        <p>
                            Kami bertekad mempercepat <strong className="text-white font-medium">digitalisasi peternakan</strong>, memastikan bahwa teknologi tidak hanya dapat diakses oleh korporasi besar, tetapi juga oleh peternak skala menengah dan kecil di seluruh pelosok negeri.
                        </p>
                        <p>
                            Lebih dari sekadar perangkat keras, tujuan utama kami adalah mendorong <strong className="text-white font-medium">kolaborasi</strong> antar pemangku kepentingan demi terciptanya ketahanan pangan yang berkelanjutan untuk masa depan.
                        </p>
                    </div>
                </div>

                {/* Team Section */}
                <div className="relative z-10 max-w-[1200px] mx-auto px-6 mt-40 md:mt-60 flex flex-col items-center">
                    <h2 className="text-3xl md:text-4xl font-medium text-white text-center mb-4 tracking-tight">
                        The team behind it
                    </h2>
                    <p className="text-[#888888] text-lg text-center max-w-md mb-8">
                        Sebuah tim dedikatif dengan misi membangun platform agrikultur cerdas terbaik di Indonesia.
                    </p>

                    <button className="flex items-center gap-2 bg-transparent border border-white/10 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-white/5 transition-colors mb-16">
                        Meet the team <ChevronRight className="w-4 h-4 text-[#888888]" />
                    </button>

                    {/* Placeholder untuk foto tim */}
                    <div className="w-full max-w-4xl aspect-[16/10] md:aspect-[21/9] bg-neutral-900 rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/5 relative">
                        <img
                            src="https://images.unsplash.com/photo-1595844730298-b960ff98fee0?q=80&w=2940&auto=format&fit=crop"
                            alt="TernakAja Team"
                            className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                        />
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}
