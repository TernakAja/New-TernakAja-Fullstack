/**
 * PricingPage — React Server Component (RSC)
 *
 * BEFORE: 399-line "use client" page for 3 state variables.
 * AFTER:  Thin RSC shell. All static content (comparison table, FAQ headers,
 *         page headings) renders on the server. Interactive islands (slider,
 *         toggle, pricing cards) are isolated in PricingShell.client.tsx.
 */

import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { GridBackground } from "@/components/ui/grid-background"
import { PricingShell } from "./_components/PricingShell.client"
import { FaqAccordion } from "./_components/FaqAccordion.client"
import { FAQS, COMPARISON_ROWS } from "./_data/pricing-data"

const CheckIcon = () => (
    <svg className="w-4 h-4 text-emerald-500 mr-3 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
)

export default function PricingPage() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-background text-foreground flex flex-col items-center py-20 px-4 md:px-8 pt-32">
                <GridBackground variant="dot" size={20} />

                {/* Page Header — static RSC */}
                <div className="relative z-10 text-center">
                    <h1 className="text-5xl md:text-6xl mb-6 tracking-tight">Harga</h1>
                    <p className="text-muted-foreground text-lg mb-12">
                        Mulai kelola peternakan Anda dengan sistem yang dapat bertumbuh.
                    </p>
                </div>

                {/* Interactive pricing shell — Client Component */}
                <PricingShell />

                {/* Feature Comparison — static RSC */}
                <div className="w-full max-w-5xl mt-32 px-4 relative z-10">
                    <h2 className="text-3xl font-medium text-foreground mb-8 tracking-tight">Manajemen &amp; Pencatatan</h2>

                    <div className="w-full overflow-x-auto pb-4">
                        <div className="min-w-[768px]">
                            <div className="grid grid-cols-5 gap-4 bg-muted border border-border rounded-lg py-3 px-6 mb-2">
                                <div className="col-span-1"></div>
                                <div className="text-center text-[13px] font-medium text-muted-foreground">Skala Kecil</div>
                                <div className="text-center text-[13px] font-medium text-muted-foreground">Skala Menengah</div>
                                <div className="text-center text-[13px] font-medium text-muted-foreground">Skala Besar</div>
                                <div className="text-center text-[13px] font-medium text-muted-foreground">Korporasi</div>
                            </div>

                            <div className="flex flex-col">
                                {COMPARISON_ROWS.map((row, rowIndex) => (
                                    <div key={rowIndex} className="grid grid-cols-5 gap-4 py-4 px-6 border-b border-border hover:bg-muted/60 transition-colors">
                                        <div className="col-span-1 flex items-center">
                                            <span className="text-[13px] text-foreground border-b border-dotted border-border pb-0.5 cursor-help">
                                                {row.name}
                                            </span>
                                        </div>
                                        {row.values.map((val, valIndex) => (
                                            <div key={valIndex} className="flex justify-center items-center text-[13px] text-foreground">
                                                {typeof val === 'boolean' ? (
                                                    val ? <CheckIcon /> : <span className="text-muted-foreground">-</span>
                                                ) : (
                                                    val
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ — static data, interactive accordion is a Client island */}
                <div className="w-full max-w-4xl mt-32 px-4 mb-20 relative z-10">
                    <h2 className="text-3xl font-medium text-foreground mb-8 tracking-tight">Frequently Asked Questions</h2>
                    <FaqAccordion faqs={FAQS} />
                </div>
            </div>
            <Footer />
        </>
    )
}