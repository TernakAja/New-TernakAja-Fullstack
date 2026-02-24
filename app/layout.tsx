import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { openSans } from "./fonts";
import { Suspense } from "react";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer";

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
    metadataBase: new URL(defaultUrl),
    title: "Next.js and Supabase Starter Kit",
    description: "The fastest way to build apps with Next.js and Supabase",
};

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
            <body className={`${geistSans.className} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Suspense fallback={<div className="h-20" />}>
                        <Navbar />
                    </Suspense>
                    {children}
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
