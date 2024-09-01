import { CurrentWeatherData, DailyWeatherData, HourlyWeatherData } from "../api/models/weather-model";
import { fetchCurrentWeather, fetchDailyWeather, fetchHourlyWeather } from "../api/weather-service";
import { getDateTime } from  "./time";

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
      const currentDateTime = datetime.date.toString() + " " + datetime.time.toString();

      const data = await fetchDailyWeather(lat, lon, currentDateTime, currentDateTime);
      const weather = data[0];
      return {
        date: weather.date,
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

  export const getHourlyWeather = async (lat: string, lon: string): Promise<HourlyWeatherData[]> => {
    try {
      const datetime = getDateTime();
      const currentDateTime = datetime.date.toString() + " " + datetime.time.toString();
  
      const data = await fetchHourlyWeather(lat, lon, currentDateTime, currentDateTime);
      const startDateTime = new Date(data[0].date + 'T' + data[0].time);
  
      const next24HoursData = data.filter((weather) => {
        const weatherDateTime = new Date(weather.date + 'T' + weather.time);
        const timeDifference = (weatherDateTime.getTime() - startDateTime.getTime()) / (1000 * 60 * 60);
        return timeDifference >= 0 && timeDifference < 24;
      });
  
      return next24HoursData.map(weather => ({
        date: weather.date,
        time: weather.time,
        temperature_2m: weather.temperature_2m,
        precipitation_probability: weather.precipitation_probability,
        precipitation: weather.precipitation,
        weathercode: weather.weathercode
      }));
    } catch (error) {
      console.error('Error fetching hourly weather:', error);
      return [{
        date: "0000-00-00",
        time: "00:00:00",
        temperature_2m: 0,
        precipitation_probability: 0,
        precipitation: 0,
        weathercode: 0
      }];
    }
  };