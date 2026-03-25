import { Activity, Heart, TrendingUp, AlertTriangle } from "lucide-react";
import { StatCard } from "./stat-card";
import type { Stat } from "./dashboard-client";

const statStyleByType: Record<Stat["type"], { icon: React.ElementType; color: string }> = {
  total: { icon: Activity, color: "text-primary" },
  healthy: { icon: Heart, color: "text-sidebaraccent" },
  critical: { icon: AlertTriangle, color: "text-destructive" },
};

export function StatsGrid({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={String(stat.value)}
          icon={statStyleByType[stat.type].icon}
          color={statStyleByType[stat.type].color}
        />
      ))}
    </div>
  );
}