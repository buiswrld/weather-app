import React from 'react';
import { weatherCodeDescriptions } from '../../utils/weathercodes';
import { getBackgroundColor } from '../../utils/temperature-util';
import { Card, CardHeader, CardBody, Heading, Text } from '@chakra-ui/react';

interface LocationProps {
    location: string
}

const daySymbol = (is_day: number) => {
    return is_day === 1 ? "🌞" : "🌜";
}

const Location: React.FC<LocationProps> = ({ location }) => {
    return (
        <Heading size='sm' textAlign="center" mb = {4} mt = {2}>
            <Text as="span">
                {location}
            </Text>
        </Heading>
    );
};

export default Location;