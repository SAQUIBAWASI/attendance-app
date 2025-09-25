import AttendanceTable from '@/components/AttendanceTable';
import LeaveManagementModal from '@/components/LeaveManagementModal';
import NotificationModal from '@/components/NotificationModal';
import ReportsModal from '@/components/ReportsModal';
import ShiftAssignment from '@/components/ShiftAssignment';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Employee } from '@/types';
import { BarChart3, Bell, Calendar, Clock, FileText, LogOut, UserCheck, Users } from 'lucide-react';
import React, { useState } from 'react';

const rowsPerPage = 5;

const AdminDashboard: React.FC = () => {
  const { logout } = useAuth();
  const { employees, shifts, getAllAttendanceReports, getEmployeeShift, getPendingLeaveApplications } = useData();
  const [showWeeklyReport, setShowWeeklyReport] = useState(false);
  const [showMonthlyReport, setShowMonthlyReport] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showShiftAssignment, setShowShiftAssignment] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [showLeaveManagement, setShowLeaveManagement] = useState(false);

  // 🔹 New states for dialogs
  const [openDialog, setOpenDialog] = useState<null | "employees" | "today" | "month" | "leaves">(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // 🔹 Stats
  const weeklyReports = getAllAttendanceReports('weekly');
  const monthlyReports = getAllAttendanceReports('monthly');
  const pendingLeaves = getPendingLeaveApplications();

  const totalEmployees = employees.length;
  const activeShifts = shifts.filter(shift => shift.status === 'active').length;
  const presentToday = weeklyReports.filter(report => report.presentDays > 0).length;

  const handleAssignShift = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowShiftAssignment(true);
  };

  const paginate = (data: any[], page: number) => {
    const start = (page - 1) * rowsPerPage;
    return data.slice(start, start + rowsPerPage);
  };

  // 🔹 Filter data according to active dialog
  let filteredData: any[] = [];
  if (openDialog === "employees") {
    filteredData = employees.filter(e =>
      e.name.toLowerCase().includes(search.toLowerCase())
    );
  } else if (openDialog === "today") {
    filteredData = weeklyReports.filter(r =>
      r.presentDays > 0 &&
      employees.find(e => e.id === r.employeeId)?.name.toLowerCase().includes(search.toLowerCase())
    );
  } else if (openDialog === "month") {
    filteredData = monthlyReports.filter(r =>
      employees.find(e => e.id === r.employeeId)?.name.toLowerCase().includes(search.toLowerCase())
    );
  } else if (openDialog === "leaves") {
    filteredData = pendingLeaves.filter(l =>
      employees.find(e => e.id === l.employeeId)?.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage employees and attendance</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => setShowNotificationModal(true)} variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Send Notification</span>
            </Button>
            <Button onClick={() => setShowReportsModal(true)} variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Reports</span>
            </Button>
            <Button 
              onClick={() => setShowLeaveManagement(true)} 
              variant="outline" 
              size="sm"
              className="relative"
            >
              <UserCheck className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Leave Management</span>
              {pendingLeaves.length > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                  {pendingLeaves.length}
                </Badge>
              )}
            </Button>
            <Button onClick={logout} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <Card onClick={() => { setOpenDialog("employees"); setSearch(""); setPage(1); }} className="cursor-pointer hover:shadow-md transition">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalEmployees}</div>
            </CardContent>
          </Card>
          
          <Card onClick={() => { setOpenDialog("today"); setSearch(""); setPage(1); }} className="cursor-pointer hover:shadow-md transition">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Shifts</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeShifts}</div>
            </CardContent>
          </Card>
          
          <Card onClick={() => { setOpenDialog("month"); setSearch(""); setPage(1); }} className="cursor-pointer hover:shadow-md transition">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Present Today</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{presentToday}</div>
            </CardContent>
          </Card>
          
          <Card onClick={() => { setOpenDialog("leaves"); setSearch(""); setPage(1); }} className="cursor-pointer hover:shadow-md transition">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalEmployees > 0 ? Math.round((presentToday / totalEmployees) * 100) : 0}%
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reports Section (same as before) */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Reports</CardTitle>
              <CardDescription>View weekly attendance reports for all employees</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setShowWeeklyReport(true)} className="w-full">
                View Weekly Attendance Report
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Monthly Reports</CardTitle>
              <CardDescription>View monthly attendance reports for all employees</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setShowMonthlyReport(true)} className="w-full">
                View Monthly Attendance Report
              </Button>
            </CardContent>
          </Card>
        </div> */}

        {/* Active Shifts Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Active Shifts
            </CardTitle>
            <CardDescription>
              View and assign shifts for employees
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Shift Time</TableHead>
                    <TableHead>Days</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((employee) => {
                    const currentShift = getEmployeeShift(employee.id);
                    return (
                      <TableRow key={employee.id}>
                        <TableCell>{employee.name}</TableCell>
                        <TableCell>
                          {currentShift ? (
                            <Badge variant="default">
                              {currentShift.startTime} - {currentShift.endTime}
                            </Badge>
                          ) : (
                            <Badge variant="secondary">No Shift</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {currentShift && currentShift.days.length > 0
                            ? currentShift.days.join(", ")
                            : "-"}
                        </TableCell>
                        <TableCell>
                          {currentShift ? `${currentShift.startDate} → ${currentShift.endDate}` : "-"}
                        </TableCell>
                        <TableCell>
                          <Button size="sm" onClick={() => handleAssignShift(employee)}>
                            {currentShift ? "Update" : "Assign"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dialog for Cards */}
      <Dialog open={openDialog !== null} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {openDialog === "employees" && "All Employees"}
              {openDialog === "today" && "Present Today"}
              {openDialog === "month" && "Monthly Attendance"}
              {openDialog === "leaves" && "Pending Leaves"}
            </DialogTitle>
          </DialogHeader>

          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="mb-3"
          />

          <table className="w-full border text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                {openDialog === "employees" && (<><th className="p-2">Employee ID</th><th className="p-2">Name</th><th className="p-2">Department</th></>)}
                {openDialog === "today" && (<><th className="p-2">Employee</th><th className="p-2">Present Days</th></>)}
                {openDialog === "month" && (<><th className="p-2">Employee</th><th className="p-2">Days Present</th><th className="p-2">Days Absent</th></>)}
                {openDialog === "leaves" && (<><th className="p-2">Employee</th><th className="p-2">From</th><th className="p-2">To</th><th className="p-2">Reason</th></>)}
              </tr>
            </thead>
            <tbody>
              {paginate(filteredData, page).map((item, i) => {
                if (openDialog === "employees") {
                  return (
                    <tr key={i} className="border-t">
                      <td className="p-2">{item.employeeId}</td>
                      <td className="p-2">{item.name}</td>
                      <td className="p-2">{item.department}</td>
                    </tr>
                  );
                }
                if (openDialog === "today") {
                  const emp = employees.find(e => e.id === item.employeeId);
                  return (
                    <tr key={i} className="border-t">
                      <td className="p-2">{emp?.name}</td>
                      <td className="p-2">{item.presentDays}</td>
                    </tr>
                  );
                }
                if (openDialog === "month") {
                  const emp = employees.find(e => e.id === item.employeeId);
                  return (
                    <tr key={i} className="border-t">
                      <td className="p-2">{emp?.name}</td>
                      <td className="p-2">{item.presentDays}</td>
                      <td className="p-2">{item.absentDays}</td>
                    </tr>
                  );
                }
                if (openDialog === "leaves") {
                  const emp = employees.find(e => e.id === item.employeeId);
                  return (
                    <tr key={i} className="border-t">
                      <td className="p-2">{emp?.name}</td>
                      <td className="p-2">{item.fromDate}</td>
                      <td className="p-2">{item.toDate}</td>
                      <td className="p-2">{item.reason}</td>
                    </tr>
                  );
                }
                return null;
              })}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-3">
            <Button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</Button>
            <span>Page {page}</span>
            <Button disabled={page * rowsPerPage >= filteredData.length} onClick={() => setPage(p => p + 1)}>Next</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modals */}
      <AttendanceTable isOpen={showWeeklyReport} onClose={() => setShowWeeklyReport(false)} reports={weeklyReports} title="Weekly Attendance Report" />
      <AttendanceTable isOpen={showMonthlyReport} onClose={() => setShowMonthlyReport(false)} reports={monthlyReports} title="Monthly Attendance Report" />
      <ShiftAssignment isOpen={showShiftAssignment} onClose={() => setShowShiftAssignment(false)} employee={selectedEmployee} />
      <NotificationModal isOpen={showNotificationModal} onClose={() => setShowNotificationModal(false)} />
      <ReportsModal isOpen={showReportsModal} onClose={() => setShowReportsModal(false)} />
      <LeaveManagementModal isOpen={showLeaveManagement} onClose={() => setShowLeaveManagement(false)} />
    </div>
  );
};

export default AdminDashboard;
