export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  joinDate: string;
  phone: string;
  address: string;
  employeeId: string;
}

export interface Shift {
  id: string;
  employeeId: string;
  type: 'weekly' | 'monthly';
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  days: string[]; // ['Monday', 'Tuesday', etc.]
  status: 'active' | 'inactive';
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: 'present' | 'absent' | 'late' | 'half-day';
  totalHours?: number;
  photo?: string; // Base64 encoded photo
  location?: {
    latitude: number;
    longitude: number;
    address: string;
    isWithinOfficeRadius: boolean;
  };
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'employee';
  employeeId?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  createdAt: string;
  createdBy: string; // admin id
  readBy: string[]; // array of employee ids who have read this
}

export interface LeaveApplication {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveType: 'sick' | 'casual' | 'vacation' | 'emergency' | 'maternity' | 'paternity';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: string;
  reviewedAt?: string;
  reviewedBy?: string; // admin id
  reviewComments?: string;
}

export type AttendanceReport = {
  employeeId: string;
  employeeName: string;
  totalDays: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  totalHours: number;
  period: string;
};

export interface OfficeLocation {
  latitude: number;
  longitude: number;
  address: string;
  radiusInMeters: number;
}