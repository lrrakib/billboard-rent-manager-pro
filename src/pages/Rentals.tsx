
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, FileText } from 'lucide-react';
import RentalCard from '@/components/RentalCard';
import RentalFilters from '@/components/RentalFilters';
import RentalDetailsModal from '@/components/RentalDetailsModal';
import InvoiceModal from '@/components/InvoiceModal';

const Rentals = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRental, setSelectedRental] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [invoiceType, setInvoiceType] = useState('system');

  // Enhanced mock rental data with payment tracking
  const rentals = [
    {
      id: 1,
      client: "Tech Corp",
      billboard: "Downtown Plaza",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      totalAmount: 600000,
      invoiceFrequency: "quarterly",
      paymentStructure: "25-50-25",
      invoices: [
        { id: 1, amount: 150000, dueDate: "2024-01-15", status: "paid", paidDate: "2024-01-10" },
        { id: 2, amount: 300000, dueDate: "2024-04-15", status: "paid", paidDate: "2024-04-12" },
        { id: 3, amount: 150000, dueDate: "2024-07-15", status: "pending", paidDate: null },
        { id: 4, amount: 0, dueDate: "2024-10-15", status: "not_due", paidDate: null }
      ],
      pvcCost: 25000,
      fittingCost: 15000
    },
    {
      id: 2,
      client: "Fashion Brand",
      billboard: "Airport Terminal",
      startDate: "2024-02-15",
      endDate: "2024-08-15",
      totalAmount: 480000,
      invoiceFrequency: "monthly",
      paymentStructure: "equal",
      invoices: [
        { id: 1, amount: 80000, status: "paid" },
        { id: 2, amount: 80000, status: "paid" },
        { id: 3, amount: 80000, status: "overdue" },
        { id: 4, amount: 80000, status: "pending" },
        { id: 5, amount: 80000, status: "not_due" },
        { id: 6, amount: 80000, status: "not_due" }
      ],
      pvcCost: 30000,
      fittingCost: 20000
    }
  ];

  const filteredRentals = rentals.filter(rental => {
    const matchesSearch = 
      rental.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rental.billboard.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || rental.invoices.some(invoice => invoice.status.toLowerCase() === statusFilter.toLowerCase());
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (rental: any) => {
    setSelectedRental(rental);
    setIsDetailsOpen(true);
  };

  const handleGenerateInvoice = (rental: any, type: string = 'system') => {
    setSelectedRental(rental);
    setInvoiceType(type);
    setIsInvoiceModalOpen(true);
  };

  const handleRecordPayment = (rentalId: number) => {
    console.log('Record payment for rental:', rentalId);
    // Add payment recording functionality here
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Rentals</h1>
            <p className="text-gray-600 mt-2">Track and manage billboard rental agreements</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            New Rental
          </Button>
        </div>

        <RentalFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        {/* Rentals List */}
        <div className="space-y-4">
          {filteredRentals.map((rental) => (
            <RentalCard
              key={rental.id}
              rental={rental}
              onViewDetails={handleViewDetails}
              onGenerateInvoice={handleGenerateInvoice}
              onRecordPayment={handleRecordPayment}
            />
          ))}
        </div>

        {filteredRentals.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No rentals found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters</p>
          </div>
        )}

        <RentalDetailsModal
          rental={selectedRental}
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
        />

        <InvoiceModal
          rental={selectedRental}
          invoiceType={invoiceType}
          isOpen={isInvoiceModalOpen}
          onClose={() => setIsInvoiceModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default Rentals;
