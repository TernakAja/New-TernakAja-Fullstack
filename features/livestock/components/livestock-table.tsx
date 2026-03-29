"use client"

import { useMemo, useRef } from 'react'
import { useDashboardStore } from '@/features/dashboard/store/dashboard-store'
import { useLivestockData } from '@/features/livestock/hooks/useLivestockData'
import { useRealtimeSensors } from '@/features/sensors/hooks/useRealtimeSensors'
import { LivestockData } from '@/features/livestock/hooks/useLivestockData'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'

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
  // Fetch from TanStack Query cache
  const { data: dictData, isLoading } = useLivestockData()

  // Get the search word from Zustand (UI State)
  const searchQuery = useDashboardStore((state) => state.searchQuery)
  const openModal = useDashboardStore((state) => state.openModal)

  // Convert dict to array and filter out before rendering
  const data = useMemo(() => {
    let rawArray = dictData ? Object.values(dictData) : []

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      rawArray = rawArray.filter(cow =>
        cow.name.toLowerCase().includes(q) ||
        cow.id.toLowerCase().includes(q)
      )
    }

    return rawArray;
  }, [dictData, searchQuery])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  // Virtualizer Setup for Desktop
  const desktopRowContainerRef = useRef<HTMLDivElement>(null)
  const desktopRowVirtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    getScrollElement: () => desktopRowContainerRef.current,
    estimateSize: () => 53, // Adjust based on your row height
    overscan: 10,
  })

  // Virtualizer Setup for Mobile
  const mobileRowContainerRef = useRef<HTMLDivElement>(null)
  const mobileRowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => mobileRowContainerRef.current,
    estimateSize: () => 100, // Adjust based on mobile card height
    overscan: 5,
  })

  if (isLoading) {
    return <div className="p-4 text-center text-sm text-gray-500">Loading livestock data...</div>
  }

  return (
    <div className="w-full">
      {/* Desktop Table (Virtualized) */}
      <div className="hidden md:block overflow-hidden rounded-xl border border-gray-200 dark:border-white/5 bg-white dark:bg-[#0A0A0A]">
        {/* We use a max-height container to allow scrolling for the virtualizer */}
        <div
          ref={desktopRowContainerRef}
          className="max-h-[600px] overflow-auto custom-scrollbar"
          style={{ contain: 'strict' }}
        >
          <table className="w-full text-left text-sm relative">
            <thead className="bg-gray-50 dark:bg-zinc-950 border-b border-gray-200 dark:border-white/5 sticky top-0 z-10">
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
            <tbody
              className="divide-y divide-gray-100 dark:divide-white/5 "
              style={{
                height: `${desktopRowVirtualizer.getTotalSize()}px`,
                position: 'relative',
              }}
            >
              {desktopRowVirtualizer.getVirtualItems().map(virtualRow => {
                const row = table.getRowModel().rows[virtualRow.index]
                return (
                  <tr
                    key={row.id}
                    onClick={() => openModal('edit-cow', row.original.id)}
                    className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors absolute w-full cursor-pointer"
                    style={{
                      top: 0,
                      left: 0,
                      transform: `translateY(${virtualRow.start}px)`,
                      height: `${virtualRow.size}px`,
                    }}
                  >
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="p-4">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Fallback - Stacked Cards (Virtualized) */}
      <div
        ref={mobileRowContainerRef}
        className="md:hidden max-h-[80vh] overflow-auto custom-scrollbar"
        style={{ contain: 'strict' }}
      >
        <div
          className="w-full relative"
          style={{ height: `${mobileRowVirtualizer.getTotalSize()}px` }}
        >
          {mobileRowVirtualizer.getVirtualItems().map(virtualRow => {
            const cow = data[virtualRow.index]
            return (
              <div
                key={cow.id}
                onClick={() => openModal('edit-cow', cow.id)}
                className="absolute w-full px-1 cursor-pointer"
                style={{
                  top: 0,
                  left: 0,
                  transform: `translateY(${virtualRow.start}px)`,
                  height: `${virtualRow.size}px`,
                }}
              >
                <div className="rounded-lg border border-gray-200 dark:border-white/5 bg-white dark:bg-[#111111] p-4 flex flex-col gap-3 shadow-sm mb-2 h-[calc(100%-8px)]">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs text-black dark:text-white uppercase px-2 py-1 rounded bg-gray-100 dark:bg-white/5">{cow.id}</span>
                    <span className="font-medium">{cow.name}</span>
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <div className="text-sm">
                      <span className="text-gray-500">Temp:</span> {cow.temperature === null ? 'Offline' : `${cow.temperature}°C`}
                    </div>

                    <span className={`px-2 py-1 rounded font-mono text-[10px] uppercase tracking-wider border ${cow.health === 'Good' ? "bg-[#00D654]/15 dark:bg-[#00D654]/10 text-[#00A040] dark:text-[#00D654] border-[#00D654]/20" :
                      cow.health === 'Needs Attention' ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20" :
                        "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
                      }`}>
                      {cow.health}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
