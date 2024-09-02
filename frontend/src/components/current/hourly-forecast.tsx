import React from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { Box, Text, Card } from "@chakra-ui/react";
import { HourlyWeatherData } from "../../api/models/weather-model";
import { getEmojiForTime } from "../../utils/time";
import { getBackgroundColor } from "../../utils/temperature-util";
import "react-horizontal-scrolling-menu/dist/styles.css";
import "../../styles/scrollbar.css";


/**
 * Interface for the HourlyForecast component props.
 */
interface HourlyForecastProps {
  data: HourlyWeatherData[];
  sunrise: string;
  sunset: string;
}

/**
 * HourlyForecast component that displays the hourly weather forecast of the current user time + 24 hours ahead.
 * 
 * It fetches the weather data and displays it with appropriate emojis based on the time of day.
 * 
 * @param data - The hourly weather data.
 * @param sunrise - The sunrise time.
 * @param sunset - The sunset time.
 * @returns A React component that renders the hourly weather forecast.
 */
const HourlyForecast: React.FC<HourlyForecastProps> = ({
  data,
  sunrise,
  sunset,
}) => {
  return (
    <Box width="100%" overflow="hidden">
      <ScrollMenu>
        {data.map((weather, index) => {
          const emoji = getEmojiForTime(weather.time, sunrise, sunset);

          return (
            <Box
              key={index}
              itemID={index.toString()}
              title={weather.time}
              p={4}
              m={2}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              minWidth="150px"
              textAlign="center"
            >
              <Card
                p={4}
                background={getBackgroundColor(weather.temperature_2m, true)}
                boxShadow="lg"
              >
                <Text fontSize="lg" fontWeight="bold">
                  {weather.time}
                </Text>
                <Text>
                  <Text as="span" textShadow="1px 1px 1px black">
                    {emoji}
                  </Text>{" "}
                  {weather.temperature_2m}°F
                </Text>
                <Text>
                  <Text as="span" textShadow="1px 1px 1px black">
                    🌧️
                  </Text>{" "}
                  {weather.precipitation_probability}%
                </Text>
              </Card>
            </Box>
          );
        })}
      </ScrollMenu>
    </Box>
  );
};

export default HourlyForecast;
