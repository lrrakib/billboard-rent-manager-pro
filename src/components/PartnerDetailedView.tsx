
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DollarSign, MapPin, Calendar, TrendingUp, Building, Percent } from 'lucide-react';
import { format } from 'date-fns';

interface PartnerDetailedViewProps {
  partner: any;
  isOpen: boolean;
  onClose: () => void;
  investments: any[];
  billboards: any[];
}

const PartnerDetailedView: React.FC<PartnerDetailedViewProps> = ({
  partner,
  isOpen,
  onClose,
  investments,
  billboards
}) => {
  const partnerInvestments = investments.filter(inv => inv.partner_id === partner?.id);
  const partnerBillboards = billboards.filter(bb => 
    partnerInvestments.some(inv => inv.billboard_id === bb.id)
  );

  const totalInvestment = partnerInvestments.reduce((sum, inv) => sum + (inv.investment_amount || 0), 0);
  const totalInstallationCosts = partnerBillboards.reduce((sum, bb) => sum + (bb.total_installation_cost || 0), 0);
  const totalRentalIncome = partnerBillboards.reduce((sum, bb) => {
    const investment = partnerInvestments.find(inv => inv.billboard_id === bb.id);
    const monthlyRent = bb.rent_amount || 0;
    const yearlyRent = monthlyRent * 12;
    const partnerShare = investment ? (investment.investment_percentage / 100) : 0;
    return sum + (yearlyRent * partnerShare);
  }, 0);

  const roi = totalInvestment > 0 ? ((totalRentalIncome - totalInvestment) / totalInvestment) * 100 : 0;

  if (!partner) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            {partner.name} - Detailed Investment Analysis
          </DialogTitle>
          <DialogDescription>
            Comprehensive view of partner's investments and returns
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Partner Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
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
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Annual Income
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  ৳{totalRentalIncome.toLocaleString()}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Percent className="w-4 h-4" />
                  ROI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {roi.toFixed(1)}%
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Billboards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {partnerBillboards.length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Partner Information */}
          <Card>
            <CardHeader>
              <CardTitle>Partner Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Contact Details</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Contact Person:</strong> {partner.contact_person || 'N/A'}</div>
                    <div><strong>Email:</strong> {partner.email || 'N/A'}</div>
                    <div><strong>Phone:</strong> {partner.phone || 'N/A'}</div>
                    <div><strong>Address:</strong> {partner.address || 'N/A'}</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Partnership Details</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Partner Since:</strong> {format(new Date(partner.created_at), 'MMM dd, yyyy')}</div>
                    <div><strong>Total Investments:</strong> {partnerInvestments.length}</div>
                    <div><strong>Active Billboards:</strong> {partnerBillboards.filter(bb => bb.status === 'Rented').length}</div>
                    <div><strong>Average Investment:</strong> ৳{partnerInvestments.length > 0 ? (totalInvestment / partnerInvestments.length).toLocaleString() : '0'}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Investment Breakdown Table */}
          <Card>
            <CardHeader>
              <CardTitle>Investment Breakdown</CardTitle>
              <CardDescription>Detailed view of all investments by this partner</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Billboard</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Investment %</TableHead>
                    <TableHead>Investment Amount</TableHead>
                    <TableHead>Investment Date</TableHead>
                    <TableHead>Purpose</TableHead>
                    <TableHead>Monthly Income</TableHead>
                    <TableHead>Annual Return</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {partnerInvestments.map((investment) => {
                    const billboard = billboards.find(bb => bb.id === investment.billboard_id);
                    const monthlyRent = billboard?.rent_amount || 0;
                    const partnerMonthlyIncome = monthlyRent * (investment.investment_percentage / 100);
                    const annualReturn = partnerMonthlyIncome * 12;
                    
                    return (
                      <TableRow key={investment.id}>
                        <TableCell className="font-medium">
                          {billboard?.billboard_identifier || 'N/A'}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                            {billboard?.location || 'N/A'}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            {investment.investment_percentage}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1 text-blue-600" />
                            ৳{investment.investment_amount?.toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                            {format(new Date(investment.investment_date), 'MMM dd, yyyy')}
                          </div>
                        </TableCell>
                        <TableCell>{investment.purpose}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1 text-green-600" />
                            ৳{partnerMonthlyIncome.toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <TrendingUp className="w-4 h-4 mr-1 text-green-600" />
                            ৳{annualReturn.toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={
                            billboard?.status === 'Rented' ? 'bg-green-100 text-green-800' :
                            billboard?.status === 'Available' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }>
                            {billboard?.status || 'Unknown'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Billboard Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Billboard Performance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {partnerBillboards.map((billboard) => {
                  const investment = partnerInvestments.find(inv => inv.billboard_id === billboard.id);
                  const monthlyRent = billboard.rent_amount || 0;
                  const yearlyRent = monthlyRent * 12;
                  const partnerShare = investment ? (investment.investment_percentage / 100) : 0;
                  const partnerYearlyIncome = yearlyRent * partnerShare;
                  const investmentAmount = investment?.investment_amount || 0;
                  const billboardROI = investmentAmount > 0 ? ((partnerYearlyIncome - investmentAmount) / investmentAmount) * 100 : 0;

                  return (
                    <div key={billboard.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold">{billboard.billboard_identifier}</h4>
                          <p className="text-sm text-gray-600">{billboard.location}</p>
                        </div>
                        <Badge className={
                          billboard.status === 'Rented' ? 'bg-green-100 text-green-800' :
                          billboard.status === 'Available' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }>
                          {billboard.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Investment:</span>
                          <div className="font-semibold">৳{investmentAmount.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Share:</span>
                          <div className="font-semibold">{investment?.investment_percentage || 0}%</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Annual Income:</span>
                          <div className="font-semibold text-green-600">৳{partnerYearlyIncome.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">ROI:</span>
                          <div className={`font-semibold ${billboardROI >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {billboardROI.toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PartnerDetailedView;
