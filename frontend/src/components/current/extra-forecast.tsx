import React from 'react'
import { Box, Text, Flex } from '@chakra-ui/react'

interface ExtraForecastProps {
  uvIndex: number
  apparentTemperature: number
}

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
          {apparentTemperature}°C
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
