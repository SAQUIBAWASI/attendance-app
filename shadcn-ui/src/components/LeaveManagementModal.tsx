import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { useData } from '@/contexts/DataContext';
import { LeaveApplication } from '@/types';
import { Check, Clock, X } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

interface LeaveManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LeaveManagementModal: React.FC<LeaveManagementModalProps> = ({ isOpen, onClose }) => {
  const { getPendingLeaveApplications, updateLeaveApplication, leaveApplications } = useData();
  const [selectedApplication, setSelectedApplication] = useState<LeaveApplication | null>(null);
  const [reviewComments, setReviewComments] = useState('');

  const pendingApplications = getPendingLeaveApplications();
  const allApplications = leaveApplications.sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime());

  const handleApprove = (application: LeaveApplication) => {
    const updatedApplication: LeaveApplication = {
      ...application,
      status: 'approved',
      reviewedAt: new Date().toISOString(),
      reviewedBy: 'admin',
      reviewComments: reviewComments || 'Approved'
    };

    updateLeaveApplication(updatedApplication);
    toast.success(`Leave application approved for ${application.employeeName}`);
    setSelectedApplication(null);
    setReviewComments('');
  };

  const handleReject = (application: LeaveApplication) => {
    if (!reviewComments.trim()) {
      toast.error('Please provide a reason for rejection');
      return;
    }

    const updatedApplication: LeaveApplication = {
      ...application,
      status: 'rejected',
      reviewedAt: new Date().toISOString(),
      reviewedBy: 'admin',
      reviewComments: reviewComments
    };

    updateLeaveApplication(updatedApplication);
    toast.success(`Leave application rejected for ${application.employeeName}`);
    setSelectedApplication(null);
    setReviewComments('');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'approved':
        return <Badge variant="default" className="bg-green-500"><Check className="h-3 w-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><X className="h-3 w-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const calculateLeaveDays = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Leave Applications Management</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Pending Applications */}
          {pendingApplications.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3 text-orange-600">Pending Applications ({pendingApplications.length})</h3>
              <div className="space-y-3">
                {pendingApplications.map((application) => (
                  <div key={application.id} className="border rounded-lg p-4 bg-orange-50">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold">{application.employeeName}</h4>
                        <p className="text-sm text-gray-600">
                          {application.leaveType.charAt(0).toUpperCase() + application.leaveType.slice(1)} Leave
                        </p>
                      </div>
                      {getStatusBadge(application.status)}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                      <div>
                        <span className="font-medium">Start Date:</span>
                        <p>{new Date(application.startDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="font-medium">End Date:</span>
                        <p>{new Date(application.endDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="font-medium">Duration:</span>
                        <p>{calculateLeaveDays(application.startDate, application.endDate)} days</p>
                      </div>
                      <div>
                        <span className="font-medium">Applied:</span>
                        <p>{new Date(application.appliedAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <span className="font-medium">Reason:</span>
                      <p className="text-sm mt-1">{application.reason}</p>
                    </div>
                    
                    {selectedApplication?.id === application.id ? (
                      <div className="space-y-3 border-t pt-3">
                        <div>
                          <Label htmlFor="comments">Review Comments</Label>
                          <Textarea
                            id="comments"
                            value={reviewComments}
                            onChange={(e) => setReviewComments(e.target.value)}
                            placeholder="Add comments (required for rejection)"
                            rows={3}
                          />
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleApprove(application)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleReject(application)}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedApplication(null);
                              setReviewComments('');
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => setSelectedApplication(application)}
                      >
                        Review Application
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Applications */}
          <div>
            <h3 className="text-lg font-semibold mb-3">All Leave Applications</h3>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Leave Type</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Days</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Applied</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allApplications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell className="font-medium">{application.employeeName}</TableCell>
                      <TableCell className="capitalize">{application.leaveType}</TableCell>
                      <TableCell>{new Date(application.startDate).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(application.endDate).toLocaleDateString()}</TableCell>
                      <TableCell>{calculateLeaveDays(application.startDate, application.endDate)}</TableCell>
                      <TableCell>{getStatusBadge(application.status)}</TableCell>
                      <TableCell>{new Date(application.appliedAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {allApplications.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No leave applications found
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeaveManagementModal;