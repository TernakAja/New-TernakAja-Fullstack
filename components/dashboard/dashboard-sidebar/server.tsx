import { createClient } from "@/lib/supabase/server";
import DashboardSidebarClient from "./dashboard-sidebar";

export default async function DashboardSidebar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return <DashboardSidebarClient user={user} />;
}