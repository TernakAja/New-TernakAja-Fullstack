import { Suspense } from "react";
import Navbar from "@/components/navbar/navbar";
import ProductDetails from "./product-details";

export default function ProductDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    return (
        <main className="min-h-screen w-full bg-background font-sans pb-20">
            <Navbar />

            <Suspense fallback={<div className="p-10">Loading product…</div>}>
                <ProductDetails params={params} />
            </Suspense>
        </main>
    );
}
