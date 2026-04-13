import { AlertTriangle } from 'lucide-react'

/**
 * ErrorCard — Fallback UI for <ErrorBoundary> wrappers around data-fetching Suspense zones.
 *
 * Usage:
 *   <ErrorBoundary fallback={<ErrorCard />}>
 *     <Suspense fallback={<Skeleton />}>
 *       <DataComponent />
 *     </Suspense>
 *   </ErrorBoundary>
 */

interface ErrorCardProps {
    /** Optional user-facing description of what failed */
    message?: string
    /** Optional title override */
    title?: string
}

export function ErrorCard({
    title = "Failed to load data",
    message = "An error occurred while fetching data. Please refresh or try again later.",
}: ErrorCardProps) {
    return (
        <div
            role="alert"
            className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 flex flex-col items-center justify-center text-center gap-3 min-h-[120px]"
        >
            <AlertTriangle className="w-6 h-6 text-destructive shrink-0" />
            <div>
                <p className="text-sm font-semibold text-destructive">{title}</p>
                <p className="text-xs text-muted-foreground mt-1 max-w-xs">{message}</p>
            </div>
        </div>
    )
}
