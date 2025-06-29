
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import UserManagement from '@/components/UserManagement';
import { 
  RectangleHorizontal, 
  Users, 
  DollarSign, 
  TrendingUp,
  Shield,
  AlertCircle 
} from 'lucide-react';

const Dashboard = () => {
  const { userRole } = useAuth();

  // Fetch dashboard statistics
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const [billboards, clients, rentals, payments] = await Promise.all([
        supabase.from('billboards_enhanced').select('id', { count: 'exact' }),
        supabase.from('clients_enhanced').select('id', { count: 'exact' }),
        supabase.from('billboard_rentals').select('rental_amount').eq('status', 'Active'),
        supabase.from('client_payments').select('amount').eq('status', 'Received')
      ]);

      const totalRevenue = rentals.data?.reduce((sum, rental) => sum + (rental.rental_amount || 0), 0) || 0;
      const totalReceived = payments.data?.reduce((sum, payment) => sum + (payment.amount || 0), 0) || 0;

      return {
        billboards: billboards.count || 0,
        clients: clients.count || 0,
        totalRevenue,
        totalReceived,
      };
    }
  });

  const StatCard = ({ title, value, icon: Icon, description }: any) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Welcome back! Here's your billboard management overview.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">
              Role: {userRole || 'viewer'}
            </span>
          </div>
        </div>

        {/* Security Notice */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Shield className="w-5 h-5" />
              Security Enhanced
            </CardTitle>
            <CardDescription className="text-blue-700">
              Your application is now protected with role-based access control. 
              Only authenticated users with proper permissions can access sensitive data.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Statistics Grid */}
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Billboards"
              value={stats?.billboards || 0}
              icon={RectangleHorizontal}
              description="Active billboard locations"
            />
            <StatCard
              title="Active Clients"
              value={stats?.clients || 0}
              icon={Users}
              description="Registered client companies"
            />
            <StatCard
              title="Monthly Revenue"
              value={`৳${(stats?.totalRevenue || 0).toLocaleString()}`}
              icon={DollarSign}
              description="From active rentals"
            />
            <StatCard
              title="Total Received"
              value={`৳${(stats?.totalReceived || 0).toLocaleString()}`}
              icon={TrendingUp}
              description="Payments received"
            />
          </div>
        )}

        {/* Role-based Content */}
        {userRole === 'admin' && (
          <div className="space-y-6">
            <UserManagement />
          </div>
        )}

        {userRole === 'viewer' && (
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-800">
                <AlertCircle className="w-5 h-5" />
                Viewer Access
              </CardTitle>
              <CardDescription className="text-yellow-700">
                You have read-only access to the system. Contact an administrator to request additional permissions.
              </CardDescription>
            </CardHeader>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
