
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calculator, TrendingUp, Users, MapPin, DollarSign, FileText, Download } from 'lucide-react';

const Reports = () => {
  const [reportType, setReportType] = useState('partnership');
  const [selectedPartner, setSelectedPartner] = useState('all');
  const [selectedBillboard, setSelectedBillboard] = useState('all');
  const [selectedClient, setSelectedClient] = useState('all');
  const [dateRange, setDateRange] = useState('current_year');

  // Mock data for partnerships, billboards, and calculations
  const partners = [
    { id: 1, name: 'Partner A', totalInvestment: 150000, billboardCount: 3 },
    { id: 2, name: 'Partner B', totalInvestment: 200000, billboardCount: 4 },
    { id: 3, name: 'Partner C', totalInvestment: 100000, billboardCount: 2 }
  ];

  const billboards = [
    { 
      id: 1, 
      location: 'Downtown Plaza', 
      totalCost: 50000, 
      partners: [
        { partnerId: 1, sharePercent: 60, investment: 30000 },
        { partnerId: 2, sharePercent: 40, investment: 20000 }
      ],
      monthlyRent: 8000,
      currentClient: 'Tech Corp',
      occupancyRate: 100
    },
    {
      id: 2,
      location: 'Airport Terminal',
      totalCost: 75000,
      partners: [
        { partnerId: 2, sharePercent: 70, investment: 52500 },
        { partnerId: 3, sharePercent: 30, investment: 22500 }
      ],
      monthlyRent: 12000,
      currentClient: 'Fashion Brand',
      occupancyRate: 100
    }
  ];

  const partnershipCalculations = partners.map(partner => {
    const partnerBillboards = billboards.filter(b => 
      b.partners.some(p => p.partnerId === partner.id)
    );
    
    const totalMonthlyRevenue = partnerBillboards.reduce((sum, billboard) => {
      const partnerShare = billboard.partners.find(p => p.partnerId === partner.id);
      return sum + (billboard.monthlyRent * (partnerShare?.sharePercent || 0) / 100);
    }, 0);

    const totalAnnualRevenue = totalMonthlyRevenue * 12;
    const profitMargin = totalAnnualRevenue - partner.totalInvestment;
    const roi = (profitMargin / partner.totalInvestment) * 100;

    return {
      ...partner,
      totalMonthlyRevenue,
      totalAnnualRevenue,
      profitMargin,
      roi,
      billboards: partnerBillboards
    };
  });

  const generateCustomReport = () => {
    console.log('Generating custom report with filters:', {
      reportType,
      selectedPartner,
      selectedBillboard,
      selectedClient,
      dateRange
    });
  };

  const calculateBillboardProfitability = (billboard: any) => {
    const annualRevenue = billboard.monthlyRent * 12;
    const totalInvestment = billboard.totalCost;
    const roi = ((annualRevenue - totalInvestment) / totalInvestment) * 100;
    return { annualRevenue, roi };
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
            <p className="text-gray-600 mt-2">Comprehensive partnership and profitability analysis</p>
          </div>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={generateCustomReport}
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Report Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calculator className="w-5 h-5 mr-2" />
              Custom Report Generator
            </CardTitle>
            <CardDescription>Configure your analysis parameters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Report Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="partnership">Partnership Analysis</SelectItem>
                  <SelectItem value="billboard">Billboard Performance</SelectItem>
                  <SelectItem value="client">Client Revenue</SelectItem>
                  <SelectItem value="profit">Profit Distribution</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedPartner} onValueChange={setSelectedPartner}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Partner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Partners</SelectItem>
                  {partners.map(partner => (
                    <SelectItem key={partner.id} value={partner.id.toString()}>
                      {partner.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedBillboard} onValueChange={setSelectedBillboard}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Billboard" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Billboards</SelectItem>
                  {billboards.map(billboard => (
                    <SelectItem key={billboard.id} value={billboard.id.toString()}>
                      {billboard.location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedClient} onValueChange={setSelectedClient}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Clients</SelectItem>
                  <SelectItem value="tech_corp">Tech Corp</SelectItem>
                  <SelectItem value="fashion_brand">Fashion Brand</SelectItem>
                </SelectContent>
              </Select>

              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current_month">Current Month</SelectItem>
                  <SelectItem value="current_year">Current Year</SelectItem>
                  <SelectItem value="last_year">Last Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Partnership Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Partnership Revenue Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={partnershipCalculations}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="totalAnnualRevenue"
                    label={({ name, value }) => `${name}: $${value.toLocaleString()}`}
                  >
                    {partnershipCalculations.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#3b82f6', '#10b981', '#f59e0b'][index % 3]} />
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
                <BarChart data={partnershipCalculations}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value.toFixed(2)}%`, 'ROI']} />
                  <Bar dataKey="roi" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Partnership Table */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Partnership Financial Details</CardTitle>
            <CardDescription>Comprehensive breakdown of investments, revenues, and profits</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Partner</TableHead>
                  <TableHead>Total Investment</TableHead>
                  <TableHead>Billboards</TableHead>
                  <TableHead>Monthly Revenue</TableHead>
                  <TableHead>Annual Revenue</TableHead>
                  <TableHead>Profit/Loss</TableHead>
                  <TableHead>ROI</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {partnershipCalculations.map((partner) => (
                  <TableRow key={partner.id}>
                    <TableCell className="font-medium">{partner.name}</TableCell>
                    <TableCell>${partner.totalInvestment.toLocaleString()}</TableCell>
                    <TableCell>{partner.billboardCount}</TableCell>
                    <TableCell>${partner.totalMonthlyRevenue.toLocaleString()}</TableCell>
                    <TableCell>${partner.totalAnnualRevenue.toLocaleString()}</TableCell>
                    <TableCell className={partner.profitMargin >= 0 ? 'text-green-600' : 'text-red-600'}>
                      ${partner.profitMargin.toLocaleString()}
                    </TableCell>
                    <TableCell className={partner.roi >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {partner.roi.toFixed(2)}%
                    </TableCell>
                    <TableCell>
                      <Badge className={partner.roi >= 20 ? 'bg-green-100 text-green-800' : 
                                     partner.roi >= 10 ? 'bg-yellow-100 text-yellow-800' : 
                                     'bg-red-100 text-red-800'}>
                        {partner.roi >= 20 ? 'Excellent' : partner.roi >= 10 ? 'Good' : 'Poor'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Billboard Performance Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Billboard Performance & Partnership Breakdown</CardTitle>
            <CardDescription>Individual billboard analysis with partnership details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {billboards.map((billboard) => {
                const { annualRevenue, roi } = calculateBillboardProfitability(billboard);
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
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Partnership Breakdown</h4>
                          <div className="space-y-2">
                            {billboard.partners.map((partner) => {
                              const partnerData = partners.find(p => p.id === partner.partnerId);
                              const monthlyShare = (billboard.monthlyRent * partner.sharePercent) / 100;
                              return (
                                <div key={partner.partnerId} className="bg-gray-50 p-2 rounded">
                                  <div className="flex justify-between items-center">
                                    <span className="font-medium">{partnerData?.name}</span>
                                    <Badge variant="outline">{partner.sharePercent}%</Badge>
                                  </div>
                                  <div className="text-xs text-gray-600 mt-1">
                                    Investment: ${partner.investment.toLocaleString()} | 
                                    Monthly: ${monthlyShare.toLocaleString()}
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
                              <span>Occupancy Rate:</span>
                              <span className="font-medium">{billboard.occupancyRate}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Annual Profit:</span>
                              <span className="font-medium text-green-600">
                                ${(annualRevenue - billboard.totalCost).toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Payback Period:</span>
                              <span className="font-medium">
                                {(billboard.totalCost / (billboard.monthlyRent * 12)).toFixed(1)} years
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
