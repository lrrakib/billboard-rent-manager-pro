
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, MapPin, Users, FileText } from 'lucide-react';

const Dashboard = () => {
  // Mock data for demonstration
  const monthlyRevenue = [
    { month: 'Jan', revenue: 45000 },
    { month: 'Feb', revenue: 52000 },
    { month: 'Mar', revenue: 48000 },
    { month: 'Apr', revenue: 61000 },
    { month: 'May', revenue: 55000 },
    { month: 'Jun', revenue: 67000 },
  ];

  const billboardStatus = [
    { name: 'Rented', value: 12, color: '#22c55e' },
    { name: 'Available', value: 8, color: '#3b82f6' },
    { name: 'Maintenance', value: 2, color: '#f59e0b' },
  ];

  const stats = [
    {
      title: "Total Revenue",
      value: "$328,000",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Active Billboards",
      value: "22",
      change: "+2",
      icon: MapPin,
      color: "text-blue-600"
    },
    {
      title: "Total Clients",
      value: "15",
      change: "+3",
      icon: Users,
      color: "text-purple-600"
    },
    {
      title: "Pending Payments",
      value: "$45,000",
      change: "-8.2%",
      icon: FileText,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's your billboard management overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="transition-all duration-200 hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className={`text-xs ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'} mt-1`}>
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Revenue Chart */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Monthly Revenue</CardTitle>
              <CardDescription>Revenue trends over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                  <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Billboard Status */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Billboard Status Distribution</CardTitle>
              <CardDescription>Current status of all billboards</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={billboardStatus}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {billboardStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "New rental agreement", client: "Tech Corp", billboard: "Downtown Plaza", time: "2 hours ago", status: "completed" },
                { action: "Payment received", client: "Fashion Brand", amount: "$15,000", time: "4 hours ago", status: "completed" },
                { action: "Maintenance scheduled", billboard: "Highway Exit 12", time: "1 day ago", status: "pending" },
                { action: "New client registered", client: "Local Restaurant", time: "2 days ago", status: "completed" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">
                      {activity.client && `Client: ${activity.client}`}
                      {activity.billboard && `Billboard: ${activity.billboard}`}
                      {activity.amount && `Amount: ${activity.amount}`}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant={activity.status === 'completed' ? 'default' : 'secondary'}>
                      {activity.status}
                    </Badge>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
