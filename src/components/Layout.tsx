
import React from 'react';
import { Outlet, useLocation, Link, Navigate } from 'react-router-dom';
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
import { useAuth } from '@/hooks/useAuth';
import UserMenu from './UserMenu';

export const Layout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const { user, userRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, requiredRole: 'viewer' },
    { name: 'Billboards', href: '/billboards', icon: RectangleHorizontal, requiredRole: 'manager' },
    { name: 'Clients', href: '/clients', icon: Users, requiredRole: 'manager' },
    { name: 'Partners', href: '/partners', icon: Handshake, requiredRole: 'manager' },
    { name: 'Land Owners', href: '/landowners', icon: MapPin, requiredRole: 'manager' },
    { name: 'Rentals', href: '/rentals', icon: Receipt, requiredRole: 'manager' },
    { name: 'Payments', href: '/payments', icon: CreditCard, requiredRole: 'admin' },
    { name: 'Invoices', href: '/invoices', icon: FileText, requiredRole: 'viewer' },
    { name: 'Reports', href: '/reports', icon: BarChart3, requiredRole: 'manager' },
  ];

  const roleHierarchy: Record<string, number> = {
    'viewer': 1,
    'manager': 2,
    'admin': 3,
  };

  const userRoleLevel = roleHierarchy[userRole || 'viewer'] || 1;

  const accessibleNavigation = navigation.filter(item => {
    const requiredLevel = roleHierarchy[item.requiredRole] || 1;
    return userRoleLevel >= requiredLevel;
  });

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
            {accessibleNavigation.map((item) => {
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
        {/* Header */}
        <div className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-white px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-semibold lg:hidden">Billboard Manager</h1>
          </div>
          
          <UserMenu />
        </div>

        {/* Page content */}
        <main className="min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
