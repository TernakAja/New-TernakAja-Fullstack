import { HealthMetricsChart } from "@/features/sensors/components/health-metrics-chart"
import { CheckCircle } from "lucide-react"

export default function HealthPage() {
    return (
        <div className="flex flex-col space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Health Monitoring</h1>
                <p className="text-muted-foreground mt-1">Detailed telemetry and environmental sensors data.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="rounded-xl border border-border bg-card text-card-foreground p-6 shadow-sm dark:shadow-none">
                    <h2 className="text-lg font-semibold mb-4 text-foreground">Herd Temperature Trends</h2>
                    <HealthMetricsChart />
                </div>

                <div className="rounded-xl border border-border bg-card text-card-foreground p-6 shadow-sm dark:shadow-none flex flex-col justify-center items-center text-center">
                    <div className="p-4 bg-muted rounded-full mb-4">
                        <CheckCircle size={40} className="text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold text-foreground">All systems stable</h3>
                    <p className="text-sm text-muted-foreground mt-2 max-w-sm">
                        Heart rate, movement, and environmental data are all reporting within healthy thresholds for the past 24 hours.
                    </p>
                </div>
            </div>

            <div className="rounded-xl border border-border bg-card text-card-foreground p-6 shadow-sm dark:shadow-none">
                <h2 className="text-lg font-semibold mb-4 text-foreground">Recent Health Alerts</h2>
                <div className="flex flex-col items-center justify-center p-8 text-center border border-dashed border-border rounded-lg bg-muted/50">
                    <p className="text-muted-foreground text-sm">No health alerts have been triggered recently.</p>
                </div>
            </div>
        </div>
    )
}
