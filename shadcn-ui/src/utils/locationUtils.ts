// export const calculateDistance = (
//   lat1: number,
//   lng1: number,
//   lat2: number,
//   lng2: number
// ): number => {
//   const R = 6371e3; // Earth's radius in meters
//   const φ1 = (lat1 * Math.PI) / 180;
//   const φ2 = (lat2 * Math.PI) / 180;
//   const Δφ = ((lat2 - lat1) * Math.PI) / 180;
//   const Δλ = ((lng2 - lng1) * Math.PI) / 180;

//   const a =
//     Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
//     Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//   return R * c; // Distance in meters
// };

// export const getCurrentLocation = (): Promise<{ lat: number; lng: number }> => {
//   return new Promise((resolve, reject) => {
//     if (!navigator.geolocation) {
//       reject(new Error('Geolocation is not supported by this browser.'));
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         resolve({
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         });
//       },
//       (error) => {
//         reject(error);
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 10000,
//         maximumAge: 0,
//       }
//     );
//   });
// };

// export const isWithinOfficeRadius = (
//   userLat: number,
//   userLng: number,
//   officeLat: number,
//   officeLng: number,
//   radiusInMeters: number
// ): boolean => {
//   const distance = calculateDistance(userLat, userLng, officeLat, officeLng);
//   return distance <= radiusInMeters;
// };