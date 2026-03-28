"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, Activity, Settings, ChevronLeft, ChevronRight } from 'lucide-react'

export function DashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const rawPathname = usePathname()
  const pathname = rawPathname ? rawPathname.replace(/\/$/, '') : ''

  return (
    <aside 
      className={`h-full border-r border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-zinc-950 transition-all duration-300 relative ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="p-4 md:p-6 flex items-center justify-between border-b border-gray-200 dark:border-white/5">
        {!isCollapsed && <span className="font-bold text-lg">TernakAja</span>}
        {isCollapsed && <span className="font-bold text-lg text-accent-green mx-auto">TA</span>}
      </div>
      
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-white/[0.02]"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      <nav className="p-4 space-y-2">
        <NavItem href="/dashboard" icon={<LayoutDashboard size={20} />} label="Overview" active={pathname === "/dashboard"} isCollapsed={isCollapsed} />
        <NavItem href="/dashboard/livestock" icon={<Users size={20} />} label="Livestock" active={pathname === "/dashboard/livestock" || pathname.startsWith("/dashboard/livestock/")} isCollapsed={isCollapsed} />
        <NavItem href="/dashboard/health" icon={<Activity size={20} />} label="Health" active={pathname === "/dashboard/health"} isCollapsed={isCollapsed} />
        <NavItem href="/dashboard/settings" icon={<Settings size={20} />} label="Settings" active={pathname === "/dashboard/settings"} isCollapsed={isCollapsed} />
      </nav>
    </aside>
  )
}

function NavItem({ href, icon, label, active, isCollapsed }: { href: string, icon: React.ReactNode, label: string, active?: boolean, isCollapsed: boolean }) {
  return (
    <Link 
      href={href} 
      className={`flex items-center gap-3 p-3 rounded-md transition-colors ${
        active 
          ? 'bg-accent-green/15 dark:bg-accent-green/10 text-[#00A040] dark:text-accent-green font-medium' 
          : 'text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-white/[0.02]'
      } ${isCollapsed ? 'justify-center' : ''}`}
    >
      {icon}
      {!isCollapsed && <span>{label}</span>}
    </Link>
  )
}