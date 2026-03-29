import { Suspense } from "react"
import { LivestockTable } from "@/features/livestock/components/livestock-table"

export default function LivestockPage() {
  return (
    <div className="flex flex-col space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white">Livestock Management</h1>
        <p className="text-gray-500 dark:text-zinc-400 mt-1">Manage all active tags and monitor individual statuses.</p>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-white/5 bg-white dark:bg-[#111111] p-6 shadow-sm dark:shadow-none">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-black dark:text-white">All Active Tags</h2>
          <button className="bg-accent-green hover:bg-accent-green/90 text-white px-4 py-2 rounded-md font-medium transition-colors text-sm">
            Add Livestock
          </button>
        </div>
        <Suspense fallback={<div className="p-4 text-center text-sm text-gray-500">Loading table...</div>}>
          <LivestockTable />
        </Suspense>
      </div>
    </div>
  )
}
