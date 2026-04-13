"use client"

import { useCallback } from 'react'

/**
 * PricingToggle — isolated Client Component for the dairy/beef toggle.
 * Receives state from the parent CowSlider (via shared URL state in a real
 * implementation) or can own its local state here.
 */
interface PricingToggleProps {
    billingCycle: string
    onMonthly: () => void
    onYearly: () => void
}

export function PricingToggle({ billingCycle, onMonthly, onYearly }: PricingToggleProps) {
    return (
        <div className="flex bg-muted border border-border rounded-full p-1 mb-16 relative z-10">
            <button
                onClick={onMonthly}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                    billingCycle === 'monthly'
                        ? 'bg-card text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                }`}
            >
                Sapi Perah (Dairy)
            </button>
            <button
                onClick={onYearly}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                    billingCycle === 'yearly'
                        ? 'bg-card text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                }`}
            >
                Sapi Potong (Beef)
            </button>
        </div>
    )
}
