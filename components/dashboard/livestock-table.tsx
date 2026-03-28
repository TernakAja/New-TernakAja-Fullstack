"use client"

import { useDashboardStore, LivestockData } from '@/lib/store/dashboard-store'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

const columnHelper = createColumnHelper<LivestockData>()

const columns = [
  columnHelper.accessor('id', {
    header: 'Tag ID',
    cell: info => <span className="font-mono text-xs text-black dark:text-white uppercase px-2 py-1 rounded bg-gray-100 dark:bg-white/5">{info.getValue()}</span>,
  }),
  columnHelper.accessor('name', {
    header: 'Name/Alias',
    cell: info => <span className="font-medium text-black dark:text-white">{info.getValue()}</span>,
  }),
  columnHelper.accessor('temperature', {
    header: 'Temp (°C)',
    cell: info => {
      const val = info.getValue()
      return val === null 
        ? <span className="text-gray-400 dark:text-zinc-500 text-sm">Offline</span> 
        : <span className="text-sm font-medium text-black dark:text-white">{val}</span>
    },
  }),
  columnHelper.accessor('health', {
    header: 'Health Status',
    cell: info => {
      const status = info.getValue()
      let styles = ""
      if (status === 'Good') styles = "bg-[#00D654]/15 dark:bg-[#00D654]/10 text-[#00A040] dark:text-[#00D654] border-[#00D654]/20"
      else if (status === 'Needs Attention') styles = "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20"
      else if (status === 'Critical') styles = "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
      
      return (
        <span className={`px-2 py-1 rounded font-mono text-[10px] uppercase tracking-wider border ${styles}`}>
          {status}
        </span>
      )
    }
  }),
  columnHelper.accessor('batteryUrl', {
    header: 'Sensor Battery',
    cell: info => {
      const val = info.getValue()
      return (
        <div className="flex items-center gap-2">
          <div className="w-16 h-1.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
            <div 
              className={`h-full ${val < 20 ? 'bg-red-500' : 'bg-accent-green'}`} 
              style={{ width: `${val}%` }} 
            />
          </div>
          <span className="text-xs text-gray-500 dark:text-zinc-400">{val}%</span>
        </div>
      )
    }
  }),
]

export function LivestockTable() {
  const data = useDashboardStore((state) => state.livestock)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-hidden rounded-xl border border-gray-200 dark:border-white/5 bg-white dark:bg-[#0A0A0A]">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-zinc-950 border-b border-gray-200 dark:border-white/5">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="p-4 font-medium text-gray-500 dark:text-zinc-400">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-white/5">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="p-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Fallback - Stacked Cards */}
      <div className="md:hidden space-y-4">
        {data.map((cow) => (
          <div key={cow.id} className="rounded-lg border border-gray-200 dark:border-white/5 bg-white dark:bg-[#111111] p-4 flex flex-col gap-3 shadow-sm">
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs text-black dark:text-white uppercase px-2 py-1 rounded bg-gray-100 dark:bg-white/5">{cow.id}</span>
              <span className="font-medium">{cow.name}</span>
            </div>
            
            <div className="flex justify-between items-center mt-2">
              <div className="text-sm">
                <span className="text-gray-500">Temp:</span> {cow.temperature === null ? 'Offline' : `${cow.temperature}°C`}
              </div>
              
              <span className={`px-2 py-1 rounded font-mono text-[10px] uppercase tracking-wider border ${
                cow.health === 'Good' ? "bg-[#00D654]/15 dark:bg-[#00D654]/10 text-[#00A040] dark:text-[#00D654] border-[#00D654]/20" :
                cow.health === 'Needs Attention' ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20" :
                "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
              }`}>
                {cow.health}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}