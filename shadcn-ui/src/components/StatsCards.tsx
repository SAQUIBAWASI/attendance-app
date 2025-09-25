// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Calendar, Clock, UserCheck, Users } from 'lucide-react';

// interface StatsCardsProps {
//   totalEmployees: number;
//   totalAttendance: number;
//   totalLeaveRequests: number;
//   presentToday: number;
// }

// export default function StatsCards({ 
//   totalEmployees, 
//   totalAttendance, 
//   totalLeaveRequests, 
//   presentToday 
// }: StatsCardsProps) {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
//           <Users className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">{totalEmployees}</div>
//           <p className="text-xs text-muted-foreground">
//             Active employees
//           </p>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Present Today</CardTitle>
//           <UserCheck className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">{presentToday}</div>
//           <p className="text-xs text-muted-foreground">
//             Checked in today
//           </p>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Total Attendance</CardTitle>
//           <Calendar className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">{totalAttendance}</div>
//           <p className="text-xs text-muted-foreground">
//             This month
//           </p>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Leave Requests</CardTitle>
//           <Clock className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">{totalLeaveRequests}</div>
//           <p className="text-xs text-muted-foreground">
//             Pending approval
//           </p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }