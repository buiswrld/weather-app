import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { LocationCoords } from '../api/models/location-model';

/**
 * Interface for the LocationContext properties.
 */
interface LocationContextProps {
  locationData: LocationCoords | null;
  setLocationData: (data: LocationCoords) => void;
}

/**
 * Default values for the LocationContext.
 */
const defaultLocationContext: LocationContextProps = {
  locationData: null,
  setLocationData: () => {}
};

/**
 * Creates a context for location data.
 */
export const LocationContext = createContext<LocationContextProps>(defaultLocationContext);


/**
 * LocationProvider component that provides location data to its children.
 * 
 * @param children - The child components that will consume the location context.
 * @returns A provider component that supplies location data and a function to update it.
 */
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