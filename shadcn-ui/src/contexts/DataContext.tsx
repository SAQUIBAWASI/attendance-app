import { AttendanceRecord, AttendanceReport, Employee, LeaveApplication, Notification, OfficeLocation, Shift } from '@/types';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface DataContextType {
  employees: Employee[];
  shifts: Shift[];
  attendanceRecords: AttendanceRecord[];
  notifications: Notification[];
  leaveApplications: LeaveApplication[];
  officeLocation: OfficeLocation;

  addEmployee: (employee: Employee) => void;
  updateEmployee: (employee: Employee) => void;
  deleteEmployee: (id: string) => void;

  addShift: (shift: Shift) => void;
  updateShift: (shift: Shift) => void;
  deleteShift: (id: string) => void;
  assignShift: (shift: Shift) => void;   // ✅ new method
  getEmployeeShift: (employeeId: string) => Shift | null;

  recordAttendance: (record: AttendanceRecord) => void;
  getAllAttendanceReports: (period: 'weekly' | 'monthly') => AttendanceReport[];
  getEmployeeAttendanceReport: (employeeId: string, period: 'weekly' | 'monthly') => AttendanceReport | null;

  addNotification: (notification: Notification) => void;
  markNotificationAsRead: (notificationId: string, employeeId: string) => void;
  getUnreadNotifications: (employeeId: string) => Notification[];

  addLeaveApplication: (application: LeaveApplication) => void;
  updateLeaveApplication: (application: LeaveApplication) => void;
  getEmployeeLeaveApplications: (employeeId: string) => LeaveApplication[];
  getPendingLeaveApplications: () => LeaveApplication[];

  exportAttendanceToExcel: (month: string, year: string) => void;
  calculateDistance: (lat1: number, lon1: number, lat2: number, lon2: number) => number;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Office location in Hyderabad
const OFFICE_LOCATION: OfficeLocation = {
  latitude: 17.4458661,
  longitude: 78.3849383,
  address: "Flat No: 301, 3rd Floor, Sri Sai Balaji Avenue, H. No: 1-98/9/25/p, Opp Style on Studio, VIP Hills, near Bank of Baroda, Arunodaya Colony, Jaihind Enclave, Madhapur, Hyderabad, Telangana 500081",
  radiusInMeters: 1000
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [leaveApplications, setLeaveApplications] = useState<LeaveApplication[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedEmployees = localStorage.getItem('attendance_employees');
    const savedShifts = localStorage.getItem('attendance_shifts');
    const savedRecords = localStorage.getItem('attendance_records');
    const savedNotifications = localStorage.getItem('attendance_notifications');
    const savedLeaveApplications = localStorage.getItem('attendance_leave_applications');

    if (savedEmployees) setEmployees(JSON.parse(savedEmployees));
    if (savedShifts) setShifts(JSON.parse(savedShifts));
    if (savedRecords) setAttendanceRecords(JSON.parse(savedRecords));
    if (savedNotifications) setNotifications(JSON.parse(savedNotifications));
    if (savedLeaveApplications) setLeaveApplications(JSON.parse(savedLeaveApplications));

    // Initialize with sample data if empty
    if (!savedEmployees || JSON.parse(savedEmployees).length === 0) {
      const sampleEmployees: Employee[] = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@company.com',
          department: 'Engineering',
          position: 'Software Developer',
          joinDate: '2023-01-15',
          phone: '+1-555-0123',
          address: '123 Main St, City, State',
          employeeId: 'EMP001'
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@company.com',
          department: 'Marketing',
          position: 'Marketing Manager',
          joinDate: '2023-02-01',
          phone: '+1-555-0124',
          address: '456 Oak Ave, City, State',
          employeeId: 'EMP002'
        },
        {
          id: '3',
          name: 'Johan Smith',
          email: 'johan@company.com',
          department: 'Marketing',
          position: 'Marketing Manager',
          joinDate: '2023-02-01',
          phone: '+1-555-0124',
          address: '456 Oak Ave, City, State',
          employeeId: 'EMP003'
        },
        {
          id: '4',
          name: 'Akhil Smith',
          email: 'akhil@company.com',
          department: 'Marketing',
          position: 'Marketing Manager',
          joinDate: '2023-02-01',
          phone: '+1-555-0124',
          address: '456 Oak Ave, City, State',
          employeeId: 'EMP004'
        },
        {
          id: '5',
          name: 'Ronit Gupta',
          email: 'ronit@company.com',
          department: 'Marketing',
          position: 'Marketing Manager',
          joinDate: '2023-02-01',
          phone: '+1-555-0124',
          address: '456 Oak Ave, City, State',
          employeeId: 'EMP005'
        },
        {
          id: '6',
          name: 'Smith',
          email: 'smith@company.com',
          department: 'Marketing',
          position: 'Marketing Manager',
          joinDate: '2023-02-01',
          phone: '+1-555-0124',
          address: '456 Oak Ave, City, State',
          employeeId: 'EMP006'
        },
        {
          id: '7',
          name: 'Rohan',
          email: 'rohan@company.com',
          department: 'Marketing',
          position: 'Marketing Manager',
          joinDate: '2023-02-01',
          phone: '+1-555-0124',
          address: '456 Oak Ave, City, State',
          employeeId: 'EMP007'
        }
      ];
      setEmployees(sampleEmployees);
      localStorage.setItem('attendance_employees', JSON.stringify(sampleEmployees));
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('attendance_employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('attendance_shifts', JSON.stringify(shifts));
  }, [shifts]);

  useEffect(() => {
    localStorage.setItem('attendance_records', JSON.stringify(attendanceRecords));
  }, [attendanceRecords]);

  useEffect(() => {
    localStorage.setItem('attendance_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('attendance_leave_applications', JSON.stringify(leaveApplications));
  }, [leaveApplications]);

  // ---------------- Employee CRUD ----------------
  const addEmployee = (employee: Employee) => {
    setEmployees(prev => [...prev, employee]);
  };

  const updateEmployee = (employee: Employee) => {
    setEmployees(prev => prev.map(emp => emp.id === employee.id ? employee : emp));
  };

  const deleteEmployee = (id: string) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  };

  // ---------------- Shifts CRUD ----------------
  const addShift = (shift: Shift) => {
    setShifts(prev => [...prev, shift]);
  };

  const updateShift = (shift: Shift) => {
    setShifts(prev => prev.map(s => s.id === shift.id ? shift : s));
  };

  const deleteShift = (id: string) => {
    setShifts(prev => prev.filter(s => s.id !== id));
  };

  const assignShift = (shift: Shift) => {
    setShifts(prev => {
      const existingIndex = prev.findIndex(s => s.id === shift.id);
      if (existingIndex >= 0) {
        // update existing shift
        const updated = [...prev];
        updated[existingIndex] = shift;
        return updated;
      } else {
        // add new shift
        return [...prev, shift];
      }
    });
  };

  const getEmployeeShift = (employeeId: string): Shift | null => {
    return shifts.find(shift => shift.employeeId === employeeId && shift.status === 'active') || null;
  };

  // ---------------- Attendance ----------------
  const recordAttendance = (record: AttendanceRecord) => {
    setAttendanceRecords(prev => {
      const existingIndex = prev.findIndex(r => r.id === record.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = record;
        return updated;
      }
      return [...prev, record];
    });
  };

  const getAllAttendanceReports = (period: 'weekly' | 'monthly'): AttendanceReport[] => {
    const reports: AttendanceReport[] = [];
    
    employees.forEach(employee => {
      const report = getEmployeeAttendanceReport(employee.id, period);
      if (report) {
        reports.push(report);
      }
    });
    
    return reports;
  };

  const getEmployeeAttendanceReport = (employeeId: string, period: 'weekly' | 'monthly'): AttendanceReport | null => {
    const employee = employees.find(emp => emp.id === employeeId);
    if (!employee) return null;

    const now = new Date();
    const startDate = new Date(now);
    
    if (period === 'weekly') {
      startDate.setDate(now.getDate() - 7);
    } else {
      startDate.setMonth(now.getMonth() - 1);
    }

    const employeeRecords = attendanceRecords.filter(
      record => record.employeeId === employeeId &&
      new Date(record.date) >= startDate &&
      new Date(record.date) <= now
    );

    const totalDays = employeeRecords.length;
    const presentDays = employeeRecords.filter(r => r.status === 'present').length;
    const absentDays = employeeRecords.filter(r => r.status === 'absent').length;
    const lateDays = employeeRecords.filter(r => r.status === 'late').length;
    const totalHours = employeeRecords.reduce((sum, r) => sum + (r.totalHours || 0), 0);

    return {
      employeeId,
      employeeName: employee.name,
      totalDays,
      presentDays,
      absentDays,
      lateDays,
      totalHours,
      period: `${period} (${startDate.toLocaleDateString()} - ${now.toLocaleDateString()})`
    };
  };

  // ---------------- Notifications ----------------
  const addNotification = (notification: Notification) => {
    setNotifications(prev => [notification, ...prev]);
  };

  const markNotificationAsRead = (notificationId: string, employeeId: string) => {
    setNotifications(prev => prev.map(notification => {
      if (notification.id === notificationId && !notification.readBy.includes(employeeId)) {
        return {
          ...notification,
          readBy: [...notification.readBy, employeeId]
        };
      }
      return notification;
    }));
  };

  const getUnreadNotifications = (employeeId: string): Notification[] => {
    return notifications.filter(notification => !notification.readBy.includes(employeeId));
  };

  // ---------------- Leaves ----------------
  const addLeaveApplication = (application: LeaveApplication) => {
    setLeaveApplications(prev => [application, ...prev]);
  };

  const updateLeaveApplication = (application: LeaveApplication) => {
    setLeaveApplications(prev => prev.map(app => app.id === application.id ? application : app));
  };

  const getEmployeeLeaveApplications = (employeeId: string): LeaveApplication[] => {
    return leaveApplications.filter(app => app.employeeId === employeeId);
  };

  const getPendingLeaveApplications = (): LeaveApplication[] => {
    return leaveApplications.filter(app => app.status === 'pending');
  };

  // ---------------- Export Attendance ----------------
  const exportAttendanceToExcel = (month: string, year: string) => {
    const monthlyData = attendanceRecords.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate.getMonth() === parseInt(month) - 1 && recordDate.getFullYear() === parseInt(year);
    });

    let csvContent = "Employee ID,Employee Name,Date,Check In,Check Out,Total Hours,Status,Location Status\n";
    
    monthlyData.forEach(record => {
      const employee = employees.find(emp => emp.id === record.employeeId);
      const locationStatus = record.location?.isWithinOfficeRadius ? 'Within Office' : 'Outside Office';
      csvContent += `${employee?.employeeId || 'Unknown'},${employee?.name || 'Unknown'},${record.date},${record.checkIn || ''},${record.checkOut || ''},${record.totalHours || 0},${record.status},${locationStatus}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `attendance_${month}_${year}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ---------------- Utility ----------------
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371e3; 
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; 
  };

  // ---------------- Context Value ----------------
  const value: DataContextType = {
    employees,
    shifts,
    attendanceRecords,
    notifications,
    leaveApplications,
    officeLocation: OFFICE_LOCATION,

    addEmployee,
    updateEmployee,
    deleteEmployee,

    addShift,
    updateShift,
    deleteShift,
    assignShift,
    getEmployeeShift,

    recordAttendance,
    getAllAttendanceReports,
    getEmployeeAttendanceReport,

    addNotification,
    markNotificationAsRead,
    getUnreadNotifications,

    addLeaveApplication,
    updateLeaveApplication,
    getEmployeeLeaveApplications,
    getPendingLeaveApplications,

    exportAttendanceToExcel,
    calculateDistance
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
