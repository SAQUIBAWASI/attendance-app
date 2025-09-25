// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Separator } from '@/components/ui/separator';
// import {
//   generateId,
//   getEmployeeByEmail,
//   saveEmployee,
//   saveSession
// } from '@/lib/storage';
// import { Employee, LoginSession } from '@/types';
// import { ArrowLeft, Building2, LogIn, Mail, Phone, User, UserPlus } from 'lucide-react';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';

// export default function EmployeeLogin() {
//   const navigate = useNavigate();
//   const [isRegistration, setIsRegistration] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     email: '',
//     name: '',
//     phone: '',
//     department: ''
//   });

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       if (!formData.email.trim()) {
//         toast.error('Please enter your email');
//         return;
//       }

//       const employee = getEmployeeByEmail(formData.email.trim());
//       if (!employee) {
//         toast.info('Email not found. Please register first.');
//         setIsRegistration(true);
//         return;
//       }

//       const session: LoginSession = {
//         id: employee.id,
//         type: 'employee',
//         email: employee.email,
//         name: employee.name,
//         loginTime: new Date().toISOString()
//       };

//       saveSession(session);
//       toast.success(`Welcome back, ${employee.name}!`);
//       navigate('/employee-dashboard');

//     } catch (error) {
//       toast.error('Login failed. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleRegistration = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.department.trim()) {
//         toast.error('Please fill all required fields');
//         return;
//       }

//       // Check if employee already exists
//       const existingEmployee = getEmployeeByEmail(formData.email.trim());
//       if (existingEmployee) {
//         toast.error('Employee with this email already exists');
//         setIsRegistration(false);
//         return;
//       }

//       const newEmployee: Employee = {
//         id: generateId(),
//         name: formData.name.trim(),
//         email: formData.email.trim(),
//         phone: formData.phone.trim(),
//         department: formData.department.trim(),
//         role: 'employee',
//         joinDate: new Date().toISOString().split('T')[0],
//         createdAt: new Date().toISOString()
//       };

//       saveEmployee(newEmployee);

//       // Auto-login after registration
//       const session: LoginSession = {
//         id: newEmployee.id,
//         type: 'employee',
//         email: newEmployee.email,
//         name: newEmployee.name,
//         loginTime: new Date().toISOString()
//       };

//       saveSession(session);
//       toast.success('Registration successful! Welcome to the system.');
//       navigate('/employee-dashboard');

//     } catch (error) {
//       toast.error('Registration failed. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleBackToLogin = () => {
//     setIsRegistration(false);
//     setFormData({ email: '', name: '', phone: '', department: '' });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <Button
//           variant="ghost"
//           onClick={() => navigate('/')}
//           className="mb-6 text-gray-600 hover:text-gray-900"
//         >
//           <ArrowLeft className="mr-2 h-4 w-4" />
//           Back to Home
//         </Button>

//         <Card className="shadow-lg">
//           <CardHeader className="text-center space-y-2">
//             <CardTitle className="flex items-center justify-center space-x-2">
//               <User className="h-6 w-6" />
//               <span className="text-2xl">
//                 {isRegistration ? 'Employee Registration' : 'Employee Login'}
//               </span>
//             </CardTitle>
//             <CardDescription>
//               {isRegistration 
//                 ? 'Complete your registration to continue' 
//                 : 'Enter your email to access your dashboard'
//               }
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             {isRegistration ? (
//               // Registration Form
//               <form onSubmit={handleRegistration} className="space-y-4">
//                 {/* Email Field - FIXED: Make sure it's editable */}
//                 <div className="space-y-2">
//                   <Label htmlFor="reg-email" className="text-sm font-medium">Email Address</Label>
//                   <div className="relative">
//                     <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                     <Input
//                       id="reg-email"
//                       type="email"
//                       placeholder="Enter your email"
//                       value={formData.email}
//                       onChange={(e) => setFormData({...formData, email: e.target.value})}
//                       className="pl-10 h-12"
//                       required
//                       disabled={false} // Explicitly ensure it's not disabled
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="reg-name" className="text-sm font-medium">Full Name</Label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                     <Input
//                       id="reg-name"
//                       type="text"
//                       placeholder="Enter your full name"
//                       value={formData.name}
//                       onChange={(e) => setFormData({...formData, name: e.target.value})}
//                       className="pl-10 h-12"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="reg-phone" className="text-sm font-medium">Phone Number</Label>
//                   <div className="relative">
//                     <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                     <Input
//                       id="reg-phone"
//                       type="tel"
//                       placeholder="Enter your phone number"
//                       value={formData.phone}
//                       onChange={(e) => setFormData({...formData, phone: e.target.value})}
//                       className="pl-10 h-12"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="reg-department" className="text-sm font-medium">Department</Label>
//                   <div className="relative">
//                     <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                     <Input
//                       id="reg-department"
//                       type="text"
//                       placeholder="Enter your department"
//                       value={formData.department}
//                       onChange={(e) => setFormData({...formData, department: e.target.value})}
//                       className="pl-10 h-12"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <Button type="submit" className="w-full h-12 text-base" disabled={isLoading}>
//                   {isLoading ? 'Processing...' : (
//                     <>
//                       <UserPlus className="mr-2 h-4 w-4" />
//                       Register & Login
//                     </>
//                   )}
//                 </Button>

//                 <div className="text-center">
//                   <Button
//                     type="button"
//                     variant="link"
//                     onClick={handleBackToLogin}
//                     className="text-sm"
//                   >
//                     Already registered? Login here
//                   </Button>
//                 </div>
//               </form>
//             ) : (
//               // Login Form
//               <form onSubmit={handleLogin} className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="login-email" className="text-sm font-medium">Email Address</Label>
//                   <div className="relative">
//                     <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                     <Input
//                       id="login-email"
//                       type="email"
//                       placeholder="Enter your email"
//                       value={formData.email}
//                       onChange={(e) => setFormData({...formData, email: e.target.value})}
//                       className="pl-10 h-12"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <Button type="submit" className="w-full h-12 text-base" disabled={isLoading}>
//                   {isLoading ? 'Processing...' : (
//                     <>
//                       <LogIn className="mr-2 h-4 w-4" />
//                       Login
//                     </>
//                   )}
//                 </Button>

//                 <Separator />

//                 <div className="text-center">
//                   <Button
//                     type="button"
//                     variant="link"
//                     onClick={() => {
//                       setIsRegistration(true);
//                       // Keep existing email if user was trying to login
//                     }}
//                     className="text-sm"
//                   >
//                     New employee? Register here
//                   </Button>
//                 </div>
//               </form>
//             )}

//             {/* Demo Info */}
//             <div className="mt-4 p-3 bg-blue-50 rounded-lg">
//               <p className="text-xs text-blue-700 text-center">
//                 <strong>Demo:</strong> Use any email to register or try existing: amit.sharma@company.com
//               </p>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }