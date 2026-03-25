"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MilkIcon as Cow, Globe, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { LogoutButton } from "../../logout-button";

export default function DashboardSidebarClient({ user }: { user: any }) {
  const pathname = usePathname();
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    const newLang = language === "en" ? "id" : "en";
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Livestock", href: "/dashboard/livestock", icon: Cow },
  ];

  return (
    <aside className="w-64 bg-[#f7f7f7] flex flex-col h-screen border-r border-gray-200">
      
      {/* Branding */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-green-600/90 text-white">
            <Cow className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold text-green-700">
            TernakAja
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                isActive
                  ? "bg-green-100 text-green-700"
                  : "text-gray-500 hover:bg-gray-200"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5",
                  isActive ? "text-green-700" : "text-gray-400"
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 space-y-4">
        
        {/* User */}
        <div className="flex items-center gap-3 px-2">
          <Avatar className="h-10 w-10 bg-gray-200">
            <AvatarFallback className="text-gray-500">
              {user?.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <span className="text-sm text-gray-600">
            Farm Manager
          </span>
           <LogoutButton />
        </div>

        {/* Language */}
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-3 px-2 py-2 text-gray-600 hover:text-gray-800"
        >
          <Globe className="h-4 w-4" />
          Bahasa Indonesia
        </button>

        {/* Home */}
        <Link
          href="/"
          className="flex items-center gap-3 px-2 py-2 text-gray-600 hover:text-gray-800"
        >
          <Home className="h-4 w-4" />
          Home
        </Link>
      </div>
    </aside>
  );
}