import { cn } from "@/lib/utils"

/**
 * GridBackground — Reusable decorative background pattern RSC.
 *
 * Replaces the 3x copy-pasted inline "grid + radial mask" pattern found in:
 * - HeroSection.tsx
 * - app/about/page.tsx
 * - app/pricing/page.tsx
 *
 * Usage:
 *   <GridBackground variant="line" />         // 40×40 grid lines (default)
 *   <GridBackground variant="dot" />          // radial dot grid
 *   <GridBackground variant="dot" size={24} /> // smaller 24×24 dot grid
 */

interface GridBackgroundProps {
    /** Visual style of the repeating pattern */
    variant?: "line" | "dot"
    /** Grid cell size in pixels — must be a fixed value for Tailwind JIT */
    size?: 20 | 24 | 40
    /** Extra classes applied to the outermost wrapper */
    className?: string
}

const GRID_CONFIGS = {
    line: {
        20: {
            light: "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
            dark: "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
            size: "[background-size:20px_20px]",
        },
        24: {
            light: "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
            dark: "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
            size: "[background-size:24px_24px]",
        },
        40: {
            light: "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
            dark: "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
            size: "[background-size:40px_40px]",
        },
    },
    dot: {
        20: {
            light: "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
            dark: "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
            size: "[background-size:20px_20px]",
        },
        24: {
            light: "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
            dark: "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
            size: "[background-size:24px_24px]",
        },
        40: {
            light: "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
            dark: "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
            size: "[background-size:40px_40px]",
        },
    },
} as const

export function GridBackground({
    variant = "line",
    size = 40,
    className,
}: GridBackgroundProps) {
    const config = GRID_CONFIGS[variant][size]

    return (
        <>
            {/* Repeating pattern layer */}
            <div
                aria-hidden="true"
                className={cn(
                    "absolute inset-0 z-0",
                    config.size,
                    config.light,
                    config.dark,
                    className
                )}
            />
            {/* Radial fade mask — blends the grid into the page background */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"
            />
        </>
    )
}
