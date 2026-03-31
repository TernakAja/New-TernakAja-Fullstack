import React from 'react'
import { cn } from "@/lib/utils"

export type HealthStatus = 'Good' | 'Needs Attention' | 'Critical'

interface HealthBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    status: HealthStatus | string;
}

export function HealthBadge({ status, className, ...props }: HealthBadgeProps) {
    let styles = ""
    
    // Abstracting out the hex codes to use Tailwind's native semantic/utility scales.
    // Instead of raw #00D654, we map it to emerald-500 for a consistent green spectrum,
    // or use the already defined accent-green from globals.css appropriately.
    if (status === 'Good') {
        styles = "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/20"
    } else if (status === 'Needs Attention') {
        styles = "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20"
    } else if (status === 'Critical') {
        styles = "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
    } else {
        styles = "bg-muted text-muted-foreground border-border"
    }

    return (
        <span 
            className={cn(
                "px-2 py-1 rounded font-mono text-[10px] uppercase tracking-wider border", 
                styles,
                className
            )}
            {...props}
        >
            {status}
        </span>
    )
}
