import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Suspense fallback={<div className="h-20" />}>
                        <Navbar />
                    </Suspense>
            <main>{children}</main>
            <Toaster />
            <Footer />
        </>
    );
}