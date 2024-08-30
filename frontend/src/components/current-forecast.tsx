import React, { useEffect, useState, useContext } from 'react';
import { Heading, Box, Text, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import { fetchWeather } from '../api/weather-service';
import { LocationContext } from '../context/LocationContext';
import '../styles/select-location.css';

const CurrentForecast: React.FC = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('LocationContext must be used within a LocationProvider');
  }
  const { locationData } = context;
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleFetchWeather = async () => {
      if (!locationData) {
        setError('Location data is not available');
        return;
      }

      setError(null);
      try {
        const data = await fetchWeather(locationData.lat.toString(), locationData.lng.toString());
        setWeather(data);
      } catch (err) {
        setError('Failed to fetch weather data');
      }
    };

    handleFetchWeather();
  }, [locationData]);

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

  const todayWeather = getTodayWeather();

  return (
    <Box className="container" mx="auto" p="4">
      <Heading as="h1" size="xl" mb="4"></Heading>
      {loading && <Spinner />}
      {error && (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      )}
      {todayWeather && (
        <Box bg="gray.100" p="4" rounded="md">
          <Heading as="h2" size="lg" mb="2">Today's Weather</Heading>
          <Text>
            <strong>{todayWeather.time}:</strong> {todayWeather.temperature}°F
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default CurrentForecast;