import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { LocationCoords } from '../api/models/location-model';

interface LocationContextProps {
  locationData: LocationCoords;
  setLocationData: (data: LocationCoords) => void;
}

const defaultLocationContext: LocationContextProps = {
  locationData: { lat: 0, lon: 0 },
  setLocationData: () => {}
};

export const LocationContext = createContext<LocationContextProps>(defaultLocationContext);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [locationData, setLocationData] = useState<LocationCoords>({"lat": 0, "lon": 0});

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