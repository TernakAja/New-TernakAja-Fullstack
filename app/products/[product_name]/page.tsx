import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { ArrowRight, Bell } from 'lucide-react'
import NextLink from 'next/link'
import { products } from '../data'

export async function generateStaticParams() {
    return products.map((product) => ({
        product_name: product.name.toLowerCase().replace(/\s+/g, '-'),
    }));
}

export default async function ProductPage({ params }: { params: Promise<{ product_name: string }> }) {
    const resolvedParams = await params;

    // Normalize string: PETSA-01 -> petsa-01
    const productData = products.find(p => p.name.toLowerCase().replace(/\s+/g, '-') === resolvedParams.product_name);

    if (!productData) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center dark:bg-black dark:text-white">
                <Navbar />
                <h1 className="text-3xl font-mono">Product Not Found</h1>
            </div>
        )
    }

    return (
        <div className={`min-h-screen w-full font-sans antialiased selection:bg-neutral-200 dark:selection:bg-white/30 selection:text-black dark:selection:text-white ${productData.theme.bg} ${productData.theme.text}`}>
            <Navbar />
            <main className="flex-1 pt-32 pb-20">
                <div className="max-w-5xl mx-auto px-6 relative">
                    {/* Ambient Glow */}
                    <div className={`absolute top-0 right-10 w-96 h-96 blur-[120px] rounded-full pointer-events-none ${productData.theme.glow} opacity-60`} />

                    {/* Header */}
                    <div className="flex flex-col gap-6 mb-24 relative z-10">
                        <NextLink href="/products" className={`text-sm flex items-center gap-1 w-fit mb-4 transition-colors ${productData.theme.muted} hover:opacity-80`}>
                            &larr; Back to Products
                        </NextLink>

                        <div className="flex items-center gap-3">
                            <span className="font-mono text-xs font-medium px-2 py-1 rounded bg-black/5 dark:bg-white/10 text-black/70 dark:text-white/80 border border-black/10 dark:border-white/10">
                                REV_{productData.id}
                            </span>
                            {productData.comingSoon && (
                                <span className="font-mono text-xs font-medium px-2 py-1 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400 animate-pulse" />
                                    COMING SOON
                                </span>
                            )}
                        </div>
                        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight">{productData.name}</h1>
                        <p className={`text-2xl font-medium max-w-2xl ${productData.theme.text}`}>{productData.tagline}</p>
                        <p className={`text-lg leading-relaxed max-w-3xl ${productData.theme.muted}`}>{productData.description}</p>
                    </div>

                    <div className="mb-24">
                        <h2 className="text-2xl font-semibold mb-8">Technical Highlights</h2>
                        <div className="grid sm:grid-cols-3 gap-6">
                            {productData.specs.map((spec, idx) => {
                                const Icon = spec.icon;
                                return (
                                    <div key={idx} className={`flex flex-col gap-4 p-6 rounded-2xl border ${productData.theme.border} ${productData.theme.card}`}>
                                        <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-black/5 dark:bg-white/5 text-black/70 dark:text-white/70">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <span className="font-medium text-black/90 dark:text-white/90">
                                            {spec.text}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className={`p-12 rounded-[2rem] border ${productData.theme.border} ${productData.theme.card} relative overflow-hidden flex flex-col items-center text-center`}>
                        <div className={`absolute top-0 w-full h-full blur-3xl pointer-events-none ${productData.theme.glow} opacity-20`} />
                        <h3 className="text-3xl font-semibold tracking-tight mb-4 relative z-10">
                            Ready to upgrade your farm?
                        </h3>
                        <p className={`mb-8 relative z-10 ${productData.theme.muted} max-w-md`}>
                            {productData.comingSoon ? 'Join the waitlist to get early access.' : 'Order yours today and start monitoring your livestock.'}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 relative z-10 items-center justify-center">
                            <div className="flex flex-col items-center sm:items-end sm:border-r border-black/10 dark:border-white/10 sm:pr-6">
                                <span className={`text-[11px] font-mono uppercase tracking-wider mb-1 ${productData.theme.muted}`}>
                                    {productData.comingSoon ? 'Target MSRP' : 'Starting at'}
                                </span>
                                <span className="text-3xl font-semibold font-mono tracking-tight">
                                    {productData.price}
                                </span>
                            </div>
                            <button className={`px-8 py-4 rounded-xl text-[15px] font-medium transition-all flex items-center gap-2 shadow-lg dark:shadow-[0_0_20px_rgba(255,255,255,0.1)] ${productData.theme.buttonPrimary}`}>
                                {productData.comingSoon ? 'Get Notified' : 'Order Now'}
                                {productData.comingSoon ? <Bell className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
