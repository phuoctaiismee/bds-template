import { useQuery } from '@tanstack/react-query';

export const useCoordinates = () => {
  return useQuery<{ lat: number; lng: number }>({
    queryKey: ['location/current'],
    queryFn: async () => {
      return new Promise((resolve, reject) => {
        window.navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({ lng: position.coords.longitude, lat: position.coords.latitude });
          },
          (error) => {
            reject(new Error(error.message));
          },
        );
      });
    },
  });
};
