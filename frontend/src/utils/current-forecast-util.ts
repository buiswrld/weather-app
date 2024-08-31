import { useState, useEffect, useContext, useCallback } from 'react';
import { LocationContext } from '../context/LocationContext';
import { CurrentWeatherData } from '../api/models/weather-model';
import { fetchCurrentWeather } from '../api/weather-service';
import { fetchLocationName } from '../api/location-service';


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

export const useLocationName = async () => {
  const context = useContext(LocationContext);
  const data = {
    "lat": context.locationData.lat.toString(),
    "lon": context.locationData.lon.toString()
  }
  try {
    const locationData = await fetchLocationName(data.lat, data.lon);
    return locationData[0].name;
  } catch (error) {
    console.error('Error fetching location name:', error);
    return
  }
};


