import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { LocationData } from '../api/location-service';

interface LocationContextProps {
  locationData: LocationData | null;
  setLocationData: (data: LocationData) => void;
}

export const LocationContext = createContext<LocationContextProps | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [locationData, setLocationData] = useState<LocationData | null>(null);

  useEffect(() => {
    if (!locationData) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocationData({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error fetching user location:', error);
        }
      );
    }
  }, [locationData]);

  return (
    <LocationContext.Provider value={{ locationData, setLocationData }}>
      {children}
    </LocationContext.Provider>
  );
};