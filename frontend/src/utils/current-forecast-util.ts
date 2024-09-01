import { useContext } from 'react';
import { LocationContext } from '../context/LocationContext';
import { CurrentWeatherData, DailyWeatherData } from '../api/models/weather-model';
import { fetchCurrentWeather } from '../api/weather-service';
import { fetchLocationName } from '../api/location-service';
import { fetchDailyWeather } from '../api/weather-service';


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

  export const getDailyWeather = async (lat: string, lon: string): Promise<DailyWeatherData> => {
    try {
      const datetime = getDateTime();
      const currentDate = datetime.date;
      const currentTime = datetime.time;

      const data = await fetchDailyWeather(lat, lon, currentDate, currentTime);
      const weather = data[0];
      return {
        date: currentDate,
        temperature_2m_max: weather.temperature_2m_max,
        temperature_2m_min: weather.temperature_2m_min,
        sunrise: weather.sunrise,
        sunset: weather.sunset,
        uv_index_max: weather.uv_index_max
      };
    } catch (error) {
      console.error('Error fetching current weather:', error);
      return {
        date: "0000-00-00",
        temperature_2m_max: 0,
        temperature_2m_min: 0,
        sunrise: "00:00:00",
        sunset: "00:00:00",
        uv_index_max: 0
      }
    }
  };

  export const getDateTime = () => {
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: undefined,
      hour12: true,
    };
  
    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
  
    const now = new Date();
    const date = now.toLocaleDateString('en-US', dateOptions);
    const time = now.toLocaleTimeString('en-US', timeOptions);
  
    return { date, time };
  };

export const getLocationName = async (lat: string, lon: string): Promise<string>=> {
  try {
    const locationData = await fetchLocationName(lat, lon);
    console.log(locationData[0].location);
    return locationData[0].location;
  } catch (error) {
    console.error('Error fetching location name:', error);
    return "LOCATION ERROR";
  }
};

export const useLocationFromContext = (): { lat: string; lon: string } => {
  const context = useContext(LocationContext);
  return {
    lat: context.locationData?.lat.toString() || "",
    lon: context.locationData?.lon.toString() || ""
  };
};


