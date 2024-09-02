import React from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import { Box, Text, Card } from "@chakra-ui/react";
import { HourlyWeatherData } from "../../api/models/weather-model";
import { convert24To12Hour, getEmojiForTime } from "../../utils/time";
import { getBackgroundColor } from "../../utils/temperature-util";
import "../../styles/scrollbar.css";

interface HourlyForecastProps {
  data: HourlyWeatherData[];
  sunrise: string;
  sunset: string;
}

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
