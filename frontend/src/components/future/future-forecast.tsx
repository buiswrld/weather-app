import React, { useEffect, useState, useContext } from 'react';
import { Stack, Card, CardHeader, Heading, Text } from '@chakra-ui/react';
import { getDateTime } from '../../utils/time';
import { weatherCodeDescriptions } from '../../utils/weathercodes';
import { getDailyWeather } from '../../utils/get-weather';
import { LocationContext } from '../../context/location-context';
import { DailyWeatherData } from '../../api/models/weather-model';
import { getNextFiveDates } from '../../utils/time';

const FutureForecast: React.FC = () => {
  const { locationData } = useContext(LocationContext);
  const [weatherData, setWeatherData] = useState<DailyWeatherData[]>([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!locationData) {
        console.error('Location data is not available');
        return;
      }

      try {
        const data = await getDailyWeather(locationData.lat.toString(), locationData.lon.toString());
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [locationData]);

  const nextFiveDates = getNextFiveDates();

  return (
    <Stack spacing="4" marginX="10px" marginY="10px">
      {nextFiveDates.map((date: Date, index: number) => {
        const formattedDate = getDateTime(date).date;
        const weather = weatherData[index+1];

        const description = weather ? weatherCodeDescriptions[weather.weathercode].split(':')[0]: 'Loading...';

        return (
          <Card size="sm" key={formattedDate}>
            <CardHeader>
              <Heading size="sm" textAlign="left" mb={0}>
                {formattedDate}
              </Heading>
            </CardHeader>
            {weather ? (
              <Text textAlign="left" ml={2} mb={2} >
                🔥High: {weather.temperature_2m_max}° ❄️Low: {weather.temperature_2m_min}° {description}
              </Text>
            ) : (
              <Text textAlign="left" ml={2} mb={2}>Loading...</Text>
            )}
          </Card>
        );
      })}
    </Stack>
  );
};

export default FutureForecast;