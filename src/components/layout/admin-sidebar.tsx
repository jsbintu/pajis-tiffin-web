'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Package,
  CreditCard,
  Truck,
  Settings,
  FileText,
  Bell,
  Menu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const navigation = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    name: 'Users',
    href: '/admin/users',
    icon: Users,
  },
  {
    name: 'Subscriptions',
    href: '/admin/subscriptions',
    icon: Package,
  },
  {
    name: 'Payments',
    href: '/admin/payments',
    icon: CreditCard,
  },
  {
    name: 'Deliveries',
    href: '/admin/deliveries',
    icon: Truck,
  },
  {
    name: 'Reports',
    href: '/admin/reports',
    icon: FileText,
  },
  {
    name: 'Notifications',
    href: '/admin/notifications',
    icon: Bell,
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
];

function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {navigation.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </Link>
        );
      })}
    </>
  );
}

export function AdminSidebar() {
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
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <nav className="mt-6 space-y-1">
            <NavLinks />
          </nav>
        </SheetContent>
      </Sheet>

      {/* Desktop Navigation */}
      <aside className="hidden lg:block w-64 border-r bg-muted/30 min-h-[calc(100vh-4rem)]">
        <nav className="p-4 space-y-1">
          <NavLinks />
        </nav>
      </aside>
    </>
  );
}
