// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { useAuth } from '@/contexts/AuthContext';
// import { storage } from '@/lib/storage';
// import { getCurrentLocation, isWithinOfficeRadius } from '@/utils/locationUtils';
// import { ArrowLeft, Camera, CheckCircle, MapPin, XCircle } from 'lucide-react';
// import React, { useCallback, useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function AttendanceCapture() {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
  
//   const [isStreaming, setIsStreaming] = useState(false);
//   const [capturedImage, setCapturedImage] = useState<string | null>(null);
//   const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
//   const [isWithinOffice, setIsWithinOffice] = useState<boolean | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const startCamera = useCallback(async () => {
//     try {
//       setError('');
//       const stream = await navigator.mediaDevices.getUserMedia({ 
//         video: { facingMode: 'user' } 
//       });
      
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//         setIsStreaming(true);
//       }
//     } catch (err) {
//       setError('Unable to access camera. Please allow camera permissions.');
//     }
//   }, []);

//   const stopCamera = useCallback(() => {
//     if (videoRef.current?.srcObject) {
//       const stream = videoRef.current.srcObject as MediaStream;
//       stream.getTracks().forEach(track => track.stop());
//       videoRef.current.srcObject = null;
//       setIsStreaming(false);
//     }
//   }, []);

//   const capturePhoto = useCallback(() => {
//     if (videoRef.current && canvasRef.current) {
//       const canvas = canvasRef.current;
//       const video = videoRef.current;
      
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
      
//       const ctx = canvas.getContext('2d');
//       if (ctx) {
//         ctx.drawImage(video, 0, 0);
//         const imageData = canvas.toDataURL('image/jpeg', 0.8);
//         setCapturedImage(imageData);
//         stopCamera();
//       }
//     }
//   }, [stopCamera]);

//   const getLocation = useCallback(async () => {
//     try {
//       setIsLoading(true);
//       setError('');
      
//       const userLocation = await getCurrentLocation();
//       setLocation(userLocation);
      
//       const officeLocation = storage.getOfficeLocation();
//       const withinOffice = isWithinOfficeRadius(
//         userLocation.lat,
//         userLocation.lng,
//         officeLocation.lat,
//         officeLocation.lng,
//         officeLocation.radius
//       );
      
