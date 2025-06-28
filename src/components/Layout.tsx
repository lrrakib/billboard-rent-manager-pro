import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { Button } from './ui/button';
import { 
  LayoutDashboard, 
  RectangleHorizontal, 
  Users, 
  Handshake, 
  MapPin, 
  Receipt, 
  CreditCard, 
  BarChart3,
  FileText,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const Layout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Billboards', href: '/billboards', icon: RectangleHorizontal },
    { name: 'Clients', href: '/clients', icon: Users },
    { name: 'Partners', href: '/partners', icon: Handshake },
    { name: 'Land Owners', href: '/landowners', icon: MapPin },
    { name: 'Rentals', href: '/rentals', icon: Receipt },
    { name: 'Payments', href: '/payments', icon: CreditCard },
    { name: 'Invoices', href: '/invoices', icon: FileText },
    { name: 'Reports', href: '/reports', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-16 items-center justify-between px-6 border-b">
          <h1 className="text-xl font-bold text-gray-900">Billboard Manager</h1>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Mobile header */}
        <div className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-6 lg:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">Billboard Manager</h1>
        </div>

        {/* Page content */}
        <main className="min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
