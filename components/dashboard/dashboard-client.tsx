"use client";

import { useState } from "react";
import { HealthMetricsChart } from "./health-metrics-chart";
import LastHourMetrics from "./metrics";
import { SpeciesDistribution } from "./species-distribution";
import { StatsGrid } from "./stat-grid";

export type Stat = {
  title: string;
  value: number;
  type: "total" | "healthy" | "critical";
};

export default function DashboardClient({ stats }: { stats: Stat[] }) {
  const [avgSensor, setAvgSensor] = useState<RecentAvgSensorData>();

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Dashboard
        </h2>
        <p className="text-muted-foreground">
          Here is what's happening with your farm today.
        </p>
      </div>

      {/* Stats */}
      <StatsGrid stats={stats} />

      {/* Main Charts Section */}
      <div className="grid gap-6 lg:grid-cols-7">
        
        {/* Health Chart (bigger) */}
        <div className="lg:col-span-4 bg-card border border-border rounded-2xl p-4">
          <h3 className="text-lg font-semibold text-foreground mb-1">
            Health Trends
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Average heart rate and temperature over time
          </p>

          <div className="h-[300px]">
            <HealthMetricsChart />
          </div>
        </div>

        {/* Species Distribution */}
        <div className="lg:col-span-3 bg-card border border-border rounded-2xl p-4">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Livestock Distribution
          </h3>

          <SpeciesDistribution />
        </div>
      </div>

      {/* Last Hour Metrics */}
      <div className="bg-card border border-border rounded-2xl p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Last Hour Metrics
        </h3>

        <LastHourMetrics
          heartRateAverage={avgSensor?.avgHeartRate}
          temperatureAverage={avgSensor?.avgTemperature}
          sp02Average={avgSensor?.avgSp02}
        />
      </div>

    </div>
  );
}