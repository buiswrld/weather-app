import React from 'react'
import { Card, CardHeader, Box, Heading, Text } from '@chakra-ui/react'

interface TemperatureBoundProps {
  temp_max: number
  temp_min: number
  is_day: number
}

const getBackgroundColor = (is_day: number) => {
  return is_day === 1
    ? 'linear-gradient(to top right, #f6d365, #ffffff)' // Orange to white gradient for daytime
    : 'linear-gradient(to top right, #b5c1ff, #ffffff)' // Blue to white gradient for nighttime
}

const TemperatureBound: React.FC<TemperatureBoundProps> = ({
  is_day,
  temp_max,
  temp_min,
}) => {
  const backgroundColor = getBackgroundColor(is_day)
  return (
    <Card height="100%" width="40%" background={backgroundColor}>
      <CardHeader>
        <Heading size="sm" textAlign="center">
          <Box display="flex" flexDirection="column">
            <Text fontWeight="bold">🔥High : {temp_max}°</Text>

            <Text fontWeight="bold">❄️Low : {temp_min}°</Text>
          </Box>
        </Heading>
      </CardHeader>
    </Card>
  )
}

export default TemperatureBound
