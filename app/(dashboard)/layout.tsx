import DashboardSidebar from "@/components/dashboard/dashboard-sidebar/server";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex overflow-hidden">
      
      {/* Sidebar */}
      <Suspense fallback={<div className="w-64" />}>
        <div className="w-64 shrink-0 border-r border-border">
          <DashboardSidebar />
        </div>
      </Suspense>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {children}
        </div>
      </div>

    </div>
  );
}