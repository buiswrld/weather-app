import { DailyWeatherData } from "../../api/models/weather-model";
import { LocationContext } from "../../context/LocationContext"; // Assuming you have a LocationContext
import { useEffect, useState, useContext } from "react";
import { Stack, Card, CardHeader, Heading, CardBody, Text } from "@chakra-ui/react";
import { getDailyWeather } from "../../utils/get-weather";
import { getDateTime } from "../../utils/time";

const FutureForecast = () => {
  const [weatherData, setWeatherData] = useState<DailyWeatherData[]>([]);
  const { locationData } = useContext(LocationContext); // Use location context

  const getNextFiveDates = () => {
    const nextFiveDates = [];
    const today = new Date();

    for (let i = 0; i <= 5; i++) {
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + i);
      nextFiveDates.push(futureDate);
    }

    return nextFiveDates;
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!locationData) {
        console.error('Location data is not available');
        return;
      }

      try {
        const data = await getDailyWeather(locationData.lat.toString(), locationData.lon.toString());
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [locationData]);

  const nextFiveDates = getNextFiveDates();

  return (
    <Stack spacing="4" marginX="10px" marginY="10px">
      {nextFiveDates.map((date, index) => {
        const formattedDate = getDateTime(date).date;
        const weather = weatherData[index];

        return (
          <Card size="sm" key={formattedDate}>
            <CardHeader>
              <Heading size="sm" textAlign="left">
                {formattedDate}
              </Heading>
            </CardHeader>
            <CardBody>
              {weather ? (
                <>
                  <Text>Max Temp: {weather.temperature_2m_max}°C</Text>
                  <Text>Min Temp: {weather.temperature_2m_min}°C</Text>
                  <Text>UV Index: {weather.uv_index_max}</Text>
                </>
              ) : (
                <Text>Loading...</Text>
              )}
            </CardBody>
          </Card>
        );
      })}
    </Stack>
  );
};

export default FutureForecast;