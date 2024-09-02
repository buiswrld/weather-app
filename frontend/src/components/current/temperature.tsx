import React from 'react';
import { getBackgroundColor } from '../../utils/temperature-util';
import { Card, CardHeader, Box, Heading, Text } from '@chakra-ui/react';

interface TemperatureProps {
  temperature: number
  is_day: number
  apparent_temperature: number,
  temp_max: number
  temp_min: number
}

/**
 * Returns the appropriate symbol based on whether it is day or night.
 * 
 * @param is_day - A number indicating if it is day (1) or night (0).
 * @returns A string representing the day or night symbol.
 */
const daySymbol = (is_day: number) => {
    return is_day === 1 ? "🌞" : "🌜";
}

/**
 * Temperature component that displays the current temperature with a day or night symbol.
 * 
 * Displays the current temperature with a background color
 * based on the temperature value and a symbol indicating day or night.
 * 
 * @param temperature - The current temperature.
 * @param is_day - A number indicating if it is day (1) or night (0).
 * @param apparent_temperature - The apparent temperature (feels like) value.
 * @param temp_max - The maximum temperature.
 * @param temp_min - The minimum temperature.
 * @returns A React component that renders the current temperature with styled background and day/night symbol.
 */
const Temperature: React.FC<TemperatureProps> = ({ temperature, is_day, apparent_temperature, temp_max, temp_min }) => {
    const backgroundColor = getBackgroundColor(temperature, false);
    return (
      <Card height="100%" width="56%" background={backgroundColor}>
      <CardHeader>
        <Heading size="xl" textAlign="center" mb={2} mr={0}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Text as="span" textShadow="4px 4px 8px rgba(0, 0, 0, 0.5)">
              {daySymbol(is_day)}
            </Text>
            <Text as="span" ml={0}>
              {temperature + '°F '}
            </Text>
          </Box>
        </Heading>
      </CardHeader>
    </Card>
    );
};

export default Temperature;