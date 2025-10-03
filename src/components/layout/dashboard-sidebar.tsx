"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Home, 
  CreditCard, 
  Calendar, 
  Settings, 
  Bell,
  Receipt,
  MapPin,
  Menu,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Subscription",
    href: "/dashboard/subscription",
    icon: CreditCard,
  },
  {
    title: "Deliveries",
    href: "/dashboard/deliveries",
    icon: Calendar,
  },
  {
    title: "Payments",
    href: "/dashboard/payments",
    icon: Receipt,
  },
  {
    title: "Addresses",
    href: "/dashboard/addresses",
    icon: MapPin,
  },
]

const settingsItems = [
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Notifications",
    href: "/dashboard/notifications",
    icon: Bell,
  },
]

function NavLinks() {
  const pathname = usePathname()

  return (
    <>
      <nav className="space-y-1 px-3">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.title}
            </Link>
          )
        })}
      </nav>

      <Separator className="my-4" />

      <nav className="space-y-1 px-3">
        {settingsItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.title}
            </Link>
          )
        })}
      </nav>
    </>
  )
}

export function DashboardSidebar() {
  return (
    <>
      {/* Mobile Navigation */}
      <Sheet>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="ghost" size="sm" className="mr-2">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <SheetHeader>
            <SheetTitle>Dashboard Menu</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <NavLinks />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex h-full w-64 flex-col border-r bg-muted/10">
        <div className="flex-1 overflow-y-auto py-4">
          <NavLinks />
        </div>
      </div>
    </>
  )
}
