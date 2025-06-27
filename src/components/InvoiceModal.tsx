
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileText } from 'lucide-react';

interface InvoiceModalProps {
  rental: any;
  invoiceType: string;
  isOpen: boolean;
  onClose: () => void;
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({ rental, invoiceType, isOpen, onClose }) => {
  if (!rental) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onClose}>
              {invoiceType === 'system' ? 'Generate Invoice' : 'Save Invoice'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceModal;
