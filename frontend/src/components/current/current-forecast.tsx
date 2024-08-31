import React, { useContext, useEffect, useState } from 'react';
import Temperature from './temperature';
import { getCurrentWeather, useLocationFromContext, getLocationName } from '../../utils/current-forecast-util';
import { Box, Heading, Text, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import { CurrentWeatherData } from '../../api/models/weather-model';
import { LocationContext } from '../../context/LocationContext';

//TODO: USE NEW API ENDPOINTS AND ENSURE WE ARE ALWAYS PASSING IN A LOCATION TO THE TEMPERATURE PROP. LOOK INTO RENAMING THE TEMPERATURE.TSX AND UTIL FILE. MOVE ALL FUNCTIONS INTO UTIL.
const CurrentForecast = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherData | null>(null);
  const [location, setLocation] = useState<string>('');

  const { lat, lon } = useLocationFromContext();

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const weather = await getCurrentWeather(lat, lon);
        setCurrentWeather(weather);
        const locationName = await getLocationName(lat, lon);
        setLocation(locationName);
      } catch (error) {
        setError('Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [lat, lon]);


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