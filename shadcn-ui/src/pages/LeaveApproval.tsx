// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Textarea } from '@/components/ui/textarea';
// import { useAuth } from '@/contexts/AuthContext';
// import { storage } from '@/lib/storage';
// import { LeaveRequest } from '@/types/employee';
// import { ArrowLeft, Check, MessageCircle, X } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function LeaveApproval() {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
//   const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
//   const [comments, setComments] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [success, setSuccess] = useState('');

//   useEffect(() => {
//     if (!user) return;

//     const allLeaves = storage.getLeaveRequests();
//     // Filter based on user role - for now, show all pending requests
//     // In a real app, this would be filtered based on hierarchy
//     const pendingLeaves = allLeaves.filter(leave => leave.status === 'pending');
//     setLeaveRequests(pendingLeaves);
//   }, [user]);

//   const handleApproval = async (leaveId: string, status: 'approved' | 'rejected') => {
//     if (!user) return;

//     setIsLoading(true);
//     try {
//       const updates = {
//         status,
//         approvedBy: user.name,
//         approvedAt: new Date().toISOString(),
//         comments: comments || undefined
//       };

//       storage.updateLeaveRequest(leaveId, updates);
      
//       // Update local state
//       setLeaveRequests(prev => prev.filter(req => req.id !== leaveId));
//       setSelectedRequest(null);
//       setComments('');
      
//       setSuccess(`Leave request ${status} successfully!`);
      
//       setTimeout(() => setSuccess(''), 3000);
//     } catch (err) {
//       console.error('Failed to update leave request:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getLeaveTypeColor = (type: string) => {
//     switch (type) {
//       case 'sick':
//         return 'bg-red-100 text-red-800';
//       case 'casual':
//         return 'bg-blue-100 text-blue-800';
//       case 'annual':
//         return 'bg-green-100 text-green-800';
//       case 'emergency':
//         return 'bg-orange-100 text-orange-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const calculateLeaveDays = (startDate: string, endDate: string) => {
//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     const diffTime = Math.abs(end.getTime() - start.getTime());
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
//     return diffDays;
//   };

//   if (!user || (user.role !== 'team_leader' && user.role !== 'team_manager' && user.role !== 'hod')) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-4">
//         <div className="max-w-2xl mx-auto">
//           <Alert variant="destructive">
//             <AlertDescription>
//               You don't have permission to access this page. Only Team Leaders, Managers, and HODs can approve leave requests.
//             </AlertDescription>
//           </Alert>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex items-center mb-6">
//           <Button
//             variant="ghost"
//             onClick={() => navigate('/dashboard')}
//             className="mr-4"
//           >
//             <ArrowLeft className="h-4 w-4 mr-2" />
//             Back to Dashboard
//           </Button>
//           <h1 className="text-2xl font-bold">Leave Approvals</h1>
//         </div>

//         {success && (
//           <Alert className="mb-6">
//             <Check className="h-4 w-4" />
//             <AlertDescription>{success}</AlertDescription>
//           </Alert>
//         )}

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Leave Requests List */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Pending Leave Requests ({leaveRequests.length})</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {leaveRequests.map((request) => (
//                   <div
//                     key={request.id}
//                     className={`p-4 border rounded-lg cursor-pointer transition-colors ${
//                       selectedRequest?.id === request.id
//                         ? 'border-blue-500 bg-blue-50'
//                         : 'border-gray-200 hover:border-gray-300'
//                     }`}
//                     onClick={() => setSelectedRequest(request)}
//                   >
//                     <div className="flex items-center justify-between mb-2">
//                       <h3 className="font-medium">{request.userName}</h3>
//                       <Badge className={getLeaveTypeColor(request.type)}>
//                         {request.type.replace('_', ' ').toUpperCase()}
//                       </Badge>
//                     </div>
//                     <div className="text-sm text-gray-600 space-y-1">
//                       <p>
//                         <strong>Duration:</strong> {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
//                         ({calculateLeaveDays(request.startDate, request.endDate)} days)
//                       </p>
//                       <p><strong>Applied:</strong> {new Date(request.appliedAt).toLocaleDateString()}</p>
//                       <p><strong>Reason:</strong> {request.reason.length > 100 ? `${request.reason.substring(0, 100)}...` : request.reason}</p>
//                     </div>
//                   </div>
//                 ))}
//                 {leaveRequests.length === 0 && (
//                   <div className="text-center py-8 text-gray-500">
//                     <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
//                     <p>No pending leave requests</p>
//                   </div>
//                 )}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Leave Request Details */}
//           <Card>
//             <CardHeader>
//               <CardTitle>
//                 {selectedRequest ? 'Review Leave Request' : 'Select a Request'}
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               {selectedRequest ? (
//                 <div className="space-y-6">
//                   <div className="p-4 bg-gray-50 rounded-lg">
//                     <h3 className="font-medium text-lg mb-3">{selectedRequest.userName}</h3>
//                     <div className="grid grid-cols-2 gap-4 text-sm">
//                       <div>
//                         <p className="font-medium text-gray-700">Leave Type</p>
//                         <Badge className={getLeaveTypeColor(selectedRequest.type)}>
//                           {selectedRequest.type.replace('_', ' ').toUpperCase()}
//                         </Badge>
//                       </div>
//                       <div>
//                         <p className="font-medium text-gray-700">Duration</p>
//                         <p>{calculateLeaveDays(selectedRequest.startDate, selectedRequest.endDate)} days</p>
//                       </div>
//                       <div>
//                         <p className="font-medium text-gray-700">Start Date</p>
//                         <p>{new Date(selectedRequest.startDate).toLocaleDateString()}</p>
//                       </div>
//                       <div>
//                         <p className="font-medium text-gray-700">End Date</p>
//                         <p>{new Date(selectedRequest.endDate).toLocaleDateString()}</p>
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <h4 className="font-medium mb-2">Reason for Leave</h4>
//                     <p className="text-sm text-gray-700 p-3 bg-gray-50 rounded-lg">
//                       {selectedRequest.reason}
//                     </p>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium mb-2">
//                       Comments (Optional)
//                     </label>
//                     <Textarea
//                       placeholder="Add any comments for the employee..."
//                       value={comments}
//                       onChange={(e) => setComments(e.target.value)}
//                       rows={3}
//                     />
//                   </div>

//                   <div className="flex space-x-4">
//                     <Button
//                       onClick={() => handleApproval(selectedRequest.id, 'approved')}
//                       disabled={isLoading}
//                       className="flex-1 bg-green-600 hover:bg-green-700"
//                     >
//                       <Check className="h-4 w-4 mr-2" />
//                       {isLoading ? 'Processing...' : 'Approve'}
//                     </Button>
//                     <Button
//                       onClick={() => handleApproval(selectedRequest.id, 'rejected')}
//                       disabled={isLoading}
//                       variant="destructive"
//                       className="flex-1"
//                     >
//                       <X className="h-4 w-4 mr-2" />
//                       {isLoading ? 'Processing...' : 'Reject'}
//                     </Button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="text-center py-8 text-gray-500">
//                   <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
//                   <p>Select a leave request to review</p>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }