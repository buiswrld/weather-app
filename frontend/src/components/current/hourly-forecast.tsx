import React from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import { Box, Text } from '@chakra-ui/react';
import { HourlyWeatherData } from '../../api/models/weather-model';

interface HourlyForecastProps {
    data: HourlyWeatherData[]
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ data }) => {
  return (
    <Box width="100%" overflow="hidden">
      <ScrollMenu>
        {data.map((weather, index) => (
          <Box
            key={index}
            itemID={index.toString()}
            title={weather.time}
            p={4}
            m={2}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            minWidth="150px"
            textAlign="center"
          >
            <Text fontSize="lg" fontWeight="bold">
              {weather.time}
            </Text>
            <Text>{weather.temperature_2m}°F</Text>
            <Text>Precip: {weather.precipitation_probability}%</Text>
            <Text>Code: {weather.weathercode}</Text>
          </Box>
        ))}
      </ScrollMenu>
    </Box>
  );
};

export default HourlyForecast;