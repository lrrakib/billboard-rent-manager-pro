import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  Edit, 
  Save, 
  MapPin, 
  Calendar, 
  DollarSign, 
  FileText, 
  Users, 
  TrendingUp,
  Download
} from 'lucide-react';

const BillboardDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: '',
    amount: '',
    description: '',
    dueDate: ''
  });

  // Fetch billboard details
  const { data: billboard, isLoading, refetch } = useQuery({
    queryKey: ['billboard', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('billboards_enhanced')
        .select(`
          *,
          land_owners!billboards_enhanced_land_owner_id_fkey(name, contact_person, phone, email),
          billboard_rentals!billboard_rentals_billboard_id_fkey(
            *,
            clients_enhanced!billboard_rentals_client_id_fkey(company_name, contact_person, contact_email)
          ),
          installation_costs!installation_costs_billboard_id_fkey(*)
        `)
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id
  });

  const generateInvoice = async () => {
    if (!invoiceData.invoiceNumber || !invoiceData.amount) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      // Create invoice record
      const { data, error } = await supabase
        .from('client_payments')
        .insert({
          rental_id: billboard?.billboard_rentals[0]?.id,
          amount: parseFloat(invoiceData.amount),
          invoice_period_start: new Date().toISOString().split('T')[0],
          invoice_period_end: invoiceData.dueDate,
          payment_date: new Date().toISOString().split('T')[0],
          status: 'Pending',
          notes: invoiceData.description
        });

      if (error) throw error;

      // Generate PDF
      const { default: jsPDF } = await import('jspdf');
      const doc = new jsPDF();

      // Header
      doc.setFontSize(20);
      doc.text('INVOICE', 105, 30, { align: 'center' });
      
      // Invoice details
      doc.setFontSize(12);
      doc.text(`Invoice No: ${invoiceData.invoiceNumber}`, 20, 50);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 60);
      doc.text(`Due Date: ${new Date(invoiceData.dueDate).toLocaleDateString()}`, 20, 70);
      
      // Billboard details
      doc.text('Billboard Details:', 20, 90);
      doc.text(`Location: ${billboard?.location}`, 20, 100);
      doc.text(`Size: ${billboard?.size}`, 20, 110);
      doc.text(`Type: ${billboard?.type}`, 20, 120);
      
      // Client details
      if (billboard?.billboard_rentals[0]?.clients_enhanced) {
        const client = billboard.billboard_rentals[0].clients_enhanced;
        doc.text('Bill To:', 20, 140);
        doc.text(`Company: ${client.company_name}`, 20, 150);
        doc.text(`Contact: ${client.contact_person}`, 20, 160);
        doc.text(`Email: ${client.contact_email}`, 20, 170);
      }
      
      // Amount
      doc.text('Amount Details:', 20, 190);
      doc.text(`Description: ${invoiceData.description}`, 20, 200);
      doc.text(`Amount: ৳${parseFloat(invoiceData.amount).toLocaleString()}`, 20, 210);
      
      // Footer
      doc.text('Thank you for your business!', 105, 250, { align: 'center' });
      
      doc.save(`invoice-${invoiceData.invoiceNumber}.pdf`);

      toast({
        title: "Success",
        description: "Invoice generated and downloaded successfully"
      });

      // Reset form
      setInvoiceData({
        invoiceNumber: '',
        amount: '',
        description: '',
        dueDate: ''
      });

    } catch (error) {
      console.error('Error generating invoice:', error);
      toast({
        title: "Error",
        description: "Failed to generate invoice",
        variant: "destructive"
      });
    }
  };

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

  if (!billboard) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Billboard not found</h1>
          <Button onClick={() => navigate('/billboards')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Billboards
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
            <Button variant="outline" onClick={() => navigate('/billboards')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{billboard.location}</h1>
              <p className="text-gray-600">Billboard ID: {billboard.billboard_identifier}</p>
            </div>
          </div>
          <Button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
            {isEditing ? 'Save Changes' : 'Edit Billboard'}
          </Button>
        </div>

        {/* Main Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Basic Info */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Billboard Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Location</Label>
                  <div className="flex items-center mt-1">
                    <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{billboard.location}</span>
                  </div>
                </div>
                <div>
                  <Label>Billboard Type</Label>
                  <Badge className="mt-1">{billboard.type}</Badge>
                </div>
                <div>
                  <Label>Size</Label>
                  <span>{billboard.size}</span>
                </div>
                <div>
                  <Label>Total SFT</Label>
                  <span>{billboard.total_sft} sq ft</span>
                </div>
                <div>
                  <Label>Status</Label>
                  <Badge variant={billboard.status === 'Rented' ? 'default' : 'secondary'}>
                    {billboard.status}
                  </Badge>
                </div>
                <div>
                  <Label>Installation Date</Label>
                  <div className="flex items-center mt-1">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{billboard.installation_date || 'Not set'}</span>
                  </div>
                </div>
              </div>

              {/* Agreement Dates */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <Label>Agreement Start Date</Label>
                  <span className="block mt-1">{billboard.agreement_start_date || 'Not set'}</span>
                </div>
                <div>
                  <Label>Agreement End Date</Label>
                  <span className="block mt-1">{billboard.agreement_end_date || 'Not set'}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Info */}
          <Card>
            <CardHeader>
              <CardTitle>Financial Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Monthly Rent</Label>
                <div className="flex items-center mt-1">
                  <DollarSign className="w-4 h-4 mr-2 text-green-600" />
                  <span className="font-semibold text-green-600">
                    ৳{billboard.rent_amount?.toLocaleString() || 'Not set'}
                  </span>
                </div>
              </div>
              <div>
                <Label>Total Installation Cost</Label>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-2 text-red-600" />
                  <span className="font-semibold text-red-600">
                    ৳{billboard.total_installation_cost?.toLocaleString() || '0'}
                  </span>
                </div>
              </div>
              <div>
                <Label>Payment Month</Label>
                <span className="block mt-1">{billboard.payment_month || 'Not set'}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Rental */}
        {billboard.billboard_rentals && billboard.billboard_rentals.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Current Rental</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Client Company</Label>
                  <span className="block mt-1 font-medium">
                    {billboard.billboard_rentals[0].clients_enhanced?.company_name}
                  </span>
                </div>
                <div>
                  <Label>Contact Person</Label>
                  <span className="block mt-1">
                    {billboard.billboard_rentals[0].clients_enhanced?.contact_person}
                  </span>
                </div>
                <div>
                  <Label>Rental Amount</Label>
                  <span className="block mt-1 font-semibold text-green-600">
                    ৳{billboard.billboard_rentals[0].rental_amount?.toLocaleString()}
                  </span>
                </div>
                <div>
                  <Label>Start Date</Label>
                  <span className="block mt-1">{billboard.billboard_rentals[0].start_date}</span>
                </div>
                <div>
                  <Label>End Date</Label>
                  <span className="block mt-1">{billboard.billboard_rentals[0].end_date}</span>
                </div>
                <div>
                  <Label>Status</Label>
                  <Badge>{billboard.billboard_rentals[0].status}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Invoice Generator */}
        <Card>
          <CardHeader>
            <CardTitle>Invoice Generator</CardTitle>
            <CardDescription>
              Generate invoices for this billboard rental
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="invoiceNumber">Invoice Number</Label>
                <Input
                  id="invoiceNumber"
                  value={invoiceData.invoiceNumber}
                  onChange={(e) => setInvoiceData({...invoiceData, invoiceNumber: e.target.value})}
                  placeholder="INV-2024-001"
                />
              </div>
              <div>
                <Label htmlFor="amount">Amount (৳)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={invoiceData.amount}
                  onChange={(e) => setInvoiceData({...invoiceData, amount: e.target.value})}
                  placeholder="150000"
                />
              </div>
              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={invoiceData.dueDate}
                  onChange={(e) => setInvoiceData({...invoiceData, dueDate: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={invoiceData.description}
                  onChange={(e) => setInvoiceData({...invoiceData, description: e.target.value})}
                  placeholder="Billboard rental fee"
                />
              </div>
            </div>
            <Button onClick={generateInvoice} className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Generate & Download Invoice PDF
            </Button>
          </CardContent>
        </Card>

        {/* Land Owner */}
        {billboard.land_owners && (
          <Card>
            <CardHeader>
              <CardTitle>Land Owner</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label>Name</Label>
                  <span className="block mt-1 font-medium">{billboard.land_owners.name}</span>
                </div>
                <div>
                  <Label>Contact Person</Label>
                  <span className="block mt-1">{billboard.land_owners.contact_person}</span>
                </div>
                <div>
                  <Label>Phone</Label>
                  <span className="block mt-1">{billboard.land_owners.phone}</span>
                </div>
                <div>
                  <Label>Email</Label>
                  <span className="block mt-1">{billboard.land_owners.email}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Installation Costs */}
        {billboard.installation_costs && billboard.installation_costs.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Installation Costs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Cost Type</th>
                      <th className="text-left p-2">Amount</th>
                      <th className="text-left p-2">Date</th>
                      <th className="text-left p-2">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {billboard.installation_costs.map((cost: any) => (
                      <tr key={cost.id} className="border-b">
                        <td className="p-2">{cost.cost_type}</td>
                        <td className="p-2">৳{cost.amount?.toLocaleString()}</td>
                        <td className="p-2">{cost.payment_date}</td>
                        <td className="p-2">{cost.description}</td>
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

export default BillboardDetails;