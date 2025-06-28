
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit, Phone, Mail, MapPin, DollarSign, TrendingUp, Building } from 'lucide-react';
import { format } from 'date-fns';

interface PartnerTableViewProps {
  partners: any[];
  onViewDetails: (partner: any) => void;
  onEditPartner: (partner: any) => void;
  onViewInvestments: (partner: any) => void;
  investments: any[];
}

const PartnerTableView: React.FC<PartnerTableViewProps> = ({
  partners,
  onViewDetails,
  onEditPartner,
  onViewInvestments,
  investments
}) => {
  const getPartnerInvestmentSummary = (partnerId: string) => {
    const partnerInvestments = investments.filter(inv => inv.partner_id === partnerId);
    const totalInvestment = partnerInvestments.reduce((sum, inv) => sum + (inv.investment_amount || 0), 0);
    const billboardCount = new Set(partnerInvestments.map(inv => inv.billboard_id)).size;
    
    return { totalInvestment, billboardCount, investmentCount: partnerInvestments.length };
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Partner Name</TableHead>
            <TableHead>Contact Person</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Total Investment</TableHead>
            <TableHead>Billboards</TableHead>
            <TableHead>Investments</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {partners.map((partner) => {
            const summary = getPartnerInvestmentSummary(partner.id);
            return (
              <TableRow key={partner.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <Building className="w-4 h-4 mr-2 text-gray-400" />
                    {partner.name}
                  </div>
                </TableCell>
                <TableCell>{partner.contact_person || 'N/A'}</TableCell>
                <TableCell>
                  {partner.email ? (
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-1 text-gray-400" />
                      <a href={`mailto:${partner.email}`} className="text-blue-600 hover:underline">
                        {partner.email}
                      </a>
                    </div>
                  ) : (
                    'N/A'
                  )}
                </TableCell>
                <TableCell>
                  {partner.phone ? (
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-1 text-gray-400" />
                      <a href={`tel:${partner.phone}`} className="text-blue-600 hover:underline">
                        {partner.phone}
                      </a>
                    </div>
                  ) : (
                    'N/A'
                  )}
                </TableCell>
                <TableCell>
                  {partner.address ? (
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                      <span className="truncate max-w-32" title={partner.address}>
                        {partner.address}
                      </span>
                    </div>
                  ) : (
                    'N/A'
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1 text-green-600" />
                    <span className="font-semibold text-green-600">
                      ৳{summary.totalInvestment.toLocaleString()}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    {summary.billboardCount} Billboards
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-purple-50 text-purple-700">
                    {summary.investmentCount} Investments
                  </Badge>
                </TableCell>
                <TableCell>
                  {format(new Date(partner.created_at), 'MMM dd, yyyy')}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onViewDetails(partner)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onViewInvestments(partner)}
                      className="bg-green-50 hover:bg-green-100"
                    >
                      <TrendingUp className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => onEditPartner(partner)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default PartnerTableView;
