
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { DollarSign } from 'lucide-react';

interface AddInvestmentModalProps {
  partner: any;
  isOpen: boolean;
  onClose: () => void;
}

const AddInvestmentModal: React.FC<AddInvestmentModalProps> = ({ 
  partner, 
  isOpen, 
  onClose 
}) => {
  const [selectedBillboard, setSelectedBillboard] = useState('');

  // Mock billboards - this should come from Supabase
  const availableBillboards = [
    { id: 1, identifier: 'BB-001', location: 'Downtown Plaza', totalCost: 300000 },
    { id: 2, identifier: 'UP-002', location: 'Highway Exit 12', totalCost: 180000 },
    { id: 3, identifier: 'NS-003', location: 'Shopping Mall', totalCost: 250000 }
  ];

  // Mock installation costs for selected billboard
  const getInstallationCosts = (billboardId: string) => {
    return [
      { type: 'Agreement Payment', amount: 50000 },
      { type: 'Structure Cost', amount: 150000 },
      { type: 'Installation Cost', amount: 75000 },
      { type: 'PVC Cost', amount: 25000 }
    ];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Adding investment for partner:', partner?.id);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Add Investment - {partner?.name}
          </DialogTitle>
          <DialogDescription>
            Record a new investment from this partner
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="billboard">Select Billboard</Label>
              <Select value={selectedBillboard} onValueChange={setSelectedBillboard} required>
                <SelectTrigger>
                  <SelectValue placeholder="Choose billboard" />
                </SelectTrigger>
                <SelectContent>
                  {availableBillboards.map((billboard) => (
                    <SelectItem key={billboard.id} value={billboard.id.toString()}>
                      {billboard.identifier} - {billboard.location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="investmentAmount">Investment Amount (৳)</Label>
              <Input id="investmentAmount" type="number" placeholder="180000" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="percentage">Investment Percentage (%)</Label>
              <Input id="percentage" type="number" min="1" max="100" placeholder="60" required />
            </div>

            <div>
              <Label htmlFor="investmentDate">Investment Date</Label>
              <Input id="investmentDate" type="date" required />
            </div>
          </div>

          <div>
            <Label htmlFor="purpose">Investment Purpose</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Select purpose" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Agreement Payment">Agreement Payment</SelectItem>
                <SelectItem value="Structure Cost">Structure Cost</SelectItem>
                <SelectItem value="Installation Cost">Installation Cost</SelectItem>
                <SelectItem value="PVC Cost">PVC Cost</SelectItem>
                <SelectItem value="Electrical Cost">Electrical Cost</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedBillboard && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Available Installation Costs for this Billboard:</h4>
              <div className="space-y-1 text-sm">
                {getInstallationCosts(selectedBillboard).map((cost, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{cost.type}:</span>
                    <span className="font-medium">৳{cost.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" placeholder="Additional notes about this investment..." />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Record Investment
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddInvestmentModal;
