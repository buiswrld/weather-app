import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { LocationCoords } from '../api/models/location-model';

interface LocationContextProps {
  locationData: LocationCoords | null;
  setLocationData: (data: LocationCoords) => void;
}

const defaultLocationContext: LocationContextProps = {
  locationData: null,
  setLocationData: () => {}
};

export const LocationContext = createContext<LocationContextProps>(defaultLocationContext);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [locationData, setLocationData] = useState<LocationCoords | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocationData({ lat: latitude, lon: longitude });
      },
      (error) => {
        console.error('Error fetching user location:', error);
      }
    );
  }, []);

  return (
    <LocationContext.Provider value={{ locationData, setLocationData }}>
      {children}
    </LocationContext.Provider>
  );
};