import React from "react";
import Image from "next/image";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer";

export default function AboutPage() {
    return (
        <main className="min-h-screen w-full bg-background font-sans pt-20">
            {/* Navbar Container */}

            <div className="container mx-auto px-10 lg:px-28 mt-16">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-16 lg:gap-24 mb-24">
                    {/* LEFT: Text Content */}
                    <div className="w-full lg:w-1/2 flex flex-col pt-4">
                        {/* Title */}
                        <h1 className="text-5xl lg:text-7xl font-extrabold text-tblack mb-10 tracking-tight font-sans">
                            TernakAja
                        </h1>

                        {/* Paragraphs */}
                        <div className="space-y-6 text-tblack text-lg leading-relaxed">
                            <p>
                                TernakAja combines AI-powered analytics and IoT
                                sensor technology to help farmers monitor
                                livestock in real time, improve animal welfare,
                                increase productivity, and operate more
                                sustainably.
                            </p>
                            <p>
                                Designed for cattle farmers in Indonesia, our
                                solution uses non- invasive sensing technology
                                with infrared temperature and PPG sensors to
                                continuously monitor body temperature, heart
                                rate, and blood oxygen levels. The collected
                                data is analyzed using machine learning
                                algorithms to enable early detection of
                                potential health issues.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT: Overlapping Images */}
                    <div className="w-full lg:w-1/2 relative h-[400px] lg:h-[500px]">
                        <div className="relative w-full h-[500px] group">
                            {/* BACK IMAGE (becomes front on hover) */}
                            <div
                                className="
                    absolute top-0 right-0 w-3/4 h-3/4 rounded-3xl overflow-hidden
                    shadow-xl bg-primary
                    transition-all duration-500
                    z-0
                    group-hover:z-20
                    group-hover:scale-[1.02]
                    "
                            >
                                <Image
                                    src="https://picsum.photos/seed/cows/600/600"
                                    alt="Farm Landscape"
                                    fill
                                    className="object-cover opacity-80 mix-blend-overlay"
                                />
                                <div className="absolute inset-0 bg-primary/70"></div>
                            </div>

                            {/* FRONT IMAGE (goes back on hover) */}
                            <div
                                className="
                    absolute bottom-0 left-0 lg:left-10 w-3/5 h-3/5 rounded-3xl overflow-hidden
                    shadow-2xl border-4 border-background
                    transition-all duration-500
                    z-20
                    group-hover:z-0
                    group-hover:scale-95
                    "
                            >
                                <Image
                                    src="https://picsum.photos/seed/tech/500/500"
                                    alt="Technology Detail"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-primary/30"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ========================
            Bottom Section: Statistics
        ======================== */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {/* Stat Card 1 */}
                    <div className="bg-background rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-md hover:shadow-xl transition-shadow border border-border/50 h-48 ">
                        <h3 className="text-4xl font-extrabold text-tblack mb-3">
                            100+
                        </h3>
                        <p className="text-lg font-medium text-tblack/80">
                            Active Farms
                        </p>
                    </div>

                    {/* Stat Card 2 */}
                    <div className="bg-background rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-md hover:shadow-xl transition-shadow border border-border/50 h-48">
                        <h3 className="text-4xl font-extrabold text-tblack mb-3">
                            1000+
                        </h3>
                        <p className="text-lg font-medium text-tblack/80">
                            Livestock Monitored
                        </p>
                    </div>

                    {/* Stat Card 3 */}
                    <div className="bg-background rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-md hover:shadow-xl transition-shadow border border-border/50 h-48">
                        <h3 className="text-4xl font-extrabold text-tblack mb-3">
                            80%
                        </h3>
                        <p className="text-lg font-medium text-tblack/80">
                            Productivity Increase
                        </p>
                    </div>

                    {/* Stat Card 4 */}
                    <div className="bg-background rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-md hover:shadow-xl transition-shadow border border-border/50 h-48">
                        <h3 className="text-4xl font-extrabold text-tblack mb-3">
                            90%
                        </h3>
                        <p className="text-lg font-medium text-tblack/80">
                            Mortality Rate Reduction
                        </p>
                    </div>
                </div>
            </div>

            {/* Vision and Mission Section */}
            <div className="flex flex-col gap-24 lg:gap-32 p-20 px-40 mt-20">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Left: Image Box */}
                    <div className="w-full lg:w-1/2 relative aspect-square lg:h-[500px]">
                        <div className="w-full h-full bg-primary rounded-[2.5rem] overflow-hidden relative shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                            <Image
                                src="https://picsum.photos/seed/vision/800/800"
                                alt="Our Vision - Green Field"
                                fill
                                className="object-cover opacity-90"
                            />
                            {/* Subtle overlay to blend image with brand color */}
                            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
                        </div>
                    </div>

                    {/* Right: Text Content */}
                    <div className="w-full lg:w-1/2">
                        <h2 className="text-5xl lg:text-7xl font-bold text-tblack mb-8 tracking-tight font-sans">
                            Our Vision
                        </h2>
                        <p className="text-tblack/90 text-lg lg:text-xl leading-relaxed font-medium">
                            To revolutionize livestock management globally
                            through innovative technology, creating a world
                            where farming is efficient, sustainable, and humane,
                            contributing to food security while minimizing
                            environmental impact.
                        </p>
                    </div>
                </div>

                {/* --- Mission Row (Text Left, Image Right) --- */}
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Left: Text Content */}
                    <div className="w-full lg:w-1/2 order-2 lg:order-1">
                        <h2 className="text-5xl lg:text-7xl font-bold text-tblack mb-8 tracking-tight font-sans">
                            Our Mission
                        </h2>
                        <p className="text-tblack/90 text-lg lg:text-xl leading-relaxed font-medium">
                            To empower farmers with AI and IoT solutions that
                            optimize livestock health, productivity, and welfare
                            while promoting sustainable agricultural practices
                            aligned with global development goals.
                        </p>
                    </div>

                    {/* Right: Image Box */}
                    <div className="w-full lg:w-1/2 order-1 lg:order-2 relative aspect-square lg:h-[500px] flex justify-end">
                        <div className="w-full h-full bg-primary rounded-[2.5rem] overflow-hidden relative shadow-2xl -rotate-2 hover:rotate-0 transition-transform duration-500">
                            <Image
                                src="https://picsum.photos/seed/mission/800/800"
                                alt="Our Mission - Technology"
                                fill
                                className="object-cover opacity-90"
                            />
                            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
