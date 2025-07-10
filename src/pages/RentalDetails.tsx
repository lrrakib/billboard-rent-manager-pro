import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, MapPin, Calendar, DollarSign, Users, FileText, Download, Receipt } from 'lucide-react';
import { format } from 'date-fns';
import MoneyReceiptGenerator from '@/components/MoneyReceiptGenerator';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const RentalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  // Fetch rental details
  const { data: rental, isLoading: loadingRental } = useQuery({
    queryKey: ['rental-details', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('billboard_rentals')
        .select(`
          *,
          clients_enhanced!billboard_rentals_client_id_fkey(*),
          billboards_enhanced!billboard_rentals_billboard_id_fkey(*, land_owners!billboards_enhanced_land_owner_id_fkey(*))
        `)
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    }
  });

  // Fetch payments for this rental
  const { data: payments, isLoading: loadingPayments } = useQuery({
    queryKey: ['rental-payments', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('client_payments')
        .select('*')
        .eq('rental_id', id)
        .order('payment_date', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });

  // Fetch installation costs
  const { data: installationCosts, isLoading: loadingCosts } = useQuery({
    queryKey: ['installation-costs', rental?.billboard_id],
    queryFn: async () => {
      if (!rental?.billboard_id) return [];
      const { data, error } = await supabase
        .from('installation_costs')
        .select('*, partners!installation_costs_partner_id_fkey(*)')
        .eq('billboard_id', rental.billboard_id)
        .order('payment_date', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!rental?.billboard_id
  });

  const generateInvoicePDF = async () => {
    const element = document.createElement('div');
    element.innerHTML = `
      <div style="padding: 40px; font-family: Arial, sans-serif; max-width: 800px;">
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="color: #333; margin: 0;">RENTAL INVOICE</h1>
          <p style="color: #666; margin: 5px 0;">Billboard Management System</p>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 30px;">
          <div>
            <h3 style="color: #333; border-bottom: 2px solid #333; padding-bottom: 5px;">Client Information</h3>
            <p><strong>Company:</strong> ${rental?.clients_enhanced?.company_name}</p>
            <p><strong>Contact Person:</strong> ${rental?.clients_enhanced?.contact_person}</p>
            <p><strong>Email:</strong> ${rental?.clients_enhanced?.contact_email}</p>
            <p><strong>Phone:</strong> ${rental?.clients_enhanced?.contact_phone || 'N/A'}</p>
          </div>
          <div>
            <h3 style="color: #333; border-bottom: 2px solid #333; padding-bottom: 5px;">Billboard Information</h3>
            <p><strong>ID:</strong> ${rental?.billboards_enhanced?.billboard_identifier}</p>
            <p><strong>Location:</strong> ${rental?.billboards_enhanced?.location}</p>
            <p><strong>Size:</strong> ${rental?.billboards_enhanced?.size}</p>
            <p><strong>Type:</strong> ${rental?.billboards_enhanced?.type}</p>
          </div>
        </div>

        <div style="margin-bottom: 30px;">
          <h3 style="color: #333; border-bottom: 2px solid #333; padding-bottom: 5px;">Rental Details</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div>
              <p><strong>Start Date:</strong> ${format(new Date(rental?.start_date || ''), 'MMM dd, yyyy')}</p>
              <p><strong>End Date:</strong> ${format(new Date(rental?.end_date || ''), 'MMM dd, yyyy')}</p>
              <p><strong>Invoice Frequency:</strong> ${rental?.invoice_frequency}</p>
            </div>
            <div>
              <p><strong>Rental Amount:</strong> ৳${rental?.rental_amount?.toLocaleString()}</p>
              <p><strong>Payment Structure:</strong> ${rental?.payment_structure}</p>
              <p><strong>Status:</strong> ${rental?.status}</p>
            </div>
          </div>
        </div>

        <div style="text-align: center; margin-top: 50px;">
          <div style="display: inline-block; border-top: 1px solid #333; padding-top: 10px; width: 200px;">
            <p style="margin: 0; font-size: 14px;">Authorized Signature</p>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(element);
    const canvas = await html2canvas(element);
    document.body.removeChild(element);
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
    pdf.save(`rental_invoice_${rental?.billboards_enhanced?.billboard_identifier}.pdf`);
  };

  const viewPaymentReceipt = (payment: any) => {
    setSelectedPayment({
      ...payment,
      client_name: rental?.clients_enhanced?.company_name,
      billboard_location: rental?.billboards_enhanced?.location
    });
    setIsReceiptOpen(true);
  };

  if (loadingRental) {
    return <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">Loading...</div>;
  }

  if (!rental) {
    return <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">Rental not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => navigate('/rentals')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Rentals
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Rental Details</h1>
              <p className="text-gray-600">{rental.billboards_enhanced?.billboard_identifier} - {rental.clients_enhanced?.company_name}</p>
            </div>
          </div>
          <Button onClick={generateInvoicePDF} className="bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Download Invoice
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Info Cards */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Rental</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">৳{rental.rental_amount?.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {rental.invoice_frequency} billing
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rental Period</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round((new Date(rental.end_date).getTime() - new Date(rental.start_date).getTime()) / (1000 * 60 * 60 * 24 * 30))}
              </div>
              <p className="text-xs text-muted-foreground">months</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
              <Receipt className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{payments?.length || 0}</div>
              <p className="text-xs text-muted-foreground">
                ৳{payments?.reduce((sum, p) => sum + (p.amount || 0), 0).toLocaleString()} received
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="billboard">Billboard Info</TabsTrigger>
            <TabsTrigger value="installation">Installation Costs</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Client Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Company Name</label>
                    <p className="text-lg">{rental.clients_enhanced?.company_name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Contact Person</label>
                    <p>{rental.clients_enhanced?.contact_person}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p>{rental.clients_enhanced?.contact_email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Phone</label>
                    <p>{rental.clients_enhanced?.contact_phone || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Industry</label>
                    <p>{rental.clients_enhanced?.industry || 'N/A'}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Rental Terms
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Start Date</label>
                    <p className="text-lg">{format(new Date(rental.start_date), 'MMM dd, yyyy')}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">End Date</label>
                    <p className="text-lg">{format(new Date(rental.end_date), 'MMM dd, yyyy')}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Rental Amount</label>
                    <p className="text-lg font-semibold text-green-600">৳{rental.rental_amount?.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Invoice Frequency</label>
                    <Badge variant="outline">{rental.invoice_frequency}</Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Payment Structure</label>
                    <p>{rental.payment_structure}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Status</label>
                    <Badge className={rental.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {rental.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="payments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>All payments received for this rental</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingPayments ? (
                  <div className="text-center py-8">Loading payments...</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Receipt ID</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Payment Date</TableHead>
                        <TableHead>Period</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments?.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.receipt_id}</TableCell>
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
                          <TableCell>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => viewPaymentReceipt(payment)}
                            >
                              <Receipt className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billboard" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Billboard Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Billboard ID</label>
                    <p className="text-lg">{rental.billboards_enhanced?.billboard_identifier}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Location</label>
                    <p>{rental.billboards_enhanced?.location}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Size</label>
                    <p>{rental.billboards_enhanced?.size}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Type</label>
                    <p>{rental.billboards_enhanced?.type}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Land Owner</label>
                    <p>{rental.billboards_enhanced?.land_owners?.name || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Land Rent</label>
                    <p>৳{rental.billboards_enhanced?.rent_amount?.toLocaleString() || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Total SFT</label>
                    <p>{rental.billboards_enhanced?.total_sft || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Status</label>
                    <Badge className={rental.billboards_enhanced?.status === 'Rented' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {rental.billboards_enhanced?.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="installation" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Installation Costs</CardTitle>
                <CardDescription>All installation and setup costs for this billboard</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingCosts ? (
                  <div className="text-center py-8">Loading installation costs...</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Cost Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Partner</TableHead>
                        <TableHead>Payment Date</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {installationCosts?.map((cost) => (
                        <TableRow key={cost.id}>
                          <TableCell className="font-medium">{cost.cost_type}</TableCell>
                          <TableCell>৳{cost.amount?.toLocaleString()}</TableCell>
                          <TableCell>{cost.partners?.name || 'N/A'}</TableCell>
                          <TableCell>{format(new Date(cost.payment_date), 'MMM dd, yyyy')}</TableCell>
                          <TableCell>{cost.description || 'N/A'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <MoneyReceiptGenerator
          payment={selectedPayment}
          isOpen={isReceiptOpen}
          onClose={() => setIsReceiptOpen(false)}
        />
      </div>
    </div>
  );
};

export default RentalDetails;