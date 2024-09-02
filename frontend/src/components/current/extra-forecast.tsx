import React from 'react'
import { Box, Text, Flex } from '@chakra-ui/react'

/**
 * Interface for the ExtraForecast component props.
 */
interface ExtraForecastProps {
  uvIndex: number
  apparentTemperature: number
}

/**
 * ExtraForecast component that displays additional weather information such as UV index and apparent temperature.
 * 
 * @param uvIndex - The UV index value.
 * @param apparentTemperature - The apparent temperature (feels like) value.
 * @returns A React component that renders the UV index and apparent temperature.
 */
const ExtraForecast: React.FC<ExtraForecastProps> = ({
  uvIndex,
  apparentTemperature,
}) => {
  return (
    <Flex direction="row" align="center" justify="center" gap={4} width="100%">
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={4}
        bg="white"
        boxShadow="md"
        width="50%"
        mt={2}
      >
        <Text fontSize="xl" fontWeight="bold">
          Feels like
        </Text>
        <Text fontSize="2xl" color="orange.500">
          {apparentTemperature}°F
        </Text>
      </Box>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={4}
        bg="white"
        boxShadow="md"
        width="50%"
        mt={2}
      >
        <Text fontSize="xl" fontWeight="bold">
        UV Index
        </Text>
        <Text fontSize="2xl" color="teal.500">
          {uvIndex}
        </Text>
      </Box>
    </Flex>
  )
}

export default ExtraForecast
