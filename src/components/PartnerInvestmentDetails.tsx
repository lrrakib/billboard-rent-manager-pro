
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DollarSign, TrendingUp, MapPin, Calendar, Plus } from 'lucide-react';

interface PartnerInvestmentDetailsProps {
  partner: any;
  isOpen: boolean;
  onClose: () => void;
  onAddInvestment: () => void;
}

const PartnerInvestmentDetails: React.FC<PartnerInvestmentDetailsProps> = ({ 
  partner, 
  isOpen, 
  onClose,
  onAddInvestment 
}) => {
  // Mock investment data - this should come from Supabase
  const investments = [
    {
      id: 1,
      billboard_identifier: 'BB-001',
      location: 'Downtown Plaza',
      investment_amount: 180000,
      investment_percentage: 60,
      purpose: 'Initial Setup',
      investment_date: '2024-01-15',
      yearly_rental: 600000,
      profit_share: 360000
    },
    {
      id: 2,
      billboard_identifier: 'UP-002',
      location: 'Highway Exit 12',
      investment_amount: 72000,
      investment_percentage: 40,
      purpose: 'Structure Cost',
      investment_date: '2024-02-10',
      yearly_rental: 480000,
      profit_share: 192000
    }
  ];

  const totalInvestment = investments.reduce((sum, inv) => sum + inv.investment_amount, 0);
  const totalProfitShare = investments.reduce((sum, inv) => sum + inv.profit_share, 0);
  const totalROI = ((totalProfitShare / totalInvestment) * 100).toFixed(1);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Investment Details - {partner?.name}
          </DialogTitle>
          <DialogDescription>
            Complete investment portfolio and profit sharing details
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Investment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  ৳{totalInvestment.toLocaleString()}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Annual Profit Share
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  ৳{totalProfitShare.toLocaleString()}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Portfolio ROI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {totalROI}%
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Billboards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-700">
                  {investments.length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Investment Details */}
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Investment Portfolio</h3>
            <Button onClick={onAddInvestment} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Investment
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {investments.map((investment) => (
              <Card key={investment.id} className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{investment.billboard_identifier}</CardTitle>
                      <div className="flex items-center text-gray-600 mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        {investment.location}
                      </div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">
                      {investment.investment_percentage}% Share
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Investment:</span>
                        <div className="font-semibold text-blue-600">
                          ৳{investment.investment_amount.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">Annual Return:</span>
                        <div className="font-semibold text-green-600">
                          ৳{investment.profit_share.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-sm">
                      <span className="text-gray-600">Purpose:</span>
                      <div className="font-medium">{investment.purpose}</div>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-1" />
                      Invested on {investment.investment_date}
                    </div>
                    
                    <div className="pt-2 border-t">
                      <div className="flex justify-between text-sm">
                        <span>ROI:</span>
                        <span className="font-semibold text-green-600">
                          {((investment.profit_share / investment.investment_amount) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PartnerInvestmentDetails;
