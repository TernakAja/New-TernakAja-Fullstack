"use client"

/**
 * PricingShell — the Client Component container that owns all interactive state
 * for the pricing page (slider, toggle, active tier highlighting).
 *
 * The static sections (comparison table, FAQ, headers) are rendered as RSC
 * children and passed in via props — they never re-render when state changes.
 */

import { useState, useMemo, useCallback } from 'react'
import { PricingToggle } from './PricingToggle.client'
import { CowSlider } from './CowSlider.client'
import {
    PRICING_TIERS,
    SLIDER_MARKS,
    getActiveTierIndex,
} from '../_data/pricing-data'

const CheckIcon = () => (
    <svg className="w-4 h-4 text-emerald-500 mr-3 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
)

const CrossIcon = () => (
    <svg className="w-4 h-4 text-muted-foreground mr-3 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
)

export function PricingShell() {
    const [billingCycle, setBillingCycle] = useState('monthly')
    const [sliderIndex, setSliderIndex] = useState(1)

    const selectedCows = SLIDER_MARKS[sliderIndex]
    const activeTierIndex = useMemo(() => getActiveTierIndex(selectedCows), [selectedCows])

    const sliderStyle = useMemo(() => ({
        background: `linear-gradient(to right, currentColor ${(sliderIndex / (SLIDER_MARKS.length - 1)) * 100}%, rgba(156, 163, 175, 0.2) ${(sliderIndex / (SLIDER_MARKS.length - 1)) * 100}%)`,
    }), [sliderIndex])

    const handleSliderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSliderIndex(parseInt(e.target.value))
    }, [])

    const handleSetMonthly = useCallback(() => setBillingCycle('monthly'), [])
    const handleSetYearly = useCallback(() => setBillingCycle('yearly'), [])
    const handleMarkClick = useCallback((i: number) => setSliderIndex(i), [])

    return (
        <>
            <PricingToggle
                billingCycle={billingCycle}
                onMonthly={handleSetMonthly}
                onYearly={handleSetYearly}
            />

            <CowSlider
                sliderIndex={sliderIndex}
                sliderStyle={sliderStyle}
                onChange={handleSliderChange}
                onMarkClick={handleMarkClick}
            />

            {/* Pricing Cards */}
            <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                {PRICING_TIERS.map((tier, index) => {
                    const isActive = index === activeTierIndex
                    const isDimmed = !isActive && index !== 3

                    return (
                        <div
                            key={index}
                            className={`bg-background border transition-all duration-300 rounded-[24px] p-8 flex flex-col relative
                  ${isActive ? 'border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.1)] scale-[1.02]' : 'border-border hover:border-border'}
                  ${isDimmed ? 'opacity-50 grayscale-[50%]' : 'opacity-100'}
                `}
                        >
                            {isActive && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                                    Rekomendasi
                                </div>
                            )}

                            <h3 className={`text-center text-sm font-medium mb-6 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-foreground'}`}>
                                {tier.title}
                            </h3>

                            <div className="flex flex-col items-center mb-6">
                                <div className="flex items-baseline justify-center">
                                    <span className="text-4xl font-semibold tracking-tight text-foreground">
                                        {isActive ? tier.calculatePrice(selectedCows) : tier.basePrice}
                                    </span>
                                    <span className="text-lg text-muted-foreground font-normal">{tier.period}</span>
                                </div>
                            </div>

                            <div className="text-center mb-6">
                                <p className="text-sm text-foreground font-medium mb-1.5">{tier.mainLimit}</p>
                                <p className="text-[11px] text-muted-foreground">{tier.subLimit}</p>
                            </div>

                            <hr className="border-border mb-8" />

                            <ul className="flex flex-col gap-4 flex-grow">
                                {tier.features.map((feature, fIndex) => (
                                    <li key={fIndex} className="flex items-start">
                                        {feature.included ? <CheckIcon /> : <CrossIcon />}
                                        <span className={`text-[13px] leading-relaxed ${feature.included ? 'text-foreground' : 'text-muted-foreground'}`}>
                                            {feature.name}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <button className={`w-full mt-8 py-2.5 rounded-lg text-sm font-medium transition-colors border
                  ${isActive
                                    ? 'bg-foreground text-background border-foreground hover:opacity-90'
                                    : 'bg-transparent text-foreground border-border hover:bg-muted'}
                `}>
                                {index === 3 ? 'Hubungi Penjualan' : 'Pilih Paket'}
                            </button>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
