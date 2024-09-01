import React, { useEffect, useState } from 'react';
import Temperature from './temperature';
import Location from './location';
import TemperatureBound from './temperature-bound';
import HourlyForecast from './hourly-forecast';
import { getCurrentWeather, getDailyWeather, getHourlyWeather } from '../../utils/get-weather';
import { useLocationFromContext, getLocationName } from '../../utils/location-util';
import { Box, Heading, Text, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import { CurrentWeatherData, DailyWeatherData, HourlyWeatherData } from '../../api/models/weather-model';

const CurrentForecast = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherData | null>(null);
  const [dailyWeather, setDailyWeather] = useState<DailyWeatherData | null>(null);
  const [hourlyWeather, setHourlyWeather] = useState<HourlyWeatherData[] | null>(null);
  const [location, setLocation] = useState<string>('');

  const { lat, lon } = useLocationFromContext();



  useEffect(() => {
    console.log(`useEffect triggered with lat: ${lat} and lon: ${lon}`);
    if (lat && lon) {
      const fetchWeather = async () => {
        try {
          setCurrentWeather(await getCurrentWeather(lat, lon));
          setHourlyWeather(await getHourlyWeather(lat, lon));
          setDailyWeather(await getDailyWeather(lat, lon))
          setLocation(await getLocationName(lat, lon));
        } catch (error) {
          setError('Failed to fetch weather data');
        } finally {
          setLoading(false);
        }
      };

      fetchWeather();
    }
  }, [lat, lon]);

  if (!lat || !lon) {
    return <Spinner />;
  }

  return (
    <Box className="container" mx="auto" p="4">
      {loading && <Spinner />}
      {error && (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      )}
      {currentWeather && hourlyWeather && dailyWeather ? (
      <Box>
        <Location location={location} />
        <Box display="flex" justifyContent="space-between" alignItems = "center">
            <Temperature 
              temperature={currentWeather.temperature_2m} 
              is_day={currentWeather.is_day} 
              apparent_temperature={currentWeather.apparent_temperature} 
              temp_max={dailyWeather.temperature_2m_max}
              temp_min={dailyWeather.temperature_2m_min}
            />
            <TemperatureBound 
              is_day = {currentWeather.is_day}
              temp_max={dailyWeather.temperature_2m_max} 
              temp_min={dailyWeather.temperature_2m_min} 
            />
          </Box>
        <Heading size="md">Hourly Forecast</Heading>
        <HourlyForecast data={hourlyWeather} />
      </Box>
      ) : (
        <Text>No weather data available for the current time.</Text>
      )}
    </Box>
  );
};

export default CurrentForecast;