import { useContext } from 'react';
import { LocationContext } from '../context/location-context';
import { fetchLocationName } from '../api/location-service';


/**
 * Fetches the location name for a given latitude and longitude.
 * 
 * @param lat - The latitude of the location.
 * @param lon - The longitude of the location.
 * @returns A promise that resolves to a string containing the location name.
 */
export const getLocationName = async (lat: string, lon: string): Promise<string>=> {
  try {
    const locationData = await fetchLocationName(lat, lon);
    return locationData[0].location;
  } catch (error) {
    console.error('Error fetching location name:', error);
    return "LOCATION ERROR";
  }
};


/**
 * Retrieves the latitude and longitude from the LocationContext.
 * 
 * @returns An object containing the latitude and longitude as strings. Used for context.
 */
export const useLocationFromContext = (): { lat: string; lon: string } => {
  const context = useContext(LocationContext);
  return {
    lat: context.locationData?.lat.toString() || "",
    lon: context.locationData?.lon.toString() || ""
  };
};


