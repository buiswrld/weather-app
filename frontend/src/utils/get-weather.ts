import { CurrentWeatherData, DailyWeatherData, HourlyWeatherData } from "../api/models/weather-model";
import { fetchCurrentWeather, fetchDailyWeather, fetchHourlyWeather } from "../api/weather-service";
import { getDateTime, floorTimeToHour, convert24To12Hour } from  "./time";

export const getCurrentWeather = async (lat: string, lon: string): Promise<CurrentWeatherData> => {
    try {
      const data = await fetchCurrentWeather(lat, lon);
      const weather = data[0];
      return {
        temperature_2m: weather.temperature_2m,
        apparent_temperature: weather.apparent_temperature,
        is_day: weather.is_day
      };
    } catch (error) {
      console.error('Error fetching current weather:', error);
      return {
        temperature_2m: 0,
        apparent_temperature: 0,
        is_day: 0
      }
    }
  };

  export const getDailyWeather = async (lat: string, lon: string): Promise<DailyWeatherData[]> => {
    try {
      const currentDate = new Date();
      const currentDateTime = getDateTime(currentDate, false);
      const endDate = new Date(currentDate);
      endDate.setDate(endDate.getDate() + 5);
      const endDateTime = getDateTime(endDate, false);

      const data = await fetchDailyWeather(
        lat, 
        lon, 
        `${currentDateTime.date} ${currentDateTime.time}`, 
        `${endDateTime.date} ${endDateTime.time}`
      );
      return data.map(weather => ({
        date: weather.date,
        temperature_2m_max: weather.temperature_2m_max,
        temperature_2m_min: weather.temperature_2m_min,
        sunrise: weather.sunrise,
        sunset: weather.sunset,
        uv_index_max: weather.uv_index_max,
        weathercode: weather.weathercode,
        precipitation_probability_max: weather.precipitation_probability_max
      }));
    } catch (error) {
      console.error('Error fetching current weather:', error);
      return [{
        date: "0000-00-00",
        temperature_2m_max: 0,
        temperature_2m_min: 0,
        sunrise: "00:00:00",
        sunset: "00:00:00",
        uv_index_max: 0,
        weathercode: 0,
        precipitation_probability_max: 0
      
      }]
    }
  };

  export const getHourlyWeather = async (lat: string, lon: string): Promise<HourlyWeatherData[]> => {
    try {
      const currentDate = new Date();
      const currentDateTime = getDateTime(currentDate, false); // Use 24-hour format
      const flooredCurrentTime = floorTimeToHour(currentDateTime.time);
  
      const endDate = new Date(currentDate);
      endDate.setDate(endDate.getDate() + 1);
      const endDateTime = getDateTime(endDate, false); // Use 24-hour format
  
      const data = await fetchHourlyWeather(
        lat, 
        lon, 
        `${currentDateTime.date} ${currentDateTime.time}`, 
        `${endDateTime.date} ${endDateTime.time}`
      );
  
      const startIndex = data.findIndex(weather => weather.time === flooredCurrentTime);
      const next24HoursData = data.slice(startIndex, startIndex + 24);
  
      return next24HoursData.map(weather => ({
        date: weather.date,
        time: convert24To12Hour(floorTimeToHour(weather.time)), // Convert to 12-hour format for display
        temperature_2m: weather.temperature_2m,
        precipitation_probability: weather.precipitation_probability,
        precipitation: weather.precipitation,
        weathercode: weather.weathercode
      }));
  
    } catch (error) {
      console.error('Error fetching hourly weather:', error);
      return [];
    }
  };