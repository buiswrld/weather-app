import React, { useContext, useEffect, useState } from 'react';
import { LocationContext } from '../../context/LocationContext';
import { fetchTemperature } from '../../api/weather-service';
import { WeatherData } from '../api/model';
import Temperature from './temperature';
import { Box, Heading, Text, Spinner, Alert, AlertIcon } from '@chakra-ui/react';

//TODO: USE NEW API ENDPOINTS AND ENSURE WE ARE ALWAYS PASSING IN A LOCATION TO THE TEMPERATURE PROP. LOOK INTO RENAMING THE TEMPERATURE.TSX AND UTIL FILE. MOVE ALL FUNCTIONS INTO UTIL.
const CurrentForecast = () => {
  const context = useContext(LocationContext);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const handleFetchTemperature = async () => {
      if (!context || !context.locationData) {
        setError('Location data is not available');
        setLoading(false);
        return;
      }

      setError(null);
      try {
        const data = await fetchTemperature(context.locationData.lat.toString(), context.locationData.lng.toString());
        setWeather(data);
      } catch (err) {
        setError('Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    handleFetchTemperature();
  }, [context]);

  const getTodayWeather = () => {
    if (!weather) return null;
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const currentHour = now.getHours();
    const index = weather.hourly.time.findIndex((time: string) => {
      const [date, hour] = time.split('T');
      return date === today && parseInt(hour.split(':')[0]) === currentHour;
    });
    if (index === -1) return null;
    return {
      time: weather.hourly.time[index],
      temp: weather.hourly.temperature_2m[index],
    };
  };

  const getLocationName = () => {
    if (!context || !context.locationData) return '';
    return context.locationData.place_name;
  };

  const todayWeather = getTodayWeather();

  return (
    <Box className="container" mx="auto" p="4">
    {loading && <Spinner />}
    {error && (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    )}
    {todayWeather ? (
      <Temperature temperature={todayWeather} location={getLocationName()} />
    ) : (
      <Text>No weather data available for the current time.</Text>
    )}
  </Box>
  );
};

export default CurrentForecast;