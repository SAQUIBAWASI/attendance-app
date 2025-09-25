Employee Attendance Management System - MVP Implementation
Core Features to Implement:
1. Authentication & Employee Management
Employee login/registration
Employee profile with image capture
Department and shift creation/management
2. Attendance System
Clock in/out with image capture
Location verification (within 100m of office)
Automatic attendance tracking
3. Leave Management
Leave application submission
Approval workflow (Employee → Team Leader → Manager → HOD)
Leave status tracking
4. Dashboard Components
Admin Dashboard: Total employees, attendance, leaves
Employee Dashboard: Personal stats (total leaves, working days, lates)
Navigation with role-based access
5. Data Storage
LocalStorage for MVP (simulating backend)
Employee data, attendance records, leave applications
Files to Create:
src/pages/Login.tsx - Login page with employee authentication
src/pages/Dashboard.tsx - Main dashboard with role-based views
src/pages/EmployeeDashboard.tsx - Individual employee dashboard
src/pages/LeaveManagement.tsx - Leave application and approval
src/pages/CreateEmployee.tsx - Employee creation and management
src/components/AttendanceCapture.tsx - Clock in/out with camera and location
src/components/Navigation.tsx - Role-based navigation component
src/lib/storage.ts - LocalStorage utilities for data management
src/lib/location.ts - Location verification utilities
src/types/index.ts - TypeScript interfaces
Implementation Strategy:
Use React Camera API for image capture
Geolocation API for location tracking
LocalStorage for data persistence
Role-based UI rendering
Mobile-responsive design with Tailwind CSS