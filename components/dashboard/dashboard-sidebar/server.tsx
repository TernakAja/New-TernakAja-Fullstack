import { createClient } from "@/lib/supabase/server";
import DashboardSidebarClient from "./dashboard-sidebar";

export default async function DashboardSidebar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
  .from("users")
  .select("name")
  .eq("id", user?.id)
  .single();

  console.log("User profile in DashboardSidebar:", profile);

  return <DashboardSidebarClient user={{ ...user, name: profile?.name }} />;
}