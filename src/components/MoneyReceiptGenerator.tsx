
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FileText, Download, Printer } from 'lucide-react';

interface MoneyReceiptGeneratorProps {
  payment: any;
  isOpen: boolean;
  onClose: () => void;
}

const MoneyReceiptGenerator: React.FC<MoneyReceiptGeneratorProps> = ({ 
  payment, 
  isOpen, 
  onClose 
}) => {
  const handleDownloadPDF = () => {
    console.log('Generating PDF for receipt:', payment?.receipt_id);
    // PDF generation logic will be implemented here
  };

  const handlePrint = () => {
    window.print();
  };

  if (!payment) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Money Receipt - {payment.receipt_id}
          </DialogTitle>
          <DialogDescription>
            Payment receipt for {payment.client_name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Receipt Preview */}
          <div className="border rounded-lg p-6 bg-white" id="receipt-content">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">BILLBOARD MANAGEMENT SYSTEM</h2>
              <p className="text-gray-600">Money Receipt</p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold mb-2">Receipt Details</h3>
                <div className="space-y-1 text-sm">
                  <div><strong>Receipt ID:</strong> {payment.receipt_id}</div>
                  <div><strong>Date:</strong> {payment.payment_date}</div>
                  <div><strong>Payment Method:</strong> {payment.payment_method}</div>
                  {payment.cheque_number && (
                    <div><strong>Cheque/Ref No:</strong> {payment.cheque_number}</div>
                  )}
                  {payment.bank_name && (
                    <div><strong>Bank:</strong> {payment.bank_name}</div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Client Information</h3>
                <div className="space-y-1 text-sm">
                  <div><strong>Company:</strong> {payment.client_name}</div>
                  <div><strong>Billboard:</strong> {payment.billboard_location}</div>
                  <div><strong>Invoice No:</strong> {payment.invoice_number}</div>
                  <div><strong>Installment:</strong> {payment.installment}</div>
                </div>
              </div>
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold">Amount Received:</span>
                <span className="font-bold text-green-600">৳{payment.amount?.toLocaleString()}</span>
              </div>
              <div className="text-sm text-gray-600 mt-1">
                In Words: {/* Add amount in words conversion */}
                {payment.amount < 100000 ? 'Less than One Lakh Taka' : 'More than One Lakh Taka'}
              </div>
            </div>

            {payment.notes && (
              <div className="border-t pt-4 mb-6">
                <h4 className="font-semibold mb-2">Notes:</h4>
                <p className="text-sm text-gray-700">{payment.notes}</p>
              </div>
            )}

            <div className="border-t pt-4 flex justify-between items-end">
              <div>
                <p className="text-sm text-gray-600">Generated on: {new Date().toLocaleDateString()}</p>
              </div>
              <div className="text-center">
                <div className="border-t border-gray-400 w-32 mb-2"></div>
                <p className="text-sm">Authorized Signature</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button onClick={handleDownloadPDF} className="bg-blue-600 hover:bg-blue-700">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MoneyReceiptGenerator;
