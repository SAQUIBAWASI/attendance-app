import CameraCapture from '@/components/CameraCapture';
import LeaveApplicationModal from '@/components/LeaveApplicationModal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { AttendanceRecord } from '@/types';
import { AlertCircle, Bell, Calendar, CalendarDays, Camera, Clock, FileText, LogOut, Mail, MapPin, Navigation, Phone, Timer, User, UserX } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const EmployeeDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { 
    employees, 
    getEmployeeShift, 
    recordAttendance, 
    attendanceRecords, 
    getUnreadNotifications,
    markNotificationAsRead,
    getEmployeeLeaveApplications,
    officeLocation,
    calculateDistance
  } = useData();
  
  const [currentTime, setCurrentTime] = useState(new Date());
  const [todayAttendance, setTodayAttendance] = useState<AttendanceRecord | null>(null);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<GeolocationPosition | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Find employee by matching user's employeeId with employee's id
  const employee = employees.find(emp => emp.id === user?.employeeId);
  const currentShift = employee ? getEmployeeShift(employee.id) : null;
  const unreadNotifications = employee ? getUnreadNotifications(employee.id) : [];
  const leaveApplications = employee ? getEmployeeLeaveApplications(employee.id) : [];

  // Calculate employee statistics
  const getEmployeeStats = () => {
    if (!employee) return { workingDays: 0, totalLeaves: 0, lateArrivals: 0, shortAttendance: 0 };

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    // Get current month's attendance records
    const monthlyRecords = attendanceRecords.filter(record => {
      const recordDate = new Date(record.date);
      return record.employeeId === employee.id && 
             recordDate.getMonth() === currentMonth && 
             recordDate.getFullYear() === currentYear;
    });

    // Get current month's approved leaves
    const monthlyLeaves = leaveApplications.filter(app => {
      const startDate = new Date(app.startDate);
      const endDate = new Date(app.endDate);
      return app.status === 'approved' && 
             ((startDate.getMonth() === currentMonth && startDate.getFullYear() === currentYear) ||
              (endDate.getMonth() === currentMonth && endDate.getFullYear() === currentYear));
    });

    const workingDays = monthlyRecords.filter(r => r.status === 'present').length;
    const totalLeaves = monthlyLeaves.length;
    const lateArrivals = monthlyRecords.filter(r => r.status === 'late').length;
    const shortAttendance = monthlyRecords.filter(r => r.totalHours && r.totalHours < 8).length;

    return { workingDays, totalLeaves, lateArrivals, shortAttendance };
  };

  const stats = getEmployeeStats();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (employee) {
      const today = new Date().toISOString().split('T')[0];
      const todayRecord = attendanceRecords.find(
        record => record.employeeId === employee.id && record.date === today
      );
      setTodayAttendance(todayRecord || null);
    }
  }, [employee, attendanceRecords]);

  useEffect(() => {
    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation(position);
          setLocationError(null);
        },
        (error) => {
          setLocationError(error.message);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
      );
    } else {
      setLocationError('Geolocation is not supported by this browser');
    }
  }, []);

  const handleCheckInWithPhoto = () => {
    if (!currentLocation) {
      toast.error('Location access is required for check-in');
      return;
    }

    const distance = calculateDistance(
      currentLocation.coords.latitude,
      currentLocation.coords.longitude,
      officeLocation.latitude,
      officeLocation.longitude
    );

    if (distance > officeLocation.radiusInMeters) {
      toast.error(`You are ${Math.round(distance)}m away from office. Please be within ${officeLocation.radiusInMeters}m to check in.`);
      return;
    }

    setShowCamera(true);
  };

  const handlePhotoCapture = (photo: string) => {
    if (!employee || !currentLocation) return;
    
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const currentTimeStr = now.toTimeString().split(' ')[0];
    
    const distance = calculateDistance(
      currentLocation.coords.latitude,
      currentLocation.coords.longitude,
      officeLocation.latitude,
      officeLocation.longitude
    );

    const record: AttendanceRecord = {
      id: `${employee.id}-${today}`,
      employeeId: employee.id,
      date: today,
      checkIn: currentTimeStr,
      status: 'present',
      photo: photo,
      location: {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        address: 'Current Location',
        isWithinOfficeRadius: distance <= officeLocation.radiusInMeters
      }
    };
    
    recordAttendance(record);
    toast.success('Check-in successful with photo and location verification!');
  };

  const handleCheckOut = () => {
    if (!employee || !todayAttendance) return;
    
    const now = new Date();
    const currentTimeStr = now.toTimeString().split(' ')[0];
    
    const checkInTime = new Date(`2000-01-01 ${todayAttendance.checkIn}`);
    const checkOutTime = new Date(`2000-01-01 ${currentTimeStr}`);
    const totalHours = (checkOutTime.getTime() - checkInTime.getTime()) / (1000 * 60 * 60);
    
    const updatedRecord: AttendanceRecord = {
      ...todayAttendance,
      checkOut: currentTimeStr,
      totalHours: Math.round(totalHours * 100) / 100
    };
    
    recordAttendance(updatedRecord);
    toast.success('Check-out successful!');
  };

  const handleNotificationClick = (notificationId: string) => {
    if (employee) {
      markNotificationAsRead(notificationId, employee.id);
    }
  };

  if (!employee) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <div className="mb-4">
              <User className="h-12 w-12 mx-auto text-gray-400 mb-2" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Employee Not Found</h2>
              <p className="text-gray-600 mb-4">
                Your employee profile could not be found in the system.
              </p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h3 className="font-medium text-blue-900 mb-2">Debug Information:</h3>
              <div className="text-sm text-blue-800 space-y-1">
                <p>User ID: {user?.id || 'Not found'}</p>
                <p>Employee ID: {user?.employeeId || 'Not found'}</p>
                <p>Total Employees: {employees.length}</p>
                <p>Available Employee IDs: {employees.map(e => e.id).join(', ')}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Button onClick={logout} className="w-full">
                <LogOut className="h-4 w-4 mr-2" />
                Logout and Try Again
              </Button>
              <p className="text-xs text-gray-500">
                Please contact your administrator if this issue persists.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Employee Dashboard</h1>
            <p className="text-gray-600">Welcome back, {employee.name}!</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button 
              onClick={() => setShowLeaveModal(true)} 
              variant="outline" 
              size="sm"
            >
              <FileText className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Leave Application</span>
            </Button>
            <Button 
              onClick={() => setShowNotifications(true)} 
              variant="outline" 
              size="sm"
              className="relative"
            >
              <Bell className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Notifications</span>
              {unreadNotifications.length > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                  {unreadNotifications.length}
                </Badge>
              )}
            </Button>
            <Button onClick={logout} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>

        {/* Current Time */}
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {currentTime.toLocaleTimeString()}
              </div>
              <div className="text-lg text-gray-600">
                {currentTime.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Employee Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Working Days</CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.workingDays}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Leaves</CardTitle>
              <UserX className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalLeaves}</div>
              <p className="text-xs text-muted-foreground">Approved leaves</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Late Arrivals</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.lateArrivals}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Short Attendance</CardTitle>
              <Timer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.shortAttendance}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Employee Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Employee Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Employee ID</p>
                  <p className="text-lg font-semibold">{employee.employeeId}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Department</p>
                  <p className="text-lg font-semibold">{employee.department}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Position</p>
                  <p className="text-lg font-semibold">{employee.position}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Join Date</p>
                  <p className="text-lg font-semibold">{new Date(employee.joinDate).toLocaleDateString()}</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{employee.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{employee.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{employee.address}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Shift */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Current Shift
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentShift ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">Status</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Start Time</p>
                      <p className="text-lg font-semibold">{currentShift.startTime}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">End Time</p>
                      <p className="text-lg font-semibold">{currentShift.endTime}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">Working Days</p>
                    <div className="flex flex-wrap gap-2">
                      {currentShift.days.map(day => (
                        <Badge key={day} variant="secondary">{day}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Period</p>
                      <p className="text-lg font-semibold capitalize">{currentShift.type}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Duration</p>
                      <p className="text-sm font-semibold">
                        {new Date(currentShift.startDate).toLocaleDateString()} - {new Date(currentShift.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No active shift assigned</p>
                  <p className="text-sm text-gray-400 mt-2">Please contact your administrator</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Location Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Navigation className="h-5 w-5" />
              Location Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            {locationError ? (
              <div className="text-center py-4">
                <p className="text-red-500">Location Error: {locationError}</p>
                <p className="text-sm text-gray-500 mt-2">Please enable location access for check-in</p>
              </div>
            ) : currentLocation ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Distance from Office:</span>
                  <Badge variant={
                    calculateDistance(
                      currentLocation.coords.latitude,
                      currentLocation.coords.longitude,
                      officeLocation.latitude,
                      officeLocation.longitude
                    ) <= officeLocation.radiusInMeters ? 'default' : 'destructive'
                  }>
                    {Math.round(calculateDistance(
                      currentLocation.coords.latitude,
                      currentLocation.coords.longitude,
                      officeLocation.latitude,
                      officeLocation.longitude
                    ))}m
                  </Badge>
                </div>
                <p className="text-xs text-gray-500">
                  Office: {officeLocation.address}
                </p>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500">Getting location...</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Attendance Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">
                  {todayAttendance?.checkIn || '--:--:--'}
                </div>
                <p className="text-sm text-gray-500 mb-4">Check In Time</p>
                <Button 
                  onClick={handleCheckInWithPhoto}
                  disabled={!!todayAttendance?.checkIn || !currentLocation}
                  className="w-full"
                  variant={todayAttendance?.checkIn ? "secondary" : "default"}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  {todayAttendance?.checkIn ? 'Checked In' : 'Check In with Photo'}
                </Button>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 mb-2">
                  {todayAttendance?.checkOut || '--:--:--'}
                </div>
                <p className="text-sm text-gray-500 mb-4">Check Out Time</p>
                <Button 
                  onClick={handleCheckOut}
                  disabled={!todayAttendance?.checkIn || !!todayAttendance?.checkOut}
                  className="w-full"
                  variant={todayAttendance?.checkOut ? "secondary" : "destructive"}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {todayAttendance?.checkOut ? 'Checked Out' : 'Check Out'}
                </Button>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {todayAttendance?.totalHours ? `${todayAttendance.totalHours}h` : '--:--'}
                </div>
                <p className="text-sm text-gray-500 mb-4">Total Hours</p>
                <Badge 
                  variant={todayAttendance?.status === 'present' ? 'default' : 'secondary'}
                  className="px-4 py-2"
                >
                  {todayAttendance?.status || 'Not Marked'}
                </Badge>
              </div>
            </div>
            
            {todayAttendance?.location && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium">Location Verification:</p>
                <p className="text-xs text-gray-600">
                  {todayAttendance.location.isWithinOfficeRadius 
                    ? '✅ Within office premises' 
                    : '❌ Outside office premises'
                  }
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Leave Applications Status */}
        {leaveApplications.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>My Leave Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaveApplications.slice(0, 3).map((application) => (
                  <div key={application.id} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium capitalize">{application.leaveType} Leave</p>
                      <p className="text-sm text-gray-600">
                        {new Date(application.startDate).toLocaleDateString()} - {new Date(application.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant={
                      application.status === 'approved' ? 'default' : 
                      application.status === 'rejected' ? 'destructive' : 'secondary'
                    }>
                      {application.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modals */}
      <LeaveApplicationModal
        isOpen={showLeaveModal}
        onClose={() => setShowLeaveModal(false)}
      />

      <CameraCapture
        isOpen={showCamera}
        onClose={() => setShowCamera(false)}
        onCapture={handlePhotoCapture}
      />

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Notifications</h2>
              <Button variant="ghost" onClick={() => setShowNotifications(false)}>×</Button>
            </div>
            
            {unreadNotifications.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No new notifications</p>
            ) : (
              <div className="space-y-3">
                {unreadNotifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                    onClick={() => handleNotificationClick(notification.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{notification.title}</h3>
                      <Badge variant={
                        notification.type === 'success' ? 'default' :
                        notification.type === 'error' ? 'destructive' :
                        notification.type === 'warning' ? 'secondary' : 'outline'
                      }>
                        {notification.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;