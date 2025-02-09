"use client";
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { cn } from "@/lib/utils";
import { Layout, Calendar, LogOut, Crown, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../landing/logo";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import cookies from 'js-cookie'
import { useUserInfo } from '@/lib/queries';

const routes = [
  {
    label: "Dashboard",
    icon: Layout,
    href: "/dashboard",
  },
  {
    label: "Schedule",
    icon: Calendar,
    href: "/schedule",
  },
];

export function Sidebar() {
  return (
    <>
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="fixed top-4 left-4 z-50"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-64 p-0 bg-zinc-900 border-r border-zinc-800"
          >
            <VisuallyHidden >
              <SheetTitle>Menu</SheetTitle>
            </VisuallyHidden>
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:block w-64">
        <SidebarContent />
      </div>
    </>
  );
}

function SidebarContent() {
  const pathname = usePathname();
  const handleLogout = () => {
    cookies.remove('token')
    window.location.href = '/'
  }
    const { data } = useUserInfo();
  
  return (
    <div className="flex h-full">
      <div className="relative flex w-full flex-col h-full bg-zinc-900 border-r border-zinc-800">
        {/* Logo Section */}
        <div className="px-6 py-8 border-b border-zinc-800">
          <Logo />
        </div>

        {/* Navigation Links */}
        <div className="flex-1 px-3 py-4 space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors",
                pathname === route.href
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              )}
            >
              <route.icon className="w-5 h-5" />
              <span className="font-medium">{route.label}</span>
              {pathname === route.href && (
                <div className="ml-auto w-1 h-6 bg-indigo-500 rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="p-4 space-y-4">
          <div className="p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-500" />
                <span className="font-medium text-white">{data?.plan + ' plan'}</span>
              </div>
              <span className="text-xs font-medium text-zinc-400">Upgrade</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Storage Used</span>
                <span className="text-white font-medium">75%</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-700/50 rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-amber-500/90 rounded-full" />
              </div>
            </div>
          </div>

          <Button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-zinc-300 bg-zinc-800/50 border border-zinc-700/50 hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
