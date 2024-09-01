import React from 'react';
import { Heading, Text } from '@chakra-ui/react';

interface LocationProps {
    location: string
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