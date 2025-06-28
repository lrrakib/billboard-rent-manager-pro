
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Upload, DollarSign, FileText } from 'lucide-react';

interface PaymentRecordFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentRecordForm: React.FC<PaymentRecordFormProps> = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedBillboard, setSelectedBillboard] = useState('');

  const mockBillboards = [
    { id: 1, identifier: "BB-001", location: "Downtown Plaza", client: "Tech Corp" },
    { id: 2, identifier: "UP-002", location: "Highway Exit 12", client: "Fashion Brand" },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Recording payment...');
    // Add payment recording logic here
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Record Payment
          </DialogTitle>
          <DialogDescription>
            Record a new payment received from client
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="billboard">Billboard</Label>
              <Select value={selectedBillboard} onValueChange={setSelectedBillboard} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select billboard" />
                </SelectTrigger>
                <SelectContent>
                  {mockBillboards.map((billboard) => (
                    <SelectItem key={billboard.id} value={billboard.id.toString()}>
                      {billboard.identifier} - {billboard.location} ({billboard.client})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="installment">Payment Installment</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Select installment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1st">1st Installment</SelectItem>
                  <SelectItem value="2nd">2nd Installment</SelectItem>
                  <SelectItem value="3rd">3rd Installment</SelectItem>
                  <SelectItem value="4th">4th Installment</SelectItem>
                  <SelectItem value="advance">Advance Payment</SelectItem>
                  <SelectItem value="partial">Partial Payment</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="invoiceNumber">Invoice Number</Label>
              <Input id="invoiceNumber" placeholder="INV-2024-001" required />
            </div>

            <div>
              <Label htmlFor="amount">Amount Received (৳)</Label>
              <Input id="amount" type="number" placeholder="100000" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="cheque">Cheque</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="mfs">Mobile Financial Service</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="paymentDate">Payment Date</Label>
              <Input id="paymentDate" type="date" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="chequeNumber">Cheque/Reference Number</Label>
              <Input id="chequeNumber" placeholder="123456789" />
            </div>

            <div>
              <Label htmlFor="bankName">Bank Name</Label>
              <Input id="bankName" placeholder="Dutch Bangla Bank" />
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" placeholder="Partial payment - remaining amount will be paid with next bill..." />
          </div>

          <div>
            <Label htmlFor="receipt">Upload Payment Screenshot/Receipt</Label>
            <div className="mt-1 flex items-center gap-4">
              <Input 
                id="receipt" 
                type="file" 
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="cursor-pointer"
              />
              <Button type="button" variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
            </div>
            {selectedFile && (
              <p className="text-sm text-green-600 mt-1">
                Selected: {selectedFile.name}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              <FileText className="w-4 h-4 mr-2" />
              Record Payment & Generate Receipt
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentRecordForm;
