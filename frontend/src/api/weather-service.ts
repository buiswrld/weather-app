import { CurrentWeatherData, HourlyWeatherData, DailyWeatherData } from './models/weather-model';

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
export const fetchCurrentWeather = async (lat: string, lon: string): Promise<CurrentWeatherData[]> => {
    const response = await fetch(`http://localhost:5000/api/weather/current?lat=${lat}&lon=${lon}`);
    if (!response.ok) {
        throw new Error('Failed to fetch current weather data');
    }
    const data = await response.json();
    return data;
}

/**
 * Fetches the hourly weather data from the server based on the provided latitude, longitude, start date, and end date.
 * 
 * This function sends a GET request to the server's hourly weather API endpoint with the latitude, longitude, start date, and end date parameters.
 * If the response is successful, it returns the hourly weather data. If the response is not successful,
 * it throws an error.
 * 
 * @param lat - The latitude of the location.
 * @param lon - The longitude of the location.
 * @param startDate - The start date for the hourly weather data. In current implementation, this will always be the system time. Formatted as Weekday, Month Day, Year HH:MM
 * @param endDate - The end date for the hourly weather data. In current implementaion, this will be the system time + 1 day (24 hours). Formatted as Weekday, Month Day, Year HH:MM
 * @returns A promise that resolves to an array of HourlyWeatherData objects.
 * @throws An error if the fetch request fails or the response is not ok.
 */
export const fetchHourlyWeather = async (lat: string, lon: string, startDate: string, endDate: string): Promise<HourlyWeatherData[]> => {
    const response = await fetch(`http://localhost:5000/api/weather/hourly?lat=${lat}&lon=${lon}&start_date=${startDate}&end_date=${endDate}`);
    if (!response.ok) {
        throw new Error('Failed to fetch hourly weather data');
    }
    const data = await response.json();
    return data;
}

/**
 * Fetches the daily weather data from the server based on the provided latitude, longitude, start date, and end date.
 * 
 * This function sends a GET request to the server's daily weather API endpoint with the latitude, longitude, start date, and end date parameters.
 * If the response is successful, it returns the daily weather data. If the response is not successful,
 * it throws an error.
 * 
 * @param lat - The latitude of the location.
 * @param lon - The longitude of the location.
 * @param startDate - The start date for the daily weather data. In current implementation, this will always be the system time. Formatted as Weekday, Month Day, Year HH:MM
 * @param endDate - The end date for the daily weather data. In current implementation, this will be the system time + 5 days. Formatted as Weekday, Month Day, Year HH:MM
 * @returns A promise that resolves to an array of DailyWeatherData objects.
 * @throws An error if the fetch request fails or the response is not ok.
 */
export const fetchDailyWeather = async (lat: string, lon: string, startDate: string, endDate: string): Promise<DailyWeatherData[]> => {
    try {
        const response = await fetch(`http://localhost:5000/api/weather/daily?lat=${lat}&lon=${lon}&start_date=${startDate}&end_date=${endDate}`);
        if (!response.ok) {
            throw new Error('Failed to fetch daily weather data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in fetchDailyWeather:', error); 
        throw error;
    }
}