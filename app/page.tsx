import Image from "next/image";
import { BarChart3, Bolt } from "lucide-react";

import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer";
import { Suspense } from "react";

export const HomePage = () => {
    return (
        <div className="">
            <main className="min-h-screen w-full relative overflow-hidden bg-primary">
                <div className="absolute inset-0 z-0 font-sans w-[100vw] h-[100vh]">
                    <Image
                        src={"/home-bg.jpeg"}
                        alt="Farm Background Texture"
                        fill
                        className="object-cover opacity-30 mix-blend-overlay "
                        priority
                    />
                    <div className="absolute inset-0 bg-primary/80"></div>
                </div>

                <div className="relative z-10 flex flex-col min-h-screen lg:h-screen">
                    <div className="flex-grow px-6 sm:px-8 pt-24 sm:pt-28 lg:pr-24 w-full container mx-auto relative flex flex-col lg:flex-row h-full">
                        {/* LEFT SIDE */}
                        <div className="w-full flex flex-col items-start z-30 mb-12 lg:mb-0 h-auto lg:h-full">
                            <h1 className="relative mt-6 sm:mt-10 text-3xl sm:text-4xl lg:text-6xl 2xl:text-8xl font-extrabold leading-tight">
                                {/* Stroke layer */}
                                <span
                                    className="
                    absolute left-1 top-1
                    [-webkit-text-stroke:3px_#fde047]
                    [paint-order:stroke_fill]
                    select-none pointer-events-none
                "
                                >
                                    <span className="block text-nowrap font-sans">
                                        Smart Livestock
                                    </span>
                                    <span className="block text-nowrap font-sans">
                                        Monitoring
                                    </span>
                                </span>

                                {/* Real text */}
                                <span className="relative text-primary-foreground">
                                    <span className="block text-nowrap font-sans">
                                        Smart Livestock
                                    </span>
                                    <span className="block text-nowrap font-sans">
                                        Monitoring
                                    </span>
                                </span>
                            </h1>

                            <p className="text-twhite text-base sm:text-lg leading-relaxed mt-6 sm:mt-8 max-w-full sm:max-w-md lg:max-w-[25vw] 2xl:text-2xl">
                                Revolutionize your livestock management with
                                real-time monitoring, predictive analytics, and
                                sustainable farming practices powered by AI and
                                IoT technology.
                            </p>

                            <button className="mt-8 sm:mt-10 bg-secondary text-primary hover:bg-accent hover:text-primary font-bold text-base sm:text-lg px-6 sm:px-8 py-3 rounded-lg transition-all shadow-lg 2xl:px-12 2xl:py-6 2xl:text-3xl">
                                Get Started
                            </button>
                        </div>

                        {/* COW IMAGE */}
                        <div className="hidden sm:flex relative mt-10 lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2 z-20 w-full max-w-[220px] lg:max-w-[400px] xl:max-w-[500px] 2xl:max-w-[700px] items-end justify-center mx-auto">
                            <Image
                                src="/cow.png"
                                width={300}
                                height={400}
                                alt="Dairy Cow"
                                priority
                                className="object-contain w-full drop-shadow-2xl"
                            />
                        </div>

                        {/* RIGHT SIDE */}
                        <div className="w-full flex flex-col items-center lg:items-end z-30 py-10 lg:py-12 gap-10 lg:gap-0">
                            {/* Feature Badges */}
                            <div className="flex flex-col gap-4 items-center lg:items-end">
                                <div className="bg-primary/40 backdrop-blur-md border border-white/20 text-twhite px-6 sm:px-10 py-4 sm:py-6 rounded-xl flex items-center gap-3 shadow-sm">
                                    <BarChart3 className="text-secondary h-5 w-5 sm:h-6 sm:w-6" />
                                    <span className="font-semibold text-base sm:text-xl 2xl:text-2xl">
                                        Real-time Data
                                    </span>
                                </div>

                                <div className="bg-primary/40 backdrop-blur-md border border-white/20 text-twhite px-6 sm:px-10 py-4 sm:py-6 rounded-xl flex items-center gap-3 shadow-sm">
                                    <Bolt className="text-secondary h-5 w-5 sm:h-6 sm:w-6" />
                                    <span className="font-semibold text-base sm:text-xl 2xl:text-2xl">
                                        Fast Insights
                                    </span>
                                </div>
                            </div>

                            {/* Bottom Right Headline */}
                            <h2 className="relative mt-16 sm:mt-24 lg:mt-96 text-3xl sm:text-4xl lg:text-5xl 2xl:text-7xl font-extrabold leading-tight text-center lg:text-right">
                                <span
                                    className="
                    absolute right-1 top-1
                    [-webkit-text-stroke:3px_#fde047]
                    [paint-order:stroke_fill]
                    select-none pointer-events-none
                "
                                >
                                    <span className="block text-nowrap font-sans">
                                        With
                                    </span>
                                    <span className="block text-nowrap font-sans">
                                        AI and IoT
                                    </span>
                                </span>

                                <span className="relative text-primary-foreground">
                                    <span className="block text-nowrap font-sans">
                                        With
                                    </span>
                                    <span className="block text-nowrap font-sans">
                                        AI and IoT
                                    </span>
                                </span>
                            </h2>
                        </div>
                    </div>
                </div>

                {/* ========================
          SECTION 2: PRODUCT (PETSA)
      ======================== */}
                {/* Background set to Secondary (Yellow) as per design */}
                <section className="w-full sm:max-h-screen bg-secondary py-20 px-20 overflow-auto flex">
                    <div className="container mx-auto justify-center flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                        {/* ----- Left Column: Image & Badge ----- */}
                        <div className="w-full lg:w-1/2 relative flex flex-col justify-center lg:justify-start">
                            {/* "Our Product" Badge */}
                            <div className="lg:-left-4 w-max text-center bg-background text-tblack font-bold px-6 py-2.5 rounded-lg shadow-sm z-10 text-sm lg:text-base ">
                                Our Product
                            </div>

                            {/* Product Image */}
                            <div className="relative w-full max-w-[450px] 2xl:max-w-[550px] mt-10">
                                <Image
                                    src="/petsahome.png"
                                    width={759}
                                    height={952}
                                    alt="PETSA Smart Ear Tag disassembled view"
                                    className="w-full h-auto object-contain drop-shadow-xl"
                                />
                            </div>
                        </div>

                        {/* ----- Right Column: Content ----- */}
                        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-end text-center lg:text-right">
                            {/* Title Block with Stacking Effect */}
                            <div className="relative mb-2">
                                {/* Wireframe/Outline Effect for stylistic depth */}
                                <h2 className="absolute top-2 left-2 text-7xl lg:text-9xl font-black uppercase text-transparent [-webkit-text-stroke:1px_#1a472a] opacity-30 select-none">
                                    PETSA
                                </h2>
                                {/* Main Text */}
                                <h2 className="relative text-7xl lg:text-9xl font-black uppercase text-tblack z-10 leading-none">
                                    PETSA
                                </h2>
                            </div>

                            {/* Divider Line */}
                            <div className="w-full h-[2px] bg-black/90 mb-8 rounded-full"></div>
                            {/* Subtitle */}
                            <h3 className="text-2xl lg:text-4xl font-bold text-tblack mb-6 2xl:text-6xl">
                                Smart Ear Tag
                            </h3>

                            {/* Description Text */}
                            <p className="text-tblack/80 text-lg leading-relaxed max-w-3xl mb-10 font-medium 2xl:text-2xl">
                                The TernakAja Smart Ear Tag is an AI-powered
                                livestock health monitor designed for cattle.
                                Equipped with an infrared temperature sensor and
                                PPG sensor for heart rate and oxygen saturation,
                                the device continuously tracks vital indicators
                                through a fully non-invasive design.
                            </p>

                            {/* Button */}
                            <button className="bg-primary text-white hover:bg-primary/90 font-bold text-2xl px-10 py-3 rounded shadow-md transition-colors xl:px-12 xl:py-4 2xl:text-3xl">
                                Order Now
                            </button>
                        </div>
                    </div>
                </section>
                {/* ========================
    SECTION 3: SYSTEM (Connect)
======================== */}
                <section className="w-full min-h-screen bg-background flex items-center py-20 px-5">
                    <div className="container mx-auto w-full flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
                        {/* ----- Left Column: Text ----- */}
                        <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
                            {/* Title with Outline Effect */}
                            <div className="relative mb-8 leading-none">
                                {/* Outline Layer */}
                                <h2 className="absolute top-1 left-1 text-4xl lg:text-6xl font-black uppercase text-transparent [-webkit-text-stroke:1px_black] opacity-40 select-none tracking-tighter leading-none z-0">
                                    TernakAja
                                    <br />
                                    Connect
                                </h2>

                                {/* Main Text Layer */}
                                <h2 className="relative text-4xl lg:text-6xl font-black uppercase text-tblack z-10 tracking-tighter leading-none">
                                    TernakAja
                                    <br />
                                    Connect
                                </h2>
                            </div>

                            {/* Subtitle */}
                            <h3 className="text-3xl lg:text-4xl font-bold text-tblack mb-8 leading-tight xl:text-5xl">
                                Smart farm
                                <br />
                                management system
                            </h3>

                            {/* Divider */}
                            <div className="w-full h-[1px] bg-black/20 mb-8"></div>

                            {/* Paragraph */}
                            <p className="text-tblack/70 text-lg leading-relaxed mb-10 max-w-2xl font-medium xl:text-2xl">
                                TernakAja Connect is a centralized platform that
                                brings real-time livestock monitoring and farm
                                operations into one intuitive system. It
                                seamlessly integrates data from TernakAja Smart
                                Ear Tags to give farmers a complete view of each
                                animal's health status. The system uses
                                AI-driven analytics to detect abnormalities
                                early, send instant alerts, and support
                                data-based decision making.
                            </p>

                            {/* Button */}
                            <button className="bg-secondary text-tblack hover:bg-accent font-bold text-lg px-10 py-3 rounded-xl shadow-md transition-colors xl:px-12 xl:py-4 2xl:text-3xl">
                                Try Now
                            </button>
                        </div>

                        {/* ----- Right Column: Dashboard Images ----- */}
                        <div className="w-full lg:w-1/2 relative flex flex-col gap-6">
                            {/* "Our System" Badge */}
                            <div className="self-end mb-4">
                                <span className="hidden sm:block bg-secondary text-tblack font-bold px-8 py-3 rounded-lg shadow-sm text-lg lg:translate-x-4">
                                    Our System
                                </span>
                            </div>

                            {/* Dashboard Screen 1 */}
                            <div className="overflow-hidden rounded-xl shadow-lg">
                                <Image
                                    src="/dashboard_pympro 1.png"
                                    alt="TernakAja Dashboard Overview"
                                    className="w-full h-auto"
                                    width={768}
                                    height={446}
                                />
                            </div>

                            {/* Dashboard Screen 2 */}
                            <div className="overflow-hidden rounded-xl shadow-lg lg:translate-x-8 lg:-mt-10">
                                <Image
                                    src="/livestock_details_fs2dhx 1.png"
                                    alt="TernakAja Livestock Details"
                                    className="w-full h-auto"
                                    width={768}
                                    height={446}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default HomePage;
