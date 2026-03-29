"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Activity,
  Settings,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { Icons } from "@/components/ui/Icons"

const navItems = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Livestock",
    url: "/dashboard/livestock",
    icon: Users,
  },
  {
    title: "Health",
    url: "/dashboard/health",
    icon: Activity,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { isMobile, setOpenMobile } = useSidebar()
  const normalizedPathname = pathname ? pathname.replace(/\/$/, "") : ""

  return (
    <Sidebar collapsible="icon" className="border-r border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-zinc-950" {...props}>
      <SidebarHeader className="border-b border-gray-200 dark:border-white/5 p-4 h-16 flex items-center justify-center">
         <div className="flex items-center gap-3 w-full overflow-hidden">
             <Icons.appIcon width={24} height={24} className="flex-shrink-0" />
             <span className="font-bold text-lg group-data-[collapsible=icon]:hidden whitespace-nowrap">TernakBoard</span>
         </div>
      </SidebarHeader>

      <SidebarContent className="py-2">
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = item.url === "/dashboard" 
                  ? normalizedPathname === "/dashboard" 
                  : normalizedPathname.startsWith(item.url);

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                        asChild 
                        isActive={isActive} 
                        tooltip={item.title}
                        className={isActive ? "bg-accent-green/15 dark:bg-accent-green/10 text-[#00A040] dark:text-accent-green font-medium" : "text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-white/[0.02]"}
                    >
                      <Link 
                        href={item.url} 
                        onClick={() => {
                          if (isMobile) setOpenMobile(false)
                        }}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200 dark:border-white/5 p-4">
          <div className="flex items-center gap-2 overflow-hidden text-sm text-gray-500">
             <div className="min-w-6 min-h-6 h-6 w-6 rounded-md bg-accent-green/20 text-[#00A040] dark:bg-accent-green/10 dark:text-accent-green flex items-center justify-center font-bold text-xs flex-shrink-0">
                 US
             </div>
             <span className="truncate font-medium text-black dark:text-white group-data-[collapsible=icon]:hidden">Farm Administrator</span>
          </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
