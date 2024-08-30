import React, { useContext, useEffect, useState } from 'react';
import { LocationContext } from '../context/LocationContext';
import { fetchWeather } from '../api/weather-service';
import { WeatherData } from '../api/model';
import { Box, Heading, Text, Spinner, Alert, AlertIcon } from '@chakra-ui/react';

const CurrentForecast = () => {
  const context = useContext(LocationContext);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const handleFetchWeather = async () => {
      if (!context || !context.locationData) {
        setError('Location data is not available');
        setLoading(false);
        return;
      }

      setError(null);
      try {
        const data = await fetchWeather(context.locationData.lat.toString(), context.locationData.lng.toString());
        setWeather(data);
      } catch (err) {
        setError('Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    handleFetchWeather();
  }, [context]);

  const getTodayWeather = () => {
    if (!weather) return null;
    const today = new Date().toISOString().split('T')[0];
    const index = weather.hourly.time.findIndex((time: string) => time.startsWith(today));
    if (index === -1) return null;
    return {
      time: weather.hourly.time[index],
      temperature: weather.hourly.temperature_2m[index],
    };
  };

  const getLocationName = () => {
    if (!context || !context.locationData) return '';
    return context.locationData.place_name;
  };

  const todayWeather = getTodayWeather();

  return (
    <Box className="container" mx="auto" p="4">
      <Heading as="h1" size="xl" mb="4">Weather Forecast</Heading>
      {loading && <Spinner />}
      {error && (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      )}
      {todayWeather && (
        <Box bg="gray.100" p="4" rounded="md">
          <Heading as="h2" size="lg" mb="2">Today's Weather in {getLocationName()}</Heading>
          <Text>
            <strong>{todayWeather.time}:</strong> {todayWeather.temperature}°F
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default CurrentForecast;