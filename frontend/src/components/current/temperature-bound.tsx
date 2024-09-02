import React from 'react'
import { Card, CardHeader, Box, Heading, Text } from '@chakra-ui/react'

interface TemperatureBoundProps {
  temp_max: number
  temp_min: number
  is_day: number
}

/**
 * Returns the background color based on whether it is day or night.
 * 
 * @param is_day - A number indicating if it is day (1) or night (0).
 * @returns A string representing the CSS gradient for the background color.
 */
const getBackgroundColor = (is_day: number) => {
  return is_day === 1
    ? 'linear-gradient(to top right, #f6d365, #ffffff)'
    : 'linear-gradient(to top right, #b5c1ff, #ffffff)'
}

/**
 * TemperatureBound component that displays the maximum and minimum temperatures.
 * Displays the high and low temperatures with appropriate
 * background colors based on whether it is day or night.
 * 
 * @param is_day - A number indicating if it is day (1) or night (0).
 * @param temp_max - The maximum temperature.
 * @param temp_min - The minimum temperature.
 * @returns A React component that renders the high and low temperatures with styled background.
 */
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
