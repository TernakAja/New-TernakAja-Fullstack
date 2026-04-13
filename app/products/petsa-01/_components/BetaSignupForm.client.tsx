"use client"

import { ArrowRight } from 'lucide-react'

/**
 * BetaSignupForm — isolated Client Component for the PETSA 01 beta waitlist form.
 *
 * Extracted from the parent page to keep petsa-01/page.tsx a Server Component.
 * Marked "use client" because forms with controlled inputs require client interactivity.
 * The form is currently a UI stub — wire `action` to a Server Action when ready.
 */
export function BetaSignupForm() {
    return (
        <form className="flex w-full flex-col gap-3 sm:flex-row md:w-auto md:items-center">
            <input
                type="email"
                placeholder="farm-manager@domain.com"
                className="w-full rounded-lg border border-amber-500/20 bg-white dark:bg-[#171717] px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-amber-500/50 focus:outline-none sm:w-64"
                required
            />
            <button
                type="button"
                className="group flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-amber-500/10 dark:bg-[#2a170f] px-5 py-2.5 text-sm font-medium text-amber-700 dark:text-amber-500 transition-colors hover:bg-amber-500/20 dark:hover:bg-[#3d2415] sm:w-auto border border-amber-500/20"
            >
                Notify Me
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
        </form>
    )
}
