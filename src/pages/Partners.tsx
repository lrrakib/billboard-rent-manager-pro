import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Users, Plus, Search, Phone, Mail, MapPin, DollarSign } from 'lucide-react';
import PartnerInvestmentDetails from '@/components/PartnerInvestmentDetails';
import AddInvestmentModal from '@/components/AddInvestmentModal';

const Partners = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [isInvestmentDetailsOpen, setIsInvestmentDetailsOpen] = useState(false);
  const [isAddInvestmentOpen, setIsAddInvestmentOpen] = useState(false);

  // Mock data - this will come from Supabase
  const partners = [
    {
      id: 1,
      name: "Investment Partners Ltd",
      contactPerson: "Ahmed Rahman",
      email: "ahmed@investment.com",
      phone: "+880 1712-345678",
      address: "Dhanmondi, Dhaka",
      totalInvestment: 2500000,
      activeBillboards: 5,
      joinDate: "2023-01-15"
    },
    {
      id: 2,
      name: "Digital Media Solutions",
      contactPerson: "Fatima Khan",
      email: "fatima@digitalmedia.com",
      phone: "+880 1823-456789",
      address: "Gulshan, Dhaka",
      totalInvestment: 1800000,
      activeBillboards: 3,
      joinDate: "2023-06-10"
    }
  ];

  const filteredPartners = partners.filter(partner =>
    partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partner.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewInvestmentDetails = (partner: any) => {
    setSelectedPartner(partner);
    setIsInvestmentDetailsOpen(true);
  };

  const handleAddInvestment = (partner: any) => {
    setSelectedPartner(partner);
    setIsAddInvestmentOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Partners</h1>
            <p className="text-gray-600 mt-2">Manage your business partners and their investments</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Partner
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Partner</DialogTitle>
                <DialogDescription>Create a new business partner profile</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="partnerName">Partner Name</Label>
                  <Input id="partnerName" placeholder="Enter partner name" />
                </div>
                <div>
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <Input id="contactPerson" placeholder="Enter contact person name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="contact@partner.com" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+880 1712-345678" />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" placeholder="Enter full address" />
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddDialogOpen(false)}>
                    Add Partner
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search partners..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPartners.map((partner) => (
            <Card key={partner.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{partner.name}</CardTitle>
                    <Badge className="mt-2 bg-green-100 text-green-800">
                      Active Partner
                    </Badge>
                  </div>
                  <Users className="w-5 h-5 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Users className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-gray-600">Contact:</span>
                    <span className="ml-1 font-medium">{partner.contactPerson}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Mail className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-blue-600 truncate">{partner.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-gray-700">{partner.phone}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-gray-700">{partner.address}</span>
                  </div>
                  
                  <div className="pt-3 border-t space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Investment:</span>
                      <span className="font-semibold text-green-600">
                        ৳{partner.totalInvestment.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Active Billboards:</span>
                      <span className="font-semibold">{partner.activeBillboards}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Partner Since:</span>
                      <span className="text-gray-700">{partner.joinDate}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t space-y-2">
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => handleViewInvestmentDetails(partner)}
                  >
                    View Investment Details
                  </Button>
                  <Button 
                    className="w-full" 
                    size="sm"
                    onClick={() => handleAddInvestment(partner)}
                  >
                    <DollarSign className="w-4 h-4 mr-2" />
                    Add Investment
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <PartnerInvestmentDetails
          partner={selectedPartner}
          isOpen={isInvestmentDetailsOpen}
          onClose={() => setIsInvestmentDetailsOpen(false)}
          onAddInvestment={() => {
            setIsInvestmentDetailsOpen(false);
            setIsAddInvestmentOpen(true);
          }}
        />

        <AddInvestmentModal
          partner={selectedPartner}
          isOpen={isAddInvestmentOpen}
          onClose={() => setIsAddInvestmentOpen(false)}
        />
      </div>
    </div>
  );
};

export default Partners;
