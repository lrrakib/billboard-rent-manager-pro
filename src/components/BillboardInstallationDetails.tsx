
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Users, Calendar, FileText, TrendingUp } from 'lucide-react';

interface BillboardInstallationDetailsProps {
  billboard: any;
  isOpen: boolean;
  onClose: () => void;
}

const BillboardInstallationDetails: React.FC<BillboardInstallationDetailsProps> = ({ 
  billboard, 
  isOpen, 
  onClose 
}) => {
  // Mock installation costs data - this should come from Supabase
  const installationCosts = [
    { id: 1, cost_type: 'Agreement Payment', amount: 50000, partner: 'Investment Partners Ltd', payment_date: '2024-01-15' },
    { id: 2, cost_type: 'Structure Cost', amount: 150000, partner: 'Digital Media Solutions', payment_date: '2024-01-20' },
    { id: 3, cost_type: 'Installation Cost', amount: 75000, partner: 'Investment Partners Ltd', payment_date: '2024-02-01' },
    { id: 4, cost_type: 'PVC Cost', amount: 25000, partner: null, payment_date: '2024-02-05' },
    { id: 5, cost_type: 'Electrical Cost', amount: 30000, partner: 'Digital Media Solutions', payment_date: '2024-02-10' }
  ];

  const totalCost = installationCosts.reduce((sum, cost) => sum + cost.amount, 0);
  const yearlyRental = billboard?.rentAmount || 600000;
  const profitMargin = yearlyRental - totalCost;
  const roi = ((profitMargin / totalCost) * 100).toFixed(1);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Installation Details - {billboard?.billboard_identifier}
          </DialogTitle>
          <DialogDescription>
            Complete installation cost breakdown and profitability analysis
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Total Cost
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  ৳{totalCost.toLocaleString()}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Yearly Rental
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  ৳{yearlyRental.toLocaleString()}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Profit Margin
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${profitMargin > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ৳{profitMargin.toLocaleString()}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  ROI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${parseFloat(roi) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {roi}%
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Installation Costs Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Installation Cost Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {installationCosts.map((cost) => (
                  <div key={cost.id} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{cost.cost_type}</div>
                      {cost.partner && (
                        <div className="text-sm text-gray-600 flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {cost.partner}
                        </div>
                      )}
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {cost.payment_date}
                      </div>
                    </div>
                    <div className="text-lg font-semibold text-red-600">
                      ৳{cost.amount.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Partner Contributions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Partner Investment Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <div>
                    <div className="font-medium">Investment Partners Ltd</div>
                    <div className="text-sm text-gray-600">60% Share</div>
                  </div>
                  <div className="text-lg font-semibold text-blue-600">
                    ৳{(totalCost * 0.6).toLocaleString()}
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <div>
                    <div className="font-medium">Digital Media Solutions</div>
                    <div className="text-sm text-gray-600">40% Share</div>
                  </div>
                  <div className="text-lg font-semibold text-green-600">
                    ৳{(totalCost * 0.4).toLocaleString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BillboardInstallationDetails;
