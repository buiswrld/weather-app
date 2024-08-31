import { WeatherData } from './model';

export const fetchTemperature = async(lat: string, lon: string): Promise<WeatherData> => {
    const response = await fetch(`http://localhost:5000/api/temperature?lat=${lat}&lon=${lon}`);
    const data = await response.json();
    return data;
}