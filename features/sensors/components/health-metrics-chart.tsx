"use client"

import dynamic from 'next/dynamic'
import { ChartSkeleton } from '@/components/ui/skeletons'

export const HealthMetricsChart = dynamic(
  () => import('./health-metrics-chart-client').then(mod => mod.HealthMetricsChartClient),
  { 
    ssr: false, 
    loading: () => <ChartSkeleton />
  }
)
