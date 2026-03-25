import DashboardClient from "@/components/dashboard/dashboard-client";
import type { Stat } from "@/components/dashboard/dashboard-client";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();

  // Example queries
  const { data: livestock } = await supabase
    .from("livestock")
    .select("*");

  const total = livestock?.length || 0;
  const healthy = livestock?.filter(l => l.status === "healthy").length || 0;
  const critical = livestock?.filter(l => l.status === "critical").length || 0;

  const stats: Stat[] = [
    { title: "Total Livestock", value: total, type: "total" },
    { title: "Healthy", value: healthy, type: "healthy" },
    { title: "Critical Alerts", value: critical, type: "critical" },
  ];

  return <DashboardClient stats={stats} />;
}