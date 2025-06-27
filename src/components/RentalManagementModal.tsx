
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, DollarSign, FileText } from 'lucide-react';

interface RentalManagementModalProps {
  billboard: any;
  isOpen: boolean;
  onClose: () => void;
}

const RentalManagementModal: React.FC<RentalManagementModalProps> = ({ billboard, isOpen, onClose }) => {
  const [selectedAction, setSelectedAction] = useState('');

  const mockClients = [
    { id: 1, name: "Tech Corp", industry: "Technology" },
    { id: 2, name: "Fashion Brand", industry: "Retail" },
    { id: 3, name: "Auto Dealership", industry: "Automotive" }
  ];

  const handleRentOut = () => {
    console.log('Processing rent out for billboard:', billboard.id);
    // Add rent out logic here
  };

  const handleRentModify = () => {
    console.log('Modifying rental for billboard:', billboard.id);
    // Add rental modification logic here
  };

  const handleRentEnd = () => {
    console.log('Ending rental for billboard:', billboard.id);
    // Add rental end logic here
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Manage Rental - {billboard?.billboard_identifier}
          </DialogTitle>
          <DialogDescription>
            Current Status: <Badge className={billboard?.status === 'Rented' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
              {billboard?.status}
            </Badge>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {billboard?.status === 'Available' ? (
            // Rent Out Form
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Rent Out Billboard
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="client">Select Client</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose client" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockClients.map((client) => (
                        <SelectItem key={client.id} value={client.id.toString()}>
                          {client.name} - {client.industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="yearlyRent">Yearly Rent (৳)</Label>
                  <Input id="yearlyRent" type="number" placeholder="600000" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" type="date" />
                </div>
                
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input id="endDate" type="date" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="invoiceFreq">Invoice Frequency</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly (12 invoices)</SelectItem>
                      <SelectItem value="quarterly">Quarterly (4 invoices)</SelectItem>
                      <SelectItem value="4-monthly">4-Monthly (3 invoices)</SelectItem>
                      <SelectItem value="semi-annual">Semi-Annual (2 invoices)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="invoiceDay">Invoice Date (Day of Month)</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({length: 28}, (_, i) => i + 1).map(day => (
                        <SelectItem key={day} value={day.toString()}>{day}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="paymentStructure">Payment Structure</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment structure" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="equal">Equal Installments</SelectItem>
                    <SelectItem value="20-60-20">20%-60%-20%</SelectItem>
                    <SelectItem value="60-30-10">60%-30%-10%</SelectItem>
                    <SelectItem value="33-33-33">33.33%-33.33%-33.33%</SelectItem>
                    <SelectItem value="25-50-25">25%-50%-25%</SelectItem>
                    <SelectItem value="30-50-20">30%-50%-20%</SelectItem>
                    <SelectItem value="custom">Custom Structure</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea id="notes" placeholder="Any special terms or conditions..." />
              </div>

              <Button onClick={handleRentOut} className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                Create Rental Agreement
              </Button>
            </div>
          ) : (
            // Manage Existing Rental
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Current Rental Information</h3>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Client:</span>
                  <span className="font-medium ml-2">{billboard?.currentClient}</span>
                </div>
                <div>
                  <span className="text-gray-600">Yearly Rent:</span>
                  <span className="font-medium ml-2 text-green-600">৳{billboard?.rentAmount?.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={handleRentModify} variant="outline">
                  Modify Rental Terms
                </Button>
                <Button onClick={handleRentEnd} variant="outline" className="text-red-600">
                  End Rental
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RentalManagementModal;
