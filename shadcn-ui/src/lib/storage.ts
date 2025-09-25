// // Employee Management System - Storage Functions
// import { Admin, AttendanceRecord, Employee, LeaveApplication, LoginSession, Notification, OfficeLocation } from '@/types';

// // Storage Keys
// const STORAGE_KEYS = {
//   EMPLOYEES: 'employees',
//   ATTENDANCE: 'attendance',
//   LEAVE_APPLICATIONS: 'leaveApplications',
//   NOTIFICATIONS: 'notifications',
//   SESSION: 'currentSession',
//   ADMIN: 'admin',
//   OFFICE_LOCATION: 'officeLocation'
// };

// // Utility Functions
// export const generateId = (): string => {
//   return Date.now().toString(36) + Math.random().toString(36).substr(2);
// };

// export const formatDateTime = (date: Date): string => {
//   return date.toLocaleString('en-IN', {
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit',
//     hour: '2-digit',
//     minute: '2-digit',
//     second: '2-digit',
//     hour12: false
//   });
// };

// // Session Management
// export const saveSession = (session: LoginSession): void => {
//   localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
// };

// export const getSession = (): LoginSession | null => {
//   const sessionData = localStorage.getItem(STORAGE_KEYS.SESSION);
//   return sessionData ? JSON.parse(sessionData) : null;
// };

// export const clearSession = (): void => {
//   localStorage.removeItem(STORAGE_KEYS.SESSION);
// };

// // ✅ FIXED: Admin Validation Function
// export const validateAdmin = (username: string, password: string): boolean => {
//   const adminData = localStorage.getItem(STORAGE_KEYS.ADMIN);

//   if (!adminData) {
//     // Default hardcoded admin (first-time use)
//     return username === 'admin' && password === 'admin123';
//   }

//   const admin: Admin = JSON.parse(adminData);
//   return admin.username === username && admin.password === password;
// };

// // Employee Management
// export const saveEmployee = (employee: Employee): void => {
//   const employees = getEmployees();
//   const existingIndex = employees.findIndex(emp => emp.id === employee.id);
  
//   if (existingIndex >= 0) {
//     employees[existingIndex] = employee;
//   } else {
//     employees.push(employee);
//   }
  
//   localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(employees));
// };

// export const getEmployees = (): Employee[] => {
//   const employeesData = localStorage.getItem(STORAGE_KEYS.EMPLOYEES);
//   return employeesData ? JSON.parse(employeesData) : [];
// };

// export const getEmployeeById = (id: string): Employee | null => {
//   const employees = getEmployees();
//   return employees.find(emp => emp.id === id) || null;
// };

// export const getEmployeeByEmail = (email: string): Employee | null => {
//   const employees = getEmployees();
//   return employees.find(emp => emp.email.toLowerCase() === email.toLowerCase()) || null;
// };

// export const isEmployeeRegistered = (email: string): boolean => {
//   return getEmployeeByEmail(email) !== null;
// };

// // Attendance Management
// export const saveAttendanceRecord = (record: AttendanceRecord): void => {
//   const records = getAttendanceRecords();
//   const existingIndex = records.findIndex(r => r.id === record.id);
  
//   if (existingIndex >= 0) {
//     records[existingIndex] = record;
//   } else {
//     records.push(record);
//   }
  
//   localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(records));
// };

// export const getAttendanceRecords = (): AttendanceRecord[] => {
//   const recordsData = localStorage.getItem(STORAGE_KEYS.ATTENDANCE);
//   return recordsData ? JSON.parse(recordsData) : [];
// };

// export const getEmployeeAttendance = (employeeId: string): AttendanceRecord[] => {
//   const records = getAttendanceRecords();
//   return records.filter(record => record.employeeId === employeeId);
// };

// export const getTodayAttendance = (employeeId: string): AttendanceRecord | null => {
//   const today = new Date().toISOString().split('T')[0];
//   const records = getEmployeeAttendance(employeeId);
//   return records.find(record => record.date === today) || null;
// };

// export const getEmployeeAttendanceStats = (employeeId: string) => {
//   const records = getEmployeeAttendance(employeeId);
//   const presentDays = records.filter(r => r.status === 'present').length;
//   const absentDays = records.filter(r => r.status === 'absent').length;
//   const lateEntries = records.filter(r => r.isLateEntry === true).length;
  
//   return {
//     presentDays,
//     absentDays,
//     lateEntries,
//     totalDays: records.length
//   };
// };

// // Leave Management
// export const saveLeaveApplication = (leave: LeaveApplication): void => {
//   const leaves = getLeaveApplications();
//   const existingIndex = leaves.findIndex(l => l.id === leave.id);
  
//   if (existingIndex >= 0) {
//     leaves[existingIndex] = leave;
//   } else {
//     leaves.push(leave);
//   }
  
//   localStorage.setItem(STORAGE_KEYS.LEAVE_APPLICATIONS, JSON.stringify(leaves));
// };

// export const getLeaveApplications = (): LeaveApplication[] => {
//   const leavesData = localStorage.getItem(STORAGE_KEYS.LEAVE_APPLICATIONS);
//   return leavesData ? JSON.parse(leavesData) : [];
// };