//       setIsWithinOffice(withinOffice);
//     } catch (err) {
//       setError('Unable to get location. Please enable location services.');
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   const markAttendance = useCallback(async (type: 'checkIn' | 'checkOut') => {
//     if (!user || !capturedImage || !location || isWithinOffice === null) {
//       setError('Please capture photo and get location first.');
//       return;
//     }

//     try {
//       setIsLoading(true);
//       const today = new Date().toISOString().split('T')[0];
//       const currentTime = new Date().toISOString();
      
//       const existingRecords = storage.getAttendanceRecords();
//       let todayRecord = existingRecords.find(
//         record => record.userId === user.id && record.date === today
//       );

//       if (!todayRecord) {
//         todayRecord = {
//           id: `${user.id}-${today}`,
//           userId: user.id,
//           date: today,
//           status: 'present'
//         };
//       }

//       const attendanceData = {
//         time: currentTime,
//         location,
//         image: capturedImage,
//         isWithinOffice
//       };

//       if (type === 'checkIn') {
//         todayRecord.checkIn = attendanceData;
//         // Determine if late (assuming 9 AM is standard time)
//         const checkInTime = new Date(currentTime);
//         const standardTime = new Date(today + 'T09:00:00');
//         if (checkInTime > standardTime) {
//           todayRecord.status = 'late';
//         }
//       } else {
//         todayRecord.checkOut = attendanceData;
//         // Check for short attendance (less than 8 hours)
//         if (todayRecord.checkIn) {
//           const checkInTime = new Date(todayRecord.checkIn.time);
//           const checkOutTime = new Date(currentTime);
//           const hoursWorked = (checkOutTime.getTime() - checkInTime.getTime()) / (1000 * 60 * 60);
//           if (hoursWorked < 8) {
//             todayRecord.status = 'short_attendance';
//           }
//         }
//       }

//       storage.addAttendanceRecord(todayRecord);
      
//       setSuccess(`${type === 'checkIn' ? 'Check-in' : 'Check-out'} successful! ${
//         isWithinOffice ? '✅ Within office premises' : '❌ Outside office premises'
//       }`);
      
//       setTimeout(() => {
//         navigate('/dashboard');
//       }, 2000);
      
//     } catch (err) {
//       setError('Failed to mark attendance. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   }, [user, capturedImage, location, isWithinOffice, navigate]);

//   React.useEffect(() => {
//     return () => {
//       stopCamera();
//     };
//   }, [stopCamera]);

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <div className="max-w-2xl mx-auto">
//         <div className="flex items-center mb-6">
//           <Button
//             variant="ghost"
//             onClick={() => navigate('/dashboard')}
//             className="mr-4"
//           >
//             <ArrowLeft className="h-4 w-4 mr-2" />
//             Back to Dashboard
//           </Button>
//           <h1 className="text-2xl font-bold">Mark Attendance</h1>
//         </div>

//         <div className="space-y-6">
//           {/* Camera Section */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center space-x-2">
//                 <Camera className="h-5 w-5" />
//                 <span>Capture Photo</span>
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {!capturedImage ? (
//                   <div className="relative">
//                     <video
//                       ref={videoRef}
//                       autoPlay
//                       playsInline
//                       className="w-full max-w-md mx-auto rounded-lg bg-gray-200"
//                       style={{ display: isStreaming ? 'block' : 'none' }}
//                     />
//                     <canvas ref={canvasRef} className="hidden" />
                    
//                     {!isStreaming && (
//                       <div className="w-full max-w-md mx-auto h-64 bg-gray-200 rounded-lg flex items-center justify-center">
//                         <div className="text-center">
//                           <Camera className="h-12 w-12 mx-auto mb-4 text-gray-400" />
//                           <p className="text-gray-600">Camera not started</p>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <div className="text-center">
//                     <img
//                       src={capturedImage}
//                       alt="Captured"
//                       className="w-full max-w-md mx-auto rounded-lg"
//                     />
//                   </div>
//                 )}

//                 <div className="flex justify-center space-x-4">
//                   {!capturedImage ? (
//                     <>
//                       {!isStreaming ? (
//                         <Button onClick={startCamera}>
//                           Start Camera
//                         </Button>
//                       ) : (
//                         <Button onClick={capturePhoto}>
//                           Capture Photo
//                         </Button>
//                       )}
//                     </>
//                   ) : (
//                     <Button
//                       variant="outline"
//                       onClick={() => {
//                         setCapturedImage(null);
//                         startCamera();
//                       }}
//                     >
//                       Retake Photo
//                     </Button>
//                   )}
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Location Section */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center space-x-2">
//                 <MapPin className="h-5 w-5" />
//                 <span>Location Verification</span>
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {location ? (
//                   <div className="p-4 bg-gray-50 rounded-lg">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <p className="font-medium">Location Captured</p>
//                         <p className="text-sm text-gray-600">
//                           Lat: {location.lat.toFixed(6)}, Lng: {location.lng.toFixed(6)}
//                         </p>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         {isWithinOffice ? (
//                           <CheckCircle className="h-6 w-6 text-green-500" />
//                         ) : (
//                           <XCircle className="h-6 w-6 text-red-500" />
//                         )}
//                         <span className={`text-sm font-medium ${
//                           isWithinOffice ? 'text-green-700' : 'text-red-700'
//                         }`}>
//                           {isWithinOffice ? 'Within Office' : 'Outside Office'}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   <Button
//                     onClick={getLocation}
//                     disabled={isLoading}
//                     className="w-full"
//                   >
//                     {isLoading ? 'Getting Location...' : 'Get Current Location'}
//                   </Button>
//                 )}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Actions */}
//           {capturedImage && location && (
//             <Card>
//               <CardHeader>
//                 <CardTitle>Mark Attendance</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-2 gap-4">
//                   <Button
//                     onClick={() => markAttendance('checkIn')}
//                     disabled={isLoading}
//                     className="w-full"
//                   >
//                     {isLoading ? 'Processing...' : 'Check In'}
//                   </Button>
//                   <Button
//                     onClick={() => markAttendance('checkOut')}
//                     disabled={isLoading}
//                     variant="outline"
//                     className="w-full"
//                   >
//                     {isLoading ? 'Processing...' : 'Check Out'}
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           )}

//           {/* Messages */}
//           {error && (
//             <Alert variant="destructive">
//               <AlertDescription>{error}</AlertDescription>
//             </Alert>
//           )}

//           {success && (
//             <Alert>
//               <CheckCircle className="h-4 w-4" />
//               <AlertDescription>{success}</AlertDescription>
//             </Alert>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }