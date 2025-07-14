import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import BillboardDetails from '@/components/BillboardDetails';
import RentalManagementModal from '@/components/RentalManagementModal';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { MapPin, Plus, Search, Edit, Calendar, DollarSign, TrendingUp, FileImage } from 'lucide-react';

const Billboards = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedBillboard, setSelectedBillboard] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isRentalModalOpen, setIsRentalModalOpen] = useState(false);

  // Fetch billboards from database
  const { data: billboards = [], isLoading, refetch } = useQuery({
    queryKey: ['billboards'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('billboards_enhanced')
        .select(`
          *,
          land_owners!billboards_enhanced_land_owner_id_fkey(name),
          billboard_rentals!billboard_rentals_billboard_id_fkey(
            id,
            status,
            rental_amount,
            clients_enhanced!billboard_rentals_client_id_fkey(company_name)
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });


  const filteredBillboards = billboards.filter(billboard => {
    const matchesSearch = billboard.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         billboard.billboard_identifier?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || billboard.status?.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Rented': return 'bg-green-100 text-green-800';
      case 'Available': return 'bg-blue-100 text-blue-800';
      case 'Maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Billboard': return 'bg-purple-100 text-purple-800';
      case 'Unipole': return 'bg-orange-100 text-orange-800';
      case 'Neon Sign Only': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewDetails = (billboard: any) => {
    navigate(`/billboards/${billboard.id}`);
  };

  const handleEditBillboard = (billboard: any) => {
    // TODO: Implement edit functionality
    console.log('Edit billboard:', billboard);
  };

  const handleViewInstallation = (billboard: any) => {
    navigate(`/billboards/${billboard.id}`);
  };

  const handleManageRental = (billboard: any) => {
    setSelectedBillboard(billboard);
    setIsRentalModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Billboards</h1>
            <p className="text-gray-600 mt-2">Manage your billboard inventory, installation costs & profit analysis</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Billboard
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Billboard</DialogTitle>
                <DialogDescription>
                  Create a new billboard entry with installation tracking
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="billboardId">Billboard ID</Label>
                  <Input id="billboardId" placeholder="e.g., BB-005, UP-006, NS-007" />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Enter billboard location" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="size">Size</Label>
                    <Input id="size" placeholder="e.g., 14x48 ft" />
                  </div>
                  <div>
                    <Label htmlFor="totalSft">Total SFT</Label>
                    <Input id="totalSft" type="number" placeholder="672" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="type">Billboard Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Billboard">Billboard</SelectItem>
                      <SelectItem value="Unipole">Unipole</SelectItem>
                      <SelectItem value="Neon Sign Only">Neon Sign Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="landOwner">Land Owner</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select land owner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="owner1">Owner 1</SelectItem>
                      <SelectItem value="owner2">Owner 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="agreementStart">Agreement Start Date</Label>
                    <Input id="agreementStart" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="agreementEnd">Agreement End Date</Label>
                    <Input id="agreementEnd" type="date" />
                  </div>
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddDialogOpen(false)}>
                    Add Billboard
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search billboards by location or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="rented">Rented</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Billboard Grid */}
        {isLoading ? (
          <div className="text-center py-8">Loading billboards...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBillboards.map((billboard) => {
              const currentRental = billboard.billboard_rentals?.[0];
              const currentClient = currentRental?.clients_enhanced?.company_name;
              return (
              <Card key={billboard.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <div className="aspect-video bg-gray-200 relative">
                  {billboard.image_urls && billboard.image_urls[0] ? (
                    <img 
                      src={billboard.image_urls[0]} 
                      alt={billboard.location}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <FileImage className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute top-2 left-2 flex gap-2">
                    <Badge className={getStatusColor(billboard.status)}>
                      {billboard.status}
                    </Badge>
                    <Badge className={getTypeColor(billboard.type)}>
                      {billboard.type}
                    </Badge>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Badge variant="outline" className="bg-white">
                      {billboard.billboard_identifier}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{billboard.location}</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => handleEditBillboard(billboard)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                  <CardDescription>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      {billboard.size} • {billboard.total_sft} sq ft
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Monthly Rent:</span>
                      <span className="font-semibold text-green-600">৳{billboard.rent_amount?.toLocaleString() || 'Not set'}</span>
                    </div>
                    {currentClient && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Current Client:</span>
                        <span className="font-medium">{currentClient}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Installation Cost:</span>
                      <span className="font-medium text-red-600">৳{billboard.total_installation_cost?.toLocaleString() || '0'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Land Owner:</span>
                      <span className="text-sm">{billboard.land_owners?.name || 'Not assigned'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Installed:</span>
                      <div className="flex items-center text-sm">
                        <Calendar className="w-3 h-3 mr-1" />
                        {billboard.installation_date || 'Not set'}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t space-y-2">
                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={() => handleViewDetails(billboard)}
                    >
                      View Details
                    </Button>
                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={() => handleViewInstallation(billboard)}
                    >
                      <TrendingUp className="w-4 h-4 mr-2" />
                      View Installation Details
                    </Button>
                    <Button 
                      className="w-full" 
                      variant={billboard.status === 'Available' ? 'default' : 'outline'}
                      onClick={() => handleManageRental(billboard)}
                    >
                      {billboard.status === 'Available' ? 'Rent Out' : 'Manage Rental'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
            })}
          </div>
        )}

        {filteredBillboards.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No billboards found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters</p>
          </div>
        )}

        {/* Modals */}
        {selectedBillboard && (
          <>
            <BillboardDetails
              billboard={selectedBillboard}
              isOpen={isDetailsOpen}
              onClose={() => setIsDetailsOpen(false)}
            />
            <RentalManagementModal
              billboard={selectedBillboard}
              isOpen={isRentalModalOpen}
              onClose={() => setIsRentalModalOpen(false)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Billboards;
