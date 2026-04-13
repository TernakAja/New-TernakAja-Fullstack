import { Suspense } from "react"
import { LivestockTable } from "@/features/livestock/components/livestock-table"
import { TableSkeleton } from "@/components/ui/skeletons"

export default function LivestockPage() {
  return (
    <div className="flex flex-col space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Livestock Management</h1>
        <p className="text-muted-foreground mt-1">Manage all active tags and monitor individual statuses.</p>
      </div>

      <div className="rounded-xl border border-border bg-card text-card-foreground p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-foreground">All Active Tags</h2>
          <button className="bg-accent-green hover:bg-accent-green/90 text-white px-4 py-2 rounded-md font-medium transition-colors text-sm">
            Add Livestock
          </button>
        </div>
        <Suspense fallback={<TableSkeleton />}>
          <LivestockTable />
        </Suspense>
      </div>
    </div>
  )
}
