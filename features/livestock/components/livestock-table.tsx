"use client"

import { useMemo, useRef } from 'react'
import { useDashboardStore } from '@/features/dashboard/store/dashboard-store'
import { useLivestockData } from '@/features/livestock/hooks/useLivestockData'
import { useRealtimeSensors } from '@/features/sensors/hooks/useRealtimeSensors'
import { LivestockData } from '@/features/livestock/hooks/useLivestockData'
import { useSensorStore } from '@/features/sensors/store/sensor-store'
import { HealthBadge } from '@/components/ui/health-badge'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'

/**
 * 🏗️ COMPONENT ARCHITECTURE: DATA FLOW PENJELASAN
 * ------------------------------------------------------------------
 * Tabel ini menggunakan 3 lapis arsitektur untuk menjaga performa 60FPS:
 * 1. TanStack Table: Untuk memformat kolom dan logic dasar sorting.
 * 2. Virtualizer: Untuk menghindari DOM lagging jika ada >500 sapi. Hanya row yang "terlihat" di layar yang dirender HTML-nya.
 * 3. Isolated Cells (TempCell & BatteryCell): Pattern ini adalah KUNCI SCALABILITY KITA.
 */

const columnHelper = createColumnHelper<LivestockData>()

/**
 * ⚡ PATTERN: ISOLATED STATE RE-RENDERING (TempCell)
 * Kenapa komponen ini dipisah dari tabel utama?
 * Jawab: Komponen ini "connect" (berlangganan) LANGSUNG ke Zustand (sensor-store) lewat ID Sapi spesifik.
 * Jika ada socket WebSocket masu bahwa Sapi A suhunya berubah menjadi 39.5, MAKA HANYA teks "39.5" ini saja yang akan dirender ulang oleh React.
 * Tabel utama, header, dan row sapi-sapi lain TIDAK AKAN ikut ke-render ulang, menghemat memory churn Javascript secara masif.
 */
function TempCell({ cowId }: { cowId: string }) {
  const sensor = useSensorStore(state => state.data[cowId])
  const val = sensor?.temperature
  return val === undefined || val === null
        ? <span className="text-muted-foreground text-sm">Offline</span>
        : <span className="text-sm font-medium text-foreground">{val}</span>
}

function BatteryCell({ cowId }: { cowId: string }) {
  const sensor = useSensorStore(state => state.data[cowId])
  const val = sensor?.batteryUrl ?? 0
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 bg-muted/50 rounded-full overflow-hidden">
        <div
          className={`h-full ${val < 20 ? 'bg-red-500' : 'bg-emerald-500'}`}
          style={{ width: `${val}%` }}
        />
      </div>
      <span className="text-xs text-muted-foreground">{val}%</span>
    </div>
  )
}

const columns = [
  columnHelper.accessor('id', {
    header: 'Tag ID',
    cell: info => <span className="font-mono text-xs text-foreground uppercase px-2 py-1 rounded bg-muted">{info.getValue()}</span>,
  }),
  columnHelper.accessor('name', {
    header: 'Name/Alias',
    cell: info => <span className="font-medium text-foreground">{info.getValue()}</span>,
  }),
  columnHelper.display({
    id: 'temperature',
    header: 'Temp (°C)',
    cell: info => <TempCell cowId={info.row.original.id} />,
  }),
  columnHelper.accessor('health', {
    header: 'Health Status',
    cell: info => <HealthBadge status={info.getValue()} />
  }),
  columnHelper.display({
    id: 'batteryUrl',
    header: 'Sensor Battery',
    cell: info => <BatteryCell cowId={info.row.original.id} />,
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
      <div className="hidden md:block overflow-hidden rounded-xl border border-border bg-card text-card-foreground">
        {/* We use a max-height container to allow scrolling for the virtualizer */}
        <div
          ref={desktopRowContainerRef}
          className="max-h-[600px] overflow-auto custom-scrollbar"
          style={{ contain: 'strict' }}
        >
          <table className="w-full text-left text-sm relative">
            <thead className="bg-muted border-b border-border sticky top-0 z-10">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className="p-4 font-medium text-muted-foreground">
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
              className="divide-y divide-border "
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
                    className="hover:bg-muted/50 transition-colors absolute w-full cursor-pointer"
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
                <div className="rounded-lg border border-border bg-card text-card-foreground p-4 flex flex-col gap-3 shadow-sm mb-2 h-[calc(100%-8px)]">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs text-foreground uppercase px-2 py-1 rounded bg-muted">{cow.id}</span>
                    <span className="font-medium">{cow.name}</span>
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <div className="text-sm">
                      <span className="text-gray-500">Temp:</span> <TempCell cowId={cow.id} />
                    </div>

                    <HealthBadge status={cow.health} />
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
