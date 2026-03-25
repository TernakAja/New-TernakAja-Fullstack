"use client";

import { Activity } from "lucide-react";
import { LineChart } from "./charts";

interface Props {
  data?: DailySensorStats[];
}

export function HealthMetricsChart({ data }: Props) {
  const hasData = data && data.length > 0;

  return (
    <div className="h-[300px] border-border bg-card rounded-lg border">
      {hasData ? (
        <LineChart dailySensorStats={data} />
      ) : (
        <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
          <Activity className="h-12 w-12 mb-3 text-[#328E6E]" />
          <p className="text-xl font-semibold mb-1">
            No sensor data available
          </p>
          <p className="text-sm">
            There is no sensor data to display at the moment.
          </p>
        </div>
      )}
    </div>
  );
}