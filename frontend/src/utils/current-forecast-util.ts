import { useState, useEffect, useContext, useCallback } from 'react';
import { LocationContext } from '../context/LocationContext';
import { CurrentWeatherData } from '../api/models/weather-model';
import { fetchCurrentWeather } from '../api/weather-service';


export const getCurrentWeather = async (lat: string, lon: string) => {
    try {
      const data = await fetchCurrentWeather(lat, lon);
      const weather = data[0];
      if (!weather) return null;
      return {
        temperature: weather.temperature_2m,
        apparentTemperature: weather.apparent_temperature,
        isDay: weather.is_day
      };
    } catch (error) {
      console.error('Error fetching current weather:', error);
      return null;
    }
  };

export const getCurrentLocation = async () => {

}

