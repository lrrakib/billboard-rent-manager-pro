
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit, Phone, Mail, MapPin, Building, DollarSign, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface ClientTableViewProps {
  clients: any[];
  onViewDetails: (client: any) => void;
  onEditClient: (client: any) => void;
  rentals: any[];
  payments: any[];
}

const ClientTableView: React.FC<ClientTableViewProps> = ({
  clients,
  onViewDetails,
  onEditClient,
  rentals,
  payments
}) => {
  const getClientSummary = (clientId: string) => {
    const clientRentals = rentals.filter(r => r.client_id === clientId);
    const activeRentals = clientRentals.filter(r => r.status === 'Active');
    const totalMonthlyRent = activeRentals.reduce((sum, r) => sum + (r.rental_amount || 0), 0);
    
    const clientPayments = payments.filter(p => 
      clientRentals.some(r => r.id === p.rental_id)
    );
    const totalPaid = clientPayments.reduce((sum, p) => sum + (p.amount || 0), 0);
    
    const lastPayment = clientPayments
      .sort((a, b) => new Date(b.payment_date).getTime() - new Date(a.payment_date).getTime())[0];
    
    return {
      activeRentals: activeRentals.length,
      totalRentals: clientRentals.length,
      totalMonthlyRent,
      totalPaid,
      lastPayment
    };
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Industry</TableHead>
            <TableHead>Contact Person</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Active Rentals</TableHead>
            <TableHead>Monthly Rent</TableHead>
            <TableHead>Total Paid</TableHead>
            <TableHead>Last Payment</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => {
            const summary = getClientSummary(client.id);
            return (
              <TableRow key={client.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <Building className="w-4 h-4 mr-2 text-gray-400" />
                    {client.company_name}
                  </div>
                </TableCell>
                <TableCell>
                  {client.industry ? (
                    <Badge variant="outline">{client.industry}</Badge>
                  ) : (
                    'N/A'
                  )}
                </TableCell>
                <TableCell>{client.contact_person}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-1 text-gray-400" />
                    <a href={`mailto:${client.contact_email}`} className="text-blue-600 hover:underline">
                      {client.contact_email}
                    </a>
                  </div>
                </TableCell>
                <TableCell>
                  {client.contact_phone ? (
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-1 text-gray-400" />
                      <a href={`tel:${client.contact_phone}`} className="text-blue-600 hover:underline">
                        {client.contact_phone}
                      </a>
                    </div>
                  ) : (
                    'N/A'
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    {summary.activeRentals} / {summary.totalRentals}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1 text-green-600" />
                    <span className="font-semibold text-green-600">
                      ৳{summary.totalMonthlyRent.toLocaleString()}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1 text-blue-600" />
                    <span className="font-semibold text-blue-600">
                      ৳{summary.totalPaid.toLocaleString()}
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
                      onClick={() => onViewDetails(client)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => onEditClient(client)}
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

export default ClientTableView;
