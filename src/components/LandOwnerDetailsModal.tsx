
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Calendar, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  FileText,
  Wrench,
  Eye
} from 'lucide-react';

interface LandOwnerDetailsModalProps {
  landOwner: any;
  isOpen: boolean;
  onClose: () => void;
}

const LandOwnerDetailsModal: React.FC<LandOwnerDetailsModalProps> = ({ landOwner, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('payments');

  // Mock payment history
  const paymentHistory = [
    {
      id: 1,
      billboardLocation: "Dhanmondi Circle 1",
      amount: 15000,
      paymentDate: "2024-05-15",
      paymentYear: "2024-2025",
      method: "Bank Transfer",
      status: "paid"
    },
    {
      id: 2,
      billboardLocation: "Dhanmondi Road 27",
      amount: 18000,
      paymentDate: "2023-06-10",
      paymentYear: "2023-2024",
      method: "Cash",
      status: "paid"
    },
    {
      id: 3,
      billboardLocation: "Dhanmondi Circle 1",
      amount: 15000,
      dueDate: "2024-06-15",
      paymentYear: "2023-2024",
      status: "overdue"
    }
  ];

  // Mock issues/maintenance log
  const issuesLog = [
    {
      id: 1,
      billboardLocation: "Dhanmondi Circle 1",
      issueType: "Display Off",
      description: "Billboard display stopped working after storm",
      reportedDate: "2024-05-20",
      status: "resolved",
      resolutionDate: "2024-05-22",
      cost: 5000,
      notifiedClient: true
    },
    {
      id: 2,
      billboardLocation: "Dhanmondi Road 27",
      issueType: "Structural Damage",
      description: "Billboard frame damaged due to high wind",
      reportedDate: "2024-04-15",
      status: "in_progress",
      cost: 12000,
      notifiedClient: true
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Paid</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800"><AlertTriangle className="w-3 h-3 mr-1" />Overdue</Badge>;
      case 'due_soon':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Due Soon</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getIssueStatusBadge = (status: string) => {
    switch (status) {
      case 'resolved':
        return <Badge className="bg-green-100 text-green-800">Resolved</Badge>;
      case 'in_progress':
        return <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>;
      case 'reported':
        return <Badge className="bg-red-100 text-red-800">Reported</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            {landOwner?.name} - Details
          </DialogTitle>
          <DialogDescription>
            Complete payment history and billboard maintenance tracking
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="payments">Payment History</TabsTrigger>
            <TabsTrigger value="issues">Issues & Maintenance</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
          </TabsList>

          <TabsContent value="payments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Payment Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Billboard Location</TableHead>
                      <TableHead>Payment Year</TableHead>
                      <TableHead>Amount (৳)</TableHead>
                      <TableHead>Payment Date</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentHistory.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.billboardLocation}</TableCell>
                        <TableCell>{payment.paymentYear}</TableCell>
                        <TableCell>৳{payment.amount?.toLocaleString()}</TableCell>
                        <TableCell>
                          {payment.paymentDate || (
                            <span className="text-red-600">Due: {payment.dueDate}</span>
                          )}
                        </TableCell>
                        <TableCell>{payment.method || 'N/A'}</TableCell>
                        <TableCell>{getStatusBadge(payment.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="issues" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="w-5 h-5" />
                  Billboard Issues & Maintenance Log
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Billboard</TableHead>
                      <TableHead>Issue Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Reported Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Cost (৳)</TableHead>
                      <TableHead>Client Notified</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {issuesLog.map((issue) => (
                      <TableRow key={issue.id}>
                        <TableCell className="font-medium">{issue.billboardLocation}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{issue.issueType}</Badge>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <div className="truncate" title={issue.description}>
                            {issue.description}
                          </div>
                        </TableCell>
                        <TableCell>{issue.reportedDate}</TableCell>
                        <TableCell>{getIssueStatusBadge(issue.status)}</TableCell>
                        <TableCell>
                          {issue.cost ? `৳${issue.cost.toLocaleString()}` : 'N/A'}
                        </TableCell>
                        <TableCell>
                          {issue.notifiedClient ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 text-red-600" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="summary" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Total Paid This Year</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    ৳{paymentHistory.filter(p => p.status === 'paid' && p.paymentYear === '2024-2025')
                      .reduce((sum, p) => sum + (p.amount || 0), 0).toLocaleString()}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Outstanding Amount</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    ৳{paymentHistory.filter(p => p.status === 'overdue')
                      .reduce((sum, p) => sum + (p.amount || 0), 0).toLocaleString()}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Active Issues</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">
                    {issuesLog.filter(i => i.status !== 'resolved').length}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default LandOwnerDetailsModal;
