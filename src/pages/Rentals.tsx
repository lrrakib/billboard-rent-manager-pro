import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, MapPin, Users, DollarSign, Plus, FileText, Upload, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

const Rentals = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRental, setSelectedRental] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [invoiceType, setInvoiceType] = useState('system'); // 'system' or 'manual'

  // Enhanced mock rental data with payment tracking
  const rentals = [
    {
      id: 1,
      client: "Tech Corp",
      billboard: "Downtown Plaza",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      totalAmount: 600000,
      invoiceFrequency: "quarterly", // 4 times a year
      paymentStructure: "25-50-25", // 25%, 50%, 25%
      invoices: [
        { id: 1, amount: 150000, dueDate: "2024-01-15", status: "paid", paidDate: "2024-01-10" },
        { id: 2, amount: 300000, dueDate: "2024-04-15", status: "paid", paidDate: "2024-04-12" },
        { id: 3, amount: 150000, dueDate: "2024-07-15", status: "pending", paidDate: null },
        { id: 4, amount: 0, dueDate: "2024-10-15", status: "not_due", paidDate: null }
      ],
      pvcCost: 25000,
      fittingCost: 15000
    },
    {
      id: 2,
      client: "Fashion Brand",
      billboard: "Airport Terminal",
      startDate: "2024-02-15",
      endDate: "2024-08-15",
      totalAmount: 480000,
      invoiceFrequency: "monthly",
      paymentStructure: "equal",
      invoices: [
        { id: 1, amount: 80000, status: "paid" },
        { id: 2, amount: 80000, status: "paid" },
        { id: 3, amount: 80000, status: "overdue" },
        { id: 4, amount: 80000, status: "pending" },
        { id: 5, amount: 80000, status: "not_due" },
        { id: 6, amount: 80000, status: "not_due" }
      ],
      pvcCost: 30000,
      fittingCost: 20000
    }
  ];

  const filteredRentals = rentals.filter(rental => {
    const matchesSearch = 
      rental.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rental.billboard.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || rental.invoices.some(invoice => invoice.status.toLowerCase() === statusFilter.toLowerCase());
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

  const getInvoiceStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Paid</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800"><AlertTriangle className="w-3 h-3 mr-1" />Overdue</Badge>;
      case 'not_due':
        return <Badge className="bg-gray-100 text-gray-800">Not Due</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const months = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30));
    return `${months} months`;
  };

  const handleViewDetails = (rental: any) => {
    setSelectedRental(rental);
    setIsDetailsOpen(true);
  };

  const handleGenerateInvoice = (rental: any, type: string = 'system') => {
    setSelectedRental(rental);
    setInvoiceType(type);
    setIsInvoiceModalOpen(true);
  };

  const handleRecordPayment = (rentalId: number) => {
    console.log('Record payment for rental:', rentalId);
    // Add payment recording functionality here
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
                  <Badge className={getStatusColor(rental.invoices.every(invoice => invoice.status === 'paid') ? 'Paid' : rental.invoices.some(invoice => invoice.status === 'pending') ? 'Partial' : 'Unpaid')}>
                    {rental.invoices.every(invoice => invoice.status === 'paid') ? 'Paid' : rental.invoices.some(invoice => invoice.status === 'pending') ? 'Partial' : 'Unpaid'}
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
                        <span className="font-semibold">৳{rental.totalAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">PVC Cost:</span>
                        <span>৳{rental.pvcCost.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Fitting Cost:</span>
                        <span>৳{rental.fittingCost.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between pt-1 border-t">
                        <span className="text-gray-600">Total:</span>
                        <span className="font-bold text-green-600">
                          ৳{(rental.totalAmount + rental.pvcCost + rental.fittingCost).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Payment Status</h4>
                    <div className="space-y-2">
                      {rental.invoices && rental.invoices.slice(0, 3).map((invoice, index) => (
                        <div key={invoice.id} className="flex justify-between text-sm">
                          <span>Invoice {index + 1}:</span>
                          {getInvoiceStatusBadge(invoice.status)}
                        </div>
                      ))}
                      {rental.invoices && rental.invoices.length > 3 && (
                        <div className="text-xs text-gray-500">
                          +{rental.invoices.length - 3} more invoices...
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={() => handleViewDetails(rental)}
                    >
                      View Details
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        className="w-full text-xs" 
                        variant="outline"
                        onClick={() => handleGenerateInvoice(rental, 'system')}
                      >
                        Auto Invoice
                      </Button>
                      <Button 
                        className="w-full text-xs" 
                        variant="outline"
                        onClick={() => handleGenerateInvoice(rental, 'manual')}
                      >
                        Manual Invoice
                      </Button>
                    </div>
                    {rental.invoices.every(invoice => invoice.status === 'paid') ? null : (
                      <Button 
                        className="w-full bg-green-600 hover:bg-green-700"
                        onClick={() => handleRecordPayment(rental.id)}
                      >
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

        {/* Rental Details Modal */}
        {selectedRental && (
          <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Rental Details - {selectedRental.client}</DialogTitle>
                <DialogDescription>
                  Complete rental information and payment tracking
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Billing Schedule</h4>
                    <p className="text-sm text-gray-600">
                      Frequency: {selectedRental.invoiceFrequency}<br/>
                      Structure: {selectedRental.paymentStructure}<br/>
                      Total Invoices: {selectedRental.invoices?.length || 0}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Payment Summary</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Paid:</span>
                        <span className="text-green-600">
                          {selectedRental.invoices?.filter(i => i.status === 'paid').length || 0}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pending:</span>
                        <span className="text-yellow-600">
                          {selectedRental.invoices?.filter(i => i.status === 'pending').length || 0}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Overdue:</span>
                        <span className="text-red-600">
                          {selectedRental.invoices?.filter(i => i.status === 'overdue').length || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedRental.invoices && (
                  <div>
                    <h4 className="font-semibold mb-3">Invoice Status</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedRental.invoices.map((invoice, index) => (
                        <div key={invoice.id} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Invoice {index + 1}</span>
                            {getInvoiceStatusBadge(invoice.status)}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            Amount: ৳{invoice.amount?.toLocaleString()}<br/>
                            {invoice.dueDate && `Due: ${invoice.dueDate}`}
                            {invoice.paidDate && `<br/>Paid: ${invoice.paidDate}`}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Invoice Generation Modal */}
        {selectedRental && (
          <Dialog open={isInvoiceModalOpen} onOpenChange={setIsInvoiceModalOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {invoiceType === 'system' ? 'Generate System Invoice' : 'Record Manual Invoice'}
                </DialogTitle>
                <DialogDescription>
                  {invoiceType === 'system' 
                    ? 'System will generate invoice automatically'
                    : 'Upload your manually created invoice'
                  }
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                {invoiceType === 'manual' ? (
                  <>
                    <div>
                      <Label htmlFor="invoiceNumber">Invoice Number</Label>
                      <Input id="invoiceNumber" placeholder="INV-2024-001" />
                    </div>
                    <div>
                      <Label htmlFor="invoiceFile">Upload Invoice PDF</Label>
                      <Input id="invoiceFile" type="file" accept=".pdf" />
                    </div>
                    <div>
                      <Label htmlFor="amount">Invoice Amount (৳)</Label>
                      <Input id="amount" type="number" placeholder="150000" />
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <FileText className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                    <p>System will generate invoice based on rental terms</p>
                  </div>
                )}
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsInvoiceModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsInvoiceModalOpen(false)}>
                    {invoiceType === 'system' ? 'Generate Invoice' : 'Save Invoice'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default Rentals;
