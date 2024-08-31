import { CurrentWeatherData, HourlyWeatherData, DailyWeatherData } from './models/weather-model';

export const fetchCurrentWeather = async (lat: string, lon: string): Promise<CurrentWeatherData[]> => {
    const response = await fetch(`http://localhost:5000/api/weather/current?lat=${lat}&lon=${lon}`);
    if (!response.ok) {
        throw new Error('Failed to fetch current weather data');
    }
    const data = await response.json();
    return data;
}

export const fetchHourlyWeather = async (lat: string, lon: string, startDate: string, endDate: string): Promise<HourlyWeatherData[]> => {
    const response = await fetch(`http://localhost:5000/api/weather/hourly?lat=${lat}&lon=${lon}&start_date=${startDate}&end_date=${endDate}`);
    if (!response.ok) {
        throw new Error('Failed to fetch hourly weather data');
    }
    const data = await response.json();
    return data;
}

export const fetchDailyWeather = async (lat: string, lon: string, startDate: string, endDate: string): Promise<DailyWeatherData[]> => {
    const response = await fetch(`http://localhost:5000/api/weather/daily?lat=${lat}&lon=${lon}&start_date=${startDate}&end_date=${endDate}`);
    if (!response.ok) {
        throw new Error('Failed to fetch daily weather data');
    }
    const data = await response.json();
    return data;
}