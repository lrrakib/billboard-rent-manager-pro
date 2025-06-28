
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit, MapPin, DollarSign, Users, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface BillboardTableViewProps {
  billboards: any[];
  onViewDetails: (billboard: any) => void;
  onEditBillboard: (billboard: any) => void;
  onViewInstallation: (billboard: any) => void;
}

const BillboardTableView: React.FC<BillboardTableViewProps> = ({
  billboards,
  onViewDetails,
  onEditBillboard,
  onViewInstallation
}) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'rented':
        return 'bg-blue-100 text-blue-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'under construction':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Billboard ID</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Rent Amount</TableHead>
            <TableHead>Installation Cost</TableHead>
            <TableHead>Land Owner</TableHead>
            <TableHead>Agreement Period</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {billboards.map((billboard) => (
            <TableRow key={billboard.id} className="hover:bg-gray-50">
              <TableCell className="font-medium">
                {billboard.billboard_identifier || 'N/A'}
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                  {billboard.location}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{billboard.type}</Badge>
              </TableCell>
              <TableCell>{billboard.size}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(billboard.status)}>
                  {billboard.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-1 text-gray-400" />
                  ৳{billboard.rent_amount?.toLocaleString() || 'N/A'}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-1 text-gray-400" />
                  ৳{billboard.total_installation_cost?.toLocaleString() || '0'}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1 text-gray-400" />
                  {billboard.land_owners?.name || 'N/A'}
                </div>
              </TableCell>
              <TableCell>
                {billboard.agreement_start_date && billboard.agreement_end_date ? (
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                    {format(new Date(billboard.agreement_start_date), 'MMM dd, yyyy')} - {format(new Date(billboard.agreement_end_date), 'MMM dd, yyyy')}
                  </div>
                ) : (
                  'N/A'
                )}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onViewDetails(billboard)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onViewInstallation(billboard)}
                  >
                    Installation
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => onEditBillboard(billboard)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BillboardTableView;
