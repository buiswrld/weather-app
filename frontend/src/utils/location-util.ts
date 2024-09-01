import { useContext } from 'react';
import { LocationContext } from '../context/location-context';
import { fetchLocationName } from '../api/location-service';

export const getLocationName = async (lat: string, lon: string): Promise<string>=> {
  try {
    const locationData = await fetchLocationName(lat, lon);
    console.log(locationData[0].location);
    return locationData[0].location;
  } catch (error) {
    console.error('Error fetching location name:', error);
    return "LOCATION ERROR";
  }
};

export const useLocationFromContext = (): { lat: string; lon: string } => {
  const context = useContext(LocationContext);
  return {
    lat: context.locationData?.lat.toString() || "",
    lon: context.locationData?.lon.toString() || ""
  };
};


