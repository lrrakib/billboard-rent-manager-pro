
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

interface RentalCardProps {
  rental: any;
  onViewDetails: (rental: any) => void;
  onGenerateInvoice: (rental: any, type: string) => void;
  onRecordPayment: (rentalId: number) => void;
}

const RentalCard: React.FC<RentalCardProps> = ({ 
  rental, 
  onViewDetails, 
  onGenerateInvoice, 
  onRecordPayment 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Partial': return 'bg-yellow-100 text-yellow-800';
      case 'Unpaid': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInvoiceStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Paid</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800"><AlertTriangle className="w-3 h-3 mr-1" />Overdue</Badge>;
      case 'not_due':
        return <Badge className="bg-gray-100 text-gray-800">Not Due</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const months = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30));
    return `${months} months`;
  };

  const getOverallStatus = () => {
    return rental.status || 'Unknown';
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-600" />
              {rental.clients_enhanced?.company_name}
            </CardTitle>
            <CardDescription className="flex items-center mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              {rental.billboards_enhanced?.billboard_identifier} - {rental.billboards_enhanced?.location}
            </CardDescription>
          </div>
          <Badge className={rental.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
            {rental.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Rental Period</h4>
            <div className="space-y-1 text-sm">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                <span>Start: {rental.start_date}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                <span>End: {rental.end_date}</span>
              </div>
              <div className="text-blue-600 font-medium">
                Duration: {calculateDuration(rental.start_date, rental.end_date)}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Financial Details</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Rental Amount:</span>
                <span className="font-semibold">৳{rental.rental_amount?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Frequency:</span>
                <span>{rental.invoice_frequency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Structure:</span>
                <span>{rental.payment_structure}</span>
              </div>
              <div className="flex justify-between pt-1 border-t">
                <span className="text-gray-600">Status:</span>
                <span className={`font-bold ${rental.status === 'Active' ? 'text-green-600' : 'text-gray-600'}`}>
                  {rental.status}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Payment Status</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Billboard:</span>
                <span className="font-medium">{rental.billboards_enhanced?.billboard_identifier}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Size:</span>
                <span>{rental.billboards_enhanced?.size}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Type:</span>
                <span>{rental.billboards_enhanced?.type}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Button 
              className="w-full" 
              variant="outline"
              onClick={() => onViewDetails(rental)}
            >
              View Details
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                className="w-full text-xs" 
                variant="outline"
                onClick={() => onGenerateInvoice(rental, 'system')}
              >
                Auto Invoice
              </Button>
              <Button 
                className="w-full text-xs" 
                variant="outline"
                onClick={() => onGenerateInvoice(rental, 'manual')}
              >
                Manual Invoice
              </Button>
            </div>
            {rental.status === 'Active' && (
              <Button 
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => onRecordPayment(rental.id)}
              >
                Record Payment
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RentalCard;
