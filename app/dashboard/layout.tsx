import { DashboardSidebar } from '@/features/dashboard/components/dashboard-sidebar'
import { TopHeaderBar } from '@/features/dashboard/components/top-header-bar'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { createClient } from '@/lib/supabase/server'
import { AuthHydrate } from '@/features/auth/components/auth-hydrate'

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();

    return (
        <SidebarProvider>
            <AuthHydrate user={data?.user} />
            <DashboardSidebar />
            <SidebarInset className="bg-background text-foreground">
                <TopHeaderBar />
                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto space-y-6">
                        {children}
                    </div>
                </main>

                {/* Mobile Bottom Navigation - simple fallback for mobile */}
                <div className="md:hidden border-t border-border bg-card-950 p-4">
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
