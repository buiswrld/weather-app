import React from 'react';
import {Stack, Card, Heading, CardHeader, CardBody, Text} from '@chakra-ui/react';
import Weather from './weather';


const WeatherContainer = () => {
    return (
        <Stack spacing='4'>
  {['sm', 'md', 'lg'].map((size) => (
    <Card key={size} size={size}>
      <CardHeader>
        <Heading size='md'> {size}</Heading>
      </CardHeader>
      <CardBody>
        <Text>size = {size}</Text>
      </CardBody>
    </Card>
  ))}
</Stack>
    )
}

export default WeatherContainer;