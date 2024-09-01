import React from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import { Box, Text, Card } from '@chakra-ui/react';
import { HourlyWeatherData } from '../../api/models/weather-model';
import { convertTo12HourFormat } from '../../utils/time';
import { getBackgroundColor } from '../../utils/temperature-util';

interface HourlyForecastProps {
    data: HourlyWeatherData[]
    sunrise: string
    sunset: string
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ data, sunrise, sunset }) => {
  return (
    <Box width="100%" overflow="hidden">
      <ScrollMenu>
        {data.map((weather, index) => (
          <Box
            key={index}
            itemID={index.toString()}
            title={convertTo12HourFormat(weather.time)}
            p={4}
            m={2}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            minWidth="150px"
            textAlign="center"
          >
            <Card background = {getBackgroundColor(weather.temperature_2m, true)}>
            <Text fontSize="lg" fontWeight="bold">
              {convertTo12HourFormat(weather.time)}
            </Text>
            <Text>{weather.temperature_2m}°F</Text>
            <Text>🌧️: {weather.precipitation_probability}%</Text>
            <Text>Code: {weather.weathercode}</Text>
            </Card>
          </Box>
        ))}
      </ScrollMenu>
    </Box>
  );
};

export default HourlyForecast;