
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DollarSign, Plus, Search, Download, Edit, Trash2, Eye } from 'lucide-react';

const Payments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentModeFilter, setPaymentModeFilter] = useState('all');

  // Mock payment data
  const payments = [
    {
      id: 1,
      rentalId: 'R-001',
      client: 'Tech Corp',
      billboard: 'Downtown Plaza',
      amountPaid: 15000,
      paymentDate: '2024-01-15',
      paymentMode: 'Bank Transfer',
      status: 'Completed',
      notes: 'First installment payment'
    },
    {
      id: 2,
      rentalId: 'R-002',
      client: 'Fashion Brand',
      billboard: 'Airport Terminal',
      amountPaid: 12000,
      paymentDate: '2024-02-01',
      paymentMode: 'Credit Card',
      status: 'Completed',
      notes: 'Monthly payment'
    },
    {
      id: 3,
      rentalId: 'R-003',
      client: 'Auto Dealership',
      billboard: 'Highway Exit 12',
      amountPaid: 5400,
      paymentDate: '2024-03-10',
      paymentMode: 'Check',
      status: 'Pending',
      notes: 'Partial payment received'
    }
  ];

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.billboard.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.rentalId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesMode = paymentModeFilter === 'all' || payment.paymentMode.toLowerCase() === paymentModeFilter.toLowerCase();
    return matchesSearch && matchesStatus && matchesMode;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewPayment = (paymentId: number) => {
    console.log('Viewing payment:', paymentId);
    alert(`Viewing payment details for ID: ${paymentId}`);
  };

  const handleEditPayment = (paymentId: number) => {
    console.log('Editing payment:', paymentId);
    alert(`Editing payment ID: ${paymentId}`);
  };

  const handleDeletePayment = (paymentId: number) => {
    console.log('Deleting payment:', paymentId);
    if (confirm('Are you sure you want to delete this payment record?')) {
      alert(`Payment ID: ${paymentId} deleted successfully`);
    }
  };

  const handleNewPayment = () => {
    console.log('Creating new payment');
    alert('Opening new payment form...');
  };

  const handleExportPayments = () => {
    console.log('Exporting payments');
    alert('Exporting payment data to CSV...');
  };

  const totalPayments = filteredPayments.reduce((sum, payment) => sum + payment.amountPaid, 0);
  const completedPayments = filteredPayments.filter(p => p.status === 'Completed').length;
  const pendingPayments = filteredPayments.filter(p => p.status === 'Pending').length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
            <p className="text-gray-600 mt-2">Track and manage all payment transactions</p>
          </div>
          <div className="flex space-x-3">
            <Button 
              variant="outline"
              onClick={handleExportPayments}
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleNewPayment}
            >
              <Plus className="w-4 h-4 mr-2" />
              Record Payment
            </Button>
          </div>
        </div>

        {/* Payment Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Payments</p>
                  <p className="text-2xl font-bold text-gray-900">${totalPayments.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">{completedPayments}</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{completedPayments}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 font-bold">{pendingPayments}</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">{pendingPayments}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">{filteredPayments.length}</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Records</p>
                  <p className="text-2xl font-bold text-gray-900">{filteredPayments.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search by client, billboard, or rental ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={paymentModeFilter} onValueChange={setPaymentModeFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by payment mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Modes</SelectItem>
                  <SelectItem value="bank transfer">Bank Transfer</SelectItem>
                  <SelectItem value="credit card">Credit Card</SelectItem>
                  <SelectItem value="check">Check</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Payments Table */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Records</CardTitle>
            <CardDescription>Detailed view of all payment transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rental ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Billboard</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Date</TableHead>
                  <TableHead>Payment Mode</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.rentalId}</TableCell>
                    <TableCell>{payment.client}</TableCell>
                    <TableCell>{payment.billboard}</TableCell>
                    <TableCell className="font-semibold">${payment.amountPaid.toLocaleString()}</TableCell>
                    <TableCell>{payment.paymentDate}</TableCell>
                    <TableCell>{payment.paymentMode}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(payment.status)}>
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{payment.notes}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewPayment(payment.id)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditPayment(payment.id)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeletePayment(payment.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredPayments.length === 0 && (
              <div className="text-center py-12">
                <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No payments found</h3>
                <p className="text-gray-600">Try adjusting your search terms or filters</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Payments;