// export const getEmployeeLeaves = (employeeId: string): LeaveApplication[] => {
//   const leaves = getLeaveApplications();
//   return leaves.filter(leave => leave.employeeId === employeeId);
// };

// // Notification Management
// export const saveNotification = (notification: Notification): void => {
//   const notifications = getNotifications();
//   notifications.unshift(notification); // Add to beginning
//   localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
// };

// export const getNotifications = (): Notification[] => {
//   const notificationsData = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
//   return notificationsData ? JSON.parse(notificationsData) : [];
// };

// export const getEmployeeNotifications = (employeeId: string): Notification[] => {
//   const notifications = getNotifications();
//   return notifications.filter(notification => 
//     !notification.targetEmployees || 
//     notification.targetEmployees.length === 0 || 
//     notification.targetEmployees.includes(employeeId)
//   );
// };

// export const markNotificationAsRead = (notificationId: string): void => {
//   const notifications = getNotifications();
//   const notification = notifications.find(n => n.id === notificationId);
//   if (notification) {
//     notification.isRead = true;
//     localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
//   }
// };

// // Office Location Management
// export const getOfficeLocation = (): OfficeLocation => {
//   const locationData = localStorage.getItem(STORAGE_KEYS.OFFICE_LOCATION);
//   return locationData ? JSON.parse(locationData) : {
//     latitude: 17.4485,
//     longitude: 78.3908,
//     radius: 100,
//     name: 'Madhapur, Hyderabad'
//   };
// };

// export const isWithinOfficeRadius = (lat: number, lng: number): boolean => {
//   const office = getOfficeLocation();
//   const distance = calculateDistance(lat, lng, office.latitude, office.longitude);
//   return distance <= office.radius;
// };

// const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
//   const R = 6371e3; // Earth's radius in meters
//   const φ1 = lat1 * Math.PI / 180;
//   const φ2 = lat2 * Math.PI / 180;
//   const Δφ = (lat2 - lat1) * Math.PI / 180;
//   const Δλ = (lng2 - lng1) * Math.PI / 180;

//   const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
//     Math.cos(φ1) * Math.cos(φ2) *
//     Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//   return R * c;
// };

// // Location and Camera Functions
// export const getCurrentLocation = (): Promise<{ latitude: number; longitude: number }> => {
//   return new Promise((resolve, reject) => {
//     if (!navigator.geolocation) {
//       reject(new Error('Geolocation is not supported by this browser'));
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         resolve({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude
//         });
//       },
//       (error) => {
//         reject(new Error(`Geolocation error: ${error.message}`));
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 10000,
//         maximumAge: 60000
//       }
//     );
//   });
// };

// export const capturePhoto = (): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     navigator.mediaDevices.getUserMedia({ video: true })
//       .then(stream => {
//         const video = document.createElement('video');
//         video.srcObject = stream;
//         video.play();

//         video.onloadedmetadata = () => {
//           const canvas = document.createElement('canvas');
//           canvas.width = video.videoWidth;
//           canvas.height = video.videoHeight;
          
//           const ctx = canvas.getContext('2d');
//           if (ctx) {
//             ctx.drawImage(video, 0, 0);
//             const dataURL = canvas.toDataURL('image/jpeg', 0.8);
            
//             // Stop the stream
//             stream.getTracks().forEach(track => track.stop());
            
//             resolve(dataURL);
//           } else {
//             reject(new Error('Failed to get canvas context'));
//           }
//         };
//       })
//       .catch(error => {
//         reject(new Error(`Camera error: ${error.message}`));
//       });
//   });
// };

// // Excel Export Functions
// export const generateEmployeeExcelData = () => {
//   const employees = getEmployees();
//   const attendanceRecords = getAttendanceRecords();
  
//   const data = employees.map(employee => {
//     const empAttendance = attendanceRecords.filter(record => record.employeeId === employee.id);
//     const stats = getEmployeeAttendanceStats(employee.id);
    
//     return {
//       'Employee Name': employee.name,
//       'Email': employee.email,
//       'Phone': employee.phone,
//       'Department': employee.department,
//       'Role': employee.role || 'Employee',
//       'Join Date': employee.joinDate,
//       'Total Days': stats.totalDays,
//       'Present Days': stats.presentDays,
//       'Absent Days': stats.absentDays,
//       'Late Entries': stats.lateEntries,
//       'Attendance Rate': stats.totalDays > 0 ? `${Math.round((stats.presentDays / stats.totalDays) * 100)}%` : '0%'
//     };
//   });
  
//   return data;
// };

// export const exportToCSV = (data: any[], filename: string) => {
//   if (data.length === 0) return;
  
//   const headers = Object.keys(data[0]);
//   const csvContent = [
//     headers.join(','),
//     ...data.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
//   ].join('\n');
  
//   const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//   const link = document.createElement('a');
  
//   if (link.download !== undefined) {
//     const url = URL.createObjectURL(blob);
//     link.setAttribute('href', url);
//     link.setAttribute('download', filename);
//     link.style.visibility = 'hidden';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   }
// };
