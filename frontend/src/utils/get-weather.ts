import { CurrentWeatherData, DailyWeatherData, HourlyWeatherData } from "../api/models/weather-model";
import { fetchCurrentWeather, fetchDailyWeather, fetchHourlyWeather } from "../api/weather-service";
import { getDateTime, floorTimeToHour, convert24To12Hour } from  "./time";

/**
 * Fetches the current weather data for a given latitude and longitude.
 * 
 * @param lat - The latitude of the location.
 * @param lon - The longitude of the location.
 * @returns A promise that resolves to an object of CurrentWeatherData (temperature_2m, apparent_temperature, is_day).
 */
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

/**
 * Fetches the daily weather data for the next 5 days for a given latitude and longitude.
 * 
 * @param lat - The latitude of the location.
 * @param lon - The longitude of the location.
 * @returns A promise that resolves to an array of objects containing the daily weather data. Starts at system date and goes up to 5 days ahead, inclusive
 *          Inside each object is the following data: date, temperature_2m_max, temperature_2m_min, sunrise, sunset, uv_index_max, weathercode, precipitation_probability_max.
 */
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

/**
 * Fetches the daily weather data for the next 5 days for a given latitude and longitude.
 * 
 * @param lat - The latitude of the location.
 * @param lon - The longitude of the location.
 * @returns A promise that resolves to an array of objects containing the daily weather data. Starts at system date and goes up 1 day ahead. 
 *          Returns 24 hours worth of data (including the current hour, but not the 24th hour).
 *          Inside each object is the following data: date, time, temperature_2m, precipitation_probability, precipitation, weathercode.
 */
  export const getHourlyWeather = async (lat: string, lon: string): Promise<HourlyWeatherData[]> => {
    try {
      const currentDate = new Date();
      const currentDateTime = getDateTime(currentDate, false);
      const flooredCurrentTime = floorTimeToHour(currentDateTime.time);
  
      const endDate = new Date(currentDate);
      endDate.setDate(endDate.getDate() + 1);
      const endDateTime = getDateTime(endDate, false);
  
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
        time: convert24To12Hour(floorTimeToHour(weather.time)),
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