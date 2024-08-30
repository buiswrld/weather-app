export interface LocationData {
    lat: number;
    lng: number;
}

export const fetchLocationData = async (location: string): Promise<LocationData> => {
    const response = await fetch(`http://localhost:5000/api/location?location=${location}`);
    if (!response.ok) {
        throw new Error('Failed to fetch location data');
    }
    const data = await response.json();
    return data;
}