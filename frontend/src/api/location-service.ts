import { LocationCoords, LocationName } from './models/location-model';

/**
 * Fetches the coordinates for a given location from the server.
 * 
 * This function sends a GET request to the server's coordinates API endpoint with the location parameter.
 * If the response is successful, it returns the location coordinates. If the response is not successful,
 * it throws an error.
 * 
 * @param location - The name of the location to fetch coordinates for.
 * @returns A promise that resolves to an array of LocationCoords objects.
 * @throws An error if the fetch request fails or the response is not ok.
 */
export const fetchLocationCoords = async (location: string): Promise<LocationCoords[]> => {
    const response = await fetch(`http://localhost:5000/api/coords?location=${location}`);
    if (!response.ok) {
        throw new Error('Failed to fetch location data');
    }
    const data = await response.json()
    return data;
}

/**
 * Fetches the name of a location based on the provided latitude and longitude from the server.
 * 
 * This function sends a GET request to the server's location API endpoint with the latitude and longitude parameters.
 * If the response is successful, it returns the location name. If the response is not successful,
 * it throws an error.
 * 
 * @param lat - The latitude of the location.
 * @param lon - The longitude of the location.
 * @returns A promise that resolves to an array of LocationName objects.
 * @throws An error if the fetch request fails or the response is not ok.
 */
export const fetchLocationName = async (lat: string, lon: string): Promise<LocationName[]> => {
    const response = await fetch(`http://localhost:5000/api/location?lat=${lat}&lon=${lon}`);
    if (!response.ok) {
        throw new Error('Failed to fetch location name');
    }
    const data = await response.json();
    return data;
}