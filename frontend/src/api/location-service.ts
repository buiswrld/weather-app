import { LocationCoords, LocationName } from './models/location-model';

export const fetchLocationCoords = async (location: string): Promise<LocationCoords[]> => {
    const response = await fetch(`http://localhost:5000/api/coords?location=${location}`);
    if (!response.ok) {
        throw new Error('Failed to fetch location data');
    }
    const data = await response.json()
    return data;
}

export const fetchLocationName = async (lat: string, lon: string): Promise<LocationName[]> => {
    const response = await fetch(`http://localhost:5000/api/location?lat=${lat}&lon=${lon}`);
    if (!response.ok) {
        throw new Error('Failed to fetch location name');
    }
    const data = await response.json();
    return data;
}