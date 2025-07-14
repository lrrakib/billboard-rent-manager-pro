import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { 
  ArrowLeft, 
  Edit, 
  MapPin, 
  Calendar, 
  DollarSign, 
  FileText, 
  Phone,
  Mail,
  Building,
  User
} from 'lucide-react';

const ClientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch client details
  const { data: client, isLoading } = useQuery({
    queryKey: ['client', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clients_enhanced')
        .select(`
          *,
          billboard_rentals!billboard_rentals_client_id_fkey(
            *,
            billboards_enhanced!billboard_rentals_billboard_id_fkey(billboard_identifier, location, size, type)
          )
        `)
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      // Fetch client payments separately
      const { data: payments } = await supabase
        .from('client_payments')
        .select('*')
        .in('rental_id', data?.billboard_rentals?.map(r => r.id) || []);
      
      return { ...data, client_payments: payments || [] };
    },
    enabled: !!id
  });

  // Calculate totals
  const totalRentals = client?.billboard_rentals?.length || 0;
  const activeRentals = client?.billboard_rentals?.filter(r => r.status === 'Active').length || 0;
  const totalRevenue = client?.billboard_rentals?.reduce((sum, rental) => sum + (rental.rental_amount || 0), 0) || 0;
  const totalPaid = client?.client_payments?.reduce((sum, payment) => sum + (payment.amount || 0), 0) || 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded mb-4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Client not found</h1>
          <Button onClick={() => navigate('/clients')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Clients
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => navigate('/clients')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{client.company_name}</h1>
              <p className="text-gray-600">Client Details & Rental History</p>
            </div>
          </div>
          <Button>
            <Edit className="w-4 h-4 mr-2" />
            Edit Client
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Rentals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRentals}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Rentals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{activeRentals}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">৳{totalRevenue.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Paid</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">৳{totalPaid.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>

        {/* Client Information */}
        <Card>
          <CardHeader>
            <CardTitle>Client Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <div className="flex items-center mb-2">
                  <Building className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-sm font-medium text-gray-600">Company Name</span>
                </div>
                <span className="font-semibold">{client.company_name}</span>
              </div>
              <div>
                <div className="flex items-center mb-2">
                  <User className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-sm font-medium text-gray-600">Contact Person</span>
                </div>
                <span>{client.contact_person}</span>
              </div>
              <div>
                <div className="flex items-center mb-2">
                  <Mail className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-sm font-medium text-gray-600">Email</span>
                </div>
                <span>{client.contact_email}</span>
              </div>
              <div>
                <div className="flex items-center mb-2">
                  <Phone className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-sm font-medium text-gray-600">Phone</span>
                </div>
                <span>{client.contact_phone || 'Not provided'}</span>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <div className="flex items-center mb-2">
                <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                <span className="text-sm font-medium text-gray-600">Billing Address</span>
              </div>
              <span>{client.billing_address || 'Not provided'}</span>
            </div>

            <div>
              <div className="flex items-center mb-2">
                <Building className="w-4 h-4 mr-2 text-gray-500" />
                <span className="text-sm font-medium text-gray-600">Industry</span>
              </div>
              <span>{client.industry || 'Not specified'}</span>
            </div>
          </CardContent>
        </Card>

        {/* Active Rentals */}
        {client.billboard_rentals && client.billboard_rentals.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Billboard Rentals</CardTitle>
              <CardDescription>All billboard rentals for this client</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {client.billboard_rentals.map((rental: any) => (
                  <div key={rental.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold">
                          {rental.billboards_enhanced?.billboard_identifier} - {rental.billboards_enhanced?.location}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {rental.billboards_enhanced?.size} • {rental.billboards_enhanced?.type}
                        </p>
                      </div>
                      <Badge variant={rental.status === 'Active' ? 'default' : 'secondary'}>
                        {rental.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Rental Amount:</span>
                        <div className="font-semibold text-green-600">৳{rental.rental_amount?.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Start Date:</span>
                        <div>{rental.start_date}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">End Date:</span>
                        <div>{rental.end_date}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Invoice Frequency:</span>
                        <div>{rental.invoice_frequency}</div>
                      </div>
                    </div>

                    {rental.notes && (
                      <div className="mt-3 pt-3 border-t">
                        <span className="text-sm text-gray-600">Notes:</span>
                        <p className="text-sm mt-1">{rental.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Payment History */}
        {client.client_payments && client.client_payments.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>All payments received from this client</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Receipt ID</th>
                      <th className="text-left p-2">Amount</th>
                      <th className="text-left p-2">Payment Date</th>
                      <th className="text-left p-2">Period</th>
                      <th className="text-left p-2">Method</th>
                      <th className="text-left p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {client.client_payments.map((payment: any) => (
                      <tr key={payment.id} className="border-b">
                        <td className="p-2">{payment.receipt_id}</td>
                        <td className="p-2 font-semibold text-green-600">৳{payment.amount?.toLocaleString()}</td>
                        <td className="p-2">{payment.payment_date}</td>
                        <td className="p-2">
                          {payment.invoice_period_start} to {payment.invoice_period_end}
                        </td>
                        <td className="p-2">{payment.payment_method || 'Not specified'}</td>
                        <td className="p-2">
                          <Badge variant={payment.status === 'Received' ? 'default' : 'secondary'}>
                            {payment.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ClientDetails;