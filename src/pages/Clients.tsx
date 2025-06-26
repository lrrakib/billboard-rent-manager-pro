
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Users, Plus, Search, Phone, Mail, Building } from 'lucide-react';

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Mock client data
  const clients = [
    {
      id: 1,
      companyName: "Tech Corp",
      industry: "Technology",
      contactPerson: "John Smith",
      contactEmail: "john@techcorp.com",
      contactPhone: "+1 (555) 123-4567",
      activeRentals: 2,
      totalSpent: 45000,
      joinDate: "2023-01-15"
    },
    {
      id: 2,
      companyName: "Fashion Brand",
      industry: "Retail",
      contactPerson: "Sarah Johnson",
      contactEmail: "sarah@fashionbrand.com",
      contactPhone: "+1 (555) 234-5678",
      activeRentals: 1,
      totalSpent: 28000,
      joinDate: "2023-03-22"
    },
    {
      id: 3,
      companyName: "Local Restaurant",
      industry: "Food & Beverage",
      contactPerson: "Mike Chen",
      contactEmail: "mike@restaurant.com",
      contactPhone: "+1 (555) 345-6789",
      activeRentals: 0,
      totalSpent: 12000,
      joinDate: "2023-06-10"
    },
    {
      id: 4,
      companyName: "Auto Dealership",
      industry: "Automotive",
      contactPerson: "Lisa Williams",
      contactEmail: "lisa@autodeal.com",
      contactPhone: "+1 (555) 456-7890",
      activeRentals: 3,
      totalSpent: 67000,
      joinDate: "2022-11-05"
    }
  ];

  const filteredClients = clients.filter(client =>
    client.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getIndustryColor = (industry: string) => {
    const colors = {
      'Technology': 'bg-blue-100 text-blue-800',
      'Retail': 'bg-purple-100 text-purple-800',
      'Food & Beverage': 'bg-orange-100 text-orange-800',
      'Automotive': 'bg-green-100 text-green-800',
    };
    return colors[industry as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
            <p className="text-gray-600 mt-2">Manage your client relationships and contacts</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Client
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Client</DialogTitle>
                <DialogDescription>
                  Create a new client profile
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" placeholder="Enter company name" />
                </div>
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Input id="industry" placeholder="e.g., Technology, Retail" />
                </div>
                <div>
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <Input id="contactPerson" placeholder="Enter contact person name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="contact@company.com" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+1 (555) 123-4567" />
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddDialogOpen(false)}>
                    Add Client
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Client Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <Card key={client.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{client.companyName}</CardTitle>
                    <Badge className={`mt-2 ${getIndustryColor(client.industry)}`}>
                      {client.industry}
                    </Badge>
                  </div>
                  <Building className="w-5 h-5 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Users className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-gray-600">Contact:</span>
                    <span className="ml-1 font-medium">{client.contactPerson}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Mail className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-blue-600 truncate">{client.contactEmail}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-gray-700">{client.contactPhone}</span>
                  </div>
                  
                  <div className="pt-3 border-t space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Active Rentals:</span>
                      <span className="font-semibold">{client.activeRentals}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Spent:</span>
                      <span className="font-semibold text-green-600">
                        ${client.totalSpent.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Client Since:</span>
                      <span className="text-gray-700">{client.joinDate}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Button className="w-full" variant="outline">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No clients found</h3>
            <p className="text-gray-600">Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Clients;
