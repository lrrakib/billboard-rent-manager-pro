
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Calculator, TrendingUp, Users, MapPin, DollarSign, FileText, Download, Filter, Plus, Minus } from 'lucide-react';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('partnership');
  const [selectedPartners, setSelectedPartners] = useState<string[]>([]);
  const [selectedBillboards, setSelectedBillboards] = useState<string[]>([]);
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState('current_year');
  const [availableClients, setAvailableClients] = useState<any[]>([]);

  // Mock data for partnerships, billboards, and clients
  const partners = [
    { id: '1', name: 'Partner A', totalInvestment: 150000, billboardCount: 3 },
    { id: '2', name: 'Partner B', totalInvestment: 200000, billboardCount: 4 },
    { id: '3', name: 'Partner C', totalInvestment: 100000, billboardCount: 2 }
  ];

  const billboards = [
    { 
      id: '1', 
      location: 'Downtown Plaza', 
      totalCost: 50000, 
      partners: [
        { partnerId: '1', sharePercent: 60, investment: 30000 },
        { partnerId: '2', sharePercent: 40, investment: 20000 }
      ],
      monthlyRent: 8000,
      currentClient: 'Tech Corp',
      occupancyRate: 100,
      profitReinvestment: 5000
    },
    {
      id: '2',
      location: 'Airport Terminal',
      totalCost: 75000,
      partners: [
        { partnerId: '2', sharePercent: 70, investment: 52500 },
        { partnerId: '3', sharePercent: 30, investment: 22500 }
      ],
      monthlyRent: 12000,
      currentClient: 'Fashion Brand',
      occupancyRate: 100,
      profitReinvestment: 8000
    },
    {
      id: '3',
      location: 'Shopping Mall',
      totalCost: 60000,
      partners: [
        { partnerId: '1', sharePercent: 50, investment: 30000 },
        { partnerId: '3', sharePercent: 50, investment: 30000 }
      ],
      monthlyRent: 10000,
      currentClient: 'Auto Dealership',
      occupancyRate: 100,
      profitReinvestment: 6000
    }
  ];

  const clients = [
    { id: '1', name: 'Tech Corp', industry: 'Technology', billboardIds: ['1'], monthlyPayment: 8000, installmentsPaid: 8, totalInstallments: 12 },
    { id: '2', name: 'Fashion Brand', industry: 'Fashion', billboardIds: ['2'], monthlyPayment: 12000, installmentsPaid: 6, totalInstallments: 12 },
    { id: '3', name: 'Auto Dealership', industry: 'Automotive', billboardIds: ['3'], monthlyPayment: 10000, installmentsPaid: 10, totalInstallments: 12 }
  ];

  // Filter clients based on selected partners and billboards
  const filterAvailableClients = () => {
    let filteredClients = [...clients];

    if (selectedPartners.length > 0 || selectedBillboards.length > 0) {
      const relevantBillboards = billboards.filter(billboard => {
        const hasSelectedPartner = selectedPartners.length === 0 || 
          billboard.partners.some(p => selectedPartners.includes(p.partnerId));
        const isSelectedBillboard = selectedBillboards.length === 0 || 
          selectedBillboards.includes(billboard.id);
        return hasSelectedPartner && isSelectedBillboard;
      });

      const relevantBillboardIds = relevantBillboards.map(b => b.id);
      filteredClients = clients.filter(client => 
        client.billboardIds.some(id => relevantBillboardIds.includes(id))
      );
    }

    setAvailableClients(filteredClients);
  };

  React.useEffect(() => {
    filterAvailableClients();
  }, [selectedPartners, selectedBillboards]);

  const handlePartnerToggle = (partnerId: string) => {
    setSelectedPartners(prev => 
      prev.includes(partnerId) 
        ? prev.filter(id => id !== partnerId)
        : [...prev, partnerId]
    );
  };

  const handleBillboardToggle = (billboardId: string) => {
    setSelectedBillboards(prev => 
      prev.includes(billboardId) 
        ? prev.filter(id => id !== billboardId)
        : [...prev, billboardId]
    );
  };

  const handleClientToggle = (clientId: string) => {
    setSelectedClients(prev => 
      prev.includes(clientId) 
        ? prev.filter(id => id !== clientId)
        : [...prev, clientId]
    );
  };

  const generateCustomReport = () => {
    const reportData = {
      selectedPartners,
      selectedBillboards,
      selectedClients,
      dateRange,
      timestamp: new Date().toISOString()
    };
    
    console.log('Generating PDF report with data:', reportData);
    // Here you would integrate with a PDF generation library
  };

  const calculatePartnershipAnalysis = () => {
    const filteredPartners = selectedPartners.length > 0 
      ? partners.filter(p => selectedPartners.includes(p.id))
      : partners;

    const filteredBillboards = selectedBillboards.length > 0
      ? billboards.filter(b => selectedBillboards.includes(b.id))
      : billboards;

    return filteredPartners.map(partner => {
      const partnerBillboards = filteredBillboards.filter(b => 
        b.partners.some(p => p.partnerId === partner.id)
      );
      
      const totalMonthlyRevenue = partnerBillboards.reduce((sum, billboard) => {
        const partnerShare = billboard.partners.find(p => p.partnerId === partner.id);
        return sum + (billboard.monthlyRent * (partnerShare?.sharePercent || 0) / 100);
      }, 0);

      const totalAnnualRevenue = totalMonthlyRevenue * 12;
      const totalInvestment = partnerBillboards.reduce((sum, billboard) => {
        const partnerShare = billboard.partners.find(p => p.partnerId === partner.id);
        return sum + (partnerShare?.investment || 0);
      }, 0);

      const profitReinvestmentShare = partnerBillboards.reduce((sum, billboard) => {
        const partnerShare = billboard.partners.find(p => p.partnerId === partner.id);
        return sum + (billboard.profitReinvestment * (partnerShare?.sharePercent || 0) / 100);
      }, 0);

      const netProfit = totalAnnualRevenue - totalInvestment + profitReinvestmentShare;
      const roi = totalInvestment > 0 ? (netProfit / totalInvestment) * 100 : 0;

      return {
        ...partner,
        totalMonthlyRevenue,
        totalAnnualRevenue,
        totalInvestment,
        profitReinvestmentShare,
        netProfit,
        roi,
        billboards: partnerBillboards
      };
    });
  };

  const partnershipData = calculatePartnershipAnalysis();

  // Custom tooltip formatter that handles the type issue
  const customTooltipFormatter = (value: any, name: string) => {
    if (typeof value === 'number') {
      return [value.toFixed(2) + '%', name];
    }
    return [value, name];
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Advanced Analytics & Reports</h1>
            <p className="text-gray-600 mt-2">Comprehensive partnership and profitability analysis with custom reporting</p>
          </div>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={generateCustomReport}
          >
            <Download className="w-4 h-4 mr-2" />
            Generate PDF Report
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="partnership">Partnership Analysis</TabsTrigger>
            <TabsTrigger value="billboard">Billboard Performance</TabsTrigger>
            <TabsTrigger value="client">Client Analytics</TabsTrigger>
            <TabsTrigger value="custom">Custom Reports</TabsTrigger>
          </TabsList>

          {/* Partnership Analysis Tab */}
          <TabsContent value="partnership" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Select Partners for Analysis
                </CardTitle>
                <CardDescription>Choose multiple partners to analyze their performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {partners.map(partner => (
                    <div key={partner.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                      <Checkbox
                        id={`partner-${partner.id}`}
                        checked={selectedPartners.includes(partner.id)}
                        onCheckedChange={() => handlePartnerToggle(partner.id)}
                      />
                      <label htmlFor={`partner-${partner.id}`} className="flex-1 cursor-pointer">
                        <div className="font-medium">{partner.name}</div>
                        <div className="text-sm text-gray-500">Investment: ${partner.totalInvestment.toLocaleString()}</div>
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {partnershipData.length > 0 && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Partnership Revenue Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={partnershipData}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="totalAnnualRevenue"
                            label={({ name, value }) => `${name}: $${value.toLocaleString()}`}
                          >
                            {partnershipData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={['#3b82f6', '#10b981', '#f59e0b', '#ef4444'][index % 4]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>ROI Comparison</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={partnershipData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip formatter={customTooltipFormatter} />
                          <Bar dataKey="roi" fill="#10b981" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Partnership Financial Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Partner</TableHead>
                          <TableHead>Investment</TableHead>
                          <TableHead>Monthly Revenue</TableHead>
                          <TableHead>Annual Revenue</TableHead>
                          <TableHead>Reinvestment</TableHead>
                          <TableHead>Net Profit</TableHead>
                          <TableHead>ROI</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {partnershipData.map((partner) => (
                          <TableRow key={partner.id}>
                            <TableCell className="font-medium">{partner.name}</TableCell>
                            <TableCell>${partner.totalInvestment.toLocaleString()}</TableCell>
                            <TableCell>${partner.totalMonthlyRevenue.toLocaleString()}</TableCell>
                            <TableCell>${partner.totalAnnualRevenue.toLocaleString()}</TableCell>
                            <TableCell className="text-green-600">${partner.profitReinvestmentShare.toLocaleString()}</TableCell>
                            <TableCell className={partner.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}>
                              ${partner.netProfit.toLocaleString()}
                            </TableCell>
                            <TableCell className={partner.roi >= 0 ? 'text-green-600' : 'text-red-600'}>
                              {partner.roi.toFixed(2)}%
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          {/* Billboard Performance Tab */}
          <TabsContent value="billboard" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Select Billboards for Analysis
                </CardTitle>
                <CardDescription>Choose multiple billboards to analyze their performance and profit reinvestment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {billboards.map(billboard => (
                    <div key={billboard.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                      <Checkbox
                        id={`billboard-${billboard.id}`}
                        checked={selectedBillboards.includes(billboard.id)}
                        onCheckedChange={() => handleBillboardToggle(billboard.id)}
                      />
                      <label htmlFor={`billboard-${billboard.id}`} className="flex-1 cursor-pointer">
                        <div className="font-medium">{billboard.location}</div>
                        <div className="text-sm text-gray-500">
                          Monthly Rent: ${billboard.monthlyRent.toLocaleString()} | 
                          Reinvestment: ${billboard.profitReinvestment.toLocaleString()}
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {selectedBillboards.length > 0 && (
              <div className="space-y-6">
                {billboards
                  .filter(billboard => selectedBillboards.includes(billboard.id))
                  .map(billboard => {
                    const annualRevenue = billboard.monthlyRent * 12;
                    const roi = ((annualRevenue - billboard.totalCost) / billboard.totalCost) * 100;
                    return (
                      <Card key={billboard.id} className="border-l-4 border-l-blue-500">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">{billboard.location}</CardTitle>
                              <CardDescription>Client: {billboard.currentClient}</CardDescription>
                            </div>
                            <Badge className="bg-green-100 text-green-800">
                              ROI: {roi.toFixed(1)}%
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div>
                              <h4 className="font-semibold mb-2">Financial Overview</h4>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span>Total Investment:</span>
                                  <span className="font-medium">${billboard.totalCost.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Monthly Rent:</span>
                                  <span className="font-medium">${billboard.monthlyRent.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Annual Revenue:</span>
                                  <span className="font-medium text-green-600">${annualRevenue.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Profit Reinvestment:</span>
                                  <span className="font-medium text-blue-600">${billboard.profitReinvestment.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>

                            <div className="md:col-span-2">
                              <h4 className="font-semibold mb-2">Partnership Breakdown</h4>
                              <div className="space-y-2">
                                {billboard.partners.map((partner) => {
                                  const partnerData = partners.find(p => p.id === partner.partnerId);
                                  const monthlyShare = (billboard.monthlyRent * partner.sharePercent) / 100;
                                  const reinvestmentShare = (billboard.profitReinvestment * partner.sharePercent) / 100;
                                  return (
                                    <div key={partner.partnerId} className="bg-gray-50 p-2 rounded">
                                      <div className="flex justify-between items-center">
                                        <span className="font-medium">{partnerData?.name}</span>
                                        <Badge variant="outline">{partner.sharePercent}%</Badge>
                                      </div>
                                      <div className="text-xs text-gray-600 mt-1">
                                        Investment: ${partner.investment.toLocaleString()} | 
                                        Monthly: ${monthlyShare.toLocaleString()} | 
                                        Reinvestment: ${reinvestmentShare.toLocaleString()}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-2">Performance Metrics</h4>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span>Occupancy:</span>
                                  <span className="font-medium">{billboard.occupancyRate}%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Annual Profit:</span>
                                  <span className="font-medium text-green-600">
                                    ${(annualRevenue - billboard.totalCost).toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span>With Reinvestment:</span>
                                  <span className="font-medium text-blue-600">
                                    ${(annualRevenue - billboard.totalCost + billboard.profitReinvestment).toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
              </div>
            )}
          </TabsContent>

          {/* Client Analytics Tab */}
          <TabsContent value="client" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Client Analysis (Filtered by Partners & Billboards)
                </CardTitle>
                <CardDescription>
                  {selectedPartners.length > 0 || selectedBillboards.length > 0 
                    ? `Showing clients filtered by selected partners and billboards (${availableClients.length} clients)`
                    : 'Select partners or billboards to filter clients, or view all clients'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {availableClients.map(client => (
                    <div key={client.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                      <Checkbox
                        id={`client-${client.id}`}
                        checked={selectedClients.includes(client.id)}
                        onCheckedChange={() => handleClientToggle(client.id)}
                      />
                      <label htmlFor={`client-${client.id}`} className="flex-1 cursor-pointer">
                        <div className="font-medium">{client.name}</div>
                        <div className="text-sm text-gray-500">
                          Industry: {client.industry} | Payment: ${client.monthlyPayment.toLocaleString()}/month
                        </div>
                        <div className="text-xs text-gray-400">
                          Installments: {client.installmentsPaid}/{client.totalInstallments} paid
                        </div>
                      </label>
                    </div>
                  ))}
                </div>

                {selectedClients.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Selected Clients Payment Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Client</TableHead>
                            <TableHead>Industry</TableHead>
                            <TableHead>Monthly Payment</TableHead>
                            <TableHead>Installments Paid</TableHead>
                            <TableHead>Total Contract Value</TableHead>
                            <TableHead>Amount Paid</TableHead>
                            <TableHead>Outstanding</TableHead>
                            <TableHead>Payment Progress</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {availableClients
                            .filter(client => selectedClients.includes(client.id))
                            .map(client => {
                              const totalContract = client.monthlyPayment * client.totalInstallments;
                              const amountPaid = client.monthlyPayment * client.installmentsPaid;
                              const outstanding = totalContract - amountPaid;
                              const progress = (client.installmentsPaid / client.totalInstallments) * 100;
                              
                              return (
                                <TableRow key={client.id}>
                                  <TableCell className="font-medium">{client.name}</TableCell>
                                  <TableCell>{client.industry}</TableCell>
                                  <TableCell>${client.monthlyPayment.toLocaleString()}</TableCell>
                                  <TableCell>{client.installmentsPaid}/{client.totalInstallments}</TableCell>
                                  <TableCell>${totalContract.toLocaleString()}</TableCell>
                                  <TableCell className="text-green-600">${amountPaid.toLocaleString()}</TableCell>
                                  <TableCell className={outstanding > 0 ? 'text-red-600' : 'text-green-600'}>
                                    ${outstanding.toLocaleString()}
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex items-center space-x-2">
                                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                                        <div 
                                          className="bg-blue-600 h-2 rounded-full" 
                                          style={{ width: `${progress}%` }}
                                        ></div>
                                      </div>
                                      <span className="text-sm">{progress.toFixed(0)}%</span>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Custom Reports Tab */}
          <TabsContent value="custom" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Custom Report Builder
                </CardTitle>
                <CardDescription>Build comprehensive reports with multiple criteria</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Select value={dateRange} onValueChange={setDateRange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Date Range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="current_month">Current Month</SelectItem>
                        <SelectItem value="current_year">Current Year</SelectItem>
                        <SelectItem value="last_year">Last Year</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={generateCustomReport}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Generate Comprehensive PDF Report
                    </Button>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Report Summary</h4>
                    <div className="text-sm space-y-1">
                      <div>Selected Partners: {selectedPartners.length > 0 ? selectedPartners.length : 'All'}</div>
                      <div>Selected Billboards: {selectedBillboards.length > 0 ? selectedBillboards.length : 'All'}</div>
                      <div>Selected Clients: {selectedClients.length > 0 ? selectedClients.length : 'All Available'}</div>
                      <div>Date Range: {dateRange.replace('_', ' ').toUpperCase()}</div>
                    </div>
                  </div>

                  {(selectedPartners.length > 0 || selectedBillboards.length > 0) && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Profit Flow Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={partnershipData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Line type="monotone" dataKey="totalAnnualRevenue" stroke="#3b82f6" strokeWidth={2} />
                              <Line type="monotone" dataKey="profitReinvestmentShare" stroke="#10b981" strokeWidth={2} />
                            </LineChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Investment vs Returns</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {partnershipData.map(partner => (
                              <div key={partner.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                <span className="font-medium">{partner.name}</span>
                                <div className="text-right">
                                  <div className="text-sm text-gray-600">
                                    ROI: {partner.roi.toFixed(1)}%
                                  </div>
                                  <div className="text-xs text-green-600">
                                    +${partner.profitReinvestmentShare.toLocaleString()} reinvestment
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Reports;
