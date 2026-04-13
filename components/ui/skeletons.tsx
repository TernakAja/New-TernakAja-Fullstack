import React from "react"

export function ChartSkeleton() {
  return (
    <div className="w-full h-[300px] bg-muted animate-pulse rounded-lg border border-border flex flex-col justify-end p-4">
      <div className="flex justify-between items-end h-full gap-2 opacity-50">
        <div className="w-full bg-muted/50 h-[40%] rounded-sm"></div>
        <div className="w-full bg-muted/50 h-[60%] rounded-sm"></div>
        <div className="w-full bg-muted/50 h-[50%] rounded-sm"></div>
        <div className="w-full bg-muted/50 h-[80%] rounded-sm"></div>
        <div className="w-full bg-muted/50 h-[30%] rounded-sm"></div>
        <div className="w-full bg-muted/50 h-[55%] rounded-sm"></div>
      </div>
    </div>
  )
}

export function TableSkeleton() {
  return (
    <div className="w-full bg-card animate-pulse rounded-xl border border-border overflow-hidden">
      <div className="h-12 border-b border-border bg-muted flex items-center px-4 gap-4">
        <div className="h-4 bg-muted/50 rounded w-1/4"></div>
        <div className="h-4 bg-muted/50 rounded w-1/4"></div>
        <div className="h-4 bg-muted/50 rounded w-1/4 hidden md:block"></div>
        <div className="h-4 bg-muted/50 rounded w-1/4"></div>
      </div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center px-4 py-4 border-b border-border gap-4">
          <div className="h-4 bg-muted/50 rounded w-1/4"></div>
          <div className="h-4 bg-muted/50 rounded w-1/4"></div>
          <div className="h-4 bg-muted/50 rounded w-1/4 hidden md:block"></div>
          <div className="h-4 bg-muted/50 rounded w-1/4"></div>
        </div>
      ))}
    </div>
  )
}
