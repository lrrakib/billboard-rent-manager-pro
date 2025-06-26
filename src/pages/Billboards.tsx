
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Plus, Search, Edit, Calendar } from 'lucide-react';

const Billboards = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Mock billboard data
  const billboards = [
    {
      id: 1,
      location: "Downtown Plaza",
      size: "14x48 ft",
      type: "Digital",
      status: "Rented",
      currentClient: "Tech Corp",
      rentAmount: "$2,500/month",
      imageUrl: "/api/placeholder/300/200",
      installationCost: 15000,
      installationDate: "2023-01-15"
    },
    {
      id: 2,
      location: "Highway Exit 12",
      size: "14x48 ft",
      type: "Static",
      status: "Available",
      currentClient: null,
      rentAmount: "$1,800/month",
      imageUrl: "/api/placeholder/300/200",
      installationCost: 12000,
      installationDate: "2023-03-22"
    },
    {
      id: 3,
      location: "Shopping Mall Entrance",
      size: "10x20 ft",
      type: "Digital",
      status: "Maintenance",
      currentClient: null,
      rentAmount: "$1,200/month",
      imageUrl: "/api/placeholder/300/200",
      installationCost: 8000,
      installationDate: "2023-05-10"
    },
    {
      id: 4,
      location: "Airport Terminal",
      size: "20x60 ft",
      type: "Digital",
      status: "Rented",
      currentClient: "Fashion Brand",
      rentAmount: "$4,000/month",
      imageUrl: "/api/placeholder/300/200",
      installationCost: 25000,
      installationDate: "2023-02-28"
    }
  ];

  const filteredBillboards = billboards.filter(billboard => {
    const matchesSearch = billboard.location.toLowerCase().includes(searchTerm.toLowerCase());
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Billboards</h1>
            <p className="text-gray-600 mt-2">Manage your billboard inventory and availability</p>
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
                  Create a new billboard entry in your inventory
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
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
                    <Label htmlFor="type">Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="digital">Digital</SelectItem>
                        <SelectItem value="static">Static</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="cost">Installation Cost</Label>
                  <Input id="cost" type="number" placeholder="Enter cost in USD" />
                </div>
                <div>
                  <Label htmlFor="date">Installation Date</Label>
                  <Input id="date" type="date" />
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
              placeholder="Search billboards by location..."
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
                  src={billboard.imageUrl} 
                  alt={billboard.location}
                  className="w-full h-full object-cover"
                />
                <Badge className={`absolute top-2 right-2 ${getStatusColor(billboard.status)}`}>
                  {billboard.status}
                </Badge>
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
                    {billboard.size} • {billboard.type}
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Rent Amount:</span>
                    <span className="font-semibold text-green-600">{billboard.rentAmount}</span>
                  </div>
                  {billboard.currentClient && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Current Client:</span>
                      <span className="font-medium">{billboard.currentClient}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Installation Cost:</span>
                    <span className="font-medium">${billboard.installationCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Installed:</span>
                    <div className="flex items-center text-sm">
                      <Calendar className="w-3 h-3 mr-1" />
                      {billboard.installationDate}
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Button 
                    className="w-full" 
                    variant={billboard.status === 'Available' ? 'default' : 'outline'}
                  >
                    {billboard.status === 'Available' ? 'Rent Out' : 'View Details'}
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
      </div>
    </div>
  );
};

export default Billboards;
