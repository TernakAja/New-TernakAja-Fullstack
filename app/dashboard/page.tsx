import Link from 'next/link'
import { Suspense } from 'react'
import { StatCard } from "@/features/dashboard/components/stat-card"
import { HealthMetricsChart } from "@/features/sensors/components/health-metrics-chart"
import { LivestockTable } from "@/features/livestock/components/livestock-table"

export default function DashboardPage() {
  return (
    <>
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white">Farm Overview</h1>
          <p className="text-gray-500 dark:text-zinc-400 mt-1">Monitor real-time telemetry from your herds.</p>
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
          <div className="lg:col-span-2 rounded-xl border border-gray-200 dark:border-white/5 bg-white dark:bg-[#111111] p-6 shadow-sm dark:shadow-none">
            <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">Telemetry & Health Trends</h2>
            <HealthMetricsChart />
          </div>

          {/* Device Actions / Empty State */}
          <div className="rounded-xl border border-gray-200 dark:border-white/5 bg-white dark:bg-[#111111] p-6 shadow-sm dark:shadow-none flex flex-col items-center justify-center text-center">
            <div className="p-4 bg-gray-50 dark:bg-zinc-950 rounded-full mb-4">
              <svg className="w-10 h-10 text-gray-400 dark:text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-semibold text-black dark:text-white">No Critical Alerts</h3>
            <p className="text-sm text-gray-500 dark:text-zinc-400 mt-2">All environmental sensors and health markers are operating within expected parameters.</p>
          </div>
        </div>

        {/* Data Grid Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-black dark:text-white">Active Livestock Tags</h2>
            <Link href="/dashboard/livestock" className="text-sm font-medium text-accent-green hover:underline">
              View All &rarr;
            </Link>
          </div>
          <Suspense fallback={<div className="p-4 text-center text-sm text-gray-500">Loading table...</div>}>
            <LivestockTable />
          </Suspense>
        </div>
      </div>
    </>
  )
}
