
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Plus, Search, Phone, Mail, Calendar, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const LandOwners = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('owners');

  // Mock data
  const landOwners = [
    {
      id: 1,
      name: "Rahman Properties",
      contactPerson: "Abdul Rahman",
      email: "rahman@properties.com",
      phone: "+880 1712-111111",
      address: "Dhanmondi Road 27, Dhaka",
      billboards: 3,
      totalRent: 45000,
      lastPayment: "2024-05-15"
    },
    {
      id: 2,
      name: "City Land Holdings",
      contactPerson: "Nasir Ahmed",
      email: "nasir@citylands.com",
      phone: "+880 1823-222222",
      address: "Gulshan Avenue, Dhaka",
      billboards: 2,
      totalRent: 60000,
      lastPayment: "2024-06-10"
    }
  ];

  const paymentReminders = [
    {
      id: 1,
      landOwner: "Rahman Properties",
      billboard: "Dhanmondi Circle 1",
      amount: 15000,
      dueDate: "2024-06-15",
      status: "due_soon",
      paymentYear: "2024-2025"
    },
    {
      id: 2,
      landOwner: "City Land Holdings",
      billboard: "Gulshan 2 Junction",
      amount: 30000,
      dueDate: "2024-06-20",
      status: "overdue",
      paymentYear: "2023-2024"
    },
    {
      id: 3,
      landOwner: "Green Valley Estates",
      billboard: "Uttara Sector 7",
      amount: 20000,
      dueDate: "2024-07-01",
      status: "paid",
      paymentYear: "2024-2025",
      paidDate: "2024-05-28"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Paid</Badge>;
      case 'due_soon':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Due Soon</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800"><AlertTriangle className="w-3 h-3 mr-1" />Overdue</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const filteredOwners = landOwners.filter(owner =>
    owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    owner.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Land Owners</h1>
            <p className="text-gray-600 mt-2">Manage land owners and rental payments</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Land Owner
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Land Owner</DialogTitle>
                <DialogDescription>Create a new land owner profile</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="ownerName">Owner Name</Label>
                  <Input id="ownerName" placeholder="Enter owner name" />
                </div>
                <div>
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <Input id="contactPerson" placeholder="Enter contact person name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="contact@owner.com" />
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
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                  <Button onClick={() => setIsAddDialogOpen(false)}>Add Owner</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="owners">Land Owners</TabsTrigger>
            <TabsTrigger value="payments">Payment Reminders</TabsTrigger>
          </TabsList>

          <TabsContent value="owners" className="space-y-6">
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search land owners..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOwners.map((owner) => (
                <Card key={owner.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{owner.name}</CardTitle>
                        <Badge className="mt-2 bg-blue-100 text-blue-800">
                          {owner.billboards} Billboard{owner.billboards > 1 ? 's' : ''}
                        </Badge>
                      </div>
                      <MapPin className="w-5 h-5 text-gray-400" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <Phone className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-gray-700">{owner.phone}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Mail className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-blue-600 truncate">{owner.email}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-gray-700">{owner.address}</span>
                      </div>
                      
                      <div className="pt-3 border-t space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Monthly Rent:</span>
                          <span className="font-semibold text-green-600">৳{owner.totalRent.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Last Payment:</span>
                          <span className="text-gray-700">{owner.lastPayment}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <Button className="w-full" variant="outline">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Reminders & Status</CardTitle>
                <CardDescription>Track rental payments by year (June to June cycle)</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Land Owner</TableHead>
                      <TableHead>Billboard</TableHead>
                      <TableHead>Payment Year</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentReminders.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.landOwner}</TableCell>
                        <TableCell>{payment.billboard}</TableCell>
                        <TableCell>{payment.paymentYear}</TableCell>
                        <TableCell>৳{payment.amount.toLocaleString()}</TableCell>
                        <TableCell>{payment.dueDate}</TableCell>
                        <TableCell>{getStatusBadge(payment.status)}</TableCell>
                        <TableCell>
                          {payment.status !== 'paid' && (
                            <Button size="sm" variant="outline">
                              Mark as Paid
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LandOwners;
