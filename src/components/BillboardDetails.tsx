
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  DollarSign, 
  Plus, 
  FileText, 
  Upload, 
  Users, 
  TrendingUp,
  Calendar,
  Building
} from 'lucide-react';

interface BillboardDetailsProps {
  billboard: any;
  isOpen: boolean;
  onClose: () => void;
}

const BillboardDetails: React.FC<BillboardDetailsProps> = ({ billboard, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAddCostOpen, setIsAddCostOpen] = useState(false);
  const [isAddInvestmentOpen, setIsAddInvestmentOpen] = useState(false);

  // Mock data - replace with actual Supabase queries
  const installationCosts = [
    { id: 1, costType: 'Agreement Payment', amount: 50000, partner: 'Partner A', date: '2024-01-15', paymentMethod: 'Bank Transfer' },
    { id: 2, costType: 'Structure Cost', amount: 150000, partner: 'Partner B', date: '2024-02-01', paymentMethod: 'Cash' },
    { id: 3, costType: 'PVC Cost', amount: 75000, partner: 'Partner A', date: '2024-02-15', paymentMethod: 'Cheque' },
  ];

  const partnerInvestments = [
    { id: 1, partner: 'Partner A', percentage: 60, amount: 300000, purpose: 'Initial Setup' },
    { id: 2, partner: 'Partner B', percentage: 40, amount: 200000, purpose: 'Material Cost' },
  ];

  const totalInstallationCost = installationCosts.reduce((sum, cost) => sum + cost.amount, 0);
  const yearlyRental = 600000; // Mock data
  const totalProfit = yearlyRental - totalInstallationCost;

  const costTypes = [
    'Agreement Payment', 'Structure Cost', 'Installation Cost', 'PVC Cost', 
    'PVC Fitting Cost', 'Painting Cost', 'VAT', 'Tax', 'Transport Cost',
    'Labor Cost', 'Electrical Cost', 'Permit Cost', 'Other'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            {billboard?.billboard_identifier || billboard?.location} - Installation Details
          </DialogTitle>
          <DialogDescription>
            Comprehensive installation cost tracking and profit analysis
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="costs">Installation Costs</TabsTrigger>
            <TabsTrigger value="investments">Partner Investments</TabsTrigger>
            <TabsTrigger value="profit">Profit Analysis</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Total Installation Cost</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    ৳{totalInstallationCost.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Yearly Rental Income</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    ৳{yearlyRental.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Total Profit</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ৳{totalProfit.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Billboard Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div><strong>ID:</strong> {billboard?.billboard_identifier}</div>
                  <div><strong>Location:</strong> {billboard?.location}</div>
                  <div><strong>Size:</strong> {billboard?.size}</div>
                  <div><strong>Total SFT:</strong> {billboard?.total_sft} sq ft</div>
                  <div><strong>Type:</strong> {billboard?.type}</div>
                  <div><strong>Status:</strong> 
                    <Badge className="ml-2">{billboard?.status}</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Partner Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  {partnerInvestments.map((investment) => (
                    <div key={investment.id} className="flex justify-between items-center py-2 border-b">
                      <span>{investment.partner}</span>
                      <div className="text-right">
                        <div className="font-semibold">{investment.percentage}%</div>
                        <div className="text-sm text-gray-600">৳{investment.amount.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="costs" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Installation Cost Log</h3>
              <Button onClick={() => setIsAddCostOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Cost
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cost Type</TableHead>
                  <TableHead>Amount (৳)</TableHead>
                  <TableHead>Partner</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Payment Method</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {installationCosts.map((cost) => (
                  <TableRow key={cost.id}>
                    <TableCell>{cost.costType}</TableCell>
                    <TableCell className="font-semibold">৳{cost.amount.toLocaleString()}</TableCell>
                    <TableCell>{cost.partner}</TableCell>
                    <TableCell>{cost.date}</TableCell>
                    <TableCell>{cost.paymentMethod}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="investments" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Partner Investments</h3>
              <Button onClick={() => setIsAddInvestmentOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Investment
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Partner</TableHead>
                  <TableHead>Investment %</TableHead>
                  <TableHead>Amount (৳)</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead>Profit Share (৳)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {partnerInvestments.map((investment) => (
                  <TableRow key={investment.id}>
                    <TableCell>{investment.partner}</TableCell>
                    <TableCell>{investment.percentage}%</TableCell>
                    <TableCell className="font-semibold">৳{investment.amount.toLocaleString()}</TableCell>
                    <TableCell>{investment.purpose}</TableCell>
                    <TableCell className="font-semibold text-green-600">
                      ৳{((totalProfit * investment.percentage) / 100).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="profit" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Profit Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Yearly Rental Income:</span>
                    <span className="font-semibold text-green-600">৳{yearlyRental.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Installation Cost:</span>
                    <span className="font-semibold text-red-600">৳{totalInstallationCost.toLocaleString()}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between text-lg">
                    <span>Net Profit:</span>
                    <span className={`font-bold ${totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ৳{totalProfit.toLocaleString()}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Partner Profit Share</CardTitle>
                </CardHeader>
                <CardContent>
                  {partnerInvestments.map((investment) => (
                    <div key={investment.id} className="flex justify-between items-center py-2 border-b">
                      <span>{investment.partner} ({investment.percentage}%)</span>
                      <span className="font-semibold text-green-600">
                        ৳{((totalProfit * investment.percentage) / 100).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Agreement Papers & Documents</h3>
              <Button>
                <Upload className="w-4 h-4 mr-2" />
                Upload Document
              </Button>
            </div>
            <div className="text-center py-8 text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No documents uploaded yet</p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Add Installation Cost Dialog */}
        <Dialog open={isAddCostOpen} onOpenChange={setIsAddCostOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Installation Cost</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="costType">Cost Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select cost type" />
                  </SelectTrigger>
                  <SelectContent>
                    {costTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="amount">Amount (৳)</Label>
                <Input id="amount" type="number" placeholder="Enter amount" />
              </div>
              <div>
                <Label htmlFor="partner">Partner (Optional)</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select partner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="partner1">Partner A</SelectItem>
                    <SelectItem value="partner2">Partner B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="cheque">Cheque</SelectItem>
                    <SelectItem value="mfs">MFS</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Additional notes" />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddCostOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsAddCostOpen(false)}>Add Cost</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
};

export default BillboardDetails;
