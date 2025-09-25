// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { saveSession, validateAdmin } from '@/lib/storage';
// import { LoginSession } from '@/types';
// import { ArrowLeft, Lock, Shield, User } from 'lucide-react';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';

// export default function AdminLogin() {
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     username: '',
//     password: ''
//   });

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       if (!formData.username.trim() || !formData.password.trim()) {
//         toast.error('Please enter both username and password');
//         return;
//       }

//       const isValid = validateAdmin(formData.username.trim(), formData.password);
      
//       if (!isValid) {
//         toast.error('Invalid username or password');
//         return;
//       }

//       // Create admin session
//       const session: LoginSession = {
//         type: 'admin',
//         id: 'admin',
//         name: 'Administrator',
//         loginTime: new Date().toISOString()
//       };

//       saveSession(session);
//       toast.success('Welcome, Administrator!');
//       navigate('/admin-dashboard');
      
//     } catch (error) {
//       toast.error('Login failed. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
//       <div className="container mx-auto max-w-md">
//         {/* Back Button */}
//         <Button 
//           variant="ghost" 
//           onClick={() => navigate('/')}
//           className="mb-6"
//         >
//           <ArrowLeft className="mr-2 h-4 w-4" />
//           Back to Home
//         </Button>

//         <Card>
//           <CardHeader className="text-center">
//             <div className="flex justify-center mb-4">
//               <Shield className="h-12 w-12 text-purple-600" />
//             </div>
//             <CardTitle className="text-2xl">Admin Login</CardTitle>
//             <CardDescription>
//               Enter your administrator credentials to access the admin panel
//             </CardDescription>
//           </CardHeader>
          
//           <CardContent>
//             <form onSubmit={handleLogin} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="username">Username</Label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                   <Input
//                     id="username"
//                     placeholder="Enter admin username"
//                     value={formData.username}
//                     onChange={(e) => setFormData({...formData, username: e.target.value})}
//                     className="pl-10"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="password">Password</Label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                   <Input
//                     id="password"
//                     type="password"
//                     placeholder="Enter admin password"
//                     value={formData.password}
//                     onChange={(e) => setFormData({...formData, password: e.target.value})}
//                     className="pl-10"
//                     required
//                   />
//                 </div>
//               </div>

//               <Button type="submit" className="w-full" disabled={isLoading}>
//                 {isLoading ? 'Logging in...' : 'Login as Admin'}
//               </Button>
//             </form>

//             {/* Demo Credentials Reminder */}
//             <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
//               <h4 className="font-semibold text-yellow-800 text-sm mb-1">Demo Credentials:</h4>
//               <p className="text-xs text-yellow-700">Username: admin</p>
//               <p className="text-xs text-yellow-700">Password: admin123</p>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }