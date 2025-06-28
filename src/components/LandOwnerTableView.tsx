
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit, Phone, Mail, MapPin, Building, DollarSign, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface LandOwnerTableViewProps {
  landOwners: any[];
  onViewDetails: (landOwner: any) => void;
  onEditLandOwner: (landOwner: any) => void;
  billboards: any[];
  payments: any[];
}

const LandOwnerTableView: React.FC<LandOwnerTableViewProps> = ({
  landOwners,
  onViewDetails,
  onEditLandOwner,
  billboards,
  payments
}) => {
  const getLandOwnerSummary = (landOwnerId: string) => {
    const ownerBillboards = billboards.filter(b => b.land_owner_id === landOwnerId);
    const ownerPayments = payments.filter(p => p.land_owner_id === landOwnerId);
    const totalPaid = ownerPayments
      .filter(p => p.status === 'Paid')
      .reduce((sum, p) => sum + (p.amount || 0), 0);
    const pendingAmount = ownerPayments
      .filter(p => p.status === 'Pending')
      .reduce((sum, p) => sum + (p.amount || 0), 0);
    
    return {
      billboardCount: ownerBillboards.length,
      totalPaid,
      pendingAmount,
      lastPayment: ownerPayments
        .filter(p => p.payment_date)
        .sort((a, b) => new Date(b.payment_date).getTime() - new Date(a.payment_date).getTime())[0]
    };
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Land Owner</TableHead>
            <TableHead>Contact Person</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Billboards</TableHead>
            <TableHead>Total Paid</TableHead>
            <TableHead>Pending</TableHead>
            <TableHead>Last Payment</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {landOwners.map((landOwner) => {
            const summary = getLandOwnerSummary(landOwner.id);
            return (
              <TableRow key={landOwner.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <Building className="w-4 h-4 mr-2 text-gray-400" />
                    {landOwner.name}
                  </div>
                </TableCell>
                <TableCell>{landOwner.contact_person || 'N/A'}</TableCell>
                <TableCell>
                  {landOwner.email ? (
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-1 text-gray-400" />
                      <a href={`mailto:${landOwner.email}`} className="text-blue-600 hover:underline">
                        {landOwner.email}
                      </a>
                    </div>
                  ) : (
                    'N/A'
                  )}
                </TableCell>
                <TableCell>
                  {landOwner.phone ? (
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-1 text-gray-400" />
                      <a href={`tel:${landOwner.phone}`} className="text-blue-600 hover:underline">
                        {landOwner.phone}
                      </a>
                    </div>
                  ) : (
                    'N/A'
                  )}
                </TableCell>
                <TableCell>
                  {landOwner.address ? (
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                      <span className="truncate max-w-32" title={landOwner.address}>
                        {landOwner.address}
                      </span>
                    </div>
                  ) : (
                    'N/A'
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    {summary.billboardCount} Properties
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1 text-green-600" />
                    <span className="font-semibold text-green-600">
                      ৳{summary.totalPaid.toLocaleString()}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1 text-orange-600" />
                    <span className="font-semibold text-orange-600">
                      ৳{summary.pendingAmount.toLocaleString()}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  {summary.lastPayment ? (
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                      {format(new Date(summary.lastPayment.payment_date), 'MMM dd, yyyy')}
                    </div>
                  ) : (
                    'No payments'
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onViewDetails(landOwner)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => onEditLandOwner(landOwner)}
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

export default LandOwnerTableView;
