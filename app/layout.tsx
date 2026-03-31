import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import "./globals.css";
import { Providers } from "@/components/providers";

// Font Options
import { Lexend_Deca } from 'next/font/google';
import { openSans } from "./fonts";

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
    metadataBase: new URL(defaultUrl),
    title: "TernakAja",
    description: "Smart Livestock Monitoring",
};

const lexendDeca = Lexend_Deca({
    variable: "--font-lexend-deca",
    display: "swap",
    subsets: ["latin"],
});

const geistSans = Geist({
    variable: "--font-geist-sans",
    display: "swap",
    subsets: ["latin"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={openSans.variable} suppressHydrationWarning>
            <body className={`${lexendDeca.className} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Providers>
                        {children}
                        {/* According to PHASE 5: Sonner Toast defaults for desktop (bottom-right) and overrides generally handle mobile */}
                        <Toaster position="bottom-right" richColors theme="system" />
                    </Providers>
                </ThemeProvider>
            </body>
        </html>
    );
}
