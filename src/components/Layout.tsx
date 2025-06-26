
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  MapPin, 
  Users, 
  FileText, 
  DollarSign, 
  Settings,
  TrendingUp
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Billboards', href: '/billboards', icon: MapPin },
    { name: 'Clients', href: '/clients', icon: Users },
    { name: 'Rentals', href: '/rentals', icon: FileText },
    { name: 'Payments', href: '/payments', icon: DollarSign },
    { name: 'Reports', href: '/reports', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">BillboardPro</h1>
          </div>
        </div>
        
        <nav className="mt-6">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'flex items-center px-6 py-3 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                )}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-900 mb-1">Need Help?</h3>
            <p className="text-xs text-blue-700 mb-3">
              Contact support for assistance with your billboard management.
            </p>
            <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
              Contact Support
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

export default Layout;
