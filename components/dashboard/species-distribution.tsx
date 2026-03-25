"use client";

import { PieChart } from "lucide-react";
import { DonutChart } from "./charts";
import { SpeciesCount } from "@/model/dataSchemas";

interface Props {
  data?: SpeciesCount[];
}

const colors = ["#328E6E", "#67AE6E", "#90C67C", "#E1EEBC"];

export function SpeciesDistribution({ data}: Props) {
  const hasData = data && data.length > 0;

  if (!hasData) {
    return (
      <div className="h-[300px] flex flex-col items-center justify-center text-center text-gray-500 p-8 border-border bg-card rounded-lg border">
        <PieChart className="h-12 w-12 mb-3 text-[#328E6E]" />
        <p className="text-xl font-semibold mb-1">
          No species data available
        </p>
        <p className="text-sm">
          There is no species data to display at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-7">
      <div className="h-[300px] flex items-center justify-center">
        <DonutChart speciesData={data} />
      </div>

      <div className="space-y-2 px-10 flex flex-col justify-center">
        {data.map(({ species, total }, index) => {
          const color = colors[index % colors.length];

          return (
            <div
              key={species}
              className="flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-1.5">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="text-md font-medium text-gray-700 dark:text-gray-300">
                  {species}
                </span>
              </div>
              <span className="text-md font-medium text-gray-700 dark:text-gray-300">
                {total}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}