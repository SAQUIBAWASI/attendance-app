import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { BarChart3, Clock, Shield, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Index() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleDashboardNavigation = () => {
    if (user?.role === 'admin') {
      navigate('/admin-dashboard');
    } else if (user?.role === 'employee') {
      navigate('/employee-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Attendance Management System
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Streamline your workforce management with our comprehensive attendance tracking solution
          </p>
          
          {user && (
            <div className="mb-8">
              <p className="text-lg text-gray-700 mb-4">
                Welcome back, {user.role === 'admin' ? 'Administrator' : 'Employee'}!
              </p>
              <Button onClick={handleDashboardNavigation} size="lg">
                Go to {user.role === 'admin' ? 'Admin' : 'Employee'} Dashboard
              </Button>
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Employee Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Comprehensive employee profiles with detailed information and department organization
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Clock className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle>Shift Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Flexible shift assignment with weekly and monthly scheduling options
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <BarChart3 className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>Attendance Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Real-time attendance monitoring with detailed reports and analytics
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Shield className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <CardTitle>Role-Based Access</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Secure access control with separate admin and employee interfaces
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">For Employees</CardTitle>
              <CardDescription>Easy-to-use interface for daily attendance management</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold">Personal Dashboard</h4>
                  <p className="text-sm text-gray-600">View personal details, current shift, and attendance history</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold">Quick Check-in/Check-out</h4>
                  <p className="text-sm text-gray-600">Simple one-click attendance marking with real-time tracking</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold">Shift Information</h4>
                  <p className="text-sm text-gray-600">Clear display of current shift timings and working days</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">For Administrators</CardTitle>
              <CardDescription>Comprehensive management tools for workforce oversight</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold">Employee Management</h4>
                  <p className="text-sm text-gray-600">Complete employee database with detailed information access</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold">Shift Assignment</h4>
                  <p className="text-sm text-gray-600">Flexible weekly and monthly shift scheduling for all employees</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold">Detailed Reports</h4>
                  <p className="text-sm text-gray-600">Comprehensive attendance reports with popup tables and analytics</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-600">
            Built with modern web technologies for reliable attendance management
          </p>
        </div>
      </div>
    </div>
  );
}