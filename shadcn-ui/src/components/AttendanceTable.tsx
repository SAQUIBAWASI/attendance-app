import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AttendanceReport } from '@/types';
import React from 'react';

interface AttendanceTableProps {
  isOpen: boolean;
  onClose: () => void;
  reports: AttendanceReport[];
  title: string;
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({ isOpen, onClose, reports, title }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Complete attendance information for all employees
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee ID</TableHead>
                <TableHead>Employee Name</TableHead>
                <TableHead>Total Days</TableHead>
                <TableHead>Present Days</TableHead>
                <TableHead>Absent Days</TableHead>
                <TableHead>Late Days</TableHead>
                <TableHead>Total Hours</TableHead>
                <TableHead>Attendance Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => {
                const attendanceRate = report.totalDays > 0 
                  ? Math.round((report.presentDays / report.totalDays) * 100) 
                  : 0;
                
                return (
                  <TableRow key={report.employeeId}>
                    <TableCell className="font-medium">{report.employeeId}</TableCell>
                    <TableCell>{report.employeeName}</TableCell>
                    <TableCell>{report.totalDays}</TableCell>
                    <TableCell>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        {report.presentDays}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="destructive" className="bg-red-100 text-red-800">
                        {report.absentDays}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        {report.lateDays}
                      </Badge>
                    </TableCell>
                    <TableCell>{report.totalHours.toFixed(1)}h</TableCell>
                    <TableCell>
                      <Badge 
                        variant={attendanceRate >= 90 ? "default" : attendanceRate >= 75 ? "secondary" : "destructive"}
                        className={
                          attendanceRate >= 90 
                            ? "bg-green-100 text-green-800" 
                            : attendanceRate >= 75 
                              ? "bg-yellow-100 text-yellow-800" 
                              : "bg-red-100 text-red-800"
                        }
                      >
                        {attendanceRate}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          
          {reports.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No attendance data available for the selected period.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AttendanceTable;