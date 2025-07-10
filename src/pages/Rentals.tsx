
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, FileText } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import RentalCard from '@/components/RentalCard';
import RentalFilters from '@/components/RentalFilters';
import InvoiceModal from '@/components/InvoiceModal';

const Rentals = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRental, setSelectedRental] = useState(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [invoiceType, setInvoiceType] = useState('system');

  // Fetch rentals from database
  const { data: rentals = [], isLoading } = useQuery({
    queryKey: ['rentals'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('billboard_rentals')
        .select(`
          *,
          clients_enhanced!billboard_rentals_client_id_fkey(company_name, contact_person, contact_email),
          billboards_enhanced!billboard_rentals_billboard_id_fkey(billboard_identifier, location, size, type)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });

  const filteredRentals = rentals.filter(rental => {
    const matchesSearch = 
      rental.clients_enhanced?.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rental.billboards_enhanced?.billboard_identifier?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rental.billboards_enhanced?.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || rental.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (rental: any) => {
    navigate(`/rentals/${rental.id}`);
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
        {isLoading ? (
          <div className="text-center py-8">Loading rentals...</div>
        ) : (
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
        )}

        {filteredRentals.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No rentals found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters</p>
          </div>
        )}

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
