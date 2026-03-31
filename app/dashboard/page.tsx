import Link from 'next/link'
import { Suspense } from 'react'
import { Check } from 'lucide-react'
import { StatCard } from "@/features/dashboard/components/stat-card"
import { HealthMetricsChart } from "@/features/sensors/components/health-metrics-chart"
import { LivestockTable } from "@/features/livestock/components/livestock-table"
import { TableSkeleton } from "@/components/ui/skeletons"

export default function DashboardPage() {
  return (
    <>
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Farm Overview</h1>
          <p className="text-muted-foreground mt-1">Monitor real-time telemetry from your herds.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Livestock"
            value="1,248"
            trend="+12 this month"
            positive={true}
          />
          <StatCard
            title="Avg Herd Temp"
            value="38.7°C"
            trend="-0.2°C from normal"
            positive={true}
          />
          <StatCard
            title="Critical Sensors"
            value="3"
            trend="Needs immediate attention"
            positive={false}
          />
          <StatCard
            title="Offline Devices"
            value="1"
            trend="Last 24 hours"
            offline={true}
          />
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart */}
          <div className="lg:col-span-2 rounded-xl border border-border bg-card text-card-foreground p-6 shadow-sm dark:shadow-none">
            <h2 className="text-lg font-semibold mb-4 text-foreground">Telemetry & Health Trends</h2>
            <HealthMetricsChart />
          </div>

          {/* Device Actions / Empty State */}
          <div className="rounded-xl border border-border bg-card text-card-foreground p-6 shadow-sm dark:shadow-none flex flex-col items-center justify-center text-center">
            <div className="p-4 bg-muted rounded-full mb-4">
              <Check size={40} className="text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground">No Critical Alerts</h3>
            <p className="text-sm text-muted-foreground mt-2">All environmental sensors and health markers are operating within expected parameters.</p>
          </div>
        </div>

        {/* Data Grid Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-foreground">Active Livestock Tags</h2>
            <Link href="/dashboard/livestock" className="text-sm font-medium text-accent-green hover:underline">
              View All &rarr;
            </Link>
          </div>
          <Suspense fallback={<TableSkeleton />}>
            <LivestockTable />
          </Suspense>
        </div>
      </div>
    </>
  )
}
