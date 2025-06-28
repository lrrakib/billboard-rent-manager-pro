
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Search, Download, Eye, Filter } from 'lucide-react';
import { format } from 'date-fns';

const Invoices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Fetch rental invoices
  const { data: rentalInvoices, isLoading: loadingRentals } = useQuery({
    queryKey: ['rental-invoices'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('billboard_rentals')
        .select(`
          *,
          clients_enhanced!billboard_rentals_client_id_fkey(company_name, contact_person, contact_email),
          billboards_enhanced!billboard_rentals_billboard_id_fkey(billboard_identifier, location)
        `)
        .eq('status', 'Active');
      
      if (error) throw error;
      return data || [];
    }
  });

  // Fetch client payments
  const { data: clientPayments, isLoading: loadingPayments } = useQuery({
    queryKey: ['client-payments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('client_payments')
        .select(`
          *,
          billboard_rentals!client_payments_rental_id_fkey(
            clients_enhanced!billboard_rentals_client_id_fkey(company_name),
            billboards_enhanced!billboard_rentals_billboard_id_fkey(billboard_identifier, location)
          )
        `)
        .order('payment_date', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });

  // Fetch land owner payments
  const { data: landOwnerPayments, isLoading: loadingLandPayments } = useQuery({
    queryKey: ['land-owner-payments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('land_owner_payments')
        .select(`
          *,
          land_owners!land_owner_payments_land_owner_id_fkey(name),
          billboards_enhanced!land_owner_payments_billboard_id_fkey(billboard_identifier, location)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });

  const generateInvoice = (rental: any) => {
    console.log('Generating invoice for rental:', rental.id);
    // This would integrate with your PDF generation system
    alert('Invoice generation feature - integrate with PDF library');
  };

  const viewInvoiceDetails = (rental: any) => {
    console.log('Viewing invoice details:', rental.id);
    // This would open a detailed invoice modal
  };

  const filteredRentals = rentalInvoices?.filter(rental => {
    const matchesSearch = 
      rental.clients_enhanced?.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rental.billboards_enhanced?.billboard_identifier?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rental.billboards_enhanced?.location?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || rental.status.toLowerCase() === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const isLoading = loadingRentals || loadingPayments || loadingLandPayments;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Invoice Management</h1>
            <p className="text-gray-600 mt-2">Comprehensive invoice tracking and management</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Export All Invoices
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Invoice Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  className="pl-10"
                  placeholder="Search invoices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setTypeFilter('all');
              }}>
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Active Rental Invoices */}
        <Card>
          <CardHeader>
            <CardTitle>Active Rental Invoices</CardTitle>
            <CardDescription>
              Current active rentals and their invoice details
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">Loading invoices...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Billboard</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Rental Amount</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Invoice Date</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRentals?.map((rental) => (
                    <TableRow key={rental.id}>
                      <TableCell className="font-medium">
                        {rental.clients_enhanced?.company_name}
                      </TableCell>
                      <TableCell>{rental.billboards_enhanced?.billboard_identifier}</TableCell>
                      <TableCell>{rental.billboards_enhanced?.location}</TableCell>
                      <TableCell>৳{rental.rental_amount?.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {rental.invoice_frequency}
                        </Badge>
                      </TableCell>
                      <TableCell>{rental.invoice_date}th of month</TableCell>
                      <TableCell>{format(new Date(rental.start_date), 'MMM dd, yyyy')}</TableCell>
                      <TableCell>{format(new Date(rental.end_date), 'MMM dd, yyyy')}</TableCell>
                      <TableCell>
                        <Badge className={
                          rental.status === 'Active' ? 'bg-green-100 text-green-800' :
                          rental.status === 'Expired' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }>
                          {rental.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => viewInvoiceDetails(rental)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => generateInvoice(rental)}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Payment History */}
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>All client payments and receipts</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Receipt ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Billboard</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Date</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clientPayments?.slice(0, 10).map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.receipt_id}</TableCell>
                    <TableCell>
                      {payment.billboard_rentals?.clients_enhanced?.company_name}
                    </TableCell>
                    <TableCell>
                      {payment.billboard_rentals?.billboards_enhanced?.billboard_identifier}
                    </TableCell>
                    <TableCell>৳{payment.amount?.toLocaleString()}</TableCell>
                    <TableCell>{format(new Date(payment.payment_date), 'MMM dd, yyyy')}</TableCell>
                    <TableCell>
                      {format(new Date(payment.invoice_period_start), 'MMM dd')} - {format(new Date(payment.invoice_period_end), 'MMM dd, yyyy')}
                    </TableCell>
                    <TableCell>{payment.payment_method || 'N/A'}</TableCell>
                    <TableCell>
                      <Badge className={
                        payment.status === 'Received' ? 'bg-green-100 text-green-800' :
                        payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }>
                        {payment.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Land Owner Payments */}
        <Card>
          <CardHeader>
            <CardTitle>Land Owner Payments</CardTitle>
            <CardDescription>Payments to land owners</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Land Owner</TableHead>
                  <TableHead>Billboard</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Period</TableHead>
                  <TableHead>Payment Date</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {landOwnerPayments?.slice(0, 10).map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">
                      {payment.land_owners?.name}
                    </TableCell>
                    <TableCell>
                      {payment.billboards_enhanced?.billboard_identifier}
                    </TableCell>
                    <TableCell>৳{payment.amount?.toLocaleString()}</TableCell>
                    <TableCell>
                      {format(new Date(payment.payment_year_start), 'MMM dd, yyyy')} - {format(new Date(payment.payment_year_end), 'MMM dd, yyyy')}
                    </TableCell>
                    <TableCell>
                      {payment.payment_date ? format(new Date(payment.payment_date), 'MMM dd, yyyy') : 'Not paid'}
                    </TableCell>
                    <TableCell>{payment.payment_method || 'N/A'}</TableCell>
                    <TableCell>
                      <Badge className={
                        payment.status === 'Paid' ? 'bg-green-100 text-green-800' :
                        payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }>
                        {payment.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Invoices;
