import { Info } from 'lucide-react'

// Note: Radix Tooltip should be here but we use a simpler markup for the example if missing.

interface StatCardProps {
    title: string
    value: string | number
    trend?: string
    positive?: boolean
    offline?: boolean
}

export function StatCard({ title, value, trend, positive, offline }: StatCardProps) {
    const isNoData = value === null || value === 'NaN' || offline;
    const displayValue = isNoData ? 'No Data' : value;

    return (
        <div className="relative overflow-hidden rounded-xl border border-border bg-card text-card-foreground p-6 shadow-sm dark:shadow-none min-h-[140px] flex flex-col justify-between group">
            {/* Background glow in dark mode */}
            <div className="absolute -inset-10 bg-accent-green/5 blur-3xl rounded-full opacity-0 dark:group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none" />

            <div className="relative z-10 flex items-start justify-between">
                <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
                <Info size={14} className="text-muted-foreground/50" />
            </div>

            <div className="relative z-10 mt-4">
                <div className={`text-4xl font-bold tracking-tight ${isNoData ? 'text-muted-foreground' : 'text-foreground'}`}>
                    {displayValue}
                </div>

                {trend && (
                    <p className={`text-xs mt-2 font-medium ${
                        isNoData
                            ? 'text-muted-foreground'
                            : positive
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : 'text-red-500 dark:text-red-400'
                    }`}>
                        {trend}
                    </p>
                )}
            </div>
        </div>
    )
}
