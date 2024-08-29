import { WeatherData } from './model';

export const fetchWeather = async(lat: string, lon: string): Promise<WeatherData> => {
    const response = await fetch(`http://localhost:5000/api/weather?lat=${lat}&lon=${lon}`);
    const data = await response.json();
    return data;
}