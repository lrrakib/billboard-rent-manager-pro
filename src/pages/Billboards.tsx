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
import { MapPin, Plus, Search, Edit, Calendar, DollarSign, TrendingUp, FileImage } from 'lucide-react';

const Billboards = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedBillboard, setSelectedBillboard] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isRentalModalOpen, setIsRentalModalOpen] = useState(false);

  // Enhanced mock billboard data with new fields
  const billboards = [
    {
      id: 1,
      billboard_identifier: "BB-001",
      location: "Downtown Plaza",
      size: "14x48 ft",
      total_sft: 672,
      type: "Billboard",
      status: "Rented",
      currentClient: "Tech Corp",
      rentAmount: 600000,
      imageUrls: ["/api/placeholder/300/200"],
      total_installation_cost: 450000,
      installationDate: "2023-01-15",
      yearlyProfit: 150000
    },
    {
      id: 2,
      billboard_identifier: "UP-002",
      location: "Highway Exit 12",
      size: "14x48 ft",
      total_sft: 672,
      type: "Unipole",
      status: "Available",
      currentClient: null,
      rentAmount: 480000,
      imageUrls: ["/api/placeholder/300/200"],
      total_installation_cost: 380000,
      installationDate: "2023-03-22",
      yearlyProfit: 100000
    },
    {
      id: 3,
      billboard_identifier: "NS-003",
      location: "Shopping Mall Entrance",
      size: "10x20 ft",
      total_sft: 200,
      type: "Neon Sign Only",
      status: "Maintenance",
      currentClient: null,
      rentAmount: 360000,
      imageUrls: ["/api/placeholder/300/200"],
      total_installation_cost: 280000,
      installationDate: "2023-05-10",
      yearlyProfit: 80000
    },
    {
      id: 4,
      billboard_identifier: "BB-004",
      location: "Airport Terminal",
      size: "20x60 ft",
      total_sft: 1200,
      type: "Billboard",
      status: "Rented",
      currentClient: "Fashion Brand",
      rentAmount: 800000,
      imageUrls: ["/api/placeholder/300/200"],
      total_installation_cost: 600000,
      installationDate: "2023-02-28",
      yearlyProfit: 200000
    }
  ];

  const filteredBillboards = billboards.filter(billboard => {
    const matchesSearch = billboard.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         billboard.billboard_identifier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || billboard.status.toLowerCase() === statusFilter.toLowerCase();
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
    setSelectedBillboard(billboard);
    setIsDetailsOpen(true);
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
                <div>
                  <Label htmlFor="rentAmount">Expected Yearly Rent (৳)</Label>
                  <Input id="rentAmount" type="number" placeholder="600000" />
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBillboards.map((billboard) => (
            <Card key={billboard.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <div className="aspect-video bg-gray-200 relative">
                <img 
                  src={billboard.imageUrls[0]} 
                  alt={billboard.location}
                  className="w-full h-full object-cover"
                />
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
                  <Button variant="ghost" size="sm">
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
                    <span className="text-sm text-gray-600">Yearly Rent:</span>
                    <span className="font-semibold text-green-600">৳{billboard.rentAmount?.toLocaleString()}</span>
                  </div>
                  {billboard.currentClient && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Current Client:</span>
                      <span className="font-medium">{billboard.currentClient}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Installation Cost:</span>
                    <span className="font-medium text-red-600">৳{billboard.total_installation_cost?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Yearly Profit:</span>
                    <span className={`font-semibold ${billboard.yearlyProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ৳{billboard.yearlyProfit?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Installed:</span>
                    <div className="flex items-center text-sm">
                      <Calendar className="w-3 h-3 mr-1" />
                      {billboard.installationDate}
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t space-y-2">
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => handleViewDetails(billboard)}
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
          ))}
        </div>

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
