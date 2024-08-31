import React from 'react';
import { getBackgroundColor, processLocation } from '../../utils/temperature-util';
import { Card, CardHeader, CardBody, Heading, Text } from '@chakra-ui/react';

interface TemperatureProps {
  temperature: number
  location: string
}

const Temperature: React.FC<TemperatureProps> = ({ temperature, location }) => {
    const backgroundColor = getBackgroundColor(temperature);
    const locationText = processLocation(location);
    return (
        <Card height = "100%" background = {backgroundColor}>
        <CardHeader>
            <Heading size='lg'>{temperature + "°F"}</Heading>
        </CardHeader>
        <CardBody>
            <strong><Text whiteSpace = "pre-line" textAlign = "right">{locationText}</Text></strong>
        </CardBody>
        </Card>
    );
};

export default Temperature;