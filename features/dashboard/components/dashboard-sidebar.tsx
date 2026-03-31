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
  { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
  { title: "Livestock", url: "/dashboard/livestock", icon: Users },
  { title: "Health", url: "/dashboard/health", icon: Activity },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
]

export function DashboardSidebar({ dir = "ltr", ...props }: React.ComponentProps<typeof Sidebar> & { dir?: "ltr" | "rtl" }) {
  const pathname = usePathname()
  const { isMobile, setOpenMobile } = useSidebar()
  const normalizedPathname = pathname ? pathname.replace(/\/$/, "") : ""

  // Automatically set side to right if dir is RTL, unless explicitly overridden in props
  const defaultSide = dir === "rtl" ? "right" : "left"

  return (
    <Sidebar
      dir={dir}
      side={props.side || defaultSide}
      collapsible="icon"
      className="border border-border bg-sidebar rtl:border-r-0 rtl:border-l"
      {...props}
    >
      <SidebarHeader className="border-b border-sidebar-border p-4 h-16 flex items-center justify-center">
        <div className="flex items-center gap-3 w-full overflow-hidden">
          <Icons.appIcon width={24} height={24} className="flex-shrink-0" />
          <span className="font-bold text-lg group-data-[collapsible=icon]:hidden whitespace-nowrap">TernakBoard</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="py-2">
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = item.url === "/dashboard"
                  ? normalizedPathname === "/dashboard"
                  : normalizedPathname.startsWith(item.url);

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton

                      isActive={isActive}
                      tooltip={item.title}
                      className={isActive ? "bg-emerald-500/15 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium" : "text-sidebar-foreground"}
                    >
                      <Link
                        href={item.url}
                        onClick={() => {
                          if (isMobile) setOpenMobile(false)
                        }}
                        className="flex items-center gap-2 w-full"
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

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-2 overflow-hidden text-sm text-muted-foreground">
          <div className="min-w-6 min-h-6 h-6 w-6 rounded-md bg-emerald-500/20 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 flex items-center justify-center font-bold text-xs flex-shrink-0">
            US
          </div>
          <span className="truncate font-medium text-foreground group-data-[collapsible=icon]:hidden">Farm Administrator</span>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}