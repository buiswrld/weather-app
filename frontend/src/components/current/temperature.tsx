import React from 'react';
import { weatherCodeDescriptions } from '../../utils/weathercodes';
import { getBackgroundColor, processLocation } from '../../utils/temperature-util';
import { Card, CardHeader, CardBody, Heading, Text } from '@chakra-ui/react';

interface TemperatureProps {
  temperature: number
  location: string
  is_day: number
  apparent_temperature: number,
  weathercode: number
}

const daySymbol = (is_day: number) => {
    return is_day === 1 ? "🌞" : "🌜";
}

const Temperature: React.FC<TemperatureProps> = ({ temperature, location, is_day, apparent_temperature, weathercode }) => {
    const backgroundColor = getBackgroundColor(temperature);
    const locationText = processLocation(location);
    const weatherDescription = weatherCodeDescriptions[weathercode];
    return (
        <Card height = "100%" background = {backgroundColor}>
        <CardHeader>
            <Heading size='lg' textAlign = "left">
                <Text as="span" textShadow="4px 4px 8px rgba(0, 0, 0, 0.5)">
                    {daySymbol(is_day)}
                </Text>
                {temperature + "°F"}
            </Heading>
            <Heading size='sm'>Feels like: {apparent_temperature}°F</Heading>
            <Heading size='sm'>{weatherDescription}</Heading>
        </CardHeader>
        <CardBody>
            <strong><Text whiteSpace = "pre-line" textAlign = "right">{locationText}</Text></strong>
        </CardBody>
        </Card>
    );
};

export default Temperature;