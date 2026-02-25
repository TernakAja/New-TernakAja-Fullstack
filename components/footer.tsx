import { MapPin, Phone, Mail } from "lucide-react";
import { LuFacebook, LuInstagram } from "react-icons/lu";

export default function Footer() {
    return (
        <footer className="w-full bg-primary text-twhite pt-16 pb-8 px-6 md:pt-20 md:pb-10 rounded-t-[2.5rem] md:rounded-t-[3rem] shadow-2xl">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-16 md:gap-12 border-b border-twhite/10 pb-12 md:pb-16 text-center md:text-left">
                    {/* ----- Left Column: Brand & Socials ----- */}
                    <div className="flex flex-col items-center md:items-start gap-6 md:gap-8 max-w-sm">
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl font-black text-secondary tracking-tighter italic">
                                TernakAja
                            </h2>
                            <p className="text-twhite/60 text-sm md:text-base leading-relaxed max-w-[280px] md:max-w-xs">
                                Empowering farmers with AI-driven technology for
                                a more sustainable and productive future.
                            </p>
                        </div>

                        {/* Social Icons */}
                        <div className="flex items-center gap-4">
                            <SocialLink href="#" icon={<LuFacebook />} />
                            <SocialLink
                                href="#"
                                icon={
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                }
                            />
                            <SocialLink href="#" icon={<LuInstagram />} />
                        </div>
                    </div>

                    {/* ----- Right Column: Contact Info ----- */}
                    <div className="flex flex-col items-center md:items-end gap-6 w-full md:w-auto">
                        <h3 className="text-xl md:text-2xl font-bold text-twhite flex items-center gap-3">
                            <span className="hidden md:block h-1 w-10 bg-secondary rounded-full" />
                            Get in Touch
                            <span className="md:hidden h-1 w-10 bg-secondary rounded-full" />
                        </h3>

                        <div className="flex flex-col gap-6 md:gap-5 w-full items-center md:items-end">
                            <ContactItem
                                icon={
                                    <MapPin className="w-5 h-5 text-secondary" />
                                }
                                content="Jl. Jalur Sutera Bar. No.Kav. 21, Panunggangan, Tangerang, Banten 15143"
                            />
                            <ContactItem
                                icon={
                                    <Phone className="w-5 h-5 text-secondary" />
                                }
                                content="+62 812-9635-9305"
                                href="tel:+6281296359305"
                            />
                            <ContactItem
                                icon={
                                    <Mail className="w-5 h-5 text-secondary" />
                                }
                                content="davidchr71@gmail.com"
                                href="mailto:davidchr71@gmail.com"
                            />
                        </div>
                    </div>
                </div>

                {/* ----- Bottom Bar ----- */}
                <div className="mt-8 md:mt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-twhite/40 text-[10px] md:text-xs font-medium uppercase tracking-widest text-center">
                    <p>© 2026 TernakAja. All Rights Reserved.</p>
                    <div className="flex gap-6 md:gap-8">
                        <a
                            href="#"
                            className="hover:text-secondary transition-colors duration-200"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="#"
                            className="hover:text-secondary transition-colors duration-200"
                        >
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
    return (
        <a
            href={href}
            className="w-11 h-11 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-twhite/5 border border-twhite/10 hover:bg-secondary hover:text-primary hover:scale-110 transition-all duration-300"
        >
            {icon}
        </a>
    );
}

function ContactItem({
    icon,
    content,
    href,
}: {
    icon: React.ReactNode;
    content: string;
    href?: string;
}) {
    const Wrapper = href ? "a" : "div";
    return (
        <Wrapper
            href={href}
            className={`group flex flex-col md:flex-row-reverse items-center md:items-start gap-3 md:gap-4 max-w-[250px] md:max-w-xs md:text-right ${
                href ? "hover:text-secondary cursor-pointer" : ""
            } transition-colors duration-200`}
        >
            <div className="flex-shrink-0 p-2.5 md:p-2 bg-twhite/5 rounded-xl md:rounded-lg group-hover:bg-secondary/20 transition-colors">
                {icon}
            </div>
            <p className="text-sm font-medium leading-relaxed md:leading-tight">
                {content}
            </p>
        </Wrapper>
    );
}
