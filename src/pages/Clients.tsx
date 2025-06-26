import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Plus, Search, Phone, Mail, Building, DollarSign, Calendar, FileText, Eye } from 'lucide-react';

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  // Enhanced mock client data with rental details
  const clients = [
    {
      id: 1,
      companyName: "Tech Corp",
      industry: "Technology",
      contactPerson: "John Smith",
      contactEmail: "john@techcorp.com",
      contactPhone: "+1 (555) 123-4567",
      billingAddress: "123 Tech Street, Silicon Valley",
      activeRentals: 2,
      totalSpent: 450000,
      joinDate: "2023-01-15",
      rentals: [
        {
          id: 1,
          billboard: "Dhanmondi Circle 1 - Digital",
          monthlyRent: 25000,
          startDate: "2024-01-01",
          endDate: "2024-12-31",
          invoiceDate: 1,
          frequency: "Monthly",
          status: "Active",
          paidThisYear: 125000,
          remainingThisYear: 175000
        },
        {
          id: 2,
          billboard: "Gulshan 2 Junction - Static",
          monthlyRent: 18000,
          startDate: "2024-03-01",
          endDate: "2025-02-28",
          invoiceDate: 15,
          frequency: "Monthly",
          status: "Active",
          paidThisYear: 72000,
          remainingThisYear: 144000
        }
      ]
    },
    {
      id: 2,
      companyName: "Fashion Brand",
      industry: "Retail",
      contactPerson: "Sarah Johnson",
      contactEmail: "sarah@fashionbrand.com",
      contactPhone: "+1 (555) 234-5678",
      billingAddress: "456 Fashion Ave, New York",
      activeRentals: 1,
      totalSpent: 280000,
      joinDate: "2023-03-22",
      rentals: [
        {
          id: 3,
          billboard: "Uttara Sector 10 - Digital",
          monthlyRent: 30000,
          startDate: "2024-02-01",
          endDate: "2024-12-31",
          invoiceDate: 5,
          frequency: "Monthly",
          status: "Active",
          paidThisYear: 150000,
          remainingThisYear: 180000
        }
      ]
    }
  ];

  const upcomingInvoices = [
    {
      clientName: "Tech Corp",
      billboard: "Dhanmondi Circle 1",
      amount: 25000,
      dueDate: "2024-07-01",
      frequency: "Monthly"
    },
    {
      clientName: "Fashion Brand",
      billboard: "Uttara Sector 10",
      amount: 30000,
      dueDate: "2024-07-05",
      frequency: "Monthly"
    },
    {
      clientName: "Auto Dealership",
      billboard: "Gulshan 2 Junction",
      amount: 18000,
      dueDate: "2024-07-15",
      frequency: "Monthly"
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

  const handleViewDetails = (client) => {
    setSelectedClient(client);
    setIsDetailDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
            <p className="text-gray-600 mt-2">Manage your client relationships and rental agreements</p>
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
                <DialogDescription>Create a new client profile</DialogDescription>
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
                <div>
                  <Label htmlFor="billingAddress">Billing Address</Label>
                  <Textarea id="billingAddress" placeholder="Enter billing address" />
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

        <Tabs defaultValue="clients" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="invoices">Upcoming Invoices</TabsTrigger>
          </TabsList>

          <TabsContent value="clients" className="space-y-6">
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
                    </div>
                    
                    <div className="pt-3 border-t space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Active Rentals:</span>
                        <span className="font-semibold">{client.activeRentals}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total Spent:</span>
                        <span className="font-semibold text-green-600">
                          ৳{client.totalSpent.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Client Since:</span>
                        <span className="text-gray-700">{client.joinDate}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <Button 
                        className="w-full" 
                        variant="outline"
                        onClick={() => handleViewDetails(client)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="invoices" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Invoice Reminders</CardTitle>
                <CardDescription>Invoices due this month - stay on top of your billing</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Billboard</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingInvoices.map((invoice, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{invoice.clientName}</TableCell>
                        <TableCell>{invoice.billboard}</TableCell>
                        <TableCell>৳{invoice.amount.toLocaleString()}</TableCell>
                        <TableCell>{invoice.dueDate}</TableCell>
                        <TableCell>{invoice.frequency}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            <FileText className="w-4 h-4 mr-2" />
                            Generate Invoice
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Client Details Dialog */}
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedClient?.companyName} - Rental Details</DialogTitle>
              <DialogDescription>Complete rental information and payment status</DialogDescription>
            </DialogHeader>
            
            {selectedClient && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Contact Information</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Contact Person:</span> {selectedClient.contactPerson}</p>
                      <p><span className="font-medium">Email:</span> {selectedClient.contactEmail}</p>
                      <p><span className="font-medium">Phone:</span> {selectedClient.contactPhone}</p>
                      <p><span className="font-medium">Address:</span> {selectedClient.billingAddress}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Summary</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Active Rentals:</span> {selectedClient.activeRentals}</p>
                      <p><span className="font-medium">Total Spent:</span> ৳{selectedClient.totalSpent.toLocaleString()}</p>
                      <p><span className="font-medium">Client Since:</span> {selectedClient.joinDate}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Current Rentals</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Billboard</TableHead>
                        <TableHead>Monthly Rent</TableHead>
                        <TableHead>Contract Period</TableHead>
                        <TableHead>Invoice Date</TableHead>
                        <TableHead>Paid This Year</TableHead>
                        <TableHead>Remaining</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedClient.rentals?.map((rental) => (
                        <TableRow key={rental.id}>
                          <TableCell className="font-medium">{rental.billboard}</TableCell>
                          <TableCell>৳{rental.monthlyRent.toLocaleString()}</TableCell>
                          <TableCell>{rental.startDate} to {rental.endDate}</TableCell>
                          <TableCell>{rental.invoiceDate} of each month</TableCell>
                          <TableCell className="text-green-600">৳{rental.paidThisYear.toLocaleString()}</TableCell>
                          <TableCell className="text-orange-600">৳{rental.remainingThisYear.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">{rental.status}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Clients;
