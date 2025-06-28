
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, DollarSign, FileText, Calendar, Download } from 'lucide-react';
import PaymentRecordForm from '@/components/PaymentRecordForm';
import MoneyReceiptGenerator from '@/components/MoneyReceiptGenerator';

const Payments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isRecordPaymentOpen, setIsRecordPaymentOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  // Mock payments data - this should come from Supabase
  const payments = [
    {
      id: 1,
      receipt_id: 'MR-000001',
      client_name: 'Tech Corp',
      billboard_location: 'Downtown Plaza',
      invoice_number: 'INV-2024-001',
      installment: '1st Installment',
      amount: 150000,
      payment_date: '2024-01-10',
      payment_method: 'Bank Transfer',
      cheque_number: 'TXN123456789',
      bank_name: 'Dutch Bangla Bank',
      status: 'Received',
      notes: 'First installment payment received on time'
    },
    {
      id: 2,
      receipt_id: 'MR-000002',
      client_name: 'Fashion Brand',
      billboard_location: 'Airport Terminal',
      invoice_number: 'INV-2024-002',
      installment: '2nd Installment',
      amount: 80000,
      payment_date: '2024-02-15',
      payment_method: 'Cheque',
      cheque_number: 'CHQ987654321',
      bank_name: 'Standard Bank',
      status: 'Received',
      notes: 'Partial payment - remaining ৳20,000 to be paid with next bill'
    }
  ];

  const filteredPayments = payments.filter(payment =>
    payment.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.billboard_location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.receipt_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPayments = payments.reduce((sum, payment) => sum + payment.amount, 0);

  const handleGenerateReceipt = (payment: any) => {
    setSelectedPayment(payment);
    setIsReceiptModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
            <p className="text-gray-600 mt-2">Track and manage all payment transactions</p>
          </div>
          <Button 
            className="bg-green-600 hover:bg-green-700"
            onClick={() => setIsRecordPaymentOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Record Payment
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Total Received
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ৳{totalPayments.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Total Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-700">
                {payments.length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                ৳{payments.filter(p => new Date(p.payment_date).getMonth() === new Date().getMonth()).reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Avg. Payment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-700">
                ৳{Math.round(totalPayments / payments.length).toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search payments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Payments Table */}
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>All recorded payment transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Receipt ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Billboard</TableHead>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.receipt_id}</TableCell>
                    <TableCell>{payment.client_name}</TableCell>
                    <TableCell>{payment.billboard_location}</TableCell>
                    <TableCell>{payment.invoice_number}</TableCell>
                    <TableCell className="font-semibold text-green-600">
                      ৳{payment.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>{payment.payment_date}</TableCell>
                    <TableCell>{payment.payment_method}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleGenerateReceipt(payment)}
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Money Receipt
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <PaymentRecordForm 
          isOpen={isRecordPaymentOpen}
          onClose={() => setIsRecordPaymentOpen(false)}
        />

        <MoneyReceiptGenerator
          payment={selectedPayment}
          isOpen={isReceiptModalOpen}
          onClose={() => setIsReceiptModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default Payments;
