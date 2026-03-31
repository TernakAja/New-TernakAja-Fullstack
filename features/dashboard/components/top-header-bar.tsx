"use client"

import { Search, Bell } from 'lucide-react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { usePathname } from 'next/navigation'
import { useDashboardStore } from "@/features/dashboard/store/dashboard-store"
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"

export function TopHeaderBar() {
    const pathname = usePathname()
    const searchQuery = useDashboardStore((state) => state.searchQuery)
    const setSearchQuery = useDashboardStore((state) => state.setSearchQuery)

    // Generate breadcrumb text from pathname
    const getBreadcrumbs = () => {
        if (!pathname) return "Overview"
        if (pathname.includes("livestock")) return "Livestock"
        if (pathname.includes("health")) return "Health"
        if (pathname.includes("settings")) return "Settings"
        return "Overview"
    }

    return (
        <header className="h-16 flex items-center justify-between border-b border-border bg-backgroundblack/80 backdrop-blur-md px-4 md:px-6 relative z-30 transition-[width,height] ease-linear">
            <div className="flex items-center gap-4">
                <SidebarTrigger className="-ml-1" />

                {/* Breadcrumb dummy */}
                <span className="hidden md:block text-sm text-muted-foreground font-medium">
                    Dashboard <span className="mx-2">/</span> <span className="text-foreground">{getBreadcrumbs()}</span>
                </span>
            </div>

            <div className="flex items-center gap-4 flex-1 justify-end">


                {/* Dashboard Time Range Filter */}
                <select
                    className="hidden sm:block bg-white dark:bg-zinc-950 border border-gray-200 dark:border-white/10 rounded-md py-1.5 px-3 text-sm focus:outline-none text-foreground cursor-pointer"
                    onChange={(e) => useDashboardStore.getState().setTimeRange(e.target.value as any)}
                >
                    <option value="24h">Last 24 Hours</option>
                    <option value="7d">Last 7 Days</option>
                    <option value="30d">Last 30 Days</option>
                </select>

                <ThemeToggle />

                {/* Notifications */}
                <button className="relative p-2 text-muted-foreground hover:bg-gray-100 dark:hover:bg-white/[0.02] rounded-full">
                    <Bell size={20} />
                    <span className="absolute top-1 right-2 w-2 h-2 bg-accent-green rounded-full shadow-[0_0_8px_#00D654]" />
                </button>

                {/* User Dropdown Profile via Radix */}
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                        <button className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent-green to-emerald-800 flex items-center justify-center text-white font-bold text-xs cursor-pointer outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-accent-green">
                            US
                        </button>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Portal>
                        <DropdownMenu.Content
                            className="z-50 min-w-[200px] bg-card border-border10 rounded-md shadow-lg p-1 text-sm animate-in fade-in-80 slide-in-from-top-2"
                            sideOffset={8}
                            align="end"
                        >
                            <DropdownMenu.Label className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                                My Account
                            </DropdownMenu.Label>
                            <DropdownMenu.Item className="px-2 py-2 outline-none cursor-pointer rounded text-foreground hover:bg-gray-100 dark:hover:bg-white/5 data-[highlighted]:bg-gray-100 dark:data-[highlighted]:bg-white/5 transition-colors">
                                Profile
                            </DropdownMenu.Item>
                            <DropdownMenu.Item className="px-2 py-2 outline-none cursor-pointer rounded text-foreground hover:bg-gray-100 dark:hover:bg-white/5 data-[highlighted]:bg-gray-100 dark:data-[highlighted]:bg-white/5 transition-colors">
                                Subscription
                            </DropdownMenu.Item>
                            <DropdownMenu.Separator className="h-px bg-muted10 my-1 -mx-1" />
                            <DropdownMenu.Item className="px-2 py-2 outline-none cursor-pointer rounded text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 data-[highlighted]:bg-red-50 dark:data-[highlighted]:bg-red-900/10 transition-colors">
                                Log out
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>
            </div>
        </header>
    )
}
