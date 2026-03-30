import React from "react"

export function ChartSkeleton() {
  return (
    <div className="w-full h-[300px] bg-gray-100 dark:bg-white/5 animate-pulse rounded-lg border border-gray-200 dark:border-white/10 flex flex-col justify-end p-4">
      <div className="flex justify-between items-end h-full gap-2 opacity-50">
        <div className="w-full bg-gray-200 dark:bg-white/10 h-[40%] rounded-sm"></div>
        <div className="w-full bg-gray-200 dark:bg-white/10 h-[60%] rounded-sm"></div>
        <div className="w-full bg-gray-200 dark:bg-white/10 h-[50%] rounded-sm"></div>
        <div className="w-full bg-gray-200 dark:bg-white/10 h-[80%] rounded-sm"></div>
        <div className="w-full bg-gray-200 dark:bg-white/10 h-[30%] rounded-sm"></div>
        <div className="w-full bg-gray-200 dark:bg-white/10 h-[55%] rounded-sm"></div>
      </div>
    </div>
  )
}

export function TableSkeleton() {
  return (
    <div className="w-full bg-white dark:bg-[#111111] animate-pulse rounded-xl border border-gray-200 dark:border-white/5 overflow-hidden">
      <div className="h-12 border-b border-gray-200 dark:border-white/5 bg-gray-50/50 dark:bg-zinc-950/50 flex items-center px-4 gap-4">
        <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-1/4 hidden md:block"></div>
        <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-1/4"></div>
      </div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center px-4 py-4 border-b border-gray-100 dark:border-white/5 gap-4">
          <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-1/4 hidden md:block"></div>
          <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-1/4"></div>
        </div>
      ))}
    </div>
  )
}
