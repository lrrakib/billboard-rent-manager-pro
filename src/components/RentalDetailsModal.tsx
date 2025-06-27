
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';

interface RentalDetailsModalProps {
  rental: any;
  isOpen: boolean;
  onClose: () => void;
}

const RentalDetailsModal: React.FC<RentalDetailsModalProps> = ({ rental, isOpen, onClose }) => {
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

  if (!rental) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Rental Details - {rental.client}</DialogTitle>
          <DialogDescription>
            Complete rental information and payment tracking
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Billing Schedule</h4>
              <p className="text-sm text-gray-600">
                Frequency: {rental.invoiceFrequency}<br/>
                Structure: {rental.paymentStructure}<br/>
                Total Invoices: {rental.invoices?.length || 0}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Payment Summary</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Paid:</span>
                  <span className="text-green-600">
                    {rental.invoices?.filter(i => i.status === 'paid').length || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Pending:</span>
                  <span className="text-yellow-600">
                    {rental.invoices?.filter(i => i.status === 'pending').length || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Overdue:</span>
                  <span className="text-red-600">
                    {rental.invoices?.filter(i => i.status === 'overdue').length || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {rental.invoices && (
            <div>
              <h4 className="font-semibold mb-3">Invoice Status</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {rental.invoices.map((invoice, index) => (
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
  );
};

export default RentalDetailsModal;
