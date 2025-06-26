
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, MapPin, Users, DollarSign, Plus } from 'lucide-react';

const Rentals = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock rental data
  const rentals = [
    {
      id: 1,
      client: "Tech Corp",
      billboard: "Downtown Plaza",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      totalAmount: 30000,
      paidStatus: "Paid",
      paymentMode: "Bank Transfer",
      pvcCost: 2500,
      fittingCost: 1500
    },
    {
      id: 2,
      client: "Fashion Brand",
      billboard: "Airport Terminal",
      startDate: "2024-02-15",
      endDate: "2024-08-15",
      totalAmount: 24000,
      paidStatus: "Partial",
      paymentMode: "Credit Card",
      pvcCost: 3000,
      fittingCost: 2000
    },
    {
      id: 3,
      client: "Auto Dealership",
      billboard: "Highway Exit 12",
      startDate: "2024-03-01",
      endDate: "2024-09-01",
      totalAmount: 10800,
      paidStatus: "Unpaid",
      paymentMode: "Bank Transfer",
      pvcCost: 1800,
      fittingCost: 1200
    }
  ];

  const filteredRentals = rentals.filter(rental => {
    const matchesSearch = 
      rental.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rental.billboard.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || rental.paidStatus.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Partial': return 'bg-yellow-100 text-yellow-800';
      case 'Unpaid': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const months = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30));
    return `${months} months`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Rentals</h1>
            <p className="text-gray-600 mt-2">Track and manage billboard rental agreements</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            New Rental
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search by client or billboard..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by payment status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="partial">Partial</SelectItem>
              <SelectItem value="unpaid">Unpaid</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Rentals List */}
        <div className="space-y-4">
          {filteredRentals.map((rental) => (
            <Card key={rental.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg flex items-center">
                      <Users className="w-5 h-5 mr-2 text-blue-600" />
                      {rental.client}
                    </CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {rental.billboard}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(rental.paidStatus)}>
                    {rental.paidStatus}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Rental Period</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        <span>Start: {rental.startDate}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        <span>End: {rental.endDate}</span>
                      </div>
                      <div className="text-blue-600 font-medium">
                        Duration: {calculateDuration(rental.startDate, rental.endDate)}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Financial Details</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Rent:</span>
                        <span className="font-semibold">${rental.totalAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">PVC Cost:</span>
                        <span>${rental.pvcCost.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Fitting Cost:</span>
                        <span>${rental.fittingCost.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between pt-1 border-t">
                        <span className="text-gray-600">Total:</span>
                        <span className="font-bold text-green-600">
                          ${(rental.totalAmount + rental.pvcCost + rental.fittingCost).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Payment Info</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Mode:</span>
                        <span>{rental.paymentMode}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <Badge size="sm" className={getStatusColor(rental.paidStatus)}>
                          {rental.paidStatus}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button className="w-full" variant="outline">
                      View Details
                    </Button>
                    <Button className="w-full" variant="outline">
                      Generate Invoice
                    </Button>
                    {rental.paidStatus !== 'Paid' && (
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        Record Payment
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRentals.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No rentals found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rentals;
