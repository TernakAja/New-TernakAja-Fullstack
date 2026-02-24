import { MapPin, Phone, Mail } from "lucide-react";
import { LuFacebook } from "react-icons/lu";
import { LuInstagram } from "react-icons/lu";

export default function Footer() {
    return (
        <footer className="w-full bg-primary text-white py-6 pt-14 px-6 rounded-t-3xl">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-start gap-12 md:gap-0">
                {/* ----- Left Column: Brand & Socials ----- */}
                <div className="flex flex-col gap-6">
                    {/* Brand Name */}
                    <h2 className="text-5xl font-bold text-secondary tracking-wide">
                        TernakAja
                    </h2>

                    {/* Social Icons */}
                    <div className="flex items-center gap-3">
                        <a
                            href="#"
                            className="hover:text-secondary transition-colors"
                        >
                            <LuFacebook className="w-6 h-6" />
                        </a>
                        {/* Using Twitter icon for X as placeholder, or use custom SVG */}
                        <a
                            href="#"
                            className="hover:text-secondary transition-colors"
                        >
                            {/* Custom SVG for X logo to match design accurately */}
                            <svg
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6"
                            >
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                        <a
                            href="#"
                            className="hover:text-secondary transition-colors"
                        >
                            <LuInstagram className="w-6 h-6" />
                        </a>
                    </div>
                </div>

                {/* ----- Right Column: Contact Info ----- */}
                <div className="flex flex-col items-start md:items-end text-left md:text-right gap-3">
                    {/* Heading */}
                    <h2 className="text-4xl font-bold text-secondary tracking-wide">
                        Contact Us
                    </h2>

                    {/* Address Row */}
                    <div className="flex items-start gap-3 md:justify-end max-w-md">
                        <p className="leading-relaxed">
                            Jl. Jalur Sutera Bar. No.Kav. 21, RT.001/RW.004,
                            Panunggangan, Kec. Pinang, Kota Tangerang, Banten
                            15143
                        </p>
                        <MapPin className="w-6 h-6 flex-shrink-0 mt-1" />
                    </div>

                    {/* Phone Row */}
                    <div className="flex items-center gap-3 md:justify-end">
                        <p className="font-medium">+62 812-9635-9305</p>
                        <Phone className="w-5 h-5 flex-shrink-0" />
                    </div>

                    {/* Email Row */}
                    <div className="flex items-center gap-3 md:justify-end">
                        <p className="font-medium">davidchr71@gmail.com</p>
                        <Mail className="w-5 h-5 flex-shrink-0" />
                    </div>
                </div>
            </div>
        </footer>
    );
}
