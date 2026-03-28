import { HealthMetricsChart } from "@/components/dashboard/health-metrics-chart"

export default function HealthPage() {
    return (
        <div className="flex flex-col space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white">Health Monitoring</h1>
                <p className="text-gray-500 dark:text-zinc-400 mt-1">Detailed telemetry and environmental sensors data.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="rounded-xl border border-gray-200 dark:border-white/5 bg-white dark:bg-[#111111] p-6 shadow-sm dark:shadow-none">
                    <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">Herd Temperature Trends</h2>
                    <HealthMetricsChart />
                </div>

                <div className="rounded-xl border border-gray-200 dark:border-white/5 bg-white dark:bg-[#111111] p-6 shadow-sm dark:shadow-none flex flex-col justify-center items-center text-center">
                    <div className="p-4 bg-gray-50 dark:bg-zinc-950 rounded-full mb-4">
                        <svg className="w-10 h-10 text-gray-400 dark:text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="font-semibold text-black dark:text-white">All systems stable</h3>
                    <p className="text-sm text-gray-500 dark:text-zinc-400 mt-2 max-w-sm">
                        Heart rate, movement, and environmental data are all reporting within healthy thresholds for the past 24 hours.
                    </p>
                </div>
            </div>

            <div className="rounded-xl border border-gray-200 dark:border-white/5 bg-white dark:bg-[#111111] p-6 shadow-sm dark:shadow-none">
                <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">Recent Health Alerts</h2>
                <div className="flex flex-col items-center justify-center p-8 text-center border border-dashed border-gray-200 dark:border-white/10 rounded-lg bg-gray-50/50 dark:bg-zinc-950/50">
                    <p className="text-gray-500 dark:text-zinc-400 text-sm">No health alerts have been triggered recently.</p>
                </div>
            </div>
        </div>
    )
}
