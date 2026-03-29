import { DashboardSidebar } from '@/features/dashboard/components/dashboard-sidebar'
import { TopHeaderBar } from '@/features/dashboard/components/top-header-bar'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <SidebarInset className="bg-white dark:bg-[#0A0A0A] text-black dark:text-white">
                <TopHeaderBar />
                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto space-y-6">
                        {children}
                    </div>
                </main>

                {/* Mobile Bottom Navigation - simple fallback for mobile */}
                <div className="md:hidden border-t border-gray-200 dark:border-white/5 bg-white dark:bg-zinc-950 p-4">
                    <div className="flex justify-around items-center">
                        <span className="text-xs font-semibold text-accent-green">Home</span>
                        <span className="text-xs text-gray-500 dark:text-zinc-400">Herd</span>
                        <span className="text-xs text-gray-500 dark:text-zinc-400">Settings</span>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
