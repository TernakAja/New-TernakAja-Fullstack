import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from "@/lib/utils"

export type HealthStatus = 'Good' | 'Needs Attention' | 'Critical'

/**
 * CVA variant map — adding a new status is a one-line edit here.
 * The if-else chain anti-pattern has been eliminated.
 */
const healthBadgeVariants = cva(
    "px-2 py-1 rounded font-mono text-[10px] uppercase tracking-wider border",
    {
        variants: {
            status: {
                Good: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
                "Needs Attention": "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
                Critical: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
                unknown: "bg-muted text-muted-foreground border-border",
            },
        },
        defaultVariants: { status: "unknown" },
    }
)

interface HealthBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    status: HealthStatus | string;
}

export function HealthBadge({ status, className, ...props }: HealthBadgeProps) {
    // Map any unknown status string to the 'unknown' variant key
    const variantKey = (['Good', 'Needs Attention', 'Critical'] as const).includes(status as HealthStatus)
        ? (status as HealthStatus)
        : 'unknown'

    return (
        <span
            className={cn(healthBadgeVariants({ status: variantKey }), className)}
            {...props}
        >
            {status}
        </span>
    )
}
