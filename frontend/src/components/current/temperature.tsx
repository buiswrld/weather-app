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

const daySymbol = (is_day: number) => {
    return is_day === 1 ? "🌞" : "🌜";
}

const Temperature: React.FC<TemperatureProps> = ({ temperature, is_day, apparent_temperature, temp_max, temp_min }) => {
    const backgroundColor = getBackgroundColor(temperature);
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