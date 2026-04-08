"use client"

import { useCallback, useState } from 'react'

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
    <svg
        className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
)

interface FAQ {
    q: string
    a: string
}

interface FaqAccordionProps {
    faqs: readonly FAQ[]
}

/**
 * FaqAccordion — isolated Client Component wrapping the FAQ accordion state.
 * The FAQ data itself is passed as a prop from the RSC parent, keeping the data
 * co-located with the static content in the page while logic is isolated here.
 */
export function FaqAccordion({ faqs }: FaqAccordionProps) {
    const [openFaqIndex, setOpenFaqIndex] = useState(0)

    const handleFaqToggle = useCallback((index: number, isOpen: boolean) => {
        setOpenFaqIndex(isOpen ? -1 : index)
    }, [])

    return (
        <div className="flex flex-col gap-3">
            {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index
                return (
                    <div
                        key={index}
                        className="bg-card border border-border rounded-xl overflow-hidden shadow-sm"
                    >
                        <button
                            onClick={() => handleFaqToggle(index, isOpen)}
                            className="w-full flex items-center gap-4 px-6 py-5 text-left hover:bg-muted transition-colors focus:outline-none"
                        >
                            <ChevronIcon isOpen={isOpen} />
                            <span className="text-[15px] font-medium text-foreground">{faq.q}</span>
                        </button>

                        {isOpen && (
                            <div className="px-6 pb-5 pt-1 pl-14">
                                <p className="text-[14px] leading-relaxed text-muted-foreground">
                                    {faq.a}
                                </p>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}
