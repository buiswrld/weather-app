import React, { useEffect, useState } from 'react';
import Temperature from './temperature';
import { getCurrentWeather, useLocationFromContext, getLocationName, getDailyWeather } from '../../utils/current-forecast-util';
import { Box, Heading, Text, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import { CurrentWeatherData, DailyWeatherData } from '../../api/models/weather-model';

const CurrentForecast = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherData | null>(null);
  const [dailyWeather, setDailyWeather] = useState<DailyWeatherData | null>(null);
  const [location, setLocation] = useState<string>('');

  const { lat, lon } = useLocationFromContext();



  useEffect(() => {
    console.log(`useEffect triggered with lat: ${lat} and lon: ${lon}`);
    if (lat && lon) {
      const fetchWeather = async () => {
        try {
          setCurrentWeather(await getCurrentWeather(lat, lon));
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
      {currentWeather ? (
        <Temperature temperature={currentWeather.temperature_2m} location={location} />
      ) : (
        <Text>No weather data available for the current time.</Text>
      )}
    </Box>
  );
};

export default CurrentForecast;